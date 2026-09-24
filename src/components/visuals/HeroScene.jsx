import { useEffect, useRef } from 'react'
// Named imports rather than `import * as THREE`. It buys less than you would
// hope — WebGLRenderer drags in most of the library either way — but it keeps
// the surface honest about what this file actually uses.
import {
  AdditiveBlending,
  Clock,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  ShaderMaterial,
  SpotLight,
  SRGBColorSpace,
  ACESFilmicToneMapping,
  TorusKnotGeometry,
  Vector2,
  WebGLRenderer,
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/* ---------------------------------------------------------------------------
   The hero's background, in two layers.

   1. AURORA — a fullscreen fragment shader. Domain-warped fbm noise shaped
      into slow masses of light, drawn additively so black stays black and
      only the bright parts register. Dark mode only, and only on screens wide
      enough to be running on something with a fan: it is fill-rate bound, and
      on a phone it buys atmosphere at the cost of frame rate.

   2. THE FORM — a single continuous anodised surface, lit the way a product
      shot is: image-based lighting from a room probe, a hard key, and a rim
      in the site's accent colour. It sits behind the copy rather than beside
      it, which is why it rotates slowly and never quite resolves.

   Both draw into one canvas in two passes with autoClear off, so there is a
   single WebGL context and a single render loop. There are no shadows in the
   scene at all — nothing here sits on a surface, so a shadow map would be
   pure cost.

   This layer is fixed behind the entire page rather than confined to the
   hero, so unlike a hero canvas it cannot stop rendering once you scroll. It
   still stops when the tab is backgrounded, and it runs at a lower pixel
   ratio on phones, where an always-on canvas is a battery decision as much as
   a frame-rate one.
--------------------------------------------------------------------------- */

const AURORA_VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const AURORA_FRAG = `
  uniform float uTime;
  uniform float uAspect;
  uniform float uIntensity;
  uniform vec2  uPointer;
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  varying vec2  vUv;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453) * 2.0 - 1.0;
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
    p += uPointer * 0.05;

    float t = uTime * 0.035;

    // Two rounds of domain warping — what turns noise into something that
    // curls and folds like light through vapour instead of looking like static.
    vec2 q = vec2(fbm(p * 1.3 + vec2(0.0, t)),
                  fbm(p * 1.3 + vec2(3.2, -t)));
    vec2 r = vec2(fbm(p * 1.7 + 2.0 * q + vec2(1.7, 9.2) + t * 1.3),
                  fbm(p * 1.7 + 2.0 * q + vec2(8.3, 2.8) - t * 1.0));

    float f = fbm(p * 1.5 + 2.4 * r);
    float band = smoothstep(-0.08, 0.50, f);
    float glow = pow(band, 2.2);

    vec3 col = mix(uColorA, uColorB, clamp(r.x * 0.9 + 0.5, 0.0, 1.0));

    // vUv.y is 0 at the bottom, and the canvas mask fades out toward the
    // bottom too, so the light has to climb.
    float fall = smoothstep(-0.25, 0.95, vUv.y);

    float a = glow * fall * uIntensity;
    gl_FragColor = vec4(col * a, a);
  }
`

const isDark = () => document.documentElement.classList.contains('dark')

/** Reads the live --accent value off <html> so the scene follows the theme. */
function readAccent() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent')
    .trim()
  return new Color(raw || '#2f5fe0')
}

/**
 * The two lights the aurora mixes between, derived from the accent.
 *
 * The accent itself is a UI colour chosen to sit under text — far too dark to
 * read as emitted light on black — so both are lifted into a luminance range
 * that actually glows, and the second is rotated around the wheel so the
 * curtains shift hue as they fold rather than being one flat colour.
 */
function auroraLights(accent) {
  const hsl = { h: 0, s: 0, l: 0 }
  accent.getHSL(hsl)
  return {
    key: new Color().setHSL(hsl.h, Math.min(hsl.s * 1.1, 1), 0.62),
    fill: new Color().setHSL((hsl.h + 0.14) % 1, Math.min(hsl.s * 1.15, 1), 0.56),
  }
}

export default function HeroScene({ className = '' }) {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      return // No WebGL. The CSS gradient behind this element carries the hero.
    }

    // Lower on phones: this canvas runs for as long as the page is open.
    const pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      window.innerWidth < 768 ? 1 : 1.5,
    )
    renderer.setPixelRatio(pixelRatio)
    renderer.setClearAlpha(0)
    renderer.autoClear = false
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.outputColorSpace = SRGBColorSpace
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block'
    host.appendChild(renderer.domElement)

    const accent = readAccent()

    // --- layer 1: aurora ----------------------------------------------------
    const lights = auroraLights(accent)
    const auroraScene = new Scene()
    const auroraCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const auroraUniforms = {
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uIntensity: { value: 0 },
      uPointer: { value: new Vector2(0, 0) },
      uColorA: { value: lights.key },
      uColorB: { value: lights.fill },
    }
    const auroraMaterial = new ShaderMaterial({
      uniforms: auroraUniforms,
      vertexShader: AURORA_VERT,
      fragmentShader: AURORA_FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: AdditiveBlending,
    })
    const auroraGeometry = new PlaneGeometry(2, 2)
    auroraScene.add(new Mesh(auroraGeometry, auroraMaterial))

    // --- layer 2: the form --------------------------------------------------
    const formScene = new Scene()
    const pmrem = new PMREMGenerator(renderer)
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
    formScene.environment = envRT.texture

    const camera = new PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 0, 7.6)

    const rig = new Group()
    formScene.add(rig)

    const knot = new Mesh(
      new TorusKnotGeometry(1.15, 0.36, 360, 44, 2, 3),
      new MeshPhysicalMaterial({
        color: '#7c88a8',
        metalness: 1,
        roughness: 0.16,
        iridescence: 0.55,
        iridescenceIOR: 1.45,
        iridescenceThicknessRange: [180, 340],
      }),
    )
    rig.add(knot)

    const key = new DirectionalLight(0xffffff, 2.6)
    key.position.set(4, 6, 3)
    formScene.add(key)

    const rim = new SpotLight(accent.getHex(), 55, 20, Math.PI / 6, 0.7, 1.8)
    rim.position.set(-4.5, 2.4, -4)
    formScene.add(rim)

    const fill = new DirectionalLight(0x9fb6ff, 0.45)
    fill.position.set(-3, 1, 4)
    formScene.add(fill)

    const draw = () => {
      renderer.clear()
      if (auroraUniforms.uIntensity.value > 0) {
        renderer.render(auroraScene, auroraCamera)
      }
      renderer.render(formScene, camera)
    }

    // --- loop state ---------------------------------------------------------
    // Declared up here rather than beside the loop because syncTheme() reads
    // `running`, and resize() calls syncTheme() during setup — a `let` below
    // this point would be in its temporal dead zone at that moment.
    const pointer = { x: 0, y: 0 }
    const eased = { x: 0, y: 0 }
    const clock = new Clock()
    let frame = 0
    let visible = true
    let onScreen = true
    let running = false

    // --- theme + sizing -----------------------------------------------------
    let wide = true

    const syncTheme = () => {
      const next = readAccent()
      const dark = isDark()
      const nextLights = auroraLights(next)
      auroraUniforms.uColorA.value.copy(nextLights.key)
      auroraUniforms.uColorB.value.copy(nextLights.fill)
      auroraUniforms.uIntensity.value = dark && wide ? 1.5 : 0
      rim.color.copy(next)
      // On white, the room probe alone blows the metal out; on black it is
      // the only thing giving the surface anything to reflect.
      formScene.environmentIntensity = dark ? 0.95 : 0.55
      renderer.toneMappingExposure = dark ? 1.15 : 1.0
      if (!running) draw()
    }
    const themeObserver = new MutationObserver(syncTheme)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-accent'],
    })

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host
      if (!w || !h) return
      wide = w >= 768
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      auroraUniforms.uAspect.value = w / h

      // Sit the form to the right of the headline on wide screens and dead
      // centre on narrow ones, where the copy stacks underneath it anyway.
      camera.position.z = w < 640 ? 11.5 : 8.1
      rig.position.x = w < 1024 ? 0 : 2.4
      rig.position.y = w < 1024 ? 0.2 : 0
      camera.updateProjectionMatrix()
      syncTheme()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    resize()

    // --- loop ---------------------------------------------------------------
    const onPointerMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    const tick = () => {
      frame = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()
      auroraUniforms.uTime.value = t

      // Time turns it slowly; scroll turns it further. Reading the page and
      // moving the form are the same gesture, which is what stops a fixed
      // background from feeling like wallpaper.
      rig.rotation.y = t * 0.13 + window.scrollY * 0.00045
      rig.rotation.x = Math.sin(t * 0.18) * 0.12

      // The form leans toward the cursor and the aurora drifts the other way,
      // which is what sells the two layers as having space between them.
      eased.x += (pointer.x * 0.24 - eased.x) * 0.04
      eased.y += (pointer.y * 0.16 - eased.y) * 0.04
      rig.rotation.z = eased.x * 0.45
      rig.position.y = (window.innerWidth < 1024 ? 0.2 : 0) - eased.y * 0.45
      auroraUniforms.uPointer.value.set(-eased.x * 0.9, eased.y * 0.9)

      draw()
    }

    const evaluate = () => {
      const should = visible && onScreen && !reducedMotion
      if (should && !running) {
        running = true
        clock.start()
        tick()
      } else if (!should && running) {
        running = false
        cancelAnimationFrame(frame)
        clock.stop()
      }
    }

    const onVisibility = () => {
      visible = !document.hidden
      evaluate()
    }

    const viewObserver = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      evaluate()
    }, { threshold: 0 })
    viewObserver.observe(host)

    if (reducedMotion) {
      rig.rotation.set(0.1, 0.7, 0)
      auroraUniforms.uTime.value = 18
      draw()
    } else {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      document.addEventListener('visibilitychange', onVisibility)
      evaluate()
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibility)
      viewObserver.disconnect()
      resizeObserver.disconnect()
      themeObserver.disconnect()
      knot.geometry.dispose()
      knot.material.dispose()
      auroraGeometry.dispose()
      auroraMaterial.dispose()
      envRT.dispose?.()
      pmrem.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={hostRef} aria-hidden="true" className={className} />
}

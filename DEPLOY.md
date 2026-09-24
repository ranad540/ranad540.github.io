# Deploying to GitHub Pages

This is a Vite app, so GitHub Pages can't just serve the repo — something has to run `npm run build` first. The included GitHub Actions workflow does that for you on every push. Set it up once and you never think about it again.

## One-time setup

0. **Move the workflow file into place.** It shipped as `github-pages-workflow.yml` in the project root, because tools aren't allowed to write into `.github/workflows/` remotely. Put it where GitHub expects it:

   ```bash
   mkdir -p .github/workflows
   mv github-pages-workflow.yml .github/workflows/deploy.yml
   ```

1. Create a public repo at <https://github.com/new>. Name it `<your-username>.github.io` if that name is free — that gives you the shortest URL. Any other name works too; see the note at the bottom.

2. From this project folder:

   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. On GitHub, go to **Settings → Pages**. Under "Build and deployment", set **Source** to **GitHub Actions**. That's the important step — not "Deploy from a branch".

4. Open the **Actions** tab. The `Deploy to GitHub Pages` workflow should be running. When it goes green (about a minute), your site is live.

## Publishing changes later

```bash
git add .
git commit -m "Update experience section"
git push
```

The workflow rebuilds and redeploys automatically. Nothing else to do.

## Why `base: './'`

`vite.config.js` sets `base: './'`, which makes the built asset paths relative. That means the same build works whether the site is served from `username.github.io/` or `username.github.io/repo-name/` — you don't have to edit the config if you rename the repo. This is the single most common reason a Vite site deploys to Pages as a blank white page, and it's already handled.

## After it's live — a short checklist

- [ ] Open the URL on your phone. Check nothing overflows sideways.
- [ ] Click every link: GitHub, LinkedIn, email, resume download. Broken links on a portfolio are worse than no portfolio.
- [ ] Search `src/data/profile.js` for `[` — any leftover bracket is a placeholder you forgot.
- [ ] Try the dark mode toggle and the accent colour picker, then reload; both should stick.
- [ ] Add the link to your resume header, your LinkedIn "Website" field, and your GitHub profile bio.

## Custom domain (optional)

Buy a domain, add it under **Settings → Pages → Custom domain**, then create these DNS records at your registrar:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `<your-username>.github.io` |

Tick "Enforce HTTPS" once the certificate provisions.

## Troubleshooting

**Blank white page.** Usually wrong asset paths — check `base: './'` is still in `vite.config.js`. Open the browser console; a 404 on `/assets/index-xxxx.js` confirms it.

**Workflow fails on `npm ci`.** That command needs `package-lock.json` committed. Run `npm install`, then commit the lockfile.

**Actions tab shows nothing.** The workflow file must be at exactly `.github/workflows/deploy.yml`, and Pages Source must be set to "GitHub Actions".

**Resume button 404s.** The PDF must be in `public/` and named exactly `Rakesh-ND-Resume.pdf`, matching `profile.resume` in `src/data/profile.js`.

## One thing to do after your first deploy

The site ships a social share card (`public/og.png`) — the preview people see
when the link is posted on LinkedIn, Slack or WhatsApp. Its `<meta>` tags in
`index.html` currently use a relative path, which LinkedIn and Slack resolve
fine but Twitter/X rejects.

Once you know your live URL, open `index.html` and make the two image tags
absolute:

```html
<meta property="og:image" content="https://<your-username>.github.io/og.png" />
<meta name="twitter:image" content="https://<your-username>.github.io/og.png" />
```

Then paste the URL into <https://www.linkedin.com/post-inspector/> to force
LinkedIn to re-read the tags — it caches them aggressively, so the first share
sticks for a long time.

If you ever change your name or job title, regenerate the card so it matches.

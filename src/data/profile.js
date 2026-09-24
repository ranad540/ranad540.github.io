/* ---------------------------------------------------------------------------
   Every word on the site comes from this one file.
   To update the portfolio, edit here — you never need to touch the components.

   ONE PLACEHOLDER REMAINS. Search this file for "[" :
     [City, State]         where you're based right now

   Text wrapped in **double asterisks** renders in the brighter type colour.
   The one accent colour lives in src/index.css as --accent.
--------------------------------------------------------------------------- */

/**
 * True when a field has a real value rather than a `[placeholder]`.
 * Anything still unfilled is simply not rendered, so the site can never ship
 * a link that goes nowhere.
 */
export const isSet = (v) => typeof v === 'string' && v.length > 0 && !v.includes('[')

export const profile = {
  name: 'Rakesh N D',
  role: 'Full Stack Developer',

  tagline:
    'I build enterprise web applications end to end — Spring Boot services and REST APIs on the back end, React.js on the front, Oracle SQL underneath.',

  location: '[City, State]',
  email: 'rnd19982@gmail.com',
  phone: '+91 83092 04234',
  phoneHref: 'tel:+918309204234',
  github: 'https://github.com/ranad540',
  linkedin: 'https://www.linkedin.com/in/rakeshdhulipalla/',
  resume: 'Rakesh-ND-Resume.pdf',

  facts: [
    { label: 'Experience', value: '2 years, enterprise web apps' },
    { label: 'Core stack', value: 'Java · Spring Boot · React.js' },
    { label: 'Education', value: 'M.S., University of North Texas' },
    { label: 'Certified', value: 'Meta Front-End Developer' },
  ],
}

/** Shown as pills at the bottom of the contact section. */
export const openTo = [
  'Full-stack developer',
  'Backend developer',
  'Frontend developer',
  'Remote',
  'Hybrid',
]

export const about = {
  statement:
    'I build the back end and the front end of the same application, and I care most about the part in the middle — where a vague requirement becomes a clean domain model that the next engineer can read.',

  paragraphs: [
    'I spent two years at **Sri Tek Inc.** building and maintaining enterprise web applications where both ends were my responsibility. On the server side that meant **Java and Spring Boot** — designing REST APIs that let distributed services talk to each other cleanly. On the client side it meant **React.js and Redux**, and a habit of building components reusable enough that the next feature costs less than the last one.',
    'A good share of my time went to the unglamorous work that keeps software alive: optimising slow **Oracle SQL** queries until response times came back down, reviewing other people’s code, chasing production bugs, and sitting with business analysts and QA until a requirement turned into something buildable.',
    'I work comfortably with **AI-assisted tooling** — Cursor and Claude are part of my normal loop for scaffolding, debugging and review — and I treat them the way I treat any other tool: useful when you already understand the code they’re touching.',
  ],

  sidecard: [
    { label: 'Focus', value: 'Full-stack · Java, Spring Boot, React.js' },
    { label: 'Experience', value: '2 years, Software Developer' },
    { label: 'Location', value: '[City, State]' },
    { label: 'Education', value: 'M.S. Computer & Information Systems, UNT' },
    { label: 'Availability', value: 'Open to new roles' },
  ],
}

export const skills = [
  {
    title: 'Languages',
    items: ['Java', 'JavaScript ES6/ES7', 'SQL', 'JSON', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frontend',
    items: [
      'React.js',
      'Redux',
      'Axios',
      'Responsive design',
      'DOM manipulation',
      'Component architecture',
    ],
  },
  {
    title: 'Backend',
    items: [
      'Spring Boot',
      'REST APIs',
      'Microservices',
      'Distributed systems',
      'Auth & authorization',
    ],
  },
  {
    title: 'Databases',
    items: ['Oracle SQL', 'MongoDB', 'Query optimization', 'Schema design'],
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS', 'Git', 'GitHub', 'Application deployment'],
  },
  {
    title: 'Testing',
    items: ['Jest', 'React Testing Library', 'Unit testing', 'Integration testing'],
  },
  {
    title: 'Practices',
    items: ['Agile / Scrum', 'SDLC', 'Code review', 'Debugging', 'Cursor IDE', 'Claude AI'],
  },
]

export const experience = [
  {
    role: 'Software Developer',
    // Sri Tek is the employer of record; the work was delivered to a client
    // that can't be named. `clientDisclosed: false` renders "Client ·
    // Undisclosed" in the margin — it signals consulting work without naming
    // anyone. If a client ever can be named, put it in `client` and set
    // `clientDisclosed: true`; it then becomes the headline company and Sri
    // Tek moves to the margin as the employer.
    company: 'Sri Tek Inc.',
    client: null,
    clientDisclosed: false,
    location: 'McKinney, Texas, USA',
    period: 'Jul 2023 — Feb 2025',
    bullets: [
      'Developed and maintained enterprise web applications using Java, Spring Boot, React.js and Oracle SQL.',
      'Designed and implemented RESTful APIs supporting frontend applications and enabling clean integration between distributed systems.',
      'Built reusable React components that improved application responsiveness and made the codebase easier to extend.',
      'Optimized complex SQL queries and database operations, improving application performance and cutting response times.',
      'Integrated frontend applications with backend microservices using Axios and REST APIs.',
      'Collaborated with business analysts, QA engineers and stakeholders to turn requirements into scalable solutions.',
      'Performed code reviews, troubleshooting, bug fixes and production support to keep applications stable and reliable.',
      'Participated in Agile ceremonies — sprint planning, daily standups, backlog grooming and retrospectives.',
      'Used AI-assisted development tools including Cursor IDE and Claude to speed up development, streamline debugging and improve code quality.',
      'Contributed to application deployment and cloud-based infrastructure support using AWS services.',
    ],
    stack: ['Java', 'Spring Boot', 'React.js', 'Oracle SQL', 'REST APIs', 'AWS', 'Git'],
  },
]

export const projects = [
  {
    title: 'E-Grocery — E-Commerce Platform',
    blurb:
      'A full-stack e-commerce application for grocery shopping: browse products, manage a cart, and place orders end to end.',
    bullets: [
      'Responsive frontend in React.js with Redux for state management.',
      'Spring Boot services exposing REST APIs for products, users and order processing.',
      'Secure user authentication and authorization on protected routes and endpoints.',
      'Relational schema design with SQL queries optimized for fast product and order retrieval.',
      'Component-based architecture chosen for scalability, maintainability and reuse.',
    ],
    stack: ['React.js', 'Redux', 'Spring Boot', 'REST APIs', 'SQL', 'Axios'],
    // No public repo for this yet. Push the code and put its URL here — the
    // card's GitHub button appears automatically once this is a real link.
    repo: null,
  },
]

export const education = [
  {
    degree: 'M.S. Computer and Information Systems',
    school: 'University of North Texas · Denton, Texas, USA',
    year: '2023',
  },
  {
    degree: 'B.Tech. Computer Science and Engineering',
    school: 'KL University · Guntur, Andhra Pradesh, India',
    year: '2020',
  },
]

export const certifications = [
  {
    name: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta',
    verify: 'https://coursera.org/verify/professional-cert/K4M3X1QB3AMH',
  },
  {
    name: 'Meta React Native Specialization',
    issuer: 'Meta',
    verify: 'https://coursera.org/verify/specialization/2QHM081G1Z98',
  },
  {
    name: 'GitHub Professional Certificate',
    issuer: 'LinkedIn Learning',
    verify:
      'https://www.linkedin.com/learning/certificates/3a54340ad5d9208cf5035a0f0aedc0eaecab1cca478754021cb57b9dab774fe8',
  },
]

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

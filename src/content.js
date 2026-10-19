// ----------------------------------------------------------------------------
// CONTENT — single source of truth for all portfolio data
// ----------------------------------------------------------------------------

export const CONTENT = {
  profile: {
    name: "Jeffrey Cruel",
    role: "UI/UX & Full-Stack Developer",
    city: "Albay",
    shortBio: "Full-Stack Developer focused on intuitive UI/UX design, design systems, and robust backend logic to build seamless digital experiences. Hands-on, problem-first builder ready to ship high-impact products alongside collaborative engineering teams.",
    about: "Based in Albay and studying Information Technology at Bicol University, I'm a Full-Stack Developer passionate about UI/UX design, design systems, and interactive web experiences. I focus on bridging the gap between clean visual design and solid backend logic—crafting web applications that feel intuitive, fast, and reliable from start to finish.",
    email: "crueljeffrey1904@gmail.com",
    github: "https://github.com/Shizukesasss",
    linkedin: "https://www.linkedin.com/in/jeffrey-cruel-518b72422/",
    resume: "/Jeffrey_Cruel_Resume.pdf",
    facts: [
      "Problem-first mindset backed by hands-on experience in modern web architecture and version control.",
      "Detail-oriented builder driven by taking products from initial Figma concepts to polished micro-interactions.",
      "Dual Google Certified in UX Design and AI with 16+ verified Coursera course credentials.",
      "Ready for impact—currently open to internships, freelance projects, and junior engineering roles."
    ]
  },

  // Statement paragraph; [bracketed] or **double-asterisk** words light amber on scroll
  statement: "I enjoy designing [intuitive] interfaces and building them into [real,] working products. My work combines thoughtful [UI/UX] design with clean [development] to deliver responsive, [user-friendly] web experiences from start to finish. Whether I am shaping a simple layout or refining smooth interactions, I focus on making every detail feel [clear,] [fast,] and [easy] to use.",

  marquee: [
    "FRONT END",
    "WEB DEVELOPMENT",
    "UI/UX",
    "REACT & TYPESCRIPT",
    "DESIGN SYSTEMS",
    "FULL STACK"
  ],

  services: [
    {
      title: "Design Engineering",
      blurb: "Bridging the gap between Figma files and production code — pixel-perfect components with first-class accessibility.",
      slug: "design-engineering"
    },
    {
      title: "Motion & Interaction",
      blurb: "Scroll-driven reveals, kinetic type, magnetic elements and route transitions that make interfaces feel alive.",
      slug: "motion-interaction"
    },
    {
      title: "Design Systems",
      blurb: "Token-based systems built to scale — from primitive variables to complex pattern libraries teams actually adopt.",
      slug: "design-systems"
    },
    {
      title: "Performance Audit",
      blurb: "Ruthless optimisation across Core Web Vitals, bundle size and render performance with measurable before/after.",
      slug: "performance-audit"
    }
  ],

  skills: [
    { name: "HTML", group: "Use every day" },
    { name: "CSS", group: "Use every day" },
    { name: "JavaScript", group: "Use every day" },
    { name: "React", group: "Use every day" },
    { name: "TypeScript", group: "Use every day" },
    { name: "Tailwind CSS", group: "Use every day" },
    { name: "Node.js & Express", group: "Use every day" },
    { name: "MySQL", group: "Use every day" },
    { name: "REST APIs", group: "Use every day" },
    { name: "Git & GitHub", group: "Use every day" },
    { name: "Python", group: "Used on projects" },
    { name: "PHP", group: "Used on projects" },
    { name: "PostgreSQL", group: "Used on projects" },
    { name: "Firebase & Supabase", group: "Used on projects" },
    { name: "Bootstrap", group: "Used on projects" },
    { name: "Java", group: "Used on projects" },
    { name: "C", group: "Used on projects" },
    { name: "C++", group: "Used on projects" },
    { name: "GSAP & Motion", group: "Used on projects" },
    { name: "Figma", group: "Used on projects" },
    { name: "Three.js", group: "Used on projects" },
    { name: "OpenCV", group: "Learning now" }
  ],

  projects: [
    {
      id: "p1",
      slug: "codequest",
      title: "CodeQuest",
      year: "2024",
      category: "Game Dev",
      role: "Game Developer & Designer",
      result: "Conceptualized, designed, and developed an interactive RPG that gamifies core programming concepts with custom puzzles and 60fps WebGL rendering.",
      stack: ["GDevelop 5", "JavaScript", "WebGL", "Pixi.js", "Game Design"],
      repoUrl: "https://github.com/Shizukesasss/CodeQuestGame.git",
      liveUrl: "https://gd.games/ep19/code-quest-best",
      image: "/images/projects/codequest/codequest-title.jpg",
      imageAlt: "CodeQuest – Educational Coding Adventure Game Title Screen",
      cover: "/images/projects/codequest/codequest-title.jpg",
      hero: "/images/projects/codequest/codequest-title.jpg",
      screens: [
        "/images/projects/codequest/codequest-topics.jpg",
        "/images/projects/codequest/codequest-battle.png",
        "https://public-game-resources.gdevelop.io/d09af2d7-32f0-4d5e-88f9-0d3de8c74267/thumbnails/thumbnail_7773869b-f55a-4154-b74b-04a231f27bbf.png"
      ],
      details: [
        "/images/projects/codequest/codequest-battle.png",
        "/images/projects/codequest/codequest-topics.jpg"
      ],
      caseStudy: {
        overview: "CodeQuest is a 2D story-driven educational adventure game built from the ground up to make computer programming fundamentals intuitive and engaging. I handled the entire product lifecycle—from core game design, level puzzles, and narrative scripting to pixel art direction, JavaScript logic, and WebGL optimization.",
        challenge: "Traditional programming tutorials often alienate beginners with passive lecture videos and dry terminal exercises. The core challenge was designing interactive gameplay loops where writing or choosing code paths feels essential to surviving and progressing, without breaking narrative immersion.",
        outcome: "Published on gd.games, CodeQuest features custom pixel assets, real-time puzzle evaluation, responsive cross-device controls, and responsive sound design. Playtesters demonstrated higher retention of core programming concepts compared to traditional workbook exercises.",
        timeline: "3 months — Concept, Game Architecture & Deployment",
        gallery: [
          "/images/projects/codequest/codequest-title.jpg",
          "/images/projects/codequest/codequest-topics.jpg",
          "/images/projects/codequest/codequest-battle.png",
          "https://public-game-resources.gdevelop.io/d09af2d7-32f0-4d5e-88f9-0d3de8c74267/thumbnails/thumbnail_7773869b-f55a-4154-b74b-04a231f27bbf.png"
        ]
      }
    },
    {
      id: "p2",
      slug: "binamira-medical-clinic",
      title: "Binamira Medical Clinic",
      year: "2024",
      category: "Healthcare",
      role: "Full-Stack Developer",
      result: "Constructed an automated clinic scheduling & EMR system with PHPMailer confirmations and role-gated staff portals.",
      stack: ["PHP", "MySQL", "JavaScript", "PHPMailer", "HTML5/CSS3", "Vercel"],
      repoUrl: "https://github.com/Shizukesasss/Websys-IM-Project.git",
      liveUrl: "https://binamiramedicalclinic.vercel.app/",
      image: "/images/projects/binamira/binamira-hero.png",
      imageAlt: "Binamira Medical Clinic – Healthcare Information & EMR System",
      cover: "/images/projects/binamira/binamira-hero.png",
      hero: "/images/projects/binamira/binamira-hero.png",
      screens: [
        "/images/projects/binamira/binamira-services.png",
        "/images/projects/binamira/binamira-booking.png",
        "/images/projects/binamira/binamira-ranges.png"
      ],
      details: [
        "/images/projects/binamira/binamira-services.png",
        "/images/projects/binamira/binamira-booking.png"
      ],
      caseStudy: {
        overview: "Binamira Medical Clinic is a full-featured clinical management and online appointment booking web application created for a semi-private medical center in Bacacay, Albay. It digitizes patient intake, appointment scheduling, doctor availability, electronic medical records (EMR), billing status, and prescriptions.",
        challenge: "The medical facility previously relied on manual paperwork and unscheduled walk-ins, causing crowded waiting rooms, record retrieval delays, and frequent double-booking during peak hours.",
        outcome: "Delivered a responsive web platform featuring dynamic doctor scheduling, patient self-service booking with PHPMailer confirmation receipts, and a secure employee dashboard. Reduced administrative booking friction and cut patient wait times significantly.",
        timeline: "4 months — Database Design, PHP Backend & Vercel Deployment",
        gallery: [
          "/images/projects/binamira/binamira-hero.png",
          "/images/projects/binamira/binamira-services.png",
          "/images/projects/binamira/binamira-booking.png",
          "/images/projects/binamira/binamira-ranges.png"
        ]
      }
    },
    {
      id: "p3",
      slug: "clickntech-ecommerce",
      title: "ClickNTech Ecommerce",
      year: "2026",
      category: "E-Commerce",
      role: "Frontend & Full-Stack Developer",
      result: "Architected a tech gadget storefront with persistent cart state, dynamic catalog search, and an admin operations suite.",
      stack: ["React 18", "Tailwind CSS", "Node.js", "Express", "Vite", "Lucide React"],
      repoUrl: "https://github.com/Shizukesasss/clickntech",
      liveUrl: "https://clickntech.vercel.app/",
      image: "/images/projects/clickntech/clickntech-hero.png",
      imageAlt: "ClickNTech – Modern Tech & Gadgets E-Commerce",
      cover: "/images/projects/clickntech/clickntech-hero.png",
      hero: "/images/projects/clickntech/clickntech-hero.png",
      screens: [
        "/images/projects/clickntech/clickntech-products.png",
        "/images/projects/clickntech/clickntech-hero.png",
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600&h=800"
      ],
      details: [
        "/images/projects/clickntech/clickntech-products.png",
        "/images/projects/clickntech/clickntech-hero.png"
      ],
      caseStudy: {
        overview: "ClickNTech is a contemporary consumer electronics and computer accessories e-commerce web application. Featuring a clean, minimalist UI, it delivers instant catalog search, category filtering, persistent shopping cart synchronization, account authentication, and an end-to-end admin dashboard for inventory management.",
        challenge: "Shoppers expect zero-latency product browsing and uninterrupted cart state across page reloads. Simultaneously, store administrators needed a reliable mechanism to manage stock levels, update product details, and monitor customer orders in real time.",
        outcome: "Built an ultra-responsive React SPA with Vite, styled with utility-first Tailwind CSS and Sonner notifications. Integrated robust client-side storage persistence, real-time stock boundary checks, and a comprehensive admin portal that gives managers full catalog control.",
        timeline: "3 months — UI/UX Prototyping, Cart Logic & API Integration",
        gallery: [
          "/images/projects/clickntech/clickntech-hero.png",
          "/images/projects/clickntech/clickntech-products.png",
          "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1200&h=675",
          "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&q=80&w=600&h=800"
        ]
      }
    },
    {
      id: "p4",
      slug: "mathemix",
      title: "MatheMatix",
      year: "2025",
      category: "3D Web / EdTech",
      role: "Interactive & 3D Web Developer",
      result: "Built a real-time multiplayer 3D math learning application with Three.js spatial simulations and Socket.io matchmaking.",
      stack: ["React 19", "Three.js", "React Three Fiber", "Framer Motion", "Firebase", "Socket.io", "Tailwind CSS"],
      repoUrl: "https://github.com/Manoy54/MatheMix-repository",
      liveUrl: "https://mathemix-9c8ba.web.app/welcome",
      image: "/images/projects/mathemix/mathemix-welcome.png",
      imageAlt: "MatheMatix – 3D Gamified Math Learning Platform",
      cover: "/images/projects/mathemix/mathemix-welcome.png",
      hero: "/images/projects/mathemix/mathemix-welcome.png",
      screens: [
        "/images/projects/mathemix/mathemix-gameplay.png",
        "/images/projects/mathemix/mathemix-modes.png",
        "/images/projects/mathemix/mathemix-multiplayer.png"
      ],
      details: [
        "/images/projects/mathemix/mathemix-gameplay.png",
        "/images/projects/mathemix/mathemix-categories.png"
      ],
      caseStudy: {
        overview: "MatheMatix is an immersive educational web platform that reimagines mathematics learning through interactive 3D WebGL scenes and real-time multiplayer competition. Students engage with geometric concepts and arithmetic challenges in head-to-head multiplayer rooms powered by WebSockets.",
        challenge: "Synchronizing real-time multiplayer state and audio cues while rendering dynamic Three.js canvas environments without frame rate drops on low-to-mid-tier devices required strict memory management and component lifecycle optimization.",
        outcome: "Shipped on Firebase Hosting with sub-50ms Socket.io lobby synchronization, smooth 60fps React Three Fiber rendering, and Framer Motion micro-interactions that elevated student engagement during competitive learning sessions.",
        timeline: "3.5 months — 3D Scene Modeling, WebSockets & Game Architecture",
        gallery: [
          "/images/projects/mathemix/mathemix-welcome.png",
          "/images/projects/mathemix/mathemix-gameplay.png",
          "/images/projects/mathemix/mathemix-modes.png",
          "/images/projects/mathemix/mathemix-categories.png",
          "/images/projects/mathemix/mathemix-multiplayer.png",
          "/images/projects/mathemix/mathemix-signup.png"
        ]
      }
    },
    {
      id: "p5",
      slug: "finquest",
      title: "FinQuest",
      year: "2026",
      category: "FinTech / EdTech",
      role: "Frontend & Motion Developer",
      result: "Engineered a gamified financial literacy adventure with Supabase auth, multi-layer parallax depth, and avatar progression.",
      stack: ["React 19", "TypeScript", "Tailwind CSS v4", "Supabase", "GSAP", "Lenis", "Motion", "React Spring"],
      repoUrl: "https://github.com/Manoy54/FinQuest-Repo.git",
      liveUrl: "https://fin-quest-repo.vercel.app/",
      image: "/images/projects/finquest/finquest-welcome.png",
      imageAlt: "FinQuest – Gamified Financial Literacy Platform",
      cover: "/images/projects/finquest/finquest-welcome.png",
      hero: "/images/projects/finquest/finquest-welcome.png",
      screens: [
        "/images/projects/finquest/finquest-crossword.png",
        "/images/projects/finquest/finquest-wordsearch.png",
        "/images/projects/finquest/finquest-quiz.png"
      ],
      details: [
        "/images/projects/finquest/finquest-crossword.png",
        "/images/projects/finquest/finquest-wordsearch.png"
      ],
      caseStudy: {
        overview: "FinQuest is a gamified financial education platform designed to empower students and young professionals with practical financial literacy. Through interactive quests on budgeting, compound interest, and investment portfolios, users navigate real-world financial scenarios while leveling up custom avatars.",
        challenge: "Personal finance content is traditionally perceived as unengaging. The objective was to design a tactile, animated web experience with physics-based scrolling and rewarding feedback loops while maintaining lightweight performance on mobile devices.",
        outcome: "Created a cutting-edge web application utilizing React 19, TypeScript, Tailwind CSS v4, Lenis smooth scrolling, and React Spring parallax. Integrated Supabase for persistent player profiles and quest milestones, deployed on Vercel.",
        timeline: "2.5 months — Motion Prototyping, Supabase Sync & Vercel Launch",
        gallery: [
          "/images/projects/finquest/finquest-welcome.png",
          "/images/projects/finquest/finquest-crossword.png",
          "/images/projects/finquest/finquest-wordsearch.png",
          "/images/projects/finquest/finquest-quiz.png"
        ]
      }
    },
    {
      id: "p6",
      slug: "eduscan",
      title: "EduScan",
      year: "2026 — Present",
      category: "AI / Capstone",
      role: "Lead Full-Stack & ML Developer",
      result: "Developing an AI facial recognition attendance & automated DepEd grading system for San Jose National High School.",
      stack: ["Python", "FastAPI / OpenCV", "Face Recognition", "React 18", "SQLAlchemy", "OpenPyXL", "Vite"],
      repoUrl: "https://github.com/Shizukesasss/EduScan",
      liveUrl: "https://github.com/Shizukesasss/EduScan",
      image: "/images/projects/eduscan/eduscan-overview.png",
      imageAlt: "EduScan – Facial Recognition Attendance & DepEd Grading System",
      cover: "/images/projects/eduscan/eduscan-overview.png",
      hero: "/images/projects/eduscan/eduscan-overview.png",
      screens: [
        "/images/projects/eduscan/eduscan-overview.png",
        "/images/projects/eduscan/eduscan-attendance.png"
      ],
      details: [
        "/images/projects/eduscan/eduscan-attendance.png",
        "/images/projects/eduscan/eduscan-overview.png"
      ],
      caseStudy: {
        overview: "EduScan is an automated web-based facial recognition attendance and grading report generation system built as an active Capstone Project for San Jose National High School. The system replaces manual roll call with real-time biometric face detection and instantly compiles official DepEd reports (School Form 2 - SF2 and quarterly gradebooks including MAPEH components).",
        challenge: "Teachers lose significant instructional time daily manually marking attendance and compiling complex DepEd Excel grade sheets at quarter-end. The technical hurdle was creating a reliable computer vision pipeline capable of detecting faces in varied lighting conditions while programmatically formatting complex, multi-tab DepEd Excel templates.",
        outcome: "Engineered a Python and OpenCV biometric detection backend paired with an openpyxl template generator and a modern React web interface. Successfully automates student attendance logging and generates 100% compliant DepEd gradebook exports in seconds.",
        timeline: "Active Capstone Project — 2026 → Present",
        gallery: [
          "/images/projects/eduscan/eduscan-overview.png",
          "/images/projects/eduscan/eduscan-attendance.png"
        ]
      }
    }
  ],

  certificates: [
    {
      id: "cert-google-ux",
      title: "Google UX Design Professional Certificate",
      issuer: "Google Career Certificates",
      platform: "Coursera",
      date: "October 17, 2026",
      credentialId: "R1AJO8E3UXVD",
      verifyUrl: "https://coursera.org/verify/professional-cert/R1AJO8E3UXVD",
      shareUrl: "https://coursera.org/share/3620cb31ec9b6ccdf97fd4af3fba4503",
      image: "/images/certificates/google-ux-design-professional-certificate.jpeg",
      badge: "Professional Certificate",
      highlight: "8-Course Specialization",
      description: "Earned the complete Google UX Design Professional Certificate covering the end-to-end design lifecycle: empathizing with users, user personas, wireframing, low/high-fidelity interactive prototyping in Figma, responsive web design in Adobe XD, usability studies, and social good design.",
      skills: ["UX Design", "Figma", "Adobe XD", "Wireframing", "User Research", "Usability Testing", "Design Systems", "Prototyping"],
      courses: [
        {
          name: "Foundations of User Experience (UX) Design",
          slug: "foundations-user-experience-design",
          shareUrl: "https://coursera.org/share/c4e788a2e22761ab85228e7e12a705ec",
          thumbnail: "/images/certificates/courses/foundations-user-experience-design.png",
          description: "Foundational UX principles, user-centered design frameworks, equity-focused design, and UX design careers."
        },
        {
          name: "Start the UX Design Process: Empathize, Define, and Ideate",
          slug: "wireframes-low-fidelity-prototypes",
          shareUrl: "https://coursera.org/share/1035f828d5c414d0cd99b80b2c1b3233",
          thumbnail: "/images/certificates/courses/wireframes-low-fidelity-prototypes.png",
          description: "Empathy maps, user personas, user stories, user journey maps, competitive audits, and low-fidelity prototypes in Figma."
        },
        {
          name: "Conduct UX Research and Test Early Concepts",
          slug: "conduct-ux-research",
          shareUrl: "https://coursera.org/share/0b853589952fa26288bdaa1e9b19267e",
          thumbnail: "/images/certificates/courses/conduct-ux-research.png",
          description: "Planning and conducting usability studies, gathering feedback, affinity diagrams, and synthesizing research insights into design improvements."
        },
        {
          name: "Create High-Fidelity Designs and Prototypes in Figma",
          slug: "high-fidelity-designs-prototype",
          shareUrl: "https://coursera.org/share/f285b6e22572284cfb9cf58ea2e47aec",
          thumbnail: "/images/certificates/courses/high-fidelity-designs-prototype.png",
          description: "Visual design principles, interactive mockups, design systems, design tokens, responsive typography, and design handoff to engineers."
        },
        {
          name: "Build Dynamic User Interfaces (UI) for Websites",
          slug: "responsive-web-design-adobe-xd",
          shareUrl: "https://coursera.org/share/d05ab7efaed79f3434772902edde6353",
          thumbnail: "/images/certificates/courses/responsive-web-design-adobe-xd.png",
          description: "Designing responsive website layouts, sitemaps, responsive breakpoints, cross-device accessibility, and UI best practices."
        },
        {
          name: "Design a User Experience for Social Good & Prepare for Jobs",
          slug: "ux-design-jobs",
          shareUrl: "https://coursera.org/share/c012e2ef52ce3130bf2372d2d3901b20",
          thumbnail: "/images/certificates/courses/ux-design-jobs.png",
          description: "End-to-end design of dedicated mobile apps and responsive sites for social good, design critique, and UX portfolio preparation."
        },
        {
          name: "Accelerate Your Job Search with AI",
          slug: "accelerate-your-job-search-with-ai",
          shareUrl: "https://coursera.org/share/03e7cbd709e23254eb47f90b9c88ea5a",
          thumbnail: "/images/certificates/courses/accelerate-your-job-search-with-ai.png",
          description: "Leveraging generative AI to tailor portfolios, optimize technical resumes, prepare for design critiques, and accelerate career outreach."
        }
      ]
    },
    {
      id: "cert-google-ai",
      title: "Google AI Professional Certificate",
      issuer: "Google Career Certificates",
      platform: "Coursera",
      date: "October 14, 2026",
      credentialId: "GUFMKEAFU28M",
      verifyUrl: "https://coursera.org/verify/professional-cert/GUFMKEAFU28M",
      shareUrl: "https://coursera.org/share/a3a3dbac92d8ced140c0dcfdffe11d3d",
      image: "/images/certificates/google-ai-professional-certificate.jpeg",
      badge: "Professional Certificate",
      highlight: "7-Course Specialization",
      description: "Fluent in practical AI workflows across 7 courses: advanced prompt engineering, brainstorming, deep research with Gemini, communication synthesis, generative media creation, data analysis, and vibe coding custom applications.",
      skills: ["Generative AI", "Gemini", "Prompt Engineering", "Vibe Coding", "Data Analysis", "NotebookLM", "AI App Building"],
      courses: [
        {
          name: "AI Fundamentals",
          slug: "google-ai-fundamentals",
          shareUrl: "https://coursera.org/share/dae1e5e75daddf6fca27487e61e92a06",
          thumbnail: "/images/certificates/courses/google-ai-fundamentals.png",
          description: "Strengths and limitations of generative AI, prompt crafting, human-in-the-loop workflows, and responsible AI implementation."
        },
        {
          name: "AI for Brainstorming and Planning",
          slug: "google-ai-for-brainstorming-and-planning",
          shareUrl: "https://coursera.org/share/7428eb07c6ba7f95ccc1e11b629b860d",
          thumbnail: "/images/certificates/courses/google-ai-for-brainstorming-and-planning.png",
          description: "Rapid ideation frameworks, turning abstract concepts into actionable work breakdowns, and stress-testing dependencies with Gemini."
        },
        {
          name: "AI for Research and Insights",
          slug: "google-ai-for-research-and-insights",
          shareUrl: "https://coursera.org/share/ba8b57293d8db11820f83bc9e5014f99",
          thumbnail: "/images/certificates/courses/google-ai-for-research-and-insights.png",
          description: "Synthesizing multi-source documentation, NotebookLM workflows, expert persona meta-prompting, and accelerated research pipelines."
        },
        {
          name: "AI for Writing and Communicating",
          slug: "google-ai-for-writing-and-communicating",
          shareUrl: "https://coursera.org/share/9b4f1b2275a659faefe2c1b584b592df",
          thumbnail: "/images/certificates/courses/google-ai-for-writing-and-communicating.png",
          description: "Transforming transcripts into executive briefs, multi-stakeholder messaging tone adaptation, and clarity enhancement."
        },
        {
          name: "AI for Content Creation",
          slug: "google-ai-for-content-creation",
          shareUrl: "https://coursera.org/share/08253bf833aed9cf14a52f77f8e2e72f",
          thumbnail: "/images/certificates/courses/google-ai-for-content-creation.png",
          description: "Generating visual assets, building presentations with Google Slides AI, establishing design consistency, and creative directing with AI."
        },
        {
          name: "AI for Data Analysis",
          slug: "google-ai-for-data-analysis",
          shareUrl: "https://coursera.org/share/f2d8e20d187fec95eae95e72598df254",
          thumbnail: "/images/certificates/courses/google-ai-for-data-analysis.png",
          description: "Natural language spreadsheet formulas, automated data cleansing, trend extraction, and building visual data dashboards in Google Sheets."
        },
        {
          name: "AI for App Building",
          slug: "google-ai-for-app-building",
          shareUrl: "https://coursera.org/share/26ce74a792f744202e6025b39c804fc6",
          thumbnail: "/images/certificates/courses/google-ai-for-app-building.png",
          description: "Vibe coding applications using natural language, full-stack workflow integration, avoiding common pitfalls, and deploying practical tools."
        }
      ]
    },
    {
      id: "cert-google-bi",
      title: "Foundations of Business Intelligence",
      issuer: "Google Career Certificates",
      platform: "Coursera",
      date: "October 2026",
      shareUrl: "https://coursera.org/share/cfe1eb39419bf600bcfece99a0b23c19",
      thumbnail: "/images/certificates/courses/foundations-of-business-intelligence.png",
      badge: "Google Course",
      highlight: "BI Architecture & Analytics",
      description: "First core component of the Google Business Intelligence Certificate: exploring BI professional roles, data modeling, data pipelines, ETL concepts, and designing executive dashboard metrics to empower decision-making.",
      skills: ["Business Intelligence", "Data Modeling", "Data Pipelines", "KPIs & Metrics", "Dashboard Design", "Data Strategy"]
    }
  ]
};

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
  ]
};

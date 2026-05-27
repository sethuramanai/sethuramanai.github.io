// data.js — All content for Sethuraman M's personal site
// Edit this file to update any text, links, or details on the site.

const DATA = {

  profile: {
    name: "Sethuraman M",
    tagline: "MBA Graduate · Software Engineering Lead · AI & Automation Strategist",
    headline: "14+ Years in Tech Leadership",
    bio: "Technology leader with 14+ years driving enterprise software engineering, automation strategy, and digital transformation. MBA graduate from the University of Hartford with expertise in AI-enabled automation, quality engineering, and Agile transformation — bridging technical execution with business strategy.",
    // Absolute or relative URL to a finished PDF (e.g. Sethuraman_M_CV.pdf). Leave blank to auto-generate from DATA below.
    cvPdfUrl: "",
    cvFileName: "Sethuraman_M_CV.pdf",
    awardsLink: "#certifications",
    contactLink: "#contact",
    speakerLink: "#experience",
  },

  nav: [
    { label: "About",          href: "#about" },
    { label: "Experience",     href: "#experience" },
    { label: "Skills",         href: "#skills" },
    { label: "Projects",       href: "#projects" },
    { label: "Education",      href: "#education" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact",        href: "#contact" },
  ],

  experience: [
    {
      title: "Software Engineering Lead Analyst",
      company: "Cigna Healthcare",
      duration: "Jan 2023-Current",
      bullets: [
        "Architected scalable automation frameworks using Python & Robot Framework, reducing manual testing effort by 30–50%",
        "Integrated automated testing into CI/CD pipelines, accelerating release cycles by 20–30%",
        "Implemented API automation strategies, improving integration reliability and reducing production defects",
        "Led Agile transformation initiatives, improving sprint predictability and team productivity",
        "Mentored cross-functional teams on automation best practices, increasing adoption across projects",
        "Presented at Cigna Technology Conference 2023 on Microservices Architecture",
        "Blogged on internal platforms about AI market trends and enterprise adoption",
        "Contributed to the AI Clinical Innovation Team on the Healthcare OS platform — delivering Voice Agents, a Pipeline Dashboard, Flu Vaccine Reminder, and ED Discharge Follow-up Agent; tested guardrails using Eval frameworks and set up & configured Jira from scratch for the team",
      ],
    },

    
    {
     title: "Software Engineer / Quality Engineering Specialist",
      company: "Tata Consultancy Services (TCS)",
      duration: "Jun 2021-Jan 2023",
      bullets: [
        "Built foundational automation frameworks supporting enterprise applications",
        "Supported enterprise QA and full SDLC delivery",
        "Collaborated with cross-functional teams to enhance QA processes and standards",
      ],
    },
    {
       title: "Test Automation Lead",
      company: "Cognizant Technology Solutions (CTS)",
      duration: "Dec 2014- Jun 2021",
      bullets: [
        "Delivered automation solutions for large enterprise clients",
        "Led API testing initiatives and improved regression efficiency",
        "Supported continuous improvement in software quality engineering practices",
      
      ],
    },
  ],

  skills: [
    {
      category: "⚙️ Automation & Engineering",
      items: ["Python", "Robot Framework", "API Testing", "Test Automation", "Quality Engineering", "Test Strategy"],
    },
    {
      category: "🔧 DevOps & Tools",
      items: ["Jenkins", "GitHub Actions", "CI/CD Pipelines", "Git", "REST APIs", "Microservices"],
    },
    {
      category: "🚀 Leadership & Strategy",
      items: ["Agile Delivery", "Digital Transformation", "Process Optimization", "AI Adoption", "Team Mentoring"],
    },
    {
      category: "🤖 AI & Research",
      items: ["AI-Driven Automation", "Intelligent QE", "Enterprise AI", "Innovation Strategy"],
    },
  ],

  projects: [
    {
      icon: "🧪",
      title: "Enterprise Test Automation Framework",
      description: "Designed and implemented a scalable automation framework at Cigna Healthcare using Python & Robot Framework, cutting manual testing by up to 50% across high-availability systems.",
      tags: ["Python", "Robot Framework", "CI/CD"],
    },
    {
      icon: "🔗",
      title: "API Automation Strategy",
      description: "Built end-to-end API automation strategies that improved integration reliability, reduced production defects, and enabled faster, more dependable release cycles.",
      tags: ["REST APIs", "Jenkins", "GitHub Actions"],
    },
    {
      icon: "⚡",
      title: "CI/CD Pipeline Integration",
      description: "Integrated automated testing into modern CI/CD pipelines, accelerating software delivery by 20–30% while maintaining high engineering quality standards.",
      tags: ["Jenkins", "Git", "DevOps"],
    },
    {
      icon: "🔄",
      title: "Agile Transformation Initiative",
      description: "Led organization-wide Agile adoption programs, improving sprint predictability and engineering team productivity across cross-functional units at Cigna.",
      tags: ["Agile", "Leadership", "Process Optimization"],
    },
    {
      icon: "🤖",
      title: "AI in Enterprise Automation",
      description: "Explored and applied emerging AI concepts to enterprise automation strategy as part of MBA research, contributing to internal knowledge platforms and technology conference presentations.",
      tags: ["AI Strategy", "Research", "Thought Leadership"],
    },
  ],

  education: [
    {
      degree: "Master of Business Administration (MBA)",
      institution: "University of Hartford — Barney School of Business",
      duration: "2023 – 2025",
      details: [
        "Focus: Strategy, Innovation & Digital Transformation",
        "Emphasis on aligning technology leadership with business strategy.",
        "Matriculated: August 2023",
      ],
      gpa: "GPA: 3.8 / 4.0",
    },
    {
      degree: "Bachelor of Technology (B.Tech) – Information Technology",
      institution: "India",
      duration: "",
      details: [
        "Foundation in software engineering, systems design, and information technology principles underpinning 14+ years of enterprise delivery.",
      ],
      gpa: "",
    },
  ],

  certifications: [
    { icon: "🏆", title: "Regents' Honor Award Nominee 2026",       org: "University of Hartford" },
    { icon: "🎤", title: "Tech Conference Speaker 2023",             org: "Cigna Technology Conference – Microservices Architecture" },
    { icon: "🤖", title: "AI & Automation Thought Leader",           org: "Internal Knowledge Platform – Cigna Healthcare" },
    { icon: "📜", title: "Agile & DevOps Practitioner",              org: "Enterprise Practice – CTS, TCS, Cigna" },
    { icon: "🧠", title: "Certified GenAI Technologist",             org: "Cigna Healthcare" },
    { icon: "🌟", title: "Aspiring Leader Program – Completed",      org: "Cigna Healthcare" },
  ],

  anthropicCertifications: [
    {
      icon: "🎓",
      title: "Claude Code in Action",
      org: "Anthropic Academy · Anthropic Education",
      date: "May 17, 2026",
      status: "completed",
      verifyUrl: "https://verify.skilljar.com/c/crxs29nbpmwp",
    },
    {
      icon: "🎓",
      title: "Claude Code 101",
      org: "Anthropic Academy · Anthropic Education",
      date: "May 14, 2026",
      status: "completed",
      verifyUrl: "https://verify.skilljar.com/c/ne4ahr3824m6",
    },
    {
      icon: "🎓",
      title: "Introduction to subagents",
      org: "Anthropic Academy · Anthropic Education",
      date: "May 14, 2026",
      status: "completed",
      verifyUrl: "https://verify.skilljar.com/c/9hvtr46ay768",
    },
    {
      icon: "🎓",
      title: "AI Capabilities and Limitations",
      org: "Anthropic Academy · Anthropic Education",
      date: "May 9, 2026",
      status: "completed",
      verifyUrl: "https://verify.skilljar.com/c/b7z3f5uzcuc7",
    },
    {
      icon: "🎓",
      title: "Claude 101",
      org: "Anthropic Academy · Anthropic Education",
      date: "May 9, 2026",
      status: "completed",
      verifyUrl: "https://verify.skilljar.com/c/ex8g293fj4nk",
    },
    {
      icon: "🎓",
      title: "AI Fluency: Framework & Foundations",
      org: "Anthropic Academy · Anthropic Education",
      date: "April 12, 2026",
      status: "completed",
      note: "Score: 10 / 10",
      verifyUrl: "https://verify.skilljar.com/c/qbhrniqgy387",
    },
    {
      icon: "🎓",
      title: "Building with the Claude API",
      org: "Anthropic Academy · Anthropic Education",
	  date: "May 26, 2026",
      status: "completed",
      verifyUrl: "https://verify.skilljar.com/c/gmp2hgm2j39u",
    },
	   {
      icon: "🎓",
      title: "Introduction to Claude Cowork",
      org: "Anthropic Academy · Anthropic Education",
	  date: "May 21, 2026",
      status: "completed",
      verifyUrl: "https://verify.skilljar.com/c/o9y96ntek2sr",
    },
		   {
      icon: "🎓",
      title: "Introduction to Model Context Protocol",
      org: "Anthropic Academy · Anthropic Education",
	  date: "May 22, 2026",
      status: "completed",
      verifyUrl: "https://verify.skilljar.com/c/scu7ui3s5jgf",
    },
		   {
      icon: "🎓",
      title: "Introduction to agent skills",
      org: "Anthropic Academy · Anthropic Education",
	  date: "May 20, 2026",		   
      status: "completed",
      verifyUrl: "https://verify.skilljar.com/c/taoqz8cfuocv",
    },
  ],

  contact: {
    email: "sethuraman.m@cignahealthcare.com",
    mobile: "+91-9659856263",
    location: "Tamil Nadu, India",
    linkedin: "linkedin.com/in/sethu90",
    linkedinHref: "https://linkedin.com/in/sethu90",
    openTo: "Leadership & AI Strategy Roles",
  },

  site: {
    githubRepo: "https://github.com/sethuramanai/sethuramanai.github.io/tree/master",
    githubLabel: "View Source",
  },

  footer: {
    name: "Sethuraman M",
    roles: "MBA | Software Engineering Lead | AI & Automation Strategist",
    year: "2026",
  },

};

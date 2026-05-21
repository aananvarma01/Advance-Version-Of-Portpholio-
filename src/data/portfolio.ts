import { PortfolioData } from "../types";

export const initialData: PortfolioData = {
  hero: {
    name: "Alex Rivera",
    tagline: "Engineering with intent. Built to scale.",
    description: "Computer Science student specializing in resilient distributed systems, modern web architecture, and user-centric design systems."
  },
  about: {
    title: "Curiosity-driven engineering and design.",
    content: "I am a senior Computer Science student passionate about building highly optimized modern systems. By combining standard academic foundations with active open-source contributions and real-world internship experiences, I aim to create robust experiences that feel invisible and empower users."
  },
  circle: {
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
    initials: "AR"
  },
  education: [
    {
      id: "e1",
      institution: "University of California, Berkeley",
      degree: "B.S. in Computer Science",
      duration: "2022 – Present (Expected 2026)",
      gpa: "3.91 / 4.00",
      courses: ["Distributed Systems", "Database Systems", "Software Engineering", "Algorithms", "User Interface Design"]
    }
  ],
  certifications: [
    {
      id: "c1",
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "2024",
      credentialUrl: "https://aws.amazon.com"
    },
    {
      id: "c2",
      name: "Google Associate Cloud Engineer",
      issuer: "Google Cloud",
      date: "2024",
      credentialUrl: "https://cloud.google.com"
    }
  ],
  skills: [
    { name: "React / Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Languages" },
    { name: "Node.js & Go", category: "Backend" },
    { name: "Redis & PGSQL", category: "Databases" },
    { name: "Docker", category: "DevOps" },
    { name: "GraphQL", category: "APIs" },
    { name: "Tailwind CSS", category: "Design" },
    { name: "Motion", category: "Animation" }
  ],
  projects: [
    {
      id: "1",
      title: "Vortex Distributed Database",
      description: "A lightweight, reliable key-value store with Raft consensus protocol written in Go.",
      image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=2070&auto=format&fit=crop",
      tags: ["Go", "Raft Consensus", "Docker"],
      links: {
        github: "https://github.com",
        live: "https://demo.com"
      }
    },
    {
      id: "2",
      title: "Lumina Design Engine",
      description: "A visual sandbox and design token compiler that translates visual guidelines into theme libraries.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      tags: ["Next.js", "AST Parser", "Tailwind"],
      links: {
        github: "https://github.com",
        live: "https://demo.com"
      }
    },
    {
      id: "3",
      title: "Zenith Spatial Scheduler",
      description: "An interactive, visually mapped timeline planner built with customized vector physics and canvas systems.",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop",
      tags: ["D3.js", "TypeScript", "Motion"],
      links: {
        github: "https://github.com",
        live: "https://demo.com"
      }
    }
  ],
  achievements: [
    {
      id: "a1",
      title: "Software Engineering Intern",
      organization: "Vanguard Systems Corp",
      date: "Summer 2025",
      description: "Optimized server-side pagination layouts and migrated legacy state libraries to unified server state models, boosting responsiveness by 40%."
    },
    {
      id: "a2",
      title: "First Place Winner",
      organization: "CalHacks 11.0",
      date: "2024",
      description: "Engineered a distributed collaborative canvas utilizing serverless event brokers and standard lock-free resolution strategies alongside 3 peers."
    }
  ],
  social: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
    email: "alex@rivera.design"
  }
};


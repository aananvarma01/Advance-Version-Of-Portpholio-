export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    github: string;
    live: string;
  };
}

export interface Skill {
  name: string;
  category: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  gpa?: string;
  courses?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  twitter?: string;
  email: string;
}

export interface CircleConfig {
  avatarUrl: string;
  initials: string;
}

export interface PortfolioData {
  hero: {
    name: string;
    tagline: string;
    description: string;
  };
  about: {
    title: string;
    content: string;
  };
  circle?: CircleConfig;
  education: Education[];
  certifications: Certification[];
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  social: SocialLinks;
}


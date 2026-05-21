import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { SocialLinks } from "../types";

interface FooterProps {
  social: SocialLinks;
}

export default function Footer({ social }: FooterProps) {
  return (
    <footer id="contact" className="py-24 px-6 bg-white dark:bg-[#0a0a0a] text-center border-t border-apple-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <span className="text-apple-blue font-bold tracking-[0.2em] uppercase text-[12px] mb-8 block">Project Inquiry</span>
        <h2 className="text-4xl md:text-7xl font-display font-bold mb-16 text-apple-text dark:text-white tracking-tighter leading-[0.9]">
          Let&apos;s create something<br /><span className="text-apple-secondary font-light">truly exceptional.</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-12 mb-24">
          <a href={social.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-apple-secondary hover:text-apple-blue transition-colors">
            <Github className="w-4 h-4" /> Github
          </a>
          <a href={social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-apple-secondary hover:text-apple-blue transition-colors">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          {social.twitter && (
            <a href={social.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-apple-secondary hover:text-apple-blue transition-colors">
              <Twitter className="w-4 h-4" /> X.com
            </a>
          )}
          <a href={`mailto:${social.email}`} className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-apple-secondary hover:text-apple-blue transition-colors">
            <Mail className="w-4 h-4" /> E-mail
          </a>
        </div>

        <div className="pt-12 border-t border-apple-border flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-apple-secondary flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Currently accepting project leads
          </div>
          
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            © {new Date().getFullYear()} STUDIO LUMINA. CREATED WITH INTENT.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ThemeToggle from "./ThemeToggle";
import { CircleConfig } from "../types";

interface NavbarProps {
  onEditToggle: () => void;
  isEditMode: boolean;
  circle?: CircleConfig;
}

export default function Navbar({ onEditToggle, isEditMode, circle }: NavbarProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [0, 1]);
  const [isFlipped, setIsFlipped] = useState(false);

  const avatarUrl = circle?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop";
  const initials = circle?.initials || "AR";

  const navItems = [
    { name: "Work", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Certs", href: "#certifications" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center h-14 transition-all">
      <motion.div 
        style={{ opacity }}
        className="glass absolute inset-0 -z-10" 
      />
      
      <div className="max-w-7xl w-full px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="w-9 h-9 cursor-pointer relative" 
            style={{ perspective: 1000 }}
            onClick={() => setIsFlipped(!isFlipped)}
            title="Click to flip profile"
          >
            <motion.div
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Front side (Initials) */}
              <div 
                className="absolute inset-0 w-full h-full rounded-full bg-apple-bg dark:bg-gray-800 flex items-center justify-center font-display font-extrabold text-[11px] tracking-wider select-none border border-apple-border text-apple-text dark:text-gray-100 shadow-sm"
                style={{ backfaceVisibility: "hidden" }}
              >
                {initials}
              </div>

              {/* Back side (Photo) */}
              <div 
                className="absolute inset-0 w-full h-full rounded-full overflow-hidden border border-apple-border bg-apple-bg dark:bg-gray-800 shadow-sm"
                style={{ 
                  backfaceVisibility: "hidden", 
                  transform: "rotateY(180deg)" 
                }}
              >
                <img 
                  src={avatarUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
          <span className="font-bold text-sm tracking-tight text-apple-text dark:text-white hidden sm:inline-block">
            {initials}.
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[12px] font-bold uppercase tracking-wider text-apple-secondary hover:text-apple-text dark:hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={onEditToggle}
            className={`text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full font-bold transition-all ${
              isEditMode 
              ? "bg-apple-blue text-white dark:text-black" 
              : "bg-apple-bg text-apple-text hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {isEditMode ? "Exit" : "Edit"}
          </button>
        </div>
      </div>
    </nav>
  );
}

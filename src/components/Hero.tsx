import { motion } from "motion/react";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Education } from "../types";

interface HeroProps {
  name: string;
  tagline: string;
  description: string;
  education?: Education[];
}

export default function Hero({ name, tagline, description, education }: HeroProps) {
  const currentEdu = education && education.length > 0 ? education[0] : null;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 text-center bg-white dark:bg-black overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-5xl"
      >
        {currentEdu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-apple-bg dark:bg-gray-900 border border-apple-border/50 text-apple-blue font-bold uppercase text-[10px] tracking-wider rounded-full mb-6 shadow-sm"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apple-blue opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-apple-blue"></span>
            </span>
            <GraduationCap className="w-3.5 h-3.5" />
            Pursuing {currentEdu.degree} @ {currentEdu.institution.split(',')[0]}
          </motion.div>
        )}

        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-bold text-apple-secondary uppercase tracking-[0.2em] mb-6 block"
        >
          {name}
        </motion.span>
        
        <h1 className="text-[64px] md:text-[100px] font-display font-extrabold tracking-tighter leading-[0.92] mb-8 text-apple-text dark:text-white">
          {tagline.split('.')[0]}.<br/>
          {tagline.split('.')[1] && (
            <span className="text-apple-secondary dark:text-gray-500 font-bold">{tagline.split('.')[1].trim()}.</span>
          )}
        </h1>
        
        <p className="text-[20px] md:text-[24px] text-apple-secondary dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="px-10 py-4 bg-apple-blue text-white dark:text-black rounded-full font-semibold transition-all shadow-md hover:shadow-lg hover:opacity-95"
          >
            View Portfolio
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="px-10 py-4 bg-white dark:bg-gray-800 border border-apple-border rounded-full font-semibold hover:bg-apple-bg dark:hover:bg-gray-700 transition-all"
          >
            Get in touch
          </motion.a>
        </div>
      </motion.div>

      {/* Floating accent text */}
      <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.5em] text-gray-200 dark:text-gray-800 origin-bottom-right rotate-90 px-12 pb-4">
        Minimalism is Subtraction
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-gray-200 dark:from-gray-800 to-transparent" />
      </motion.div>
    </section>
  );
}

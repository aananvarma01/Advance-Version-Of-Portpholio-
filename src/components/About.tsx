import { motion } from "motion/react";

interface AboutProps {
  title: string;
  content: string;
}

export default function About({ title, content }: AboutProps) {
  return (
    <section id="about" className="py-24 md:py-40 px-6 bg-apple-bg dark:bg-[#0c0c0c] transition-colors border-y border-apple-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-start">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <span className="text-[12px] font-bold text-apple-blue uppercase tracking-[0.2em] mb-8 block">Legacy of Intent</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-[1] text-apple-text dark:text-white">
            {title}
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:w-1/2 pt-4"
        >
          <p className="text-xl md:text-2xl text-apple-secondary dark:text-gray-400 leading-relaxed font-light">
            {content}
          </p>
          <div className="mt-12 w-full h-[1px] bg-apple-border" />
        </motion.div>
      </div>
    </section>
  );
}

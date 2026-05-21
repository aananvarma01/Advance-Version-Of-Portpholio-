import { motion } from "motion/react";
import { Skill } from "../types";

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section id="skills" className="py-24 px-6 bg-white dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto">
        <header className="mb-14">
          <span className="text-apple-blue font-bold tracking-[0.2em] uppercase text-[12px] mb-4 block">Stack & Expertise</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-apple-text dark:text-white leading-[1.1]">
            Capabilities<span className="text-apple-secondary font-light">.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, idx) => {
            const isInverted = idx % 4 === 1;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04, duration: 0.5 }}
                className={`p-6 rounded-[1.5rem] flex flex-col justify-between border border-apple-border/30 transition-all shadow-sm ${
                  isInverted 
                    ? "bg-apple-text dark:bg-gray-950 text-white border-transparent" 
                    : "bg-apple-bg dark:bg-gray-900 text-apple-text dark:text-gray-100"
                }`}
              >
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block ${
                    isInverted ? "text-gray-400" : "text-apple-secondary dark:text-gray-400"
                  }`}>
                    {category}
                  </span>
                  
                  <div className="flex flex-wrap gap-2">
                    {skills.filter(s => s.category === category).map((skill) => (
                      <span 
                        key={skill.name} 
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg tracking-tight transition-colors ${
                          isInverted 
                            ? "bg-white/10 hover:bg-white/15 text-white border border-white/5" 
                            : "bg-white dark:bg-black hover:bg-gray-50 text-apple-text dark:text-gray-300 border border-apple-border/60"
                        }`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-apple-border/10 flex items-center justify-between">
                  <span className={`text-[8px] font-bold uppercase tracking-wider ${
                    isInverted ? "text-gray-500" : "text-gray-400"
                  }`}>
                    Academic/Applied
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

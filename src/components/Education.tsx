import { motion } from "motion/react";
import { Education as EducationType } from "../types";
import { GraduationCap, Award, BookOpen } from "lucide-react";

interface EducationProps {
  education: EducationType[];
}

export default function Education({ education }: EducationProps) {
  return (
    <section id="education" className="py-24 md:py-32 px-6 bg-apple-bg dark:bg-[#0c0c0c] border-y border-apple-border transition-colors">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <span className="text-apple-blue font-bold tracking-[0.2em] uppercase text-[12px] mb-4 block">Academic Foundation</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-apple-text dark:text-white leading-[0.9]">
            Education<span className="text-apple-secondary font-light">.</span>
          </h2>
        </header>

        <div className="space-y-10">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="editorial-card relative bg-white dark:bg-gray-900 border border-apple-border rounded-[2.5rem] p-8 md:p-12 overflow-hidden flex flex-col md:flex-row justify-between gap-10"
            >
              <div className="flex-1 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-apple-bg dark:bg-gray-800 rounded-2xl text-apple-blue">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-apple-secondary">
                        {edu.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black/5 dark:bg-white/10 text-apple-text dark:text-gray-300 text-[9px] font-bold rounded-full uppercase tracking-wider border border-apple-border">
                        <span className="w-1.5 h-1.5 bg-apple-blue rounded-full animate-pulse" />
                        Currently Pursuing
                      </span>
                    </div>
                    <h3 className="text-3xl font-display font-extrabold tracking-tight text-apple-text dark:text-white">
                      {edu.institution}
                    </h3>
                    <p className="text-lg text-apple-secondary dark:text-gray-400 font-medium mt-1">
                      {edu.degree}
                    </p>
                  </div>
                </div>

                {edu.courses && edu.courses.length > 0 && (
                  <div className="pt-6 border-t border-apple-border/50">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#86868B] mb-3 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Key Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className="px-3.5 py-1.5 bg-apple-bg dark:bg-gray-800 text-apple-text dark:text-gray-300 text-xs font-semibold rounded-full border border-apple-border/40"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {edu.gpa && (
                <div className="flex flex-col justify-center items-start md:items-end min-w-[200px] gap-2 pt-6 md:pt-0 md:border-l border-apple-border/50 md:pl-12">
                  <div className="flex items-center gap-1.5 text-apple-blue font-bold text-xs uppercase tracking-widest">
                    <Award className="w-4 h-4" /> Academic Standing
                  </div>
                  <div className="text-5xl font-extrabold tracking-tighter text-apple-text dark:text-white">
                    {edu.gpa.split('/')[0].trim()}
                  </div>
                  <div className="text-xs font-bold text-[#86868B] uppercase tracking-wider">
                    Cumulative GPA (scale {edu.gpa.split('/')[1]?.trim() || "4.0"})
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

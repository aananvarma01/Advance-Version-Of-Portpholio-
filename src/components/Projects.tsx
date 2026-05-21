import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "../types";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-32 px-6 bg-apple-bg dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <span className="text-apple-blue font-bold tracking-[0.2em] uppercase text-[12px] mb-4 block">Selected Archive</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-apple-text dark:text-white leading-[0.9]">Featured Work<span className="text-apple-secondary font-light">.</span></h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="editorial-card group"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white dark:bg-black mb-8 border border-apple-border/50">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                />
                
                <div className="absolute top-6 left-6 flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-apple-text dark:text-white shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[11px] font-bold text-apple-blue uppercase tracking-widest mb-2 block">Case Study</span>
                  <h3 className="text-3xl font-display font-bold mb-3 tracking-tight group-hover:text-apple-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-lg text-apple-secondary dark:text-gray-400 max-w-sm font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <a 
                    href={project.links.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-4 bg-apple-bg dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Github className="w-5 h-5 text-apple-secondary" />
                  </a>
                  <a 
                    href={project.links.live} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-4 bg-apple-blue text-white dark:text-black rounded-full hover:shadow-lg hover:opacity-90 transition-all"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

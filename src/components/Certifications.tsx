import { motion } from "motion/react";
import { Certification } from "../types";
import { Medal, ExternalLink } from "lucide-react";

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 md:py-32 px-6 bg-white dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <span className="text-apple-blue font-bold tracking-[0.2em] uppercase text-[12px] mb-4 block">Proven Competencies</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-apple-text dark:text-white leading-[0.9]">
            Certifications<span className="text-apple-secondary font-light">.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="editorial-card p-8 bg-apple-bg dark:bg-gray-900 border border-apple-border rounded-[2rem] flex flex-col justify-between group h-full"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white dark:bg-black border border-apple-border/50 rounded-2xl text-apple-blue group-hover:scale-105 transition-transform">
                    <Medal className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider">
                    Issued {cert.date}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold tracking-tight text-apple-text dark:text-white">
                    {cert.name}
                  </h3>
                  <p className="text-apple-secondary dark:text-gray-400 font-medium text-sm">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              {cert.credentialUrl && (
                <div className="mt-8 pt-4 border-t border-apple-border/50 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    Verified Credential ID
                  </span>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-apple-blue hover:underline"
                  >
                    Verify Credential <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

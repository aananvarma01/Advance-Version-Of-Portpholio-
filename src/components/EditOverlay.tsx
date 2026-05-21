import { motion, AnimatePresence } from "motion/react";
import { 
  X, Save, RotateCcw, Plus, Trash2, 
  FileText, Briefcase, Sparkles, FolderKanban, 
  Share2, FileJson, GraduationCap, Medal, User
} from "lucide-react";
import { useState, useEffect } from "react";
import { PortfolioData, Project, Skill, Achievement, Education, Certification } from "../types";

interface EditOverlayProps {
  data: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
}

type TabType = "general" | "circle" | "education" | "projects" | "skills" | "certifications" | "social" | "json";

export default function EditOverlay({ data, isOpen, onClose, onSave, onReset }: EditOverlayProps) {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Sync state with incoming updates
  useEffect(() => {
    setFormData(data);
    setJsonText(JSON.stringify(data, null, 2));
  }, [data]);

  // Sync JSON text when formData changes
  const updateFormData = (updater: (prev: PortfolioData) => PortfolioData) => {
    const updated = updater(formData);
    setFormData(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    setError(null);
  };

  // Sync JSON field changes back to form state dynamically
  const handleJsonChange = (val: string) => {
    setJsonText(val);
    try {
      const parsed = JSON.parse(val);
      setFormData(parsed);
      setError(null);
    } catch (e) {
      setError("Syntax Error in JSON format. Fix errors or use visual editor.");
    }
  };

  const handleSaveAll = () => {
    try {
      const parsed = JSON.parse(jsonText);
      onSave(parsed);
      setError(null);
      onClose();
    } catch (err) {
      setError("Please fix syntax errors before pushing live.");
    }
  };

  // Helpers to manipulate education
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "State University",
      degree: "B.S. in Computer Science",
      duration: "2023 – Present",
      gpa: "3.80 / 4.00",
      courses: ["Data Structures", "Algorithms"]
    };
    updateFormData(prev => ({
      ...prev,
      education: [...(prev.education || []), newEdu]
    }));
  };

  const updateEducationField = (index: number, key: keyof Education, val: any) => {
    updateFormData(prev => {
      const copy = [...(prev.education || [])];
      copy[index] = { ...copy[index], [key]: val };
      return { ...prev, education: copy };
    });
  };

  const deleteEducation = (index: number) => {
    updateFormData(prev => ({
      ...prev,
      education: (prev.education || []).filter((_, i) => i !== index)
    }));
  };

  // Helpers to manipulate certifications
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: "Cloud Architect Associate",
      issuer: "AWS",
      date: "2024",
      credentialUrl: "https://aws.amazon.com"
    };
    updateFormData(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert]
    }));
  };

  const updateCertificationField = (index: number, key: keyof Certification, val: any) => {
    updateFormData(prev => {
      const copy = [...(prev.certifications || [])];
      copy[index] = { ...copy[index], [key]: val };
      return { ...prev, certifications: copy };
    });
  };

  const deleteCertification = (index: number) => {
    updateFormData(prev => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, i) => i !== index)
    }));
  };

  // Helpers to manipulate projects
  const addProject = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      title: "New Product Concept",
      description: "An elegant, design-first digital solution solving user needs beautifully.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
      tags: ["React", "Motion"],
      links: { github: "https://github.com", live: "https://demo.com" }
    };
    updateFormData(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
  };

  const updateProjectField = (index: number, key: keyof Project, val: any) => {
    updateFormData(prev => {
      const copy = [...prev.projects];
      copy[index] = { ...copy[index], [key]: val };
      return { ...prev, projects: copy };
    });
  };

  const updateProjectLinks = (index: number, linkKey: "github" | "live", val: string) => {
    updateFormData(prev => {
      const copy = [...prev.projects];
      copy[index] = { 
        ...copy[index], 
        links: { ...copy[index].links, [linkKey]: val } 
      };
      return { ...prev, projects: copy };
    });
  };

  const deleteProject = (index: number) => {
    updateFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  // Helpers for skills
  const addSkill = () => {
    const newSkill: Skill = { name: "Design System", category: "Design" };
    updateFormData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (index: number, key: keyof Skill, val: string) => {
    updateFormData(prev => {
      const copy = [...prev.skills];
      copy[index] = { ...copy[index], [key]: val };
      return { ...prev, skills: copy };
    });
  };

  const deleteSkill = (index: number) => {
    updateFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };



  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: "general", label: "Identity", icon: FileText },
    { id: "circle", label: "Circle", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "skills", label: "Skills", icon: Sparkles },
    { id: "certifications", label: "Certs", icon: Medal },
    { id: "social", label: "Social", icon: Share2 },
    { id: "json", label: "Developer", icon: FileJson },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white dark:bg-[#0c0c0c] text-[#1D1D1F] dark:text-gray-200 z-[70] p-6 md:p-8 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-display font-bold tracking-tight">Studio Editor</h2>
                <p className="text-xs text-apple-secondary dark:text-gray-400 font-medium">Fine-tune copy, credentials, and links on-the-fly.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2.5 bg-gray-50 dark:bg-gray-900 border border-apple-border hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-apple-secondary hover:text-apple-text dark:hover:text-white" />
              </button>
            </div>

            {/* Apple Styled Segmented Control */}
            <div className="flex p-1 bg-apple-bg dark:bg-gray-900 border border-apple-border rounded-xl gap-0.5 overflow-x-auto scroller-none mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 px-2 py-2 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all flex-1 justify-center ${
                      active 
                        ? "bg-white dark:bg-gray-800 text-apple-blue dark:text-white shadow-sm" 
                        : "text-apple-secondary hover:text-apple-text dark:hover:text-gray-300"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Body Contents scrollable area */}
            <div className="flex-1 min-h-0 overflow-y-auto pr-1 mb-6 space-y-6">
              {activeTab === "general" && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-apple-secondary uppercase tracking-widest pl-1">Name</label>
                    <input
                      type="text"
                      value={formData.hero.name}
                      onChange={(e) => updateFormData(prev => ({
                        ...prev,
                        hero: { ...prev.hero, name: e.target.value }
                      }))}
                      className="w-full p-3.5 rounded-xl border border-apple-border bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:border-apple-blue font-medium transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-apple-secondary uppercase tracking-widest pl-1">Hero Tagline</label>
                    <input
                      type="text"
                      value={formData.hero.tagline}
                      onChange={(e) => updateFormData(prev => ({
                        ...prev,
                        hero: { ...prev.hero, tagline: e.target.value }
                      }))}
                      className="w-full p-3.5 rounded-xl border border-apple-border bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:border-apple-blue font-medium transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-apple-secondary uppercase tracking-widest pl-1">Hero Description</label>
                    <textarea
                      rows={3}
                      value={formData.hero.description}
                      onChange={(e) => updateFormData(prev => ({
                        ...prev,
                        hero: { ...prev.hero, description: e.target.value }
                      }))}
                      className="w-full p-3.5 rounded-xl border border-apple-border bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:border-apple-blue font-medium transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-4 border-t border-apple-border space-y-6">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-apple-secondary uppercase tracking-widest pl-1">About Section Title</label>
                      <input
                        type="text"
                        value={formData.about.title}
                        onChange={(e) => updateFormData(prev => ({
                          ...prev,
                          about: { ...prev.about, title: e.target.value }
                        }))}
                        className="w-full p-3.5 rounded-xl border border-apple-border bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:border-apple-blue font-medium transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-apple-secondary uppercase tracking-widest pl-1">About Section Material</label>
                      <textarea
                        rows={4}
                        value={formData.about.content}
                        onChange={(e) => updateFormData(prev => ({
                          ...prev,
                          about: { ...prev.about, content: e.target.value }
                        }))}
                        className="w-full p-3.5 rounded-xl border border-apple-border bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:border-apple-blue font-medium transition-colors resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "circle" && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-apple-secondary uppercase tracking-widest pl-1">Circle Initials</label>
                    <input
                      type="text"
                      maxLength={4}
                      value={formData.circle?.initials || ""}
                      onChange={(e) => updateFormData(prev => ({
                        ...prev,
                        circle: {
                          avatarUrl: prev.circle?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
                          initials: e.target.value
                        }
                      }))}
                      placeholder="e.g. AR"
                      className="w-full p-3.5 rounded-xl border border-apple-border bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:border-apple-blue font-medium transition-colors"
                    />
                    <p className="text-[10px] text-apple-secondary font-medium pl-1">These initials will display on the front face of the profile bubble.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-apple-secondary uppercase tracking-widest pl-1">Profile Photo / Avatar URL</label>
                    <input
                      type="text"
                      value={formData.circle?.avatarUrl || ""}
                      onChange={(e) => updateFormData(prev => ({
                        ...prev,
                        circle: {
                          initials: prev.circle?.initials || "AR",
                          avatarUrl: e.target.value
                        }
                      }))}
                      placeholder="e.g. https://images.unsplash.com/..."
                      className="w-full p-3.5 rounded-xl border border-apple-border bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:border-apple-blue font-medium transition-colors"
                    />
                    <p className="text-[10px] text-apple-secondary font-medium pl-1">Enter a secure HTTPS image URL that flips into view when you click the Circle.</p>
                  </div>
                </div>
              )}

              {activeTab === "education" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-apple-secondary uppercase tracking-widest">Education History ({(formData.education || []).length})</span>
                    <button
                      onClick={addEducation}
                      className="flex items-center gap-1.5 text-xs font-bold bg-apple-bg hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 text-apple-blue border border-apple-border py-2 px-4 rounded-full transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> School
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(formData.education || []).map((edu, idx) => (
                      <div key={edu.id} className="p-5 border border-apple-border rounded-2xl bg-gray-50/50 dark:bg-black/30 relative group">
                        <button
                          onClick={() => deleteEducation(idx)}
                          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-950/25 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Delete School"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">Institution</label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateEducationField(idx, "institution", e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs font-semibold focus:outline-none focus:border-apple-blue"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">Degree / Major</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducationField(idx, "degree", e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs font-semibold focus:outline-none focus:border-apple-blue"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">Duration</label>
                            <input
                              type="text"
                              value={edu.duration}
                              placeholder="e.g. 2022 - 2026"
                              onChange={(e) => updateEducationField(idx, "duration", e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs font-semibold focus:outline-none focus:border-apple-blue"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">GPA Score</label>
                            <input
                              type="text"
                              value={edu.gpa || ""}
                              placeholder="e.g. 3.90 / 4.00"
                              onChange={(e) => updateEducationField(idx, "gpa", e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs font-semibold focus:outline-none focus:border-apple-blue"
                            />
                          </div>

                          <div className="col-span-1 md:col-span-2 space-y-1">
                            <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">Key Coursework (comma separated)</label>
                            <input
                              type="text"
                              value={(edu.courses || []).join(", ")}
                              placeholder="e.g. Distributed Systems, Algorithms"
                              onChange={(e) => updateEducationField(idx, "courses", e.target.value.split(",").map(c => c.trim()).filter(Boolean))}
                              className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs font-semibold focus:outline-none focus:border-apple-blue"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-apple-secondary uppercase tracking-widest">Case Studies ({formData.projects.length})</span>
                    <button
                      onClick={addProject}
                      className="flex items-center gap-1.5 text-xs font-bold bg-apple-bg hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 text-apple-blue border border-apple-border py-2 px-4 rounded-full transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Concept
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.projects.map((proj, idx) => (
                      <div key={proj.id} className="p-5 border border-apple-border rounded-2xl bg-gray-50/50 dark:bg-black/30 relative group">
                        <button
                          onClick={() => deleteProject(idx)}
                          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-950/25 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Delete Case Study"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">Title</label>
                            <input
                              type="text"
                              value={proj.title}
                              onChange={(e) => updateProjectField(idx, "title", e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs font-semibold focus:outline-none focus:border-apple-blue"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">Image URL</label>
                            <input
                              type="text"
                              value={proj.image}
                              onChange={(e) => updateProjectField(idx, "image", e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs font-semibold focus:outline-none focus:border-apple-blue font-mono"
                            />
                          </div>

                          <div className="col-span-1 md:col-span-2 space-y-1">
                            <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">Brief Summary</label>
                            <textarea
                              rows={2}
                              value={proj.description}
                              onChange={(e) => updateProjectField(idx, "description", e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs focus:outline-none focus:border-apple-blue resize-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">Technologies (comma separated)</label>
                            <input
                              type="text"
                              value={proj.tags.join(", ")}
                              onChange={(e) => updateProjectField(idx, "tags", e.target.value.split(",").map(s => s.trim()))}
                              className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs font-semibold focus:outline-none focus:border-apple-blue"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">Github URL</label>
                              <input
                                type="text"
                                value={proj.links.github}
                                onChange={(e) => updateProjectLinks(idx, "github", e.target.value)}
                                className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs focus:outline-none focus:border-apple-blue"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">Live Demo URL</label>
                              <input
                                type="text"
                                value={proj.links.live}
                                onChange={(e) => updateProjectLinks(idx, "live", e.target.value)}
                                className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs focus:outline-none focus:border-apple-blue"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "skills" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-apple-secondary uppercase tracking-widest">Capabilities Grid ({formData.skills.length})</span>
                    <button
                      onClick={addSkill}
                      className="flex items-center gap-1.5 text-xs font-bold bg-apple-bg hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 text-apple-blue border border-apple-border py-2 px-4 rounded-full transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Capability
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {formData.skills.map((skill, idx) => (
                      <div key={idx} className="flex gap-2 p-3 border border-apple-border rounded-xl bg-gray-50/50 dark:bg-black/30 items-center">
                        <input
                          type="text"
                          value={skill.name}
                          placeholder="Skill Name"
                          onChange={(e) => updateSkill(idx, "name", e.target.value)}
                          className="flex-2 p-2 rounded-lg border border-apple-border bg-white dark:bg-black text-[11px] font-semibold focus:outline-none"
                        />
                        <input
                          type="text"
                          value={skill.category}
                          placeholder="Category"
                          onChange={(e) => updateSkill(idx, "category", e.target.value)}
                          className="flex-1 p-2 rounded-lg border border-apple-border bg-white dark:bg-black text-[11px] font-semibold focus:outline-none"
                        />
                        <button
                          onClick={() => deleteSkill(idx)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "certifications" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-apple-secondary uppercase tracking-widest">Industry Certifications ({(formData.certifications || []).length})</span>
                    <button
                      onClick={addCertification}
                      className="flex items-center gap-1.5 text-xs font-bold bg-apple-bg hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 text-apple-blue border border-apple-border py-2 px-4 rounded-full transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Certification
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(formData.certifications || []).map((cert, idx) => (
                      <div key={cert.id} className="p-5 border border-apple-border rounded-2xl bg-gray-50/50 dark:bg-black/30 relative group">
                        <button
                          onClick={() => deleteCertification(idx)}
                          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-950/25 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Delete Certification"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">Certification Name</label>
                            <input
                              type="text"
                              value={cert.name}
                              onChange={(e) => updateCertificationField(idx, "name", e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs font-semibold focus:outline-none focus:border-apple-blue"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">Issuing Authority</label>
                            <input
                              type="text"
                              value={cert.issuer}
                              onChange={(e) => updateCertificationField(idx, "issuer", e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs font-semibold focus:outline-none focus:border-apple-blue"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">Date Issued / Year</label>
                            <input
                              type="text"
                              value={cert.date}
                              placeholder="e.g. 2024"
                              onChange={(e) => updateCertificationField(idx, "date", e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs font-semibold focus:outline-none focus:border-apple-blue"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-apple-secondary uppercase tracking-wider block">Verification / Credential URL (Optional)</label>
                            <input
                              type="text"
                              value={cert.credentialUrl || ""}
                              onChange={(e) => updateCertificationField(idx, "credentialUrl", e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-apple-border bg-white dark:bg-black text-xs font-semibold focus:outline-none focus:border-apple-blue"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}



              {activeTab === "social" && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-apple-secondary uppercase tracking-widest pl-1">LinkedIn Profile</label>
                    <input
                      type="text"
                      value={formData.social.linkedin}
                      onChange={(e) => updateFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, linkedin: e.target.value }
                      }))}
                      className="w-full p-3.5 rounded-xl border border-apple-border bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:border-apple-blue font-medium transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-apple-secondary uppercase tracking-widest pl-1">GitHub Account</label>
                    <input
                      type="text"
                      value={formData.social.github}
                      onChange={(e) => updateFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, github: e.target.value }
                      }))}
                      className="w-full p-3.5 rounded-xl border border-apple-border bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:border-apple-blue font-medium transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-apple-secondary uppercase tracking-widest pl-1">X / Twitter (Optional)</label>
                    <input
                      type="text"
                      value={formData.social.twitter || ""}
                      onChange={(e) => updateFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, twitter: e.target.value }
                      }))}
                      className="w-full p-3.5 rounded-xl border border-apple-border bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:border-apple-blue font-medium transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-apple-secondary uppercase tracking-widest pl-1">Business E-mail</label>
                    <input
                      type="email"
                      value={formData.social.email}
                      onChange={(e) => updateFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, email: e.target.value }
                      }))}
                      className="w-full p-3.5 rounded-xl border border-apple-border bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:border-apple-blue font-medium transition-colors"
                    />
                  </div>
                </div>
              )}

              {activeTab === "json" && (
                <div className="h-full flex flex-col space-y-2">
                  <div className="flex-1 min-h-[300px] border border-apple-border rounded-xl overflow-hidden shadow-inner flex flex-col">
                    <textarea
                      value={jsonText}
                      onChange={(e) => handleJsonChange(e.target.value)}
                      spellCheck={false}
                      className="w-full flex-1 p-5 font-mono text-xs bg-gray-50 dark:bg-black text-[#1D1D1F] dark:text-gray-300 focus:outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Error messaging */}
            {error && (
              <p className="text-red-500 text-xs mb-4 font-bold px-2">{error}</p>
            )}

            {/* Sticky Action Footer */}
            <div className="flex gap-4 pt-4 border-t border-apple-border">
              <button
                onClick={handleSaveAll}
                disabled={error !== null}
                className="flex-1 py-4 bg-apple-blue hover:opacity-90 font-display font-semibold text-white dark:text-black rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50 text-sm"
              >
                <Save className="w-4 h-4" />
                Push Live Updates
              </button>
              
              <button
                onClick={() => {
                  if (confirm("Reset current customized content modifications to defaults?")) {
                    onReset();
                    onClose();
                  }
                }}
                className="px-6 py-4 bg-apple-bg hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 text-apple-secondary hover:text-apple-text dark:hover:text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border border-apple-border"
                title="Reset Content defaults"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

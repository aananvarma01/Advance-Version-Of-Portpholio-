import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Footer from "./components/Footer";
import EditOverlay from "./components/EditOverlay";
import { initialData } from "./data/portfolio";
import { PortfolioData } from "./types";
import { motion, useScroll, useSpring } from "motion/react";

export default function App() {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [isEditMode, setIsEditMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Safely migrate older caches that don't have education, certifications, or circle fields
        const migrated: PortfolioData = {
          ...initialData,
          ...parsed,
          education: parsed.education || initialData.education,
          certifications: parsed.certifications || initialData.certifications,
          circle: parsed.circle || initialData.circle,
        };
        setData(migrated);
      } catch (e) {
        console.error("Failed to load portfolio data", e);
      }
    }
  }, []);

  const handleSave = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem("portfolio_data", JSON.stringify(newData));
  };

  const handleReset = () => {
    setData(initialData);
    localStorage.removeItem("portfolio_data");
  };

  return (
    <div className="relative selection:bg-apple-blue selection:text-white">
      {/* Global Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-apple-blue z-[100] origin-left" 
        style={{ scaleX }} 
      />

      <Navbar 
        onEditToggle={() => setIsEditMode(true)} 
        isEditMode={isEditMode} 
        circle={data.circle}
      />

      <main className="w-full">
        <Hero {...data.hero} education={data.education} />
        <About {...data.about} />
        <Projects projects={data.projects} />
        <Education education={data.education} />
        <Skills skills={data.skills} />
        <Certifications certifications={data.certifications} />
      </main>

      <Footer social={data.social} />

      <EditOverlay 
        data={data}
        isOpen={isEditMode}
        onClose={() => setIsEditMode(false)}
        onSave={handleSave}
        onReset={handleReset}
      />
    </div>
  );
}

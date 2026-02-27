import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Mail, MessageCircle, Linkedin } from "lucide-react";
import React from "react";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    setLocation("/");

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Navigation animation
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.id);

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const viewportMid = scrollY + window.innerHeight * 0.35;

      let current = sectionIds[0];

      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const top = el.offsetTop;
        if (viewportMid >= top) {
          current = sectionIds[i];
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-40 py-4 px-6 bg-background"
    >
      <div className="max-w-[1000px] mx-auto">
        <div className="flex items-center">
          <div className="hidden md:flex items-center w-full">
            <a
              href="#"
              className="text-lg font-semibold text-[#8892B0] font-mono hover:text-primary transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
            >
              Iyad Khalil
            </a>

            <nav className="flex items-center space-x-6 ml-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-base font-medium relative ${
                    activeSection === link.id
                      ? "text-primary"
                      : "text-[#8892B0] hover:text-primary"
                  } transition-colors duration-300`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3 ml-auto">
              <a
                href="mailto:iyad.khalil@falakcompany.com"
                className="text-[#8892B0] hover:text-primary transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://wa.me/212689159133"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8892B0] hover:text-primary transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://linkedin.com/in/iyad-khalil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8892B0] hover:text-primary transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <a
            href="#"
            className="md:hidden text-xl font-bold text-primary font-mono"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            Iyad Khalil
          </a>

          {/* Mobile Menu Button */}
          <div className="ml-auto md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

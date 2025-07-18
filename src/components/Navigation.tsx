import { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
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

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-40 py-4 px-6 bg-[#0a192f] border-b border-navy-800"
    >
      <div className="max-w-[1000px] mx-auto">
        <div className="flex justify-between items-center">
          <a
            href="#"
            className="text-2xl font-bold text-primary font-mono"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            Iyad Khalil
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-base font-medium relative ${
                  activeSection === link.id
                    ? "text-primary"
                    : "text-[#ccd6f6] hover:text-primary"
                } transition-colors duration-300`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}

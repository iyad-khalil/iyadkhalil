import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import React from "react";

export function SocialSidebar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay before showing the sidebars
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const sidebarVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delay: 1.5,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.8 + (custom * 0.1),
        duration: 0.5
      }
    })
  };

  return (
    <>
      {/* Top-left phone sidebar */}
      <motion.div
        className="fixed left-8 top-28 hidden lg:flex flex-col items-center"
        variants={sidebarVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.div
          className="w-px h-24 bg-slate-400"
          variants={itemVariants}
          custom={0}
        ></motion.div>
        <motion.a
          href="https://wa.me/212689159133"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8892B0] hover:text-teal-400 transition-all duration-300 font-mono text-sm tracking-wider vertical-text mt-6"
          variants={itemVariants}
          custom={1}
        >
          +212 6 89 15 91 33
        </motion.a>
      </motion.div>

      {/* Left social sidebar */}
      <motion.div
        className="fixed left-8 bottom-0 hidden lg:flex flex-col items-center"
        variants={sidebarVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="flex flex-col items-center space-y-6">
          <motion.a
            href="https://linkedin.com/in/iyad-khalil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8892B0] hover:text-teal-400 hover:-translate-y-1 transition-all duration-300"
            aria-label="LinkedIn"
            variants={itemVariants}
            custom={0}
          >
            <Linkedin size={20} />
          </motion.a>
          <motion.a
            href="mailto:iyad.khalil@falakcompany.com"
            className="text-[#8892B0] hover:text-teal-400 hover:-translate-y-1 transition-all duration-300"
            aria-label="Email"
            variants={itemVariants}
            custom={1}
          >
            <Mail size={20} />
          </motion.a>
        </div>
        <motion.div
          className="w-px h-24 bg-slate-400 mt-6"
          variants={itemVariants}
          custom={2}
        ></motion.div>
      </motion.div>

      {/* Right email sidebar */}
      <motion.div
        className="fixed right-8 bottom-0 hidden lg:flex flex-col items-center"
        variants={sidebarVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.a
          href="mailto:iyad.khalil@falakcompany.com"
          className="text-[#8892B0] hover:text-teal-400 transition-all duration-300 font-mono text-sm tracking-wider vertical-text"
          variants={itemVariants}
          custom={0}
        >
          iyad.khalil@falakcompany.com
        </motion.a>
        <motion.div
          className="w-px h-24 bg-slate-400 mt-6"
          variants={itemVariants}
          custom={1}
        ></motion.div>
      </motion.div>
    </>
  );
}

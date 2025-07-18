import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
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
      {/* Left social sidebar */}
      <motion.div
        className="fixed left-8 bottom-0 hidden lg:flex flex-col items-center"
        variants={sidebarVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="flex flex-col items-center space-y-6">
          <motion.a
            href="https://github.com/iyad-khalil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition-all duration-300"
            aria-label="GitHub"
            variants={itemVariants}
            custom={0}
          >
            <Github size={20} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/iyad-khalil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition-all duration-300"
            aria-label="LinkedIn"
            variants={itemVariants}
            custom={1}
          >
            <Linkedin size={20} />
          </motion.a>
          <motion.a
            href="mailto:iyademsig1@gmail.com"
            className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition-all duration-300"
            aria-label="Email"
            variants={itemVariants}
            custom={2}
          >
            <Mail size={20} />
          </motion.a>
        </div>
        <motion.div
          className="w-px h-24 bg-slate-400 mt-6"
          variants={itemVariants}
          custom={3}
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
          href="mailto:iyademsig1@gmail.com"
          className="text-slate-400 hover:text-teal-400 transition-all duration-300 font-mono text-sm tracking-wider vertical-text"
          variants={itemVariants}
          custom={0}
        >
          iyademsig1@gmail.com
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

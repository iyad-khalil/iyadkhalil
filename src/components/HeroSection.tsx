import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export function HeroSection() {
  const [, setLocation] = useLocation();
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  const texts = [
    "I create stuff sometimes."
  ];
  
  const textRef = useRef("");
  const currentTextIndex = loopNum % texts.length;
  const fullText = texts[currentTextIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDeleting) {
        textRef.current = fullText.substring(0, displayText.length - 1);
        setTypingSpeed(50); // Faster when deleting
      } else {
        textRef.current = fullText.substring(0, displayText.length + 1);
        setTypingSpeed(100); // Normal speed when typing
      }
      
      setDisplayText(textRef.current);
      
      if (!isDeleting && displayText === fullText) {
        // Finished typing
        setTimeout(() => setIsDeleting(true), 2000);
        setTypingSpeed(50);
      } else if (isDeleting && displayText === '') {
        // Finished deleting
        setIsDeleting(false);
        setLoopNum(loopNum => loopNum + 1);
        setTypingSpeed(500); // Pause before typing next
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, fullText, loopNum, typingSpeed]);

  const scrollToProjects = () => {
    setLocation("/");
    
    setTimeout(() => {
      const element = document.getElementById("projects");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-24 px-6">
      <div className="text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div 
            className="w-24 h-24 mb-8"
            variants={itemVariants}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M50,5 L95,50 L50,95 L5,50 Z" />
                <path d="M25,25 L75,25 L75,75 L25,75 Z" />
                <path d="M40,5 L5,40 M60,5 L5,60 M80,5 L5,80 M95,20 L20,95 M95,40 L40,95 M95,60 L60,95" />
                <circle cx="50" cy="50" r="45" />
                <circle cx="50" cy="50" r="35" />
                <circle cx="50" cy="50" r="25" />
              </g>
            </svg>
          </motion.div>
          
          <motion.h1 
  className="text-4xl md:text-6xl font-bold mb-4"
  style={{ color: "#ccd6f6" }}
  variants={itemVariants}
>
  hi, <span className="text-primary">iyad</span> here.
</motion.h1>

          
<motion.h2 
  className="text-xl md:text-2xl font-medium mb-8"
  style={{ color: "#ccd6f6" }}
  variants={itemVariants}
>
  {displayText}
  <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-blink"></span>
</motion.h2>

          
          <motion.p 
  className="text-lg mb-10 max-w-2xl"
  style={{ color: "#ccd6f6" }}
  variants={itemVariants}
>
  I'm an AI/ML Engineer from Morocco, specialized in building end-to-end machine learning solutions and intelligent systems.
  My focus is on predictive modeling, API deployment, and creating scalable cloud solutions that deliver real-world impact.
</motion.p>

<motion.div variants={itemVariants}>
  <a
    href="mailto:iyademsig1@gmail.com"
    className="inline-block px-8 py-4 border-2 border-primary text-primary rounded-md font-medium hover:bg-primary/10 transition-all duration-300"
  >
    Say Hi!
  </a>
</motion.div>

        </motion.div>
      </div>
    </section>
  );
}

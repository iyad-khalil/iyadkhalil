import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { HeroBackground } from "./HeroBackground";

export function HeroSection() {
  const [, setLocation] = useLocation();
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const texts = ["I create stuff sometimes."];
  const textRef = useRef("");
  const currentTextIndex = loopNum % texts.length;
  const fullText = texts[currentTextIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDeleting) {
        textRef.current = fullText.substring(0, displayText.length - 1);
        setTypingSpeed(50);
      } else {
        textRef.current = fullText.substring(0, displayText.length + 1);
        setTypingSpeed(100);
      }

      setDisplayText(textRef.current);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
        setTypingSpeed(50);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum((loopNum) => loopNum + 1);
        setTypingSpeed(500);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, fullText, loopNum, typingSpeed]);

  const scrollToProjects = () => {
    setLocation("/");
    setTimeout(() => {
      const element = document.getElementById("projects");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.3 },
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
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center py-24 px-6"
    >
      <div className="relative z-10 w-full max-w-[1000px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full grid-cols-1 lg:grid-cols-[280px_auto] items-center justify-center gap-10 lg:gap-24"
        >
          <motion.p
            className="text-[15px] md:hidden text-center -mb-4"
            style={{ color: "#8892B0" }}
            variants={itemVariants}
          >
            For the full interactive experience, open this portfolio on desktop.
          </motion.p>

          <motion.div
            id="hero-animation-zone"
            className="relative mx-auto lg:mx-0 w-[300px] h-[300px] md:w-[360px] md:h-[360px] lg:mt-2 shrink-0"
            variants={itemVariants}
          >
            <HeroBackground pointCount={1800} speed={0.5} alpha={0.8} />
          </motion.div>

          <div className="max-w-[500px] text-center lg:text-left">
            <motion.h1
              className="text-[56px] font-bold mb-4"
              style={{ color: "#8892B0" }}
              variants={itemVariants}
            >
              hi, <span className="text-primary">iyad</span> here.
            </motion.h1>

            <motion.h2
              className="text-[16px] font-medium mb-8"
              style={{ color: "#8892B0" }}
              variants={itemVariants}
            >
              {displayText}
              <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-blink"></span>
            </motion.h2>

            <motion.div variants={itemVariants}>
              <a
                href="mailto:iyad.khalil@falakcompany.com"
                className="inline-block px-8 py-4 border-2 border-primary text-primary text-[16px] rounded-md font-medium hover:bg-primary/10 transition-all duration-300"
              >
                Say Hi!
              </a>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
      <div className="relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] items-center gap-10 lg:gap-14"
        >
          <motion.div
            className="relative mx-auto lg:mx-0 w-[280px] h-[280px] md:w-[340px] md:h-[340px] lg:mt-2 shrink-0"
            variants={itemVariants}
          >
            <HeroBackground pointCount={1400} speed={0.5} alpha={0.9} />
          </motion.div>

          <div className="w-full max-w-[560px] justify-self-center lg:justify-self-start text-center lg:text-left">
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

            <motion.p
              className="text-[16px] mb-10"
              style={{ color: "#8892B0" }}
              variants={itemVariants}
            >
              Artificial Intelligence Engineer from Morocco. I build full-stack,
              end-to-end products, combining software engineering, data, and
              applied AI; with a focus on production quality, scalability, and
              real business value.
            </motion.p>

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

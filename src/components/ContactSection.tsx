import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import React from "react";
export function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="contact" className="pt-12 pb-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.p className="text-teal-400 font-mono mb-2" variants={itemVariants}>
            05. What's Next?
          </motion.p>
          
          <motion.h2 className="text-3xl md:text-4xl font-bold text-white mb-6" variants={itemVariants}>
            Get In Touch
          </motion.h2>
          
          <motion.p className="text-slate-400 mb-10" variants={itemVariants}>
            I'm currently looking for new opportunities in AI/ML engineering and data science. Whether you have a question or just want to say hi, 
            I'll surely get back to you!
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <a
              href="mailto:iyademsig1@gmail.com"
              className="inline-block px-8 py-4 border-2 border-teal-400 text-teal-400 rounded-md font-medium hover:bg-teal-400/10 transition-all duration-300 text-lg"
            >
              Say Hello
            </a>
          </motion.div>
          
          <motion.div className="mt-16 flex justify-center space-x-8" variants={itemVariants}>
            <a
              href="https://github.com/iyad-khalil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-400 transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/iyad-khalil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-400 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:iyademsig1@gmail.com"
              className="text-slate-400 hover:text-teal-400 transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
            <a
              href="tel:+212654890931"
              className="text-slate-400 hover:text-teal-400 transition-colors duration-300"
              aria-label="Phone"
            >
              <Phone size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

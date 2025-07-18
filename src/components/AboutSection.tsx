import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";
export function AboutSection() {
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

  const technologies = [
    "Python & TensorFlow",
    "FastAPI & Docker",
    "Microsoft Azure",
    "Machine Learning",
    "Deep Learning",
    "Full Stack Development",
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div>
        <motion.div
          ref={ref}
          className="flex flex-col lg:flex-row gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="lg:w-3/5" variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 flex items-center after:content-[''] after:block after:w-[300px] after:h-px after:bg-navy-600 after:ml-5 md:after:w-48">
              <span className="text-teal-400 font-mono mr-2">01.</span> About Me
            </h2>
            <div className="space-y-4" style={{ color: "#ccd6f6" }}>
              <p>
                Hello! I'm Iyad, an AI/ML Engineer with a passion for building intelligent systems that solve real-world problems. 
                My journey in technology began when I started my engineering studies at{" "}
                <a
                  href="#"
                  className="text-teal-400 hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  École Marocaine des Sciences de l'Ingénieur
                </a>
                , where I discovered my passion for AI and machine learning.
              </p>
              <p>
                Currently pursuing a Master's degree in Artificial Intelligence at{" "}
                <a
                  href="#"
                  className="text-teal-400 hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Université Côte d'Azur
                </a>{" "}
                in France.
              </p>
              <p>Here are a few technologies I've been working with recently:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-6">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-teal-400 mr-2">▹</span>
                    <span style={{ color: "#ccd6f6" }}>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div className="lg:w-2/5 flex justify-center items-start" variants={itemVariants}>
          <div className="relative group">
  <div className="absolute -inset-0.5 bg-teal-400 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
</div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, ExternalLink, Folder } from "lucide-react";
import React from "react";

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: "Breast Cancer Prediction Using AI",
      description: "Built a CNN model to classify mammogram images into Benign, Malignant, or Normal. Fine-tuned 4.7M+ parameters, achieving 67.69% validation accuracy. Integrated into a Flask web app with image upload and prediction output.",
      image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      technologies: ["Python", "Flask", "Keras", "TensorFlow"],
      githubLink: "https://github.com/iyad-khalil/Breast_Cancer_Prediction",
      liveLink: "#",
      date: "December 2024 - February 2025",
      featured: true
    },
  ];

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
    <section id="projects" className="pt-24 pb-12 px-6">
      <div>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-16 flex items-center"
            variants={itemVariants}
          >
            <span className="mr-4 font-thin" style={{ color: "#ccd6f6" }}>/</span> projects
          </motion.h2>
          
          
          {projects.filter(project => project.featured).map((project, index) => (
            <motion.div 
              key={project.title}
              variants={itemVariants}
              className="mb-24"
            >
              <div className="relative md:grid md:grid-cols-12 gap-4 items-center">
                
                <div className={`md:col-span-7 relative group mb-6 md:mb-0 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="rounded-lg w-full h-auto filter brightness-50 group-hover:brightness-100 transition-all duration-300"
                  />
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="bg-navy-950 bg-opacity-80 rounded-lg p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-primary font-semibold">View Project</span>
                    </div>
                  </a>
                </div>
                
                
                <div className={`md:col-span-5 ${index % 2 === 1 ? 'md:order-1 md:pr-6 text-right' : 'md:pl-6'}`}>
                  <p className="text-primary font-mono mb-2">Featured Project</p>
                  <h3 className="text-2xl font-semibold text-white mb-4">{project.title}</h3>
                  <div className="bg-navy-800 p-6 rounded-lg shadow-xl mb-4">
                    <p style={{ color: "#ccd6f6" }}>
                      {project.description}
                    </p>
                  </div>
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 1 ? 'justify-end' : ''}`}>
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-sm font-mono" style={{ color: "#ccd6f6" }}>{tech}</span>
                    ))}
                  </div>
                  <div className={`flex gap-4 mt-4 ${index % 2 === 1 ? 'justify-end' : ''}`}>
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {projects.filter(project => !project.featured).map((project) => (
              <motion.div
                key={project.title}
                className="bg-navy-800 rounded-lg p-6 hover:translate-y-[-10px] transition-transform duration-300"
                variants={itemVariants}
              >
                <div className="flex justify-between items-center mb-4">
                  <Folder className="text-primary" size={30} />
                  <div className="flex gap-4">
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary transition-colors duration-300"
                    >
                      <Github size={18} />
                    </a>
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">{project.title}</h4>
                <p className="text-sm mb-4" style={{ color: "#ccd6f6" }}>{project.description}</p>
                <p className="text-primary text-xs mb-4">{project.date}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs font-mono" style={{ color: "#ccd6f6" }}>{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

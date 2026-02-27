import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

export function SkillsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState(0);

  const skillCategories = [
    {
      title: "Programming",
      skills: [
        "Python", "TypeScript", "React", "Java", "JavaScript", "Dart", "HTML", "CSS", "PHP",
        "SQL (MySQL, PostgreSQL)", "PostgreSQL", "Next.js"
      ],
    },
    {
      title: "Data Engineering & MLOps",
      skills: [
        "FastAPI", "Docker", "Microsoft Azure (VM, Storage)", "NGINX", "LangChain", "MCP",
        "Streamlit", "XGBoost", "Custom ETL Pipelines", "Power BI", "MLflow", "Conda",
        "RESTful API Deployment"
      ],
    },
    {
      title: "LLM & NLP",
      skills: [
        "Prompt Engineering", "Retrieval-Augmented Generation (RAG)", "Azure OpenAI", "LangChain Agents"
      ],
    },
    {
      title: "Production Readiness",
      skills: [
        "System Design",
        "MLOps",
        "CI/CD",
        "Kubernetes",
        "Observability (Monitoring/Logging)",
        "Security & Auth",
        "Product Analytics",
        "Prompt Engineering / LLM Evaluation",
      ],
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        "TensorFlow", "Keras", "Scikit-learn", "Hugging Face Transformers", "Pandas", "NumPy",
        "Matplotlib", "Seaborn", "Flask", "Node.js", "React", "Next.js", "Angular"
      ],
    },
    {
      title: "Testing & QA",
      skills: ["Cypress", "Selenium", "SonarQube", "JMeter"],
    },
    {
      title: "Project Management",
      skills: ["Agile (Scrum)", "Trello", "Jira"],
    },
    {
      title: "Tools",
      skills: ["Git", "VS Code", "PyCharm", "IntelliJ", "Postman", "Jupyter Notebook"],
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
    <section id="skills" className="pt-12 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-3xl font-bold text-[#CCD6F6] mb-16 flex items-center"
            variants={itemVariants}
          >
            <span className="mr-4 font-thin" style={{ color: "#8892B0" }}>/</span> skills
          </motion.h2>

          <motion.div
            className="flex flex-col md:flex-row gap-8 md:gap-16"
            variants={containerVariants}
          >
            {/* Category Tabs */}
            <div className="md:w-1/4 flex md:flex-col overflow-x-auto md:overflow-x-visible space-x-4 md:space-x-0 md:space-y-1 border-b md:border-b-0 md:border-l border-slate-700 pb-4 md:pb-0">
              {skillCategories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`uppercase whitespace-nowrap px-4 py-3 text-left text-sm transition-all duration-300 ${
                    activeCategory === index
                      ? "text-primary border-primary border-b-2 md:border-b-0 md:border-l-2 md:-ml-[1px]"
                      : "hover:text-primary hover:bg-navy-900/50"
                  }`}
                  style={activeCategory !== index ? { color: "#8892B0" } : {}}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Skills Content */}
            <motion.div
              className="md:w-3/4 md:pl-8"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-[#CCD6F6] mb-4">
                {skillCategories[activeCategory].title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillCategories[activeCategory].skills.map((skill, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 bg-navy-800 border border-navy-600 rounded-md text-sm font-mono hover:border-primary hover:text-primary transition-all duration-300"
                    style={{ color: "#8892B0" }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

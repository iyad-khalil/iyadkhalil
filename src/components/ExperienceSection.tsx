import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import React from "react";

export function ExperienceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState(0);

  const experiences = [
    {
      title: "AI/ML Engineer",
      company: "BLINK PHARMA",
      location: "Casablanca, Morocco || Remote",
      period: "March 2025 - Present",
      responsibilities: [
        "Developed a hybrid LSTM + XGBoost model for multivariate forecasting of pharmacy revenue based on enriched time series data.",
        "Engineered 25+ explanatory features including sales history, holidays, seasonality, patient behavior, volatility, long-term trends, and more.",
        "Achieved an overall prediction accuracy of 93.21%, with SMAPE < 10% on real-world test sets.",
        "Designed a secure RESTful API using FastAPI, containerized with Docker, served with NGINX, and deployed on a Linux Azure VM.",
        "Built an interactive Streamlit dashboard for real vs. predicted comparisons, alerting system, and percentile-based pharmacy ranking.",
        "Integrated an intelligent conversational agent using Azure OpenAI + LangChain, capable of generating personalized recommendations from model outputs.",
        "Implemented a robust MLOps architecture with model versioning, virtual environments (Conda), API monitoring (Postman), and a fully reproducible pipeline."
      ],
      skills: ["Python", "FastAPI", "Docker", "Azure", "XGBoost", "LSTM", "LangChain", "Streamlit"]
    },
    {
      title: "Artificial Intelligence Engineer",
      company: "Université Côte d’Azur",
      location: "Nice, France || Remote",
      period: "March 2025 - June 2025",
      responsibilities: [
        "Developed a full-stack SaaS e-commerce platform enabling multiple vendors to sell products with integrated AI features and real-time business logic.",
        "Designed a custom ML-based recommendation engine combining collaborative filtering (Jaccard similarity) and content-based scoring (category, price, tags) with <100ms latency via WebGPU.",
        "Integrated OpenAI GPT-4 for automatic product description generation and translation, enhancing SEO and multilingual reach.",
        "Implemented Hugging Face SegFormer in-browser for image segmentation and background removal, fully client-side and GPU-accelerated.",
        "Developed predictive analytics for vendors (SEO score, market fit, conversion rate, competition) using custom scoring algorithms.",
        "Architected with React + TypeScript + Tailwind CSS on the frontend and Supabase (PostgreSQL, Edge Functions, Auth, Storage) as a backend-as-a-service.",
        "Used Stripe for payment processing, Supabase Realtime for live order updates, and enforced strict Row Level Security (RLS) per vendor.",
        "Built advanced seller dashboard with intelligent order flow (pending → shipped), label generation, and hybrid ML recommendations in the shopping cart."
      ],
      skills: ["React", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI", "HuggingFace", "WebGPU", "Stripe"]
    },
    {
      title: "Automation Engineer",
      company: "TERSEA",
      location: "Nice, France || On-site",
      period: "July 2024 - September 2024",
      responsibilities: [
        "Developed comprehensive end-to-end test automation frameworks using Cypress for web applications",
        "Created reusable and maintainable test scripts covering the majority of platform features",
        "Collaborated closely with development teams to identify and resolve bugs early in the development cycle",
        "Implemented continuous integration testing workflows to ensure ongoing code quality",
        "Documented testing procedures and created reports highlighting critical issues and areas for improvement",
        "Trained team members on automation best practices and Cypress implementation techniques"
      ],
      skills: ["Cypress", "JavaScript", "QA", "E2E Testing"]
    },
    {
      title: "Full Stack Developer",
      company: "Big4Com Web",
      location: "Marrakech, Morocco || On-site",
      period: "July 2023 - August 2023",
      responsibilities: [
        "Designed and developed a comprehensive pharmacy management system using PHP, Symfony and PostgreSQL",
        "Implemented inventory management features including stock updates, product tracking, and expiration date monitoring",
        "Built sales tracking modules with detailed analytics and reporting capabilities",
        "Created a responsive user interface ensuring smooth user experience across different devices",
        "Conducted automated testing with Selenium to ensure application reliability",
        "Provided documentation for system operations and user guides"
      ],
      skills: ["PHP", "Symfony", "PostgreSQL", "Selenium"]
    }
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
    <section id="experience" className="py-28 px-6">
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
            <span className="mr-4 font-thin" style={{ color: "#ccd6f6" }}>/</span> experience
          </motion.h2>

          <motion.div 
            className="flex flex-col md:flex-row gap-8 md:gap-16"
            variants={containerVariants}
          >
            <div className="md:w-1/4 flex md:flex-col overflow-x-auto md:overflow-x-visible space-x-4 md:space-x-0 md:space-y-1 border-b md:border-b-0 md:border-l border-slate-700 pb-4 md:pb-0">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  className={`uppercase whitespace-nowrap px-4 py-3 text-left text-sm transition-all duration-300 ${
                    activeTab === index 
                      ? "text-primary border-primary border-b-2 md:border-b-0 md:border-l-2 md:-ml-[1px]" 
                      : "hover:text-primary hover:bg-navy-900/50"
                  }`}
                  style={activeTab !== index ? { color: "#ccd6f6" } : {}}
                  onClick={() => setActiveTab(index)}
                >
                  {exp.company}
                </button>
              ))}
            </div>

            <motion.div 
              className="md:w-2/3 lg:w-3/4 md:pl-8"
              variants={itemVariants}
            >
              <div className="mb-2">
                <h3 className="text-xl text-white font-bold">
                  {experiences[activeTab].title} <span className="text-primary">@ {experiences[activeTab].company}</span>
                </h3>
                <p className="text-sm mt-1" style={{ color: "#ccd6f6" }}>{experiences[activeTab].period}</p>
                <p className="text-sm" style={{ color: "#ccd6f6" }}>{experiences[activeTab].location}</p>
              </div>

              <ul className="space-y-4 mt-6">
                {experiences[activeTab].responsibilities.map((item, i) => (
                  <li key={i} className="flex" style={{ color: "#ccd6f6" }}>
                    <span className="text-primary mr-2 mt-1.5 flex-shrink-0 text-xs">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-6">
                {experiences[activeTab].skills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-navy-900 text-xs text-primary rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

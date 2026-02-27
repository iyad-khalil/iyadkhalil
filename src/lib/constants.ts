export const LINKS = {
  LINKEDIN: "https://linkedin.com/in/iyad-khalil",
  EMAIL: "mailto:iyad.khalil@falakcompany.com",
  PHONE: "tel:+212689159133",
  RESUME_EN: "/attached_assets/Iyad_Khalil_Resume_US.pdf",
  RESUME_FR: "/attached_assets/Iyad_Khalil_CV_FR.pdf"
};

export const TYPING_TEXTS = [
  "I build AI solutions that matter.",
  "I develop machine learning models.",
  "I create data-driven applications.",
  "I solve problems with AI."
];

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const TECH_SKILLS = [
  "Python & TensorFlow",
  "FastAPI & Docker",
  "Microsoft Azure",
  "Machine Learning",
  "Deep Learning",
  "Full Stack Development",
];

export const EXPERIENCES = [
  {
    title: "AI/ML Engineer",
    company: "BLINK PHARMA",
    location: "Casablanca, Morocco || Remote",
    period: "March 2025 - Present",
    responsibilities: [
      "Designed and developed a hybrid machine learning model combining LSTM and XGBoost for forecasting daily pharmacy revenue with 93.21% accuracy",
      "Engineered a custom ETL pipeline to clean, transform and prepare data from multiple pharmacy sources for model training",
      "Built a fraud detection system to identify suspicious transaction patterns and potential losses",
      "Deployed the entire solution as a RESTful API using FastAPI and Docker for easy integration",
      "Orchestrated the deployment on Microsoft Azure with NGINX as reverse proxy and HTTPS security protocols",
      "Implemented comprehensive API documentation and testing interface with Postman",
      "Created automated monitoring dashboards to track model performance and data drift"
    ],
    skills: ["Python", "FastAPI", "Docker", "Azure", "XGBoost", "LSTM", "Postman"]
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

export const PROJECTS = {
  featured: {
    title: "Breast Cancer Prediction Using AI",
    description: "A deep learning solution using CNN to classify mammogram images into benign, malignant, or normal categories. Achieved 67.69% validation accuracy with over 4.7M parameters and deployed as a user-friendly Flask web application.",
    image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    technologies: ["Python", "TensorFlow", "Keras", "Flask", "Deep Learning"],
    liveLink: "#"
  }
};

export const SKILLS = {
  programming: [
    { name: "Python", percentage: 95 },
    { name: "JavaScript", percentage: 85 },
    { name: "Java", percentage: 80 },
    { name: "PHP", percentage: 75 }
  ],
  devops: [
    { name: "FastAPI", percentage: 90 },
    { name: "Docker", percentage: 85 },
    { name: "Azure", percentage: 80 },
    { name: "ETL Pipelines", percentage: 85 }
  ],
  mlSkills: [
    { name: "TensorFlow", percentage: 92 },
    { name: "Scikit-learn", percentage: 88 },
    { name: "Keras", percentage: 90 },
    { name: "Pandas", percentage: 95 }
  ]
};

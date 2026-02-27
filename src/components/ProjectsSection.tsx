import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import sugarncoImage from "../public/sugarnco.png";
import qpmImage from "../public/qpmmedecine.png";
import emedImage from "../public/e-medpro.png";
import drAmalImage from "../public/docteuramalchahid.png";
import svmImage from "../public/svmcompagnies.png";

type Project = {
  title: string;
  liveHref: string;
  description: string;
  image: string;
  category: "SAAS" | "WEBSITES";
};

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = [
    {
      title: "Sugarnco",
      liveHref: "https://sugarnco.vercel.app/",
      description:
        "A modern commerce-focused website built for clarity, trust, and conversion.",
      image: sugarncoImage,
      category: "WEBSITES",
    },
    {
      title: "QPM Médecine",
      liveHref: "https://qpm-medecine.ma/",
      description:
        "A focused learning platform built for medical exam preparation",
      image: qpmImage,
      category: "SAAS",
    },
    {
      title: "E-MED PRO",
      liveHref: "https://e-med.ma/",
      description:
        "An intelligent operating system for dental clinics (Dental practice management software)",
      image: emedImage,
      category: "SAAS",
    },
    {
      title: "Dr Chahid Amal",
      liveHref: "https://www.drchahidamal.com/",
      description:
        "A comprehensive medical and aesthetic clinic custom website designed to present medical services",
      image: drAmalImage,
      category: "WEBSITES",
    },
    {
      title: "SVM Compagnies",
      liveHref: "http://svmcompagnies.vercel.app/",
      description:
        "A professional services website for home security and emergency interventions.",
      image: svmImage,
      category: "WEBSITES",
    },
  ];

  const groupedProjects: Array<{
    label: "SAAS" | "WEBSITES";
    items: Project[];
  }> = [
    { label: "SAAS", items: projects.filter((project) => project.category === "SAAS") },
    {
      label: "WEBSITES",
      items: projects.filter((project) => project.category === "WEBSITES"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.18,
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
          <span className="mr-4 font-thin" style={{ color: "#8892B0" }}>
            /
          </span>{" "}
          projects
        </motion.h2>

        <motion.div className="space-y-14" variants={containerVariants}>
          {groupedProjects.map((group) => (
            <motion.div key={group.label} variants={itemVariants} className="space-y-6">
              <h3 className="text-[22px] font-bold text-[#CCD6F6] tracking-[0.14em]">
                {group.label}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {group.items.map((project) => (
                  <article
                    key={project.title}
                    className="bg-navy-800/40 rounded-2xl p-5 md:p-6"
                  >
                    <div className="space-y-4">
                      <a
                        href={project.liveHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="w-full h-auto rounded-xl object-cover"
                        />
                      </a>
                      <div className="space-y-4" style={{ color: "#8892B0" }}>
                        <div className="flex items-center gap-3">
                          <h4 className="text-[28px] font-bold text-[#CCD6F6]">
                            {project.title}
                          </h4>
                        </div>

                        <p className="text-[18px]">{project.description}</p>

                        <a
                          href={project.liveHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex mt-2 px-5 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors duration-300"
                        >
                          Visit website
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import iyadPhoto from "../public/iyad.jpeg";

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
            <h2 className="text-2xl md:text-3xl font-bold text-[#CCD6F6] mb-12 flex items-center after:content-[''] after:block after:w-[300px] after:h-px after:bg-navy-600 after:ml-5 md:after:w-48">
              <span className="text-teal-400 font-mono mr-2">01.</span> About Me
            </h2>
            <div
              className="space-y-4"
              style={{ color: "#8892B0", fontFamily: "NTR, sans-serif", fontSize: "22px" }}
            >
              <p>
                Iyad Khalil is an Artificial Intelligence Software Engineer.
              </p>
              <p>
                He holds an Engineering Degree and a Master 2 degree in
                Artificial Intelligence from{" "}
                <a
                  href="https://univ-cotedazur.fr/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-400 hover:underline font-sans"
                >
                  Université Côte d’Azur
                </a>
                {" "}
                (Top 2.1% worldwide, CWUR 2026). His work sits at the
                intersection of software engineering, applied AI, and product
                execution.
              </p>
              <p>
                Iyad has built and shipped multiple live products from scratch,
                including revenue-generating SaaS platforms in healthcare and an
                educational platform for medical students:
              </p>
              <ul className="space-y-2 pl-5">
                <li>
                  - E-MED PRO{" "}
                  <a
                    href="https://www.e-med.ma"
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-400 hover:underline"
                  >
                    www.e-med.ma
                  </a>
                </li>
                <li>
                  - QPM Médecine{" "}
                  <a
                    href="https://www.qpm-medecine.ma"
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-400 hover:underline"
                  >
                    www.qpm-medecine.ma
                  </a>
                </li>
              </ul>
              <p>
                Outside of work, He sleeps.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-2/5 flex justify-center items-start lg:pt-10"
            variants={itemVariants}
          >
            <div className="relative">
              <img
                src={iyadPhoto}
                alt="Iyad Khalil"
                className="w-full max-w-[240px] rounded-2xl object-cover shadow-xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

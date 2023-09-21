import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        {/* Designing a circle and a line in vertical direction---purple */}
        <div className="flex flex-col items-center justify-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" /> {/*circle */}
          <div className="w-1 h-40 sm:h-80 violet-gradient" />
          {/*line*/}
        </div>
        {/* -------------------------------------------- */}
        {/* The preferred way to include one of these characters is to use the HTML escape code.

            > can be replaced with &gt;
            " can be replaced with &quot;, &ldquo;, &#34; or &rdquo;
            ' can be replaced with &apos;, &lsquo;, &#39; or &rsquo;
            } can be replaced with &#125; */}
        {/* ------------------------------------- */}
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I&apos;m <span className="text-[#915EFF]">Pradeep Khedhar</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I develop 3D visuals, user <br className="hidden sm:block" />
            interfaces and web applications
          </p>
        </div>
      </div>
      {/* ===================3D computer canvas  added here====================== */}
      <ComputersCanvas />

      {/* -------------moving point in circle under model=====>Framer motion used here------------------------------ */}
      <div className="absolute flex items-center justify-center w-full xs:bottom-10 bottom-32">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            {" "}
            {/**Border CSS */}
            <motion.div
              animate={{
                y: [0, 24, 0], // moving dot in only y direction 24 pixels
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 mb-1 rounded-full bg-secondary"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;

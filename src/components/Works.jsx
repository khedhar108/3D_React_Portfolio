// import Tilt from "react-tilt";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { live } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

import PropTypes from "prop-types";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_project_link,
}) => {
  return (
    // fadeIn(direction , type, delay , duration)-- projectCard shows one by one
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 400,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt="project_image"
            className="object-cover w-full h-full rounded-2xl"
          />
          {/* showing icons on the top-right side of Projects */}
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            {/* adding github icon */}
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer black-gradient"
            >
              <img
                src={github}
                alt="source code"
                title="source code"
                className="object-contain w-1/2 h-1/2"
              />
            </div>

            {/* add icon to show demo of deployed project */}
            <div
              onClick={() =>
                window.open(  live_project_link, "_blank")
              }
              className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer black-gradient"
            >
              <img
                src={live}
                alt="Project Deployed url"
                title="Live project"
                className="object-contain w-1/2 h-1/2"
              />
            </div>
          </div>
        </div>

        {/* providing information about the project */}
        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
        {/* which tech are used to create individual projects */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      {/* providing motion effect to text using textVariant which can be customized */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="flex flex-wrap mt-20 gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

// used to sovle prop validation errors
ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  image: PropTypes.string.isRequired,
  source_code_link: PropTypes.string.isRequired,
  live_project_link: PropTypes.string.isRequired,
};

// wrapping work component
export default SectionWrapper(Works, "");

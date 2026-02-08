import React from "react";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";

function Contact() {
  return (
    <motion.div
      variants={slideIn("left", "tween", 0.2, 1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="xl:my-36 md:w-2/5 w-full bg-bgSecondaryDark xl:ml-36 lg:ml-16 md:ml-10 p-8 rounded-2xl shadow-md shadow-primary"
      id="contact"
    >
      <p className={"sectionSubText text-ctnSecondaryDark"}>Get in touch</p>
      <h3 className={"sectionHeadText text-ctnPrimaryDark"}>Contact.</h3>

      <div className="mt-8 flex flex-col gap-6">
        <p className="text-ctnPrimaryDark text-lg">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>

        <div className="flex flex-col gap-4 mt-4">
          <a
            href="mailto:nomanshaker2@gmail.com"
            className="bg-primary py-4 px-6 rounded-xl text-white font-bold shadow-md shadow-tertiary hover:shadow-primary hover:bg-tertiary transition-all duration-300 ease-in text-center"
          >
            📧 Email Me: nomanshaker2@gmail.com
          </a>

          <a
            href="https://www.linkedin.com/in/codewithzavii"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 py-4 px-6 rounded-xl text-white font-bold shadow-md hover:shadow-blue-500 hover:bg-blue-700 transition-all duration-300 ease-in text-center"
          >
            💼 Connect on LinkedIn
          </a>

          <a
            href="https://github.com/CodeWithZavi"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 py-4 px-6 rounded-xl text-white font-bold shadow-md hover:shadow-gray-500 hover:bg-gray-800 transition-all duration-300 ease-in text-center"
          >
            💻 View GitHub Profile
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;

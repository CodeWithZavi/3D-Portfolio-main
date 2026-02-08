import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import truncateText from "@/utils/truncate";
import GithubLogo from "./../public/assets/icons/github.svg";

function ProjectCard({
  index,
  name,
  description,
  tags,
  source_code_link,
  deployed_link,
  category,
}) {
  const CHAR_LIMIT = 250;

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] shadow-xl hover:shadow-purple-500/20 w-full"
    >
      {/* Category Badge */}
      {category && (
        <div className="absolute top-6 right-6 z-20">
          <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg backdrop-blur-sm">
            {category}
          </span>
        </div>
      )}

      {/* Content Section */}
      <div className="p-8 relative z-10">
        {/* Project Icon/Number */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
          <span className="text-white text-xl font-bold">#{index + 1}</span>
        </div>

        <h3 className="text-white font-bold text-xl mb-4 pr-16 group-hover:text-purple-400 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {truncateText(description, CHAR_LIMIT)}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className="px-3 py-1.5 text-xs rounded-md bg-gray-800/80 text-gray-300 border border-gray-700/50"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t border-gray-700/50">
          {deployed_link && (
            <button
              onClick={() => window.open(deployed_link, "_blank")}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-500/90 hover:to-blue-500/90 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Live
            </button>
          )}
          {source_code_link && (
            <button
              onClick={() => window.open(source_code_link, "_blank")}
              className="px-4 py-3 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-lg transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50"
              title="View Source Code"
            >
              <GithubLogo className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Works() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const allCategories = projects.reduce((acc, project) => {
      if (project.category && !acc.includes(project.category)) {
        acc.push(project.category);
      }
      return acc;
    }, []);
    return ["All", ...allCategories];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section className="xl:my-36 md:mx-36 p-8" id="projects">
      {/* Header */}
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
          Featured Projects
        </h2>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pl-12 rounded-full bg-gray-900/50 backdrop-blur-sm border-2 border-purple-500/30 focus:border-purple-500 outline-none text-white placeholder-gray-500 transition-all duration-300"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </motion.div>

      {/* Category Filters */}
      {categories.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`group relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === category
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/50"
                : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50 hover:border-blue-500/50"
                }`}
            >
              <span className="flex items-center gap-2">
                {category}
                {category !== "All" && (
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${selectedCategory === category
                      ? "bg-white/20"
                      : "bg-gray-700/50"
                      }`}
                  >
                    {projects.filter((p) => p.category === category).length}
                  </span>
                )}
              </span>
            </button>
          ))}
        </motion.div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-20"
          >
            <p className="text-gray-400 text-lg">
              No projects found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>

      {/* Results Counter */}
      {filteredProjects.length > 0 && filteredProjects.length < projects.length && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 text-sm">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </motion.div>
      )}
    </section>
  );
}

export default Works;

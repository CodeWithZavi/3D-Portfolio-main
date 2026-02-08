import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { achievements } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

function AchievementCard({ achievement, index, onImageClick }) {
    const isPDF = achievement.isPDF || achievement.image?.endsWith('.pdf');
    const hasPdfUrl = achievement.pdfUrl;

    return (
        <motion.div
            variants={fadeIn("up", "spring", index * 0.1, 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] shadow-xl hover:shadow-purple-500/20"
        >
            {/* Image Section */}
            <div
                className="relative w-full h-64 overflow-hidden bg-gray-800 cursor-pointer"
                onClick={() => onImageClick(achievement)}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10" />

                {isPDF ? (
                    // PDF Preview with Document Icon
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                        <svg
                            className="w-20 h-20 text-purple-400 mb-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-gray-400 text-sm font-medium">PDF Certificate</span>
                    </div>
                ) : (
                    // Regular Image
                    <Image
                        src={achievement.image}
                        alt={achievement.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}

                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg backdrop-blur-sm">
                        {achievement.category}
                    </span>
                </div>

                {/* View/Expand Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
                    <div className="text-center">
                        <svg className="w-12 h-12 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                        <span className="text-white text-sm font-medium">Click to View</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 relative z-10">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    {achievement.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-3">
                    {achievement.description}
                </p>

                {/* Date & Tags */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
                    {achievement.date && (
                        <span className="text-xs text-gray-500 font-medium">
                            {achievement.date}
                        </span>
                    )}
                    {achievement.tags && achievement.tags.length > 0 && (
                        <div className="flex gap-2">
                            {achievement.tags.slice(0, 2).map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 text-xs rounded-md bg-gray-800/80 text-gray-300 border border-gray-700/50"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* View/Download Button for PDFs */}
                {hasPdfUrl && (
                    <button
                        onClick={() => window.open(achievement.pdfUrl, "_blank")}
                        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800/80 hover:bg-purple-600/80 text-gray-300 hover:text-white text-sm font-medium rounded-lg transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download PDF
                    </button>
                )}

                {/* Verify Certificate Button for Online Courses */}
                {achievement.certificateUrl && (
                    <button
                        onClick={() => window.open(achievement.certificateUrl, "_blank")}
                        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-500/90 hover:to-cyan-500/90 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verify Certificate
                    </button>
                )}
            </div>
        </motion.div>
    );
}

function Achievements() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(6);
    const [selectedImage, setSelectedImage] = useState(null);

    // Extract unique categories from achievements
    const categories = useMemo(() => {
        const uniqueCategories = [
            ...new Set(achievements.map((achievement) => achievement.category)),
        ];
        return [
            { name: "All", count: achievements.length },
            ...uniqueCategories.map((cat) => ({
                name: cat,
                count: achievements.filter((a) => a.category === cat).length,
            })),
        ];
    }, []);

    // Filter achievements based on selected category
    const filteredAchievements = useMemo(() => {
        if (selectedCategory === "All") {
            return achievements;
        }
        return achievements.filter((a) => a.category === selectedCategory);
    }, [selectedCategory]);

    // Get visible achievements based on count
    const visibleAchievements = filteredAchievements.slice(0, visibleCount);
    const hasMore = visibleCount < filteredAchievements.length;

    const handleImageClick = (achievement) => {
        setSelectedImage(achievement);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <section className="xl:my-36 md:mx-36 p-8" id="achievements">
            {/* Header */}
            <motion.div
                variants={textVariant()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
                    My Achievements
                </h2>
            </motion.div>

            {/* Category Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-3 mb-12"
            >
                {categories.map((category) => (
                    <button
                        key={category.name}
                        onClick={() => {
                            setSelectedCategory(category.name);
                            setVisibleCount(6); // Reset visible count when changing category
                        }}
                        className={`group relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === category.name
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/50"
                            : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50 hover:border-blue-500/50"
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            {category.name}
                            <span
                                className={`px-2 py-0.5 text-xs rounded-full ${selectedCategory === category.name
                                    ? "bg-white/20"
                                    : "bg-gray-700/50"
                                    }`}
                            >
                                {category.count}
                            </span>
                        </span>
                    </button>
                ))}
            </motion.div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {visibleAchievements.map((achievement, index) => (
                    <AchievementCard
                        key={`achievement-${index}`}
                        achievement={achievement}
                        index={index}
                        onImageClick={handleImageClick}
                    />
                ))}
            </div>

            {/* Image Modal/Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-6xl w-full max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 group"
                            >
                                <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Certificate Title */}
                            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 z-10">
                                <h3 className="text-white font-bold text-xl md:text-2xl pr-12">
                                    {selectedImage.title}
                                </h3>
                                <p className="text-gray-300 text-sm mt-1">{selectedImage.date}</p>
                            </div>

                            {/* Image Container */}
                            <div className="relative w-full h-[90vh] flex items-center justify-center p-4">
                                <Image
                                    src={selectedImage.image}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 z-10">
                                <div className="flex flex-wrap gap-3 justify-center">
                                    {selectedImage.pdfUrl && (
                                        <button
                                            onClick={() => window.open(selectedImage.pdfUrl, "_blank")}
                                            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Download PDF
                                        </button>
                                    )}
                                    {selectedImage.certificateUrl && (
                                        <button
                                            onClick={() => window.open(selectedImage.certificateUrl, "_blank")}
                                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Verify Certificate
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* No Results */}
            {filteredAchievements.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <p className="text-gray-400 text-lg">
                        No achievements found in this category.
                    </p>
                </motion.div>
            )}

            {/* Show More Button */}
            {hasMore && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-8"
                >
                    <button
                        onClick={() => setVisibleCount((prev) => prev + 6)}
                        className="group px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
                    >
                        <span className="flex items-center gap-2">
                            Show More
                            <svg
                                className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </span>
                    </button>
                </motion.div>
            )}

            {/* Results Counter */}
            {filteredAchievements.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-8"
                >
                    <p className="text-gray-500 text-sm">
                        Showing {visibleAchievements.length} of{" "}
                        {filteredAchievements.length} achievements
                    </p>
                </motion.div>
            )}
        </section>
    );
}

export default Achievements;

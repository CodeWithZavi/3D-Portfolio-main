/**
 * Single source of truth for all portfolio data
 * Used by: constants/index.js (adds SVG icons) + build-embeddings.js (generates RAG chunks)
 * Works as both CJS (require) and ESM (import) via Next.js interop
 */

const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "achievements", title: "Achievements" },
  { id: "contact", title: "Contact" },
];

const services = [
  { title: "Software Developer", iconType: "fullStack" },
  { title: "Frontend Developer", iconType: "frontend" },
  { title: "Problem Solving", iconType: "problemSolving" },
  { title: "Freelancer", iconType: "freelancer" },
];

const technologies = {
  languages: [
    { name: "HTML5", icon: "/assets/tech/html5.svg", link: "https://html.spec.whatwg.org/multipage/" },
    { name: "CSS3", icon: "/assets/tech/css3.svg", link: "https://www.w3.org/Style/CSS/Overview.en.html" },
    { name: "JavaScript", icon: "/assets/tech/javascript.svg", link: "https://262.ecma-international.org/" },
    { name: "TypeScript", icon: "/assets/tech/typescript.svg", link: "https://www.typescriptlang.org/" },
    { name: "C", icon: "/assets/tech/c.svg", link: "https://en.cppreference.com/w/c" },
    { name: "Java", icon: "/assets/tech/java.svg", link: "https://www.java.com/en/" },
    { name: "Python", icon: "/assets/tech/python.svg", link: "https://www.python.org/" },
  ],
  frameworks: [
    { name: "Next.js", icon: "/assets/tech/nextjs.svg", link: "https://nextjs.org/" },
    { name: "TailwindCSS", icon: "/assets/tech/tailwindcss.svg", link: "https://tailwindcss.com/" },
    { name: "Express.js", icon: "/assets/tech/expressjs.png", link: "https://expressjs.com/" },
    { name: "Flutter", icon: "/assets/tech/flutter.svg", link: "https://flutter.dev/" },
  ],
  libraries: [
    { name: "React", icon: "/assets/tech/react.svg", link: "https://react.dev/" },
    { name: "Three.js", icon: "/assets/tech/threejs.svg", link: "https://threejs.org/" },
    { name: "Styled-Components", icon: "/assets/tech/styled-components.png", link: "https://styled-components.com/" },
    { name: "Framer-motion", icon: "/assets/tech/framer.svg", link: "https://www.framer.com/motion/" },
    { name: "Zustand", icon: "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg", link: "https://zustand-demo.pmnd.rs" },
    { name: "Redux/Redux-toolkit", icon: "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png", link: "https://redux.js.org" },
    { name: "NextAuth.js", icon: "/assets/tech/nextauthjs.png", link: "https://next-auth.js.org/" },
    { name: "Prisma", icon: "/assets/tech/prisma.svg", link: "https://www.prisma.io/" },
  ],
  tools: [
    { name: "Git", icon: "/assets/tech/git.svg", link: "https://git-scm.com/" },
    { name: "Github", icon: "/assets/icons/github.svg", link: "https://github.com/" },
    { name: "Postman", icon: "/assets/tech/postman.svg", link: "https://www.postman.com/" },
    { name: "Figma", icon: "/assets/tech/figma.svg", link: "https://www.figma.com/" },
    { name: "Docker", icon: "/assets/tech/docker.svg", link: "https://www.docker.com/" },
  ],
  environments: [
    { name: "Node.js", icon: "/assets/tech/nodejs.svg", link: "https://nodejs.org/en" },
  ],
  databases: [
    { name: "MySQL", icon: "/assets/tech/my-sql.png", link: "https://www.mysql.com/" },
    { name: "PostgreSQL", icon: "/assets/tech/postgresql.png", link: "https://www.postgresql.org" },
    { name: "MongoDB", icon: "/assets/tech/mongodb.svg", link: "https://www.mongodb.com/" },
    { name: "Firebase", icon: "/assets/tech/firebase.svg", link: "https://firebase.google.com/" },
  ],
};

const experiences = [
  {
    title: "AI Intern",
    company_name: "Convo Islamabad",
    icon: "/assets/company/convo.svg",
    iconBg: "#E6DEDD",
    date: "Present",
    points: [
      "Working with Python and SQL to develop and optimize AI-powered solutions for real-world business applications.",
      "Training and fine-tuning machine learning models to improve accuracy and performance on diverse datasets.",
      "Implementing Natural Language Processing (NLP) techniques for text analysis, sentiment analysis, and language understanding tasks.",
      "Collaborating with the development team to integrate ML models into production systems and ensure scalability.",
    ],
  },
  {
    title: "Backened Developer",
    company_name: "Tech team member at GDSC Comsats",
    icon: "/assets/company/gdsc-logo.svg",
    iconBg: "#E6DEDD",
    date: "February 2022 - July 2023",
    points: [
      "Successfully planned and executed induction programs, providing new members with crucial information about the organization's goals and values.",
      "Demonstrated web development expertise by conducting CSS workshops, equipping participants with practical web design and styling skills.",
      "Played a crucial role in promoting GDSC events and actively collaborated with cross-functional teams to deliver high-quality projects, fostering teamwork and innovation.",
      "Actively engaged with the GDSC community, assisted in workshops, and contributed to planning and managing GDSC events, ensuring their success and growth.",
    ],
  },
];

const testimonials = []; // placeholder

const projects = [
  {
    name: "Blood Bank Management System - Desktop Application",
    description: "Comprehensive database management system designed to efficiently manage and streamline blood donation, storage, and distribution processes. Features a user-friendly desktop interface built with Java and SQL for handling blood records, donor information, and recipient data.",
    category: "Database Systems",
    tags: [
      { name: "Java", color: "blue-text-gradient" },
      { name: "SQL", color: "green-text-gradient" },
      { name: "Database Design", color: "pink-text-gradient" },
    ],
    source_code_link: "https://github.com/CodeWithZavi/DataBase-Sem-Project-HMS",
    deployed_link: "https://github.com/CodeWithZavi/DataBase-Sem-Project-HMS",
  },
  {
    name: "Huffman Coding Compression Tool",
    description: "Comprehensive implementation of the Huffman Coding algorithm in Java with GUI. Demonstrates lossless data compression by converting text into binary codes based on character frequency.",
    category: "Data Structures & Algorithms",
    tags: [
      { name: "Java", color: "blue-text-gradient" },
      { name: "Algorithms", color: "pink-text-gradient" },
      { name: "Compression", color: "orange-text-gradient" },
    ],
    source_code_link: "https://github.com/CodeWithZavi/HUFMAN-CODING",
    deployed_link: "https://github.com/CodeWithZavi/HUFMAN-CODING",
  },
  {
    name: "Machine Learning Projects Collection",
    description: "Collection of 4 end-to-end ML applications with Flask APIs: House Price Prediction (Linear Regression), Celebrity Recognition (SVM 95%+), Pakistan Celebrity Classifier (SVM), Heart Disease Predictor (Random Forest 85%+).",
    category: "AI/ML",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "Machine Learning", color: "green-text-gradient" },
      { name: "Flask", color: "pink-text-gradient" },
    ],
    source_code_link: "https://github.com/CodeWithZavi/ML-Projects",
    deployed_link: "https://github.com/CodeWithZavi/ML-Projects",
  },
  {
    name: "Facial Expression Analyzer - Real-Time Emotion Detection",
    description: "Advanced AI system detecting human emotions in real-time using CNN and OpenCV. Processes webcam feed, images, or videos to classify emotions with bounding boxes. Applications: AI chatbots, classroom engagement, mental health monitoring.",
    category: "AI/ML",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "CNN", color: "green-text-gradient" },
      { name: "OpenCV", color: "pink-text-gradient" },
    ],
    source_code_link: "https://github.com/CodeWithZavi/Facial_Expression_Analyzer-main",
    deployed_link: "https://github.com/CodeWithZavi/Facial_Expression_Analyzer-main",
  },
  {
    name: "GymFitness - Complete Fitness Management Platform",
    description: "Full-stack fitness management platform with role-based access for Users, Coaches, Admins. Workout timer, nutrition tracking, class bookings, premium subscriptions.",
    category: "Web Development",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "TypeScript", color: "green-text-gradient" },
      { name: "Supabase", color: "pink-text-gradient" },
    ],
    image: "/assets/projects/gym-fitness.png",
    source_code_link: "https://github.com/CodeWithZavi/Gym-Fintess-Web-By-Noman-Shakir",
    deployed_link: "https://github.com/CodeWithZavi/Gym-Fintess-Web-By-Noman-Shakir",
  },
  {
    name: "Crypto Trading Platform",
    description: "Cryptocurrency trading simulation with real-time market data, JWT authentication with bcrypt, RESTful APIs, portfolio management. MERN stack deployed on Vercel with MongoDB Atlas.",
    category: "Web Development",
    tags: [
      { name: "React 19", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "MongoDB", color: "pink-text-gradient" },
    ],
    image: "/assets/projects/crypto-trading.png",
    source_code_link: "https://github.com/CodeWithZavi/Crypto-Trading-System",
    deployed_link: "https://www.linkedin.com/posts/codewithzavii_webdevelopment-mern-react-activity-7415770639690637312-VvqB",
  },
  {
    name: "QuickEdit: AI-Powered Image & Video Editor",
    description: "AI-powered online image and video editor using Cloudinary AI API. User authentication and tiered credit system. Tech: TypeScript, Next.js, TailwindCSS, Shadcn, Cloudinary.",
    category: "Web Development",
    tags: [
      { name: "TypeScript", color: "blue-text-gradient" },
      { name: "Next.js", color: "green-text-gradient" },
      { name: "Cloudinary", color: "yellow-text-gradient" },
    ],
    image: "https://res.cloudinary.com/dqiqi75hm/image/upload/v1734187202/quickedit/dp6y8s8dstqfpq7svmj5.png",
    source_code_link: "https://github.com/CodeWithZavi/QuickEdit",
    deployed_link: "https://quick-edit-app.vercel.app",
  },
  {
    name: "FigPro",
    description: "Web-based collaborative design tool like Figma using Next.js, TypeScript, LiveBlocks API, Fabric.js. Real-time team design collaboration.",
    category: "Web Development",
    tags: [
      { name: "TypeScript", color: "blue-text-gradient" },
      { name: "Next.js", color: "green-text-gradient" },
      { name: "Fabric.js", color: "orange-text-gradient" },
    ],
    image: "/assets/projects/fig-pro.png",
    source_code_link: "https://github.com/CodeWithZavi/FigPro",
    deployed_link: "https://fig-pro-github.vercel.app",
  },
  {
    name: "Facility Management System",
    description: "MERN stack solution for booking facility time slots with role-based access control. Tech: TypeScript, React, TailwindCSS, Node.js, MongoDB.",
    category: "Web Development",
    tags: [
      { name: "TypeScript", color: "blue-text-gradient" },
      { name: "React", color: "green-text-gradient" },
      { name: "MongoDB", color: "yellow-text-gradient" },
    ],
    image: "/assets/projects/facility-manager.png",
    source_code_link: "https://github.com/CodewithZavi/Facility-Management-System",
    deployed_link: "https://github.com/CodewithZavi/Facility-Management-System",
  },
];

const socials = [
  { id: "github", iconType: "github", link: "https://github.com/CodeWithZavi" },
  { id: "linkedin", iconType: "linkedin", link: "https://www.linkedin.com/in/codewithzavii" },
  { id: "x", iconType: "x", link: "https://leetcode.com/u/Noman_Shakir/" },
  { id: "instagram", iconType: "instagram", link: "https://www.instagram.com" },
];

const heroTexts = [
  "Full-Stack Developer", 500,
  "AI/ML Engineer", 500,
  "Backend Specialist", 500,
  "AI Application Developer", 500,
  "Machine Learning Practitioner", 500,
  "Intelligent Systems Builder", 500,
];

const achievements = [
  {
    title: "Programming for Everybody (Getting Started with Python)",
    description: "Completed University of Michigan Coursera course by Charles Severance.",
    category: "Skills",
    image: "/Acheiments/bacgroungimagesforpdfs/PythonCorsera.png",
    date: "March 2024",
    tags: ["Python", "Coursera"],
    certificateUrl: "https://www.coursera.org/account/accomplishments/verify/UPAYGXH7F4NT",
  },
  {
    title: "Build a Backend REST API with Node JS from Scratch",
    description: "Udemy course by Pierre Henry, 12.5 hours of backend development training.",
    category: "Skills",
    image: "/Acheiments/bacgroungimagesforpdfs/UdemNodeJS.png",
    date: "October 2025",
    tags: ["Node.js", "API"],
    certificateUrl: "https://www.udemy.com/certificate/UC-1da71577-f551-4428-8bb9-f36cd4ef5eb9/",
  },
  {
    title: "Trifusion HackJam - Elite Tech Solutions",
    description: "Appreciation Certificate from Elite Tech Solutions for HackJam August 2025 participation.",
    category: "Activities",
    image: "/Acheiments/TechFsuinHackathon.png",
    date: "August 2025",
    tags: ["Hackathon", "Remote"],
  },
  {
    title: "Deep Learning and NLP Workshop",
    description: "Workshop by Robotics Club, COMSATS University Islamabad via Cisco Networking Academy.",
    category: "Skills",
    image: "/Acheiments/NLP Workshop.png",
    date: "2024",
    tags: ["AI/ML", "Workshop"],
  },
  {
    title: "Machine Learning Bootcamp - PIEAS",
    description: "Intensive ML bootcamp at PIEAS covering advanced ML algorithms and deep learning.",
    category: "Skills",
    image: "/Acheiments/bacgroungimagesforpdfs/GDGPIEAS.png",
    date: "2024",
    tags: ["Machine Learning", "Bootcamp"],
    pdfUrl: "/Acheiments/ML_Bootcamp_Pieas.pdf",
  },
  {
    title: "CCNA: Introduction to Networks",
    description: "Cisco Networking Academy course at COMSATS University Islamabad.",
    category: "Skills",
    image: "/Acheiments/bacgroungimagesforpdfs/CCNAintroToNetwork.png",
    date: "September 2023",
    tags: ["Networking", "Cisco"],
    pdfUrl: "/Acheiments/CCNA-_Introduction_to_Networks_certificate_nomanshaker2-gmail-com_f6120aa0-58fd-47a2-9040-0af933a14852.pdf",
  },
  {
    title: "University Recommendation Letter",
    description: "Recommendation from Dean of Computer Science at COMSATS University Islamabad.",
    category: "University Recommendation",
    image: "/Acheiments/bacgroungimagesforpdfs/universityRecom.png",
    date: "2025",
    tags: ["Recommendation", "Academic"],
    pdfUrl: "/Acheiments/Universityrecommendation.pdf",
  },
  {
    title: "English Language Proficiency Certificate",
    description: "Demonstrated proficient English command for technical documentation and international collaboration.",
    category: "Language Proficiency",
    image: "/Acheiments/bacgroungimagesforpdfs/EngProfeceiny (1).png",
    date: "2024",
    tags: ["English", "Communication"],
    pdfUrl: "/Acheiments/English_Proficiency_letter.pdf",
  },
  {
    title: "Campus Honor Roll Recognition",
    description: "Honor Roll at COMSATS University Islamabad for perfect SGPA across multiple semesters.",
    category: "Campus Honor",
    image: "/Acheiments/bacgroungimagesforpdfs/CampusHonor.jpeg",
    date: "2024",
    tags: ["Honor Roll", "Academic Excellence"],
    pdfUrl: "/Acheiments/CampusHonor.pdf",
  },
];

module.exports = {
  navLinks, services, technologies, experiences, testimonials,
  projects, socials, heroTexts, achievements,
};

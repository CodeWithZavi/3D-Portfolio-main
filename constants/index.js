import GithubIcon from "./../public/assets/icons/github.svg";
import LinkedInIcon from "./../public/assets/icons/linkedin.svg";
import XIcon from "./../public/assets/icons/x.svg";
import InstagramIcon from "./../public/assets/icons/instagram.svg";
import FrontendIcon from "./../public/assets/icons/frontend.svg";
import LeaderShipIcon from "./../public/assets/icons/leadership.svg";
import ProblemSolvingIcon from "./../public/assets/icons/problem-solving.svg";
import FreelancerIcon from "./../public/assets/icons/freelance.svg";
import BackendIcon from "./../public/assets/icons/backend.svg";
import FullStackIcon from "./../public/assets/icons/full-stack.svg";

const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "achievements",
    title: "Achievements",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Software Developer",
    icon: <FullStackIcon />,
  },
  {
    title: "Frontend Developer",
    icon: <FrontendIcon />,
  },
  // {
  //   title: "Backend Developer",
  //   icon: <BackendIcon />,
  // },
  {
    title: "Problem Solving",
    icon: <ProblemSolvingIcon />,
  },
  {
    title: "Freelancer",
    icon: <FreelancerIcon />,
  },
  // {
  //   title: "Leadership",
  //   icon: <LeaderShipIcon />,
  // },
];

const technologies = {
  languages: [
    {
      name: "HTML5",
      icon: "/assets/tech/html5.svg",
      link: "https://html.spec.whatwg.org/multipage/",
    },
    {
      name: "CSS3",
      icon: "/assets/tech/css3.svg",
      link: "https://www.w3.org/Style/CSS/Overview.en.html",
    },
    {
      name: "JavaScript",
      icon: "/assets/tech/javascript.svg",
      link: "https://262.ecma-international.org/",
    },
    {
      name: "TypeScript",
      icon: "/assets/tech/typescript.svg",
      link: "https://www.typescriptlang.org/",
    },
    {
      name: "C",
      icon: "/assets/tech/c.svg",
      link: "https://en.cppreference.com/w/c",
    },
    {
      name: "Java",
      icon: "/assets/tech/java.svg",
      link: "https://www.java.com/en/",
    },
    {
      name: "Python",
      icon: "/assets/tech/python.svg",
      link: "https://www.python.org/",
    },
  ],
  frameworks: [
    {
      name: "Next.js",
      icon: "/assets/tech/nextjs.svg",
      link: "https://nextjs.org/",
    },
    {
      name: "TailwindCSS",
      icon: "/assets/tech/tailwindcss.svg",
      link: "https://tailwindcss.com/",
    },
    {
      name: "Express.js",
      icon: "/assets/tech/expressjs.png",
      link: "https://expressjs.com/",
    },
    {
      name: "Flutter",
      icon: "/assets/tech/flutter.svg",
      link: "https://flutter.dev/",
    },
  ],
  libraries: [
    {
      name: "React",
      icon: "/assets/tech/react.svg",
      link: "https://react.dev/",
    },
    {
      name: "Three.js",
      icon: "/assets/tech/threejs.svg",
      link: "https://threejs.org/",
    },
    {
      name: "Styled-Components",
      icon: "/assets/tech/styled-components.png",
      link: "https://styled-components.com/",
    },
    {
      name: "Framer-motion",
      icon: "/assets/tech/framer.svg",
      link: "https://www.framer.com/motion/",
    },
    {
      name: "Zustand",
      icon: "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg",
      link: "https://zustand-demo.pmnd.rs",
    },
    {
      name: "Redux/Redux-toolkit",
      icon: "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png",
      link: "https://redux.js.org",
    },
    {
      name: "NextAuth.js",
      icon: "/assets/tech/nextauthjs.png",
      link: "https://next-auth.js.org/",
    },
    {
      name: "Prisma",
      icon: "/assets/tech/prisma.svg",
      link: "https://www.prisma.io/",
    },
  ],
  tools: [
    {
      name: "Git",
      icon: "/assets/tech/git.svg",
      link: "https://git-scm.com/",
    },
    {
      name: "Github",
      icon: "/assets/icons/github.svg",
      link: "https://github.com/",
    },
    {
      name: "Postman",
      icon: "/assets/tech/postman.svg",
      link: "https://www.postman.com/",
    },
    {
      name: "Figma",
      icon: "/assets/tech/figma.svg",
      link: "https://www.figma.com/",
    },
    {
      name: "Docker",
      icon: "/assets/tech/docker.svg",
      link: "https://www.docker.com/",
    },
  ],
  environments: [
    {
      name: "Node.js",
      icon: "/assets/tech/nodejs.svg",
      link: "https://nodejs.org/en",
    },
  ],
  databases: [
    {
      name: "MySQL",
      icon: "/assets/tech/my-sql.png",
      link: "https://www.mysql.com/",
    },
    {
      name: "PostgreSQL",
      icon: "/assets/tech/postgresql.png",
      link: "https://www.postgresql.org",
    },
    {
      name: "MongoDB",
      icon: "/assets/tech/mongodb.svg",
      link: "https://www.mongodb.com/",
    },
    {
      name: "Firebase",
      icon: "/assets/tech/firebase.svg",
      link: "https://firebase.google.com/",
    },
  ],
};

const experiences = [
  // {
  //   title: "Full Stack Developer",
  //   company_name: "Tech Lead at GDSC MVJCE",
  //   icon: "/assets/company/gdsc-logo.svg",
  //   iconBg: "#E6DEDD",
  //   date: "July 2023 - Present",
  //   points: [
  //     "Currently serving as the Tech Lead of GDSC, responsible for guiding technical aspects, fostering collaboration, and contributing to strategic decisions.",
  //     "Led induction programs, ensured new member alignment with GDSC's mission, and provided technical mentorship.",
  //     "Developed GDSC MVJCE website, enhancing the organization's online visibility.",
  //     "Spearheaded promotional campaigns, actively engaged with the GDSC community, and played a key role in planning and executing events.",
  //   ],
  // },
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
  // {
  //   title: "Game Developer Intern",
  //   company_name: "Intern at GameDevHQ",
  //   icon: "/assets/company/drdo-cabs.png",
  //   iconBg: "#E6DEDD",
  //   date: "February 2025",
  //   points: [
  //     "Developed a Facility Bookings Manager for DRDO CABS using TypeScript, React, Node.js, Express, Prisma, and MySQL within a month.",
  //     "Actively addressed client issues and queries, ensuring seamless integration with their platform and local cluster system.",
  //     "Led the design and implementation of the frontend, providing a user-friendly interface for efficient facility management.",
  //     "Collaborated with a backend intern throughout the internship to deliver a comprehensive solution tailored to DRDO CABS's needs.",
  //   ],
  // },
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

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Blood Bank Management System - Desktop Application",
    description:
      "Comprehensive database management system designed to efficiently manage and streamline blood donation, storage, and distribution processes. Features a user-friendly desktop interface built with Java and SQL for handling blood records, donor information, and recipient data. The system combines structured database architecture with an intuitive frontend for smooth operational workflow in blood bank facilities.",
    category: "Database Systems",
    tags: [
      {
        name: "Java",
        color: "blue-text-gradient",
      },
      {
        name: "SQL",
        color: "green-text-gradient",
      },
      {
        name: "Database Design",
        color: "pink-text-gradient",
      },
      {
        name: "Desktop App",
        color: "orange-text-gradient",
      },
      {
        name: "Management System",
        color: "yellow-text-gradient",
      },
    ],
    source_code_link: "https://github.com/CodeWithZavi/DataBase-Sem-Project-HMS",
    deployed_link: "https://github.com/CodeWithZavi/DataBase-Sem-Project-HMS",
  },
  {
    name: "Huffman Coding Compression Tool",
    description:
      "Comprehensive implementation of the Huffman Coding algorithm in Java with an intuitive graphical user interface (GUI). This application demonstrates lossless data compression by converting text into binary codes based on character frequency, effectively reducing file sizes while maintaining data integrity. Built to showcase advanced data structures and algorithms with practical real-world applications in file compression.",
    category: "Data Structures & Algorithms",
    tags: [
      {
        name: "Java",
        color: "blue-text-gradient",
      },
      {
        name: "Data Structures",
        color: "green-text-gradient",
      },
      {
        name: "Algorithms",
        color: "pink-text-gradient",
      },
      {
        name: "Compression",
        color: "orange-text-gradient",
      },
      {
        name: "GUI",
        color: "yellow-text-gradient",
      },
    ],
    source_code_link: "https://github.com/CodeWithZavi/HUFMAN-CODING",
    deployed_link: "https://github.com/CodeWithZavi/HUFMAN-CODING",
  },
  {
    name: "Machine Learning Projects Collection",
    description:
      "Comprehensive collection of 4 end-to-end ML applications featuring Flask Backend APIs, interactive web interfaces, and production-ready models. Includes: Bangalore House Price Prediction (Linear Regression), Celebrity Recognition System (SVM with 95%+ accuracy), Pakistan Celebrity Classifier (SVM), and Heart Disease Predictor (Random Forest with 85%+ accuracy). Each project features clean code architecture, proper separation of concerns, and one-click deployment scripts.",
    category: "AI/ML",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Machine Learning",
        color: "green-text-gradient",
      },
      {
        name: "Flask",
        color: "pink-text-gradient",
      },
      {
        name: "SVM",
        color: "orange-text-gradient",
      },
      {
        name: "Random Forest",
        color: "yellow-text-gradient",
      },
      {
        name: "Linear Regression",
        color: "blue-text-gradient",
      },
    ],
    source_code_link: "https://github.com/CodeWithZavi/ML-Projects",
    deployed_link: "https://github.com/CodeWithZavi/ML-Projects",
  },
  {
    name: "Facial Expression Analyzer - Real-Time Emotion Detection",
    description:
      "Advanced AI-powered system that detects human emotions in real-time using Convolutional Neural Networks (CNN) and OpenCV. Intelligently processes live webcam feed, images, or videos to accurately classify emotions and display them visually with bounding boxes. Applications include AI chatbots, classroom engagement analysis, UX research, mental health monitoring, interview feedback systems, gaming, and security surveillance.",
    category: "AI/ML",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "CNN",
        color: "green-text-gradient",
      },
      {
        name: "OpenCV",
        color: "pink-text-gradient",
      },
      {
        name: "Deep Learning",
        color: "orange-text-gradient",
      },
      {
        name: "Computer Vision",
        color: "yellow-text-gradient",
      },
    ],
    source_code_link: "https://github.com/CodeWithZavi/Facial_Expression_Analyzer-main",
    deployed_link: "https://github.com/CodeWithZavi/Facial_Expression_Analyzer-main",
  },
  {
    name: "GymFitness - Complete Fitness Management Platform",
    description:
      "Built a comprehensive full-stack fitness management platform featuring role-based access control for Users, Coaches, and Admins. The platform includes workout timer with exercise library, nutrition tracking with progress analytics, class bookings system, and premium subscription features. A complete solution for gym management and personal fitness tracking.",
    category: "Web Development",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "TypeScript",
        color: "green-text-gradient",
      },
      {
        name: "Supabase",
        color: "pink-text-gradient",
      },
      {
        name: "TailwindCSS",
        color: "orange-text-gradient",
      },
      {
        name: "Role-Based Auth",
        color: "yellow-text-gradient",
      },
    ],
    image: "/assets/projects/gym-fitness.png",
    source_code_link: "https://github.com/CodeWithZavi/Gym-Fintess-Web-By-Noman-Shakir",
    deployed_link: "https://github.com/CodeWithZavi/Gym-Fintess-Web-By-Noman-Shakir",
  },
  {
    name: "Crypto Trading Platform",
    description:
      "Developed a comprehensive cryptocurrency trading simulation platform featuring real-time market data visualization, secure user authentication, and portfolio management capabilities. Built with the MERN stack, this full-stack application includes JWT authentication with bcrypt encryption, RESTful APIs, and is deployed on Vercel with MongoDB Atlas backend.",
    category: "Web Development",
    tags: [
      {
        name: "React 19",
        color: "blue-text-gradient",
      },
      {
        name: "Node.js",
        color: "green-text-gradient",
      },
      {
        name: "MongoDB",
        color: "pink-text-gradient",
      },
      {
        name: "Express.js",
        color: "orange-text-gradient",
      },
      {
        name: "TailwindCSS",
        color: "yellow-text-gradient",
      },
      {
        name: "JWT Auth",
        color: "blue-text-gradient",
      },
    ],
    image: "/assets/projects/crypto-trading.png",
    source_code_link: "https://github.com/CodeWithZavi/Crypto-Trading-System",
    deployed_link: "https://www.linkedin.com/posts/codewithzavii_webdevelopment-mern-react-activity-7415770639690637312-VvqB",
  },
  {
    name: "QuickEdit: AI-Powered Image & Video Editor",
    description:
      "QuickEdit is an AI-powered online image and video editor built using the Cloudinary AI API. It offers robust features for both images and videos, with user-friendly authentication and a tiered credit system. Enhance your media editing experience with cutting-edge AI tools!",
    category: "Web Development",
    tags: [
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
      {
        name: "Next.js",
        color: "green-text-gradient",
      },
      {
        name: "TailwindCSS",
        color: "pink-text-gradient",
      },
      {
        name: "Shadcn",
        color: "orange-text-gradient",
      },
      {
        name: "Cloudinary",
        color: "yellow-text-gradient",
      },
    ],
    image:
      "https://res.cloudinary.com/dqiqi75hm/image/upload/v1734187202/quickedit/dp6y8s8dstqfpq7svmj5.png",
    source_code_link: "https://github.com/CodeWithZavi/QuickEdit",
    deployed_link: "https://quick-edit-app.vercel.app",
  },
  {
    name: "FigPro",
    description:
      "FigPro is a web-based collaborative design tool similar to Figma, built using Next.js, TypeScript, Tailwind CSS, and LiveBlocks API, Fabric.js. With FigPro, teams can seamlessly collaborate on designing interfaces in real-time with a plethora of features.",
    category: "Web Development",
    tags: [
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
      {
        name: "Next.js",
        color: "green-text-gradient",
      },
      {
        name: "TailwindCSS",
        color: "pink-text-gradient",
      },
      {
        name: "Fabric.js",
        color: "orange-text-gradient",
      },
      {
        name: "LiveBlocks",
        color: "yellow-text-gradient",
      },
    ],
    image: "/assets/projects/fig-pro.png",
    source_code_link: "https://github.com/CodeWithZavi/FigPro",
    deployed_link: "https://fig-pro-github.vercel.app",
  },
  // {
  //   name: "GDSC Website",
  //   description:
  //     "Welcome to the official repository for the GDSC MVJCE Website, built with Next.js, Styled Components, and Prisma! This website serves as the central hub for all things tech-related at GDSC MVJCE. From insightful blog posts to incredible community projects, and from exciting tech events to getting to know our team, you'll find it all here.",
  //   tags: [
  //     {
  //       name: "next.js",
  //       color: "blue-text-gradient",
  //     },
  //     {
  //       name: "styled-components",
  //       color: "green-text-gradient",
  //     },
  //     {
  //       name: "three.js",
  //       color: "pink-text-gradient",
  //     },
  //     {
  //       name: "prisma",
  //       color: "orange-text-gradient",
  //     },
  //     {
  //       name: "framer-motion",
  //       color: "yellow-text-gradient",
  //     },
  //   ],
  //   image: "/assets/projects/gdsc-website.png",
  //   source_code_link: "https://github.com/GDSC-MVJCE/gdscmvjce-website.git",
  //   deployed_link: "https://gdscmvjce.vercel.app/",
  // },
  {
    name: "Facility Management System",
    description:
      "The Facility Management System is a comprehensive management solution developed using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to book time slots in facilities and provides role-based access control for various functionalities.",
    category: "Web Development",
    tags: [
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
      {
        name: "React",
        color: "green-text-gradient",
      },
      {
        name: "TailwindCSS",
        color: "pink-text-gradient",
      },
      {
        name: "Node.js",
        color: "orange-text-gradient",
      },
      {
        name: "MongoDB",
        color: "yellow-text-gradient",
      },
    ],
    image: "/assets/projects/facility-manager.png",
    source_code_link:
      "https://github.com/CodewithZavi/Facility-Management-System",
    deployed_link:
      "https://github.com/CodewithZavi/Facility-Management-System",
  },
  // {
  //   name: "Van-Life",
  //   description:
  //     "VanLife is a user-friendly website built with React that simplifies van searches. It is a web app used to browse different types of vans. It allows users to log in and offers convenient tag-based filtering for easy browsing.",
  //   tags: [
  //     {
  //       name: "react",
  //       color: "blue-text-gradient",
  //     },
  //     {
  //       name: "mirage.js",
  //       color: "green-text-gradient",
  //     },
  //     {
  //       name: "firebase-firestore",
  //       color: "pink-text-gradient",
  //     },
  //   ],
  //   image: "/assets/projects/vanlife.png",
  //   source_code_link: "https://github.com/Shivam-Sharma-1/Van-Life.git",
  //   deployed_link: "https://myvanlife.netlify.app",
  // },
  // {
  // 	name: "Spooky-Run",
  // 	description:
  // 		"Spooky Run is a web based 2D arcade style game that allows players to play as a lost dog finding its way back home through a spooky forest. The game is built using vanilla JavaScript and utilizes HTML5 and the 'canvas' element to render graphics and handle user input.",
  // 	tags: [
  // 		{
  // 			name: "html5",
  // 			color: "blue-text-gradient"
  // 		},
  // 		{
  // 			name: "css3",
  // 			color: "green-text-gradient"
  // 		},
  // 		{
  // 			name: "javascript",
  // 			color: "pink-text-gradient"
  // 		}
  // 	],
  // 	image: "/assets/projects/spooky-run.png",
  // 	source_code_link: "https://github.com/Shivam-Sharma-1/Spooky-Run.git",
  // 	deployed_link: "https://shivam-sharma-1.github.io/Spooky-Run"
  // }
];

const socials = [
  {
    id: "github",
    icon: <GithubIcon />,
    link: "https://github.com/CodeWithZavi",
  },
  {
    id: "linkedin",
    icon: <LinkedInIcon />,
    link: "https://www.linkedin.com/in/codewithzavii",
  },
  {
    id: "x",
    icon: <XIcon />,
    link: "https://leetcode.com/u/Noman_Shakir/",
  },
  {
    id: "instagram",
    icon: <InstagramIcon />,
    link: "https://www.instagram.com",
  },
];

const heroTexts = [
  "Full-Stack Developer",
  500,
  "AI/ML Engineer",
  500,
  "Backend Specialist",
  500,
  "AI Application Developer",
  500,
  "Machine Learning Practitioner",
  500,
  "Intelligent Systems Builder",
  500,
];

const achievements = [
  {
    title: "Programming for Everybody (Getting Started with Python)",
    description:
      "Successfully completed Programming for Everybody (Getting Started with Python), an online course authorized by University of Michigan and offered through Coursera. Instructed by Charles Severance, Clinical Professor at the School of Information.",
    category: "Skills",
    image: "/Acheiments/bacgroungimagesforpdfs/PythonCorsera.png",
    date: "March 2024",
    tags: ["Python", "Coursera"],
    certificateUrl: "https://www.coursera.org/account/accomplishments/verify/UPAYGXH7F4NT",
  },
  {
    title: "Build a Backend REST API with Node JS from Scratch",
    description:
      "Certificate of Completion for successfully completing the comprehensive Udemy course on building backend REST APIs with Node.js from scratch. Instructed by Pierre Henry, covering 12.5 total hours of in-depth backend development training.",
    category: "Skills",
    image: "/Acheiments/bacgroungimagesforpdfs/UdemNodeJS.png",
    date: "October 2025",
    tags: ["Node.js", "API"],
    certificateUrl: "https://www.udemy.com/certificate/UC-1da71577-f551-4428-8bb9-f36cd4ef5eb9/",
  },
  {
    title: "Trifusion HackJam - Elite Tech Solutions",
    description:
      "This certificate is proudly presented in recognition of valuable participation in HackJam August 2025. Appreciation Certificate awarded by Elite Tech Solutions | Elite Fusion for outstanding contribution to the hackathon.",
    category: "Activities",
    image: "/Acheiments/TechFsuinHackathon.png",
    date: "August 2025",
    tags: ["Hackathon", "Remote"],
  },
  {
    title: "Deep Learning and NLP Workshop",
    description:
      "Successfully participated in workshop on Deep Learning and NLP organized by Robotics Club, COMSATS University Islamabad, Abbottabad Campus, through the Cisco Networking Academy program.",
    category: "Skills",
    image: "/Acheiments/NLP Workshop.png",
    date: "2024",
    tags: ["AI/ML", "Workshop"],
  },
  {
    title: "Machine Learning Bootcamp - PIEAS",
    description:
      "Successfully completed an intensive Machine Learning bootcamp at PIEAS (Pakistan Institute of Engineering and Applied Sciences), covering advanced ML algorithms, deep learning, and practical implementations.",
    category: "Skills",
    image: "/Acheiments/bacgroungimagesforpdfs/GDGPIEAS.png",
    date: "2024",
    tags: ["Machine Learning", "Bootcamp"],
    pdfUrl: "/Acheiments/ML_Bootcamp_Pieas.pdf",
  },
  {
    title: "CCNA: Introduction to Networks",
    description:
      "Successfully completed the CCNA: Introduction to Networks course offered by COMSATS University Islamabad, Abbottabad Campus, through the Cisco Networking Academy program.",
    category: "Skills",
    image: "/Acheiments/bacgroungimagesforpdfs/CCNAintroToNetwork.png",
    date: "September 2023",
    tags: ["Networking", "Cisco"],
    pdfUrl: "/Acheiments/CCNA-_Introduction_to_Networks_certificate_nomanshaker2-gmail-com_f6120aa0-58fd-47a2-9040-0af933a14852.pdf",
  },
  {
    title: "University Recommendation Letter",
    description:
      "Received a strong recommendation from the Dean of Computer Science Department at COMSATS University Islamabad, Abbottabad Campus, recognizing exceptional academic performance and leadership qualities.",
    category: "University Recommendation",
    image: "/Acheiments/bacgroungimagesforpdfs/universityRecom.png",
    date: "2025",
    tags: ["Recommendation", "Academic"],
    pdfUrl: "/Acheiments/Universityrecommendation.pdf",
  },
  {
    title: "English Language Proficiency Certificate",
    description:
      "Demonstrated proficient command of English language with strong academic writing and communication skills, essential for technical documentation and international collaboration.",
    category: "Language Proficiency",
    image: "/Acheiments/bacgroungimagesforpdfs/EngProfeceiny (1).png",
    date: "2024",
    tags: ["English", "Communication"],
    pdfUrl: "/Acheiments/English_Proficiency_letter.pdf",
  },
  {
    title: "Campus Honor Roll Recognition",
    description:
      "Recognized in the Campus Honor Roll at COMSATS University Islamabad, Abbottabad Campus, for outstanding academic achievement by securing perfect SGPA across multiple semesters, demonstrating consistent excellence in academic performance.",
    category: "Campus Honor",
    image: "/Acheiments/bacgroungimagesforpdfs/CampusHonor.jpeg",
    date: "2024",
    tags: ["Honor Roll", "Academic Excellence"],
    pdfUrl: "/Acheiments/CampusHonor.pdf",
  },
  // Keeping only items with verified image paths - commented out empty boxes
  // {
  //   title: "Certificate of Excellence in Database",
  //   description:
  //     "Won the Inter-Subject Project Competition in the subject of Database at COMSATS University Islamabad, Abbottabad Campus, on 10th January 2023.",
  //   category: "Studies",
  //   image: "/assets/achievements/database-certificate.jpg",
  //   date: "January 2023",
  //   tags: ["Project", "Database"],
  // },
  // {
  //   title: "Certificate of Appreciation - Communication Event",
  //   description:
  //     "Awarded a Certificate of Appreciation for organizing at the Communication Event held on 6th December 2022 at COMSATS University Islamabad, Abbottabad Campus.",
  //   category: "Activities",
  //   image: "/assets/achievements/communication-event.jpg",
  //   date: "December 2022",
  //   tags: ["Event", "Leadership"],
  // },
  // {
  //   title: "Certificate of Excellence in Computer Network",
  //   description:
  //     "Runner up in the Inter-Subject Project Competition in the subject of Computer Network at COMSATS University Islamabad, Abbottabad Campus, on 10th January 2025.",
  //   category: "Studies",
  //   image: "/assets/achievements/network-certificate.jpg",
  //   date: "January 2025",
  //   tags: ["Project", "Networking"],
  // },
];

export {
  navLinks,
  services,
  technologies,
  experiences,
  testimonials,
  projects,
  socials,
  heroTexts,
  achievements,
};

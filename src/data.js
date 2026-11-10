export const profile = {
  name: "Sanjaiykumar S V",
  roles: ["Software Developer"],
  email: "sanjaiy2006@gmail.com",
  phone: "+91 93425 84218",
  location: "India",
  links: {
    github: "https://github.com/sv-sanjaiykumar",
    linkedin: "https://www.linkedin.com/in/sanjaiykumar-s-v/",
    leetcode: "https://leetcode.com/u/Sanjaiykumarsv/",
    hackerrank: "https://www.hackerrank.com/profile/sanjaiykumar_sv1",
    gfg: "https://www.geeksforgeeks.org/profile/sanjaiykumaf50q",
      resume: "/sanjaiykumar_s_v_resume.pdf",
  },
};

export const about = {
  degree: "B.E. Computer Science & Engineering",
  college: "Sri Eshwar College of Engineering",
  years: "2023 — 2027",
  cgpa: "7.53",
  narrative:
    "I build mobile and full-stack applications using React Native, and modern web technologies, with a focus on responsive UI, clean architecture, and reliable backend integration. I work with Firebase, REST APIs, and FastAPI to create practical products across healthcare, campus recruitment, event booking, and subscription tracking.",
};

export const skillGroups = [
  {
    label: "Languages",
    level: 88,
    items: ["C++", "TypeScript", "JavaScript", "Python"],
  },
  {
    label: "Frameworks",
    level: 86,
    items: ["Node.js", "React Native", "Expo", "Flutter"],
  },
  {
    label: "Mobile App Development",
    level: 92,
    items: ["React Native", "Flutter", "REST API Integration"],
  },
  {
    label: "Version Control & Collaboration",
    level: 86,
    items: ["Git", "GitHub", "Branching", "Pull Requests"],
  },
  {
    label: "Backend & APIs",
    level: 88,
    items: [
      "Firebase Authentication",
      "Firestore",
      "Firebase Storage",
      "REST APIs",
      "FastAPI",
    ],
  },
  {
    label: "Database",
    level: 85,
    items: ["Firebase", "SQLite"],
  },
  {
    label: "Developer Tools",
    level: 86,
    items: ["VS Code", "Antigravity"],
  },
];

export const experience = [
  {
    role: "Flutter with Dart Intern",
    year: "2025",
    summary:
      "Completed an intensive Flutter and Dart internship focused on building scalable mobile applications using Provider and Firebase Firestore. Developed a fully functional habit tracking application featuring automated tracking, progress visualization, offline sync, and push notifications. Engineered a Placement Portal using Flutter and Firebase featuring role-based authentication, job posting, and real-time application tracking. Strengthened expertise in responsive UI development, backend integration, and clean modular application architecture.",
    tags: ["Flutter", "Dart", "Provider", "Firestore", "Push Notifications"],
  },
];

export const projects = [
  {
    title: "SecureCare",
    year: "2025",
    blurb:
      "Security-first healthcare platform with encrypted medical records, role-based access control, shift-based access, dynamic watermarking, and audit logging.",
    tech: ["React.js", "Firebase", "Node.js"],
    github: "https://github.com/sv-sanjaiykumar/secure_care",
    app: null,
    accent: "#45c1ff",
  },
  {
    title: "Placement Portal",
    year: "2025",
    blurb:
      "Campus recruitment platform with role-based authentication, job posting, application tracking, and real-time notifications to streamline placement management.",
    tech: ["Flutter", "Firebase", "Role-based Auth"],
    github: "https://github.com/sv-sanjaiykumar/placement_portal",
    app: null,
    accent: "#8b5cf6",
  },
  {
    title: "Gather",
    year: "2026",
    blurb:
      "Full-stack event booking platform with a FastAPI backend, React frontend, SQLite database, and generated Python SDK for multi-seat bookings and creator management.",
    tech: ["Python 3", "FastAPI", "React.js", "OpenAPI", "SQLite"],
    github: "https://github.com/sv-sanjaiykumar/event_booking_system.git",
    app: null,
    accent: "#7aa8ff",
  },
  {
    title: "Recurrly",
    year: "2026",
    blurb:
      "Subscription tracking application for monitoring recurring payments and upcoming renewals with a centralized dashboard for billing details and subscription statuses.",
    tech: ["React Native", "Expo", "Node.js"],
    github: "https://github.com/sv-sanjaiykumar/recurrly-react-native",
    app: null,
    accent: "#a78bfa",
  },
];

export const achievements = [
  {
    platform: "LeetCode",
    value: 180,
    suffix: "+",
    label: "problems solved",
    detail: "6+ contests attended",
    link: "https://leetcode.com/u/Sanjaiykumarsv/",
  },
  {
    platform: "GeeksforGeeks",
    value: 50,
    suffix: "+",
    label: "problems solved",
    detail: "DSA practice",
    link: "https://www.geeksforgeeks.org/profile/sanjaiykumaf50q",
  },
  {
    platform: "HackerRank",
    value: 25,
    suffix: "+",
    label: "problems solved",
    detail: "1 certificate earned",
    link: "https://www.hackerrank.com/profile/sanjaiykumar_sv1",
  },
];

export const certifications = [
  {
    title: "Java Programming Basics",
    platform: "Udemy",
    year: "2024",
    link: "https://drive.google.com/file/d/17gyF8aHuKP6IGqysXfRIWM5eGJqPKG09/view",
  },
  {
    title: "Mastering Data Structures & Algorithms using C and C++",
    platform: "Udemy",
    year: "2024",
    link: "https://drive.google.com/file/d/1v9Ye2vbSNy-pQtD6sVgYCU6tJETTnuPH/view",
  },
  {
    title: "SQL Basics",
    platform: "HackerRank",
    year: "2024",
    link: "https://drive.google.com/file/d/17ZJ7S3GP7zacRqfTp_uTF4DS3IzORf4Y/view",
  },
  {
    title: "Flutter REST API Development",
    platform: "Udemy",
    year: "2025",
    link: "https://drive.google.com/file/d/1I3VlfHtLk8jb_z11MtHcLAQkFtrVPMyC/view",
  },
  {
    title: "Flutter & Dart: Developing iOS and Android Apps",
    platform: "Coursera",
    year: "2025",
    link: "https://drive.google.com/file/d/17dEiwsi0Z_gF9FabsyIj0HxhD_qi3aMu/view",
  },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

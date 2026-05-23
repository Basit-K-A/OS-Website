export const siteConfig = {
  osName: "portfolioOS",
  user: "portfolio",
  hostname: "portfolio",
  github: "https://github.com/Basit-K-A",
  linkedin: "https://www.linkedin.com/in/basit-khan-202616247/",
  instagram: "https://www.instagram.com/basit.o55/",
  name: "Basit Khan",
  title: "Software Engineer",
  tagline: "Building clean systems with a terminal-first mindset.",
};

export const about = {
  bio: `Hello, I'm ${siteConfig.name}, a ${siteConfig.title.toLowerCase()} focused on minimal interfaces, reliable backends, and developer experience. I treat every project like a well-configured Linux box: small surface area, sharp tools, predictable behavior.`,
  stack: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "Linux",
    "Tailwind CSS",
  ],
};

export const projects = [
  {
    id: "mini-it-platform",
    name: "Mini-IT-Platform",
    description:
      "Containerized FastAPI-based IT platform focused on backend engineering, infrastructure management, security monitoring, and cloud deployment.",
    tech: ["TypeScript", "Next.js", "React", "FastAPI", "Docker", "Linux", "Tailwind CSS"],
    url: "https://github.com/Basit-K-A/Mini-IT-Platform",
  },
  {
    id: "cp372-ds-ftp",
    name: "CP372_DS-FTP",
    description: "Data structures project implementing FTP client/server communication.",
    tech: ["Java", "FTP", "Sockets"],
    url: "https://github.com/Basit-K-A/CP372_DS-FTP-main",
  },
];

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  /** Full post paragraphs — omit for “coming soon” list-only entries */
  body?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "learning-building-growing",
    title: "Learning, Building, and Growing",
    date: "2026-05-23",
    excerpt:
      "From Linux curiosity to programming, why I keep building and exploring.",
    body: [
      "I've always been drawn to learning whether it was understanding how computers worked, exploring Linux systems, or figuring out why certain technologies are built the way they are. That curiosity eventually led me into programming, where every project became an opportunity to solve problems and learn something new.",
      "What started as experimenting with code quickly turned into a genuine passion for building. I enjoy creating systems that are both functional and meaningful, from backend applications and infrastructure tools to interactive interfaces inspired by the software I use every day. For me, coding is more than just writing software — it's a constant process of growth, creativity, and discovery.",
      "The more I learn, the more I realize there's always another layer to explore, and that's exactly what keeps me motivated to keep building.",
    ],
  },
];

export const experience = [
  {
    id: "exp-1",
    role: "IT Technician",
    company: "Waterloo Regional Health Network",
    period: "Sep 2025 - August 2026",
    summary: "Maintained and troubleshot hardware, software, and network issues across 40+ hospital departments, ensuring minimal downtime in a high-stakes environment.",
  },
  {
    id: "exp-2",
    role: "Geek Squad Agent",
    company: "Best Buy Canada",
    period: "Jun 2024 — Aug 2025",
    summary: "Provided in-store and remote tech support for a wide range of consumer electronics, consistently receiving positive customer feedback for clear communication and effective solutions.",
  },
  {
    id: "exp-3",
    role: "Science Maker Lab Assistant",
    company: "Wilfrid Laurier University",
    period: "Oct 2024 - May 2025",
    summary: "Assisted students and faculty with 3D printing, laser cutting, and electronics prototyping, fostering a collaborative environment for innovation and hands-on learning.",
  },
];

export const terminalResponses: Record<string, string[]> = {
  about: [
    "$ open about",
    "Launching about window...",
    "Done.",
  ],
  projects: [
    "$ open projects",
    "Launching projects window...",
    "Done.",
  ],
  blog: [
    "$ open blog",
    "Launching blog window...",
    "Done.",
  ],
  experience: [
    "$ open experience",
    "Launching experience window...",
    "Done.",
  ],
  contact: [
    "$ open contact",
    "Launching contact window...",
    "Done.",
  ],
};

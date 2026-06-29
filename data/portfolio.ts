export const siteConfig = {
  osName: "portfolioOS",
  user: "portfolio",
  hostname: "portfolio",
  webringMember: "basit-khan",
  github: "https://github.com/Basit-K-A",
  linkedin: "https://www.linkedin.com/in/basit-khan-202616247/",
  instagram: "https://www.instagram.com/basit.o55/",
  email: "khan8019@mylaurier.ca",
  name: "Basit Khan",
  title: "Software Engineer",
  jobTitle: "Computer Science Student",
  tagline: "Building clean systems with a terminal-first mindset.",
  university: {
    name: "Wilfrid Laurier University",
    shortName: "WLU",
    url: "https://www.wlu.ca/",
  },
};

export const about = {
  bio: `Hello, I'm ${siteConfig.name}, a ${siteConfig.jobTitle.toLowerCase()} at ${siteConfig.university.name} (${siteConfig.university.shortName}) and aspiring ${siteConfig.title.toLowerCase()} focused on minimal interfaces, reliable backends, and developer experience. I treat every project like a well-configured Linux box: small surface area, sharp tools, predictable behavior.`,
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
  slug?: string;
  title: string;
  date: string;
  modified?: string;
  excerpt: string;
  tags?: string[];
  readingTimeMinutes?: number;
  /** Full post paragraphs — omit for “coming soon” list-only entries */
  body?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "building-aster",
    slug: "building-aster",
    title: "Building Aster: A Stack-Based Language and VM",
    date: "2026-06-24",
    modified: "2026-06-24",
    excerpt:
      "Designing a custom programming language and stack-based virtual machine in C++ from the ground up.",
    tags: ["Aster", "C++", "Compilers", "Virtual Machine", "Basit Khan"],
    readingTimeMinutes: 3,
    body: [
      "Aster started as a question I kept coming back to: what would it take to build a programming language that I actually understand end to end—not just the syntax, but the full path from source code to execution?",
      "The project is a custom programming language paired with a stack-based virtual machine, both written in C++. Instead of treating the compiler and runtime as black boxes, I wanted to own every layer: parsing, bytecode generation, stack operations, and how values move through the system at runtime.",
      "A stack-based VM felt like the right starting point. The execution model is simple enough to reason about while still forcing real design decisions—how functions call each other, how memory is represented, and how errors surface when the stack is in an invalid state.",
      "Working in C++ added another layer of learning. Managing memory, structuring modules cleanly, and keeping the codebase maintainable as features grow has been as educational as the language design itself.",
      "Aster is still evolving, but it has already changed how I think about other languages and runtimes. When you build the machine that runs the code, every abstraction elsewhere starts to make more sense.",
    ],
  },
  {
    id: "building-vectordb",
    slug: "building-vectordb",
    title: "Building VectorDB: Semantic Search From Scratch",
    date: "2026-06-10",
    modified: "2026-06-10",
    excerpt:
      "A custom vector database with embedding storage, ANN indexing, metadata filtering, and RAG-powered retrieval.",
    tags: ["VectorDB", "RAG", "Semantic Search", "Backend", "Basit Khan"],
    readingTimeMinutes: 3,
    body: [
      "As more applications lean on embeddings and retrieval-augmented generation, I wanted to understand what happens underneath managed vector databases—not just how to call an API, but how vectors are stored, indexed, and searched efficiently.",
      "VectorDB is a custom retrieval engine built from scratch. It handles embedding storage, approximate nearest neighbour (ANN) indexing, metadata filtering, and document retrieval workflows suited to RAG-style applications.",
      "The interesting part was balancing correctness with performance. Semantic search only matters if results are relevant, but speed still counts when you are iterating on a project locally or serving queries in real time. Building ANN indexing myself made the trade-offs tangible: recall, latency, and memory all pull in different directions.",
      "Metadata filtering was another piece I cared about. In practice, vector search rarely stands alone—you want to narrow results by tags, sources, or document properties before ranking by similarity. Wiring that into the retrieval pipeline made the tool feel closer to something you would actually use.",
      "This project pushed my backend and systems thinking further than a tutorial ever could. It also gave me a much clearer picture of how modern AI applications connect search, storage, and generation into one workflow.",
    ],
  },
  {
    id: "building-mini-it-platform",
    slug: "building-mini-it-platform",
    title: "Building the Mini IT Platform",
    date: "2026-05-28",
    modified: "2026-05-28",
    excerpt:
      "A containerized FastAPI platform for infrastructure management, security monitoring, and cloud deployment.",
    tags: ["Mini IT Platform", "FastAPI", "Docker", "Infrastructure", "Basit Khan"],
    readingTimeMinutes: 3,
    body: [
      "The Mini IT Platform grew out of a simple goal: build something that feels like real infrastructure software, not just a single-feature demo. I wanted a project that touched backend engineering, deployment, monitoring, and day-to-day IT operations in one place.",
      "The platform is containerized and built around FastAPI on the backend, with a focus on infrastructure management, security monitoring, and cloud deployment workflows. Docker ties the services together so the environment is reproducible whether I am developing locally or preparing for deployment.",
      "One of the biggest lessons was thinking in systems instead of endpoints. IT platforms are not just CRUD APIs—they need logging, health checks, service boundaries, and a structure that can grow without turning into spaghetti. Designing with containers early helped enforce that mindset.",
      "Security monitoring added another layer of realism. Even in a small project, asking what should be tracked, how alerts are surfaced, and where sensitive data lives makes you design more carefully.",
      "Mini IT Platform is one of the projects that pushed me closest to industry-style backend work: multiple concerns, real deployment constraints, and software meant to stay running—not just compile once and forget.",
    ],
  },
  {
    id: "Who I Am",
    slug: "who-i-am",
    title: "Who I Am",
    date: "2026-05-23",
    modified: "2026-05-23",
    excerpt:
      "A Student at Wilfrid Laurier University and passionate employee at Waterloo Regional Health Network.",
    tags: ["Computer Science", "WLU", "Career", "Basit Khan"],
    readingTimeMinutes: 2,
    body: [
      "I’m a Computer Science student at Wilfrid Laurier University (WLU), currently building my foundation in software development, systems, and problem-solving.",
      "I’m especially interested in how code translates into real-world tools—whether that’s backend systems, infrastructure, or interactive applications.",
      "Outside of coursework, I spend a lot of time working on personal projects and experimenting with different technologies to expand beyond what’s taught in class.",
      "I enjoy breaking problems down, figuring out how systems connect, and gradually turning ideas into working software.",
      "Right now, I’m focused on improving my skills in backend development, cloud infrastructure, and building projects that feel closer to real industry systems.",
      "Over time, I’m aiming to grow into a developer who can work on scalable, reliable software that actually gets used.",
    ],
  },
  {
    id: "learning-building-growing",
    slug: "learning-building-growing",
    title: "Learning, Building, and Growing",
    date: "2026-05-23",
    modified: "2026-05-23",
    excerpt:
      "From Linux curiosity to programming, why I keep building and exploring.",
    tags: ["Software Engineering", "Learning", "Linux", "Basit Khan"],
    readingTimeMinutes: 2,
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

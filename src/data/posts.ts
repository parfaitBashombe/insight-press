export interface Author {
  name: string;
  avatar: string;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  author: Author;
  isFeatured?: boolean;
  date: string;
  image: string;
  category: string;
  tags?: string[];
}

export const posts: IPost[] = [
  {
    id: "1",
    title: "The Future of Web Development",
    content:
      "Exploring the latest trends in web development and where the industry is headed. Full article content goes here. You can expand with details, examples, and explanations...",
    author: {
      name: "Jane Doe",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    isFeatured: true,
    date: "2025-08-20",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    category: "Web Development",
    tags: ["JavaScript", "Next.js", "Trends"],
  },
  {
    id: "2",
    title: "Mastering Next.js for Modern Apps",
    content:
      "Why Next.js is the framework of choice for developers building modern web apps. Full article content goes here. You can expand with details, examples, and explanations...",
    author: {
      name: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    date: "2025-08-18",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    category: "Web Development",
    tags: ["Next.js", "React", "Productivity"],
  },
  {
    id: "3",
    title: "Design Principles for Minimal UI",
    content:
      "Learn how minimal design improves user experience and increases clarity. Full article content goes here. You can expand with details, examples, and explanations...",
    author: {
      name: "Alex Lee",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    },
    date: "2025-08-15",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    category: "UI/UX Design",
    tags: ["Minimalism", "UX", "Interface"],
  },
  {
    id: "4",
    title: "AI in Everyday Life",
    content:
      "From smart assistants to AI-driven tools, discover how artificial intelligence shapes our routines. Full article content goes here. You can expand with details, examples, and explanations...",
    author: {
      name: "Sophia Carter",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    date: "2025-08-12",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    category: "Artificial Intelligence",
    tags: ["AI", "Smart Tools", "Innovation"],
    isFeatured: true,
  },
  {
    id: "5",
    title: "Breaking Into Cybersecurity",
    content:
      "A beginner's guide to starting a career in the fast-growing field of cybersecurity. Full article content goes here. You can expand with details, examples, and explanations...",
    author: {
      name: "Michael Brown",
      avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    },
    date: "2025-08-10",
    image:
      "https://images.unsplash.com/photo-1605902711622-cfb43c44367f?auto=format&fit=crop&w=1200&q=80",
    category: "Cybersecurity",
    tags: ["Security", "Beginners", "Career"],
  },
  {
    id: "6",
    title: "The Rise of Remote Work",
    content:
      "How remote work is changing the way companies and individuals approach productivity. Full article content goes here. You can expand with details, examples, and explanations...",
    author: {
      name: "Emily Johnson",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    date: "2025-08-07",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    category: "Productivity",
    tags: ["Remote Work", "Work From Home", "Efficiency"],
  },
  {
    id: "7",
    title: "Blockchain Beyond Cryptocurrency",
    content:
      "Exploring the uses of blockchain technology outside of digital currencies. Full article content goes here. You can expand with details, examples, and explanations...",
    author: {
      name: "Daniel Evans",
      avatar: "https://randomuser.me/api/portraits/men/48.jpg",
    },
    date: "2025-08-05",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    category: "Blockchain",
    tags: ["Blockchain", "Tech", "Innovation"],
    isFeatured: true,
  },
  {
    id: "8",
    title: "Tips for Effective UI/UX Testing",
    content:
      "How to test your designs to ensure the best possible user experience. Full article content goes here. You can expand with details, examples, and explanations...",
    author: {
      name: "Laura Green",
      avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    },
    date: "2025-08-02",
    image:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=80",
    category: "UI/UX Design",
    tags: ["Testing", "UX", "Best Practices"],
  },
  {
    id: "9",
    title: "Why TypeScript Matters in 2025",
    content:
      "A look at why TypeScript continues to dominate modern JavaScript development. Full article content goes here. You can expand with details, examples, and explanations...",
    author: {
      name: "Chris Wilson",
      avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    },
    date: "2025-07-30",
    image:
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=80",
    category: "Web Development",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
  },
  {
    id: "10",
    title: "The Power of Open Source",
    content:
      "How open-source projects drive innovation and collaboration in the tech community. Full article content goes here. You can expand with details, examples, and explanations...",
    author: {
      name: "Olivia Martin",
      avatar: "https://randomuser.me/api/portraits/women/36.jpg",
    },
    date: "2025-07-28",
    image:
      "https://images.unsplash.com/photo-1581091870622-3d6a3b3f65b2?auto=format&fit=crop&w=1200&q=80",
    category: "Open Source",
    tags: ["Community", "Collaboration", "Innovation"],
  },
];

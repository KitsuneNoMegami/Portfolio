export const projects = [
  {
    id: 1,
    name: "Odie Rebirth Of The KPI",
    description: "A serious simulation game about auditing a large company",
    tags: ["GDScript"],
    image: "/images/portfolio/Odie.png",
    link: "https://github.com/KitsuneNoMegami/Odie-Rebirth-of-the-KPI",
    position: { x: 20, y: 30 }
  },
  {
    id: 2,
    name: "2048",
    description: "The 2048 game in C with multiple simultaneous game sessions possible",
    tags: ["C"],
    image: "/images/portfolio/2048.png",
    link: "https://github.com/Onefrenchboi/2048",
    position: { x: 80, y: 25 }
  },
  {
    id: 3,
    name: "Cramé Mais diplômé",
    description: "A serious game about students' mental health",
    tags: ["TypeScript", "Web"],
    image: "/images/portfolio/cramemaisdiplome.png",
    link: "https://crame-mais-diplome.vercel.app/",
    position: { x: 30, y: 70 }
  },
  {
    id: 4,
    name: "The Music Memory",
    description: "A web app to store music disc that we own",
    tags: ["Web", "PHP", "React"],
    image: "/images/portfolio/musicMemory.jpg",
    link: "https://github.com/Lejo54/TheMusicMemory",
    position: { x: 70, y: 75 }
  },
  {
    id: 5,
    name: "D&D",
    description: "A console-based Java game inspired by Dungeons & Dragons",
    tags: ["Java"],
    image: "/images/portfolio/dnd.jpg",
    link: "https://github.com/KitsuneNoMegami/DnD",
    position: { x: 45, y: 40 }
  },
  {
    id: 6,
    name: "Games in C",
    description: "A collection of simple games developed in the C",
    tags: ["C"],
    image: "/images/portfolio/tictactoe.png",
    link: "https://github.com/KitsuneNoMegami/Games-in-C",
    position: { x: 15, y: 55 }
  },
  {
    id: 7,
    name: "Libray App",
    description: "An online library management website",
    tags: ["TypeScript", "Java", "Web"],
    image: "/images/portfolio/clientweb.png",
    link: "https://github.com/KitsuneNoMegami/Architecte-Bien-Cable",
    position: { x: 85, y: 50 }
  },
  {
    id: 8,
    name: "Beautiful website",
    description: "The link to the repository for this awesome website",
    tags: ["Web"],
    image: "/images/portfolio/website.png",
    link: "https://github.com/KitsuneNoMegami/Portfolio",
    position: { x: 50, y: 85 }
  }
];

export const centralStar = {
  id: 0,
  name: "Beth",
  description: "Hi I'm Beth!",
  type: "central",
  position: { x: 50, y: 50 },
  image: "/images/me.png"
};

export const connections = [
  { from: 0, to: 1, color: "#e8a87c", width: 2 },
  { from: 0, to: 2, color: "#e8a87c", width: 2 },
  { from: 0, to: 3, color: "#e8a87c", width: 2 },
  { from: 0, to: 4, color: "#e8a87c", width: 2 },
  { from: 0, to: 5, color: "#e8a87c", width: 2 },
  { from: 0, to: 6, color: "#e8a87c", width: 2 },
  { from: 0, to: 7, color: "#e8a87c", width: 2 },
  { from: 0, to: 8, color: "#e8a87c", width: 2 }
];

export const skills = {
  frontend: ["React", "TypeScript", "HTML5", "CSS3", "JavaScript"],
  backend: ["Node.js", "PHP", "Java"],
  gameDev: ["GDScript", "Godot", "C"],
  other: ["Git", "GitHub", "Responsive Design"]
};

export const aboutMe = {
  intro: "I am a French student in my third year of a Bachelor's degree in Computer Science, specialising in the design, development and testing of applications.",
  hobbies: "In my free time, I like to read all day long, crochet useful or simply pretty items, go to the shooting range and try out other thrilling activities, and of course, code.",
  name: "Elisabeth MAUPAS",
  zodiac: "♈ Aries ↑ Libra ☊ Gemini"
};

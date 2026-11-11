// Champs optionnels par projet, affichés dans la fiche seulement s'ils existent :
//   role: "...", team: "Solo" | "Team of 4", learned: "...", demo: "https://..."
// positions : desktop (%) ; mobilePosition : écrans <= 768px (%)
export const projects = [
	{
		id: 1,
		group: "games",
		name: "Odie Rebirth Of The KPI",
		description: "A serious simulation game about auditing a large company",
		tags: ["GDScript"],
		image: "/images/portfolio/Odie.png",
		link: "https://github.com/KitsuneNoMegami/Odie-Rebirth-of-the-KPI",
		position: { x: 66, y: 20 },
		mobilePosition: { x: 28, y: 16 },
	},
	{
		id: 2,
		group: "games",
		name: "2048",
		description: "The 2048 game in C with multiple simultaneous game sessions possible",
		tags: ["C"],
		image: "/images/portfolio/2048.png",
		link: "https://github.com/Onefrenchboi/2048",
		position: { x: 86, y: 34 },
		mobilePosition: { x: 74, y: 18 },
	},
	{
		id: 3,
		group: "web",
		name: "Cramé Mais diplômé",
		description: "A serious game about students' mental health",
		tags: ["TypeScript", "Web"],
		image: "/images/portfolio/cramemaisdiplome.png",
		link: "https://crame-mais-diplome.vercel.app/",
		position: { x: 14, y: 34 },
		mobilePosition: { x: 76, y: 60 },
	},
	{
		id: 4,
		group: "web",
		name: "The Music Memory",
		description: "A web app to store music disc that we own",
		tags: ["Web", "PHP", "React"],
		image: "/images/portfolio/musicMemory.jpg",
		link: "https://github.com/Lejo54/TheMusicMemory",
		position: { x: 30, y: 14 },
		mobilePosition: { x: 24, y: 60 },
	},
	{
		id: 5,
		group: "games",
		name: "D&D",
		description: "A console-based Java game inspired by Dungeons & Dragons",
		tags: ["Java"],
		image: "/images/portfolio/dnd.jpg",
		link: "https://github.com/KitsuneNoMegami/DnD",
		position: { x: 82, y: 62 },
		mobilePosition: { x: 76, y: 31 },
	},
	{
		id: 6,
		group: "games",
		name: "Games in C",
		description: "A collection of simple games developed in the C",
		tags: ["C"],
		image: "/images/portfolio/tictactoe.png",
		link: "https://github.com/KitsuneNoMegami/Games-in-C",
		position: { x: 62, y: 78 },
		mobilePosition: { x: 24, y: 31 },
	},
	{
		id: 7,
		group: "web",
		name: "Libray App",
		description: "An online library management website",
		tags: ["TypeScript", "Java", "Web"],
		image: "/images/portfolio/clientweb.png",
		link: "https://github.com/KitsuneNoMegami/Architecte-Bien-Cable",
		position: { x: 22, y: 56 },
		mobilePosition: { x: 78, y: 73 },
	},
	{
		id: 8,
		group: "web",
		name: "Personal Website",
		description: "The link to the repository for this awesome website",
		tags: ["Web"],
		image: "/images/portfolio/website.png",
		link: "https://beths-corner.vercel.app/",
		position: { x: 30, y: 78 },
		mobilePosition: { x: 26, y: 73 },
	},
];

export const centralStar = {
	id: 0,
	name: "Beth",
	description: "Hi I'm Beth!",
	type: "central",
	position: { x: 50, y: 50 },
	mobilePosition: { x: 50, y: 46 },
	image: "/images/me.png",
};

// members : ordre = ordre du tracé de la constellation
export const groups = [
	{ id: "web", name: "Web", featured: true, members: [3, 4, 7, 8] },
	{ id: "games", name: "Games", featured: false, members: [2, 1, 5, 6] },
];

export const skills = [
	{ title: "Web · Front-end", featured: true, items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Responsive Design"] },
	{ title: "Web · Back-end", featured: true, items: ["Node.js", "PHP", "Java"] },
	{ title: "Game dev", items: ["GDScript", "Godot", "C"] },
	{ title: "Tools", items: ["Git", "GitHub"] },
];

export const aboutMe = {
	name: "Elisabeth MAUPAS",
	zodiac: "♈ Aries ↑ Libra ☊ Gemini",
	intro: "I am a French student in my third year of a Bachelor's degree in Computer Science, specialising in the design, development and testing of applications.",
	focus: "My favourite playground is the web: front-end with React and TypeScript, plus a bit of back-end.",
	hobbies: "In my free time, I like to read all day long, crochet useful or simply pretty items, go to the shooting range and try out other thrilling activities, and of course, code.",
};

// À compléter : une ligne par étape (stage, projet de groupe, certification...)
export const journey = [{ period: "3rd year", title: "Bachelor's degree in Computer Science", text: "Design, development and testing of applications." }];

// Les champs vides ne sont pas affichés. À REMPLIR : website, email, linkedin, cv
export const contact = {
	website: "",
	github: "https://github.com/KitsuneNoMegami",
	email: "e_mops@hotmail.com",
	linkedin: "",
	cv: "",
};

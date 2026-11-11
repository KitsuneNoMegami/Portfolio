// Champs optionnels par projet, affichés dans la fiche seulement s'ils existent :
//   role: "...", team: "Solo" | "Team of 4", learned: "...", demo: "https://..."
// positions : desktop (%) ; mobilePosition : écrans <= 768px (%)
export const projects = [
	{
		id: 1,
		group: "games",
		name: "Odie Rebirth Of The KPI",
		description: "A serious simulation game about auditing a large company",
		tags: ["GDScript", "University"],
		image: "/images/portfolio/Odie.png",
		link: "https://github.com/KitsuneNoMegami/Odie-Rebirth-of-the-KPI",
		position: { x: 89, y: 44 },
		mobilePosition: { x: 46, y: 77 },
	},
	{
		id: 2,
		group: "games",
		name: "2048",
		description: "The 2048 game in C with multiple simultaneous game sessions possible",
		tags: ["C", "University"],
		image: "/images/portfolio/2048.png",
		link: "https://github.com/Onefrenchboi/2048",
		position: { x: 63, y: 20 },
		mobilePosition: { x: 18, y: 63 },
	},
	{
		id: 3,
		group: "web",
		name: "Cramé Mais diplômé",
		description: "A serious game about students' mental health",
		tags: ["TypeScript", "Web","University"],
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
		tags: ["Web", "PHP", "React","TypeScript"],
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
		tags: ["Java", "University"],
		image: "/images/portfolio/dnd.jpg",
		link: "https://github.com/KitsuneNoMegami/DnD",
		position: { x: 73, y: 80 },
		mobilePosition:{ x: 82, y: 64 },
	},
	{
		id: 6,
		group: "web",
		name: "Libray App",
		description: "An online library management website",
		tags: ["TypeScript", "Java", "Web","University"],
		image: "/images/portfolio/clientweb.png",
		link: "https://github.com/KitsuneNoMegami/Architecte-Bien-Cable",
		position: { x: 22, y: 56 },
		mobilePosition: { x: 78, y: 73 },
	},
	{
		id: 7,
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
	{ id: "web", name: "Web", featured: true, members: [3, 4, 6, 7] },
	{ id: "games", name: "Games", featured: false, members: [2, 1, 5] },
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

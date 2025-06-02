type Project = {
	name: string;
	type: "tool" | "web" | "other";
	url?: string;
	slug?: string;
	color?: string;
	description?: string;
	sections?: {
		title: string;
		content: string[];
	}[];
	year: string;
};

export const projects: Project[] = [
	// {
	// 	name: 'Hard-Chor',
	// 	type: 'web',
	// 	// description: 'A simple, secure CLI tool for encrypting and decrypting secret files',
	// 	url: 'https://hard-chor-dummy.vercel.app',
	// 	year: '2025',
	// },
	// {
	// 	name: 'Alter Ego Festival',
	// 	type: 'web',
	// 	// description: 'They try to make the world largest music artists come closer to their fans.',
	// 	url: 'https://alteregofestival.at',
	// 	year: '2025',
	// },
	{
		name: "Cloak",
		type: "tool",
		// description: 'A simple, secure CLI tool for encrypting and decrypting secret files',
		url: "https://github.com/bnmwag/cloak",
		year: "2025",
	},
	{
		name: "Swine & Wine",
		type: "web",
		url: "https://swine-wine.net",
		// slug: 'swine-and-wine',
		// color: '#801431',
		// description:
		// 	'Swine & Wine is a global veterinary network focused on advancing swine health through consulting and collaboration. I was responsible for developing their web based on Figma designs provided by a freelance designer working closely with the client. My task was to bring the designs to life using a modern tech stack while delivering a flexible content management solution, robust deployment infrastructure, and keeping hosting costs to an absolute minimum.',
		// sections: [
		// 	{
		// 		title: 'Scope',
		// 		content: [
		// 			'The brief was simple in theory, but complex in execution: turn a static, design-heavy concept into a performant, fully responsive web, powered by a CMS that non-technical users could manage — and host it on a shoestring budget.',
		// 			'I built the site using Next.js and Tailwind CSS, which allowed me to maintain design accuracy while keeping the frontend lightweight and responsive. For accessibility, I leveraged Radix UI, which provided prebuilt, accessible components and saved time on compliance and ARIA concerns.',
		// 			'Content management was powered by Payload CMS, a self-hosted Node.js-based system that gave us full control over the schema and editing experience. The CMS supports complex, modular content structures, which came in handy for features like the member directory and dynamic header grids.',
		// 		],
		// 	},
		// 	{
		// 		title: 'Highlights',
		// 		content: [
		// 			'One of the biggest challenges was building a robust CI/CD pipeline for a client who couldn’t afford enterprise hosting. I set up a lightweight, automated deployment system using GitHub Actions and Docker Swarm/Stack, hosted on a low-cost shared server I sourced myself. This kept infrastructure costs low while still allowing for automated preview and production builds.',
		// 			'Another interesting aspect was implementing the modular header grid system from the designs. These components required responsive behavior across screen sizes and precise control over layout logic. Tailwind’s utility-first approach, combined with Next.js’ layout and component model, helped me implement these with pixel-perfect accuracy and clean maintainability.',
		// 			'Throughout the project, I worked in close feedback loops with the designer to ensure accurate implementation, while also handling 2–3 feedback rounds with the client directly post-handoff. Although the designer manages the CMS post-launch, I conducted a short onboarding call with the client to walk them through the backend and editing process.',
		// 		],
		// 	},
		// 	{
		// 		title: 'Outcome',
		// 		content: [
		// 			'The completed site gave Swine & Wine a reliable and modern online presence. It allowed their internal team to manage and publish content independently, while offering visitors an intuitive, informative experience across devices. The collaboration between design and development was seamless, and the infrastructure I delivered ensures the site remains easy to maintain and scale over time.',
		// 			'You can view the live project here: <a href="https://swine-wine.net" target="_blank" rel="noopener noreferrer" class="text-foreground-muted hover:underline hover:text-white transition-colors duration-300">swine-wine.net</a>',
		// 		],
		// 	},
		// ],
		year: "2024",
	},
	{
		name: "Assa Abloy - Multi Residential",
		type: "web",
		url: "https://www.assaabloy.com/group/emeia/solutions/industries/residential/multi-residential/new-buildings#gw-group-embed-507ccb1404",
		// slug: 'assa-abloy-multi-residential',
		year: "2024",
	},
	{
		name: "OTT-JAKOB Gesamtspannsysteme",
		type: "web",
		url: "https://www.ott-jakob.de/gesamtspannsysteme/",
		// slug: 'ott-jakob-gesamtspannsysteme',
		year: "2022",
	},
];

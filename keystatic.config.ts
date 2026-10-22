import { config, fields, collection } from "@keystatic/core";

export default config({
	storage: import.meta.env.PROD ? { kind: "github", repo: "youruser/site" } : { kind: "local" },

	collections: {
		projects: collection({
			label: "Project",
			slugField: "title",
			path: "src/data/projects/*",
			format: { data: "json" },
			schema: {
				title: fields.slug({ name: { label: "Title" } }),
				siteUrl: fields.text({ label: "Site url" }),
				githubUrl: fields.text({ label: "Github url" }),
				year: fields.text({ label: "Year created" }),
				image: fields.image({
					label: "Cover image",
					directory: "public/images/packages",
					publicPath: "/images/packages/",
				}),
				excerpt: fields.text({ label: "Excerpt", multiline: true }),
				descriptions: fields.array(
					fields.object({
						title: fields.text({ label: "Section title" }),
						details: fields.text({ label: "Details", multiline: true }),
					}),
					{ label: "Descriptions", itemLabel: (p) => p.fields.title.value },
				),
				tools: fields.array(
					fields.object({
						icon: fields.text({ label: "Tool icon" }),
						name: fields.text({ label: "Tool name" }),
					}),
					{ label: "Tools", itemLabel: (p) => p.fields.name.value },
				),
			},
		}),

		experiences: collection({
			label: "Experience",
			slugField: "title",
			path: "src/data/experiences/*",
			format: { data: "json" },
			schema: {
				title: fields.text({ label: "Title" }),
				companyName: fields.text({ label: "Company name" }),
				companyUrl: fields.text({ label: "Company url" }),
				duration: fields.text({ label: "2020 - Present" }),
				summary: fields.text({ label: "Short summary", multiline: true }),
				tools: fields.array(
					fields.object({
						icon: fields.text({ label: "Tool icon" }),
						name: fields.text({ label: "Tool name" }),
					}),
					{ label: "Tools", itemLabel: (p) => p.fields.name.value },
				),
			},
		}),

		posts: collection({
			label: "Blog",
			slugField: "title",
			path: "src/data/posts/*",
			format: { contentField: "content" },
			schema: {
				title: fields.slug({ name: { label: "Title" } }),
				date: fields.date({ label: "Publish date" }),
				excerpt: fields.text({ label: "Excerpt", multiline: true }),
				content: fields.markdoc({ label: "Content" }),
			},
		}),
	},
});

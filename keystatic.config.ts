import { config, fields, collection } from "@keystatic/core";

export default config({
	storage: import.meta.env.PROD ? { kind: "github", repo: "youruser/site" } : { kind: "local" },

	collections: {
		packages: collection({
			label: "Tour Packages",
			slugField: "title",
			path: "src/data/packages/*",
			format: { data: "json" },
			schema: {
				title: fields.slug({ name: { label: "Title" } }),
				price: fields.integer({ label: "Price (USD)", validation: { min: 0 } }),
				duration: fields.text({ label: "Duration (e.g. 3 days)" }),
				summary: fields.text({ label: "Short summary", multiline: true }),
				image: fields.image({
					label: "Cover image",
					directory: "public/images/packages",
					publicPath: "/images/packages/",
				}),
				itinerary: fields.array(
					fields.object({
						title: fields.text({ label: "Day title" }),
						details: fields.text({ label: "Details", multiline: true }),
					}),
					{ label: "Itinerary", itemLabel: (p) => p.fields.title.value },
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

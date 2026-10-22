// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";

import cloudflare from "@astrojs/cloudflare";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

const isDev = process.argv.includes("dev");

// https://astro.build/config
export default defineConfig({
	site: "portofolio-site.antav1.workers.dev",
	integrations: [react(), markdoc(), keystatic(), icon()],
	adapter: isDev ? undefined : cloudflare(),

	vite: {
		plugins: [tailwindcss()],
	},
});

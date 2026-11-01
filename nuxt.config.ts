// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	routeRules: {
		"/": { prerender: true },
		"/products/**": { swr: 3600, cache: { varies: ["accept"] } },
		"/blog/**": { isr: false },
		"/admin/**": { ssr: false, robots: false },
		"/api/**": { cors: true },
		"/old-page": { redirect: "/new-page" },
	},
	modules: [
		"@nuxt/eslint",
		"@nuxt/fonts",
		"@nuxt/hints",
		"@nuxt/icon",
		"@nuxt/image",
		"@nuxt/ui",
		"@nuxtjs/better-auth",
		"@nuxtjs/color-mode",
		"@nuxtjs/i18n",
		"@nuxtjs/seo",
		"@vueuse/nuxt",
		"shadcn-nuxt",
	],
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	colorMode: {
		preference: "dark",
		classSuffix: "",
	},
	app: {
		pageTransition: { name: "page", mode: "out-in" },
		baseURL: process.env.NUXT_APP_BASE_URL || "/",
	},
	css: ["~/assets/css/main.css", "~/assets/css/tailwind.css"],
	site: {
		url: process.env.NUXT_PUBLIC_SITE_URL || "https://openquery.dev",
		name: "OpenQuery",
		description:
			"Web development insights, tutorials, and thoughts from Islam Ahmed (@SoftEng)",
		defaultLocale: "en",
		trailingSlash: true,
	},
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			include: ["@unhead/schema-org/vue", "lucide-vue-next"],
		},
	},
	eslint: {
		config: {
			stylistic: {
				semi: true,
				quotes: "double",
				commaDangle: "always-multiline",
				indent: "tab",
			},
		},
	},
	// This configuration tells the module not to reach out to the internet
	fonts: {
		defaults: {
			weights: [400],
			styles: ["normal", "italic"],
			subsets: [
				"cyrillic-ext",
				"cyrillic",
				"greek-ext",
				"greek",
				"vietnamese",
				"latin-ext",
				"latin",
			],
		},
		processCSSVariables: true,
		families: [
			{
				name: "Karla",
				provider: "npm",
				global: true,
				weights: [400, 700],
			},
			{
				name: "Inter",
				provider: "npm",
				global: true,
				weights: [400, 700],
			},
		],
	},
	i18n: {
		locales: [
			{ code: "en", language: "en-US", name: "English", dir: "ltr" },
			{ code: "ar", language: "ar-EG", name: "العربية", dir: "rtl" },
		],
		defaultLocale: "en",
		strategy: "prefix_except_default",
	},
	ogImage: {
		zeroRuntime: true, // Disables dynamic server-side image generation
	},
	shadcn: {
		/**
		 * Prefix for all the imported component.
		 * @default "Ui"
		 */
		prefix: "",
		/**
		 * Directory that the component lives in.
		 * Will respect the Nuxt aliases.
		 * @link https://nuxt.com/docs/api/nuxt-config#alias
		 * @default "@/components/ui"
		 */
		componentDir: "@/components/ui",
	},
});

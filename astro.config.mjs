// @ts-check
import { defineConfig } from "astro/config";

// SITE_URL and BASE_PATH let the same build work on Netlify (served from "/")
// and GitHub Pages project sites (served from "/<repo>/"). See README.md.
export default defineConfig({
  site: process.env.SITE_URL || "https://example.com",
  base: process.env.BASE_PATH || "/",
  trailingSlash: "ignore",
  build: { format: "directory" },
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
});

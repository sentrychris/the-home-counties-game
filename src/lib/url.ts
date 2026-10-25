import fs from "node:fs";
import path from "node:path";

const BASE = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

/**
 * Site-relative link that still works when the site lives in a sub-folder
 * (GitHub Pages project sites). Content files write paths like "map/" or
 * "images/x.webp"; external links and anchors pass through untouched.
 */
export function url(p = ""): string {
  if (/^([a-z]+:|#|\/\/)/i.test(p)) return p;
  return BASE + p.replace(/^\/+/, "");
}

/** Does a file exist under public/? Used to fall back to placeholders. */
export function publicFileExists(p: string | undefined): boolean {
  if (!p || /^([a-z]+:|\/\/)/i.test(p)) return Boolean(p);
  return fs.existsSync(path.join(process.cwd(), "public", p.replace(/^\/+/, "")));
}

/** srcset for screenshots that have a "-800" sibling made by `npm run images`. */
export function screenshotSrcset(p: string): string | undefined {
  const small = p.replace(/\.webp$/, "-800.webp");
  if (small === p || !publicFileExists(small)) return undefined;
  return `${url(small)} 800w, ${url(p)} 1600w`;
}

/** Is this the current section of the site? */
export function isCurrent(pathname: string, href: string): boolean {
  const target = url(href).replace(/\/$/, "");
  const here = pathname.replace(/\/$/, "");
  return here === target || here.startsWith(`${target}/`);
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function formatPounds(n: number): string {
  return `£${n.toLocaleString("en-GB")}`;
}

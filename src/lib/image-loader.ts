"use client";

/**
 * Image loader for the static export. Images are served as-is from /public, so this only
 * prefixes the GitHub Pages base path (next/image doesn't add basePath to string srcs).
 * The `w` query is ignored by the host but keeps each srcset entry unique.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (/^https?:\/\//.test(src)) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}?w=${width}`;
}

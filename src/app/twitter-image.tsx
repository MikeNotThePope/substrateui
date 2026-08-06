/*
 * X/Twitter falls back to og:image when no twitter:image is present, but the
 * fallback is theirs to change and other summary_large_image consumers are
 * less forgiving. Re-exporting the Open Graph card emits the tag explicitly
 * for one line of code and no second design to keep in sync.
 */
export { alt, size, contentType, default } from "./opengraph-image"

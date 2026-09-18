import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// The `/utils` entry, and a JSX-returning helper cannot live in a .ts file.
// It stays here rather than in components/ui because it renders no component of
// its own: it is a function over a string.
export { linkify } from "./linkify"

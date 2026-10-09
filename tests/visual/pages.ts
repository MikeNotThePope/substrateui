import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

// Every page the rendered checks visit: each component and layout docs page.
// Each renders its examples inside ComponentPreview, whose data-specimen-body
// is what the checks read.

const docSections = ['components', 'layouts'] as const;

function getSlugs(section: (typeof docSections)[number]): string[] {
  const dir = join(process.cwd(), 'src/app/docs', section);
  try {
    return readdirSync(dir)
      .filter((name) => statSync(join(dir, name)).isDirectory())
      .sort();
  } catch {
    return [];
  }
}

export const pages: Array<{ slug: string; path: string }> = [
  ...docSections.flatMap((section) =>
    getSlugs(section).map((slug) => ({ slug: `${section}/${slug}`, path: `/docs/${section}/${slug}` }))
  ),
];

/** `plum` is also what no attribute renders; the rest each set their own tokens. */
export const PALETTES = [null, 'plum', 'proof', 'substrate', 'lava', 'tundra'] as const;

/**
 * Every route the site serves: each `page.tsx` under `src/app`, read from disk
 * so a page added later is checked without anyone listing it. Dynamic
 * segments are left out, since there is no one URL to visit for them.
 */
function routesUnder(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name.startsWith('[') ? [] : routesUnder(full);
    if (name !== 'page.tsx') return [];
    const route = relative(join(process.cwd(), 'src/app'), dir).split(sep).join('/');
    return [`/${route}`];
  });
}

export const routes: string[] = routesUnder(join(process.cwd(), 'src/app')).sort();

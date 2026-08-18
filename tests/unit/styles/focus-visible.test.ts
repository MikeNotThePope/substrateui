import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

// --- The invariant ------------------------------------------------------------
//
// A focus ring belongs on `focus-visible:`, not `focus:`. The difference is
// whether it fires when you *click* the control: `focus:` draws a ring on a
// mouse click, `focus-visible:` leaves it to keyboard users, which is the whole
// point of the ring.
//
// Eleven components already used the right one. Five did not — the Dialog and
// Sheet close buttons, the Select trigger, Cascader, and Badge (whose classes
// were dead until someone rendered `badgeVariants` on a link, which the file
// invites). All five carried the same string, character for character, which is
// how a copied class drifts away from its own convention.
//
// Two things this deliberately does NOT flag, because both are correct and a
// blanket sweep would break them:
//
//   - `focus:bg-accent` / `focus:text-accent-foreground` on menu items, in
//     ContextMenu, DropdownMenu, Menubar, Select and NavigationMenu. A menu item
//     takes DOM focus from keyboard roving, and `focus-visible:` there would
//     stop the highlight following the arrow keys. Fourteen sites, all right.
//   - `has-focus:` in Calendar, which is a parent-has-a-focused-child variant
//     and not a focus ring at all.
//
// So the rule is narrow on purpose: a *ring* declared on `focus:`.

const UI_DIR = 'src/components/ui'

/**
 * A focus ring hung on `focus:` — `focus:ring-2`, `focus:ring-ring`, and friends.
 *
 * `(?<!has-)` earns its place: `\b` sits between the hyphen and `focus`, so a
 * word boundary alone matches inside `has-focus:ring-ring/50`, which Calendar
 * uses and which is a parent-has-a-focused-child variant rather than a ring on
 * this element. The first version of this rule reported Calendar and was wrong.
 *
 * `(?!offset-background)` excludes `focus:ring-offset-background`, which sets
 * the colour the ring is offset against rather than declaring a ring.
 */
const FOCUS_RING = /(?<!has-)\bfocus:ring-(?!offset-background)/

/**
 * The one place `focus:` is right, and why.
 *
 * SkipLink is `sr-only` until focused and reveals itself with
 * `focus:not-sr-only`. A ring on a different condition from the reveal would
 * draw on a link nobody can see, and the only way to reach it is Tab — so there
 * is no mouse-click case for `focus-visible:` to suppress.
 */
const DELIBERATE = new Set(['skip-link.tsx'])

function componentFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) componentFiles(full, found)
    else if (entry.endsWith('.tsx') && !entry.endsWith('.stories.tsx')) found.push(full)
  }
  return found
}

const files = componentFiles(UI_DIR)

describe('focus rings', () => {
  it('are declared on focus-visible, so they do not fire on a mouse click', () => {
    const wrong = files.filter((f) => {
      if (DELIBERATE.has(f.split('/').pop() as string)) return false
      return FOCUS_RING.test(readFileSync(f, 'utf8'))
    })

    expect(wrong, `these draw a focus ring on \`focus:\`, so it appears when the control is clicked with a mouse. Use \`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2\`, which is what the rest of the package uses.`).toEqual([])
  })

  it('leave the menu-item highlight alone', () => {
    // The other half of the rule. If a sweep ever converts these, the arrow
    // keys stop highlighting anything, and no snapshot changes — the highlight
    // only exists while a key is held.
    //
    // A floor on the total, not a per-file `toMatch`. The first version of this
    // asked each file to still contain one of `focus:bg-accent` OR
    // `focus:text-accent-foreground`, and converting every
    // `focus:text-accent-foreground` in menubar.tsx passed it, because
    // `focus:bg-accent` was still there to satisfy the alternation. A count
    // cannot be half-satisfied that way. Adding a menu item raises the floor;
    // removing one is the rare case where this needs a deliberate edit.
    const MENUS = [
      'context-menu.tsx',
      'dropdown-menu.tsx',
      'menubar.tsx',
      'select.tsx',
      'navigation-menu.tsx',
    ]
    const highlights = MENUS.reduce((n, m) => {
      const src = readFileSync(join(UI_DIR, m), 'utf8')
      return n + (src.match(/focus:(?:bg-accent|text-accent-foreground)\b/g) ?? []).length
    }, 0)

    expect(
      highlights,
      'menu items lost `focus:` highlights. A menu item takes DOM focus from ' +
        'keyboard roving, so `focus-visible:` there stops the highlight following ' +
        'the arrow keys — and nothing else catches it.'
    ).toBeGreaterThanOrEqual(29)
  })

  it('the scan reaches the component tree', () => {
    // Without this the rule above passes for free the day the walk breaks.
    expect(files.length).toBeGreaterThan(50)
    const canonical = files.filter((f) =>
      /focus-visible:ring-2/.test(readFileSync(f, 'utf8'))
    )
    expect(canonical.length).toBeGreaterThanOrEqual(10)
  })
})

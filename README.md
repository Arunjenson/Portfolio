# Arun Jenson — Portfolio

Personal portfolio built with an "observability" design concept — the site borrows the
visual language of performance-monitoring tools: waterfall charts, trace lines, flame
strips, and status pills. Every graphic means something; nothing is decorative.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) (CSS-first config, no `tailwind.config.js`)
- [GSAP](https://gsap.com) + ScrollTrigger for animations

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

- `lib/content.ts` — all copy lives here; nothing is hardcoded in JSX
- `app/` — layout (fonts, theme script, providers) and the single page
- `components/` — Nav, Hero, FocusAreas, Ticker, Work, Recognition, Footer, plus
  animation primitives (SplitText, Reveal, Spotlight, TraceLine) and site chrome
  (UIProvider, SiteChrome, CommandPalette)
- `public/images/` — drop in `arun.jpg`, `award-cruising.jpg`,
  `award-silent-soldier.jpg`; missing images fall back to labelled placeholders

## Easter eggs

- Type `slow` anywhere — feel what 2.9 s of LCP was like
- Type `fast` — it already is
- `⌘K` / `Ctrl+K` — command palette
- Triple-click the logo — all URLs green
- Konami code (`↑↑↓↓←→←→BA`) — turbo mode with a live FPS counter

Theme defaults to dark, persists to `localStorage`, and respects
`prefers-reduced-motion` throughout.

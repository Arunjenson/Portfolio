# Image backlog — /work/core-web-vitals

Five figure slots were removed before launch because the assets didn't exist yet.
The page ships with four real figures; these five are the ones to add back.

## How to add one back

1. Save the file to `public/images/cwv/<filename>.png`.
2. Drop a `<Figure>` into the section shown below (copy the shape from an existing one
   in `app/work/core-web-vitals/page.tsx`).
3. Renumber the `fig NN` labels so they stay sequential top to bottom.

`Figure` resolves the file at build time — a missing file renders a labelled
placeholder rather than a broken image or a failed request, so a slot can be added
before its asset lands.

## Shipped (4)

| # | id | section | files |
|---|---|---|---|
| 01 | `baseline` | §02 Mobile is the target | `baseline.png` |
| 02 | `gtm-comparison` | §04 Blocking time | `gtm-before.png`, `gtm-after.png` |
| 03 | `first-inp-fix` | §05 INP | `first-inp-fix.png` |
| 04 | `all-green` | §10 Where it landed | `final-cwv.png` |

## To add back (5)

### 1. `bundle-analyzer` — §03 LCP
After the "Finding what was actually shipping" sub-head.
- File: `bundle-analyzer.png` (1 panel)
- Caption: *What was actually shipping, before I stopped guessing.*
- Shot: bundle analyzer treemap — the pricing bundle sitting inside the signup form
  module, or Framer Motion before removal.

### 2. `inp-throttling` — §05 INP
After the "I set our bar harder than Google's" sub-head, before `first-inp-fix`.
- Files: `inp-6x.png`, `inp-20x.png` (2 panels, before/after)
- Caption: *The bar we held: under 200ms at 20×, not 6×.*
- Shot: the same interaction measured at 6× CPU throttling and at 20×, showing it
  still under 200ms at the harder bar.

### 3. `blog` — §06 Blog
After the "Against the grain" aside, before the traffic MetricBar.
- Files: `blog-shortcodes.png`, `blog-inp.png` (2 panels)
- Caption: *Fifteen hundred posts whose contents are authored, not coded — and where
  they landed.*
- Shot: a post as authored, showing template previews / GIFs / CTAs / forms injected
  from the CMS; paired with blog INP settling at 149ms.

### 4. `cls-regression` — §07 CLS
At the end of the section.
- File: `cls-banner.png` (1 panel)
- Caption: *A marketing feature, measured as a performance regression.*
- Shot: the Search Console Good-URL drop when the region banner shipped.

### 5. `css-split-before-after` — §08 Making it stick
After the "Then I stopped relying on memory altogether" paragraphs.
- Files: `css-split-before.png`, `css-split-after.png` (2 panels, before/after)
- Caption: *One route's Tailwind config, before and after the agent.*
- Shot: the broad content glob scanning ~500 components, against the rewritten config
  listing only what the route imports.

## Notes for whoever adds these

- Upload screenshots **raw**. Crop before/after pairs to identical bounds so the two
  panels are directly comparable — the three Search Console figures are all cropped to
  the same frame for this reason, and the two Lighthouse reports to another.
- Set `aspect` to the real ratio of the cropped file (e.g. `"960/770"`) so nothing is
  letterboxed. Panels use `object-contain`, since cropping a chart loses its data.
- Check what a screenshot exposes before publishing. The Lighthouse pair is cropped
  below the category ring row on purpose: the "after" run shows an SEO score dip that
  is a lab-audit artefact, not a ranking change, and it sits near the page's
  "no SEO regression" constraint.

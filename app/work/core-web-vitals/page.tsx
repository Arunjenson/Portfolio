import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import SectionNav from "@/components/case/SectionNav";
import Figure from "@/components/case/Figure";
import {
  Aside,
  B,
  Lede,
  MetricBar,
  P,
  PullQuote,
  Readout,
  Section,
  SubAnchor,
} from "@/components/case/Blocks";
import { coreWebVitals as cs } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: cs.title,
  description: cs.description,
  alternates: { canonical: cs.href },
  openGraph: {
    type: "article",
    url: cs.href,
    title: cs.title,
    description: cs.description,
  },
  twitter: { card: "summary_large_image", title: cs.title, description: cs.description },
};

const IMG = "/images/cwv";

export default function CoreWebVitals() {
  return (
    <main className="max-w-6xl mx-auto px-5 sm:px-8">
      <Nav />

      <nav aria-label="Breadcrumb" className="font-mono font-medium text-[12px] pt-2 pb-8">
        <Link
          href="/work"
          className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          Work
        </Link>
        <span className="text-stone-300 dark:text-stone-700 mx-2">/</span>
        <span className="text-emerald-600 dark:text-emerald-400">Core Web Vitals</span>
      </nav>

      {/* ---------- hero: the 15-second layer ---------- */}
      <header className="pb-4">
        <Reveal immediate>
          <p className="font-mono font-medium text-[11.5px] uppercase tracking-[0.1em] text-emerald-600 dark:text-emerald-400 mb-5">
            Case study · {cs.company}
          </p>
        </Reveal>

        <Reveal immediate delay={0.08}>
          <h1
            className="font-display font-medium tracking-[-0.025em] leading-[1.06] max-w-[28ch]"
            style={{ fontSize: "clamp(2rem, 6.4vw, 3.15rem)" }}
          >
            {cs.titleLines[0]}
            <span className="block text-emerald-600 dark:text-emerald-400">
              {cs.titleLines[1]}
            </span>
          </h1>
        </Reveal>

        <Reveal immediate delay={0.16}>
          <p className="text-[17px] sm:text-[18.5px] leading-[1.55] text-stone-600 dark:text-stone-400 max-w-[46ch] mt-5 sm:mt-6">
            {cs.subtitle}
          </p>
          <p className="font-mono font-medium text-[12px] text-stone-500 dark:text-stone-400 leading-[1.9] mt-5 sm:mt-6">
            {cs.role}
            <br />
            {cs.company} · {cs.readingTime}
          </p>
        </Reveal>

        <Reveal immediate delay={0.24} className="mt-7 sm:mt-9">
          <Readout items={cs.metrics} />
        </Reveal>
      </header>

      {/* ---------- body ---------- */}
      <div className="grid xl:grid-cols-[168px_minmax(0,1fr)] gap-y-0 xl:gap-x-14 items-start mt-14 sm:mt-20">
        <SectionNav />

        {/* min-w-0: a grid item defaults to min-width:auto and would otherwise be
            widened by the table instead of letting it scroll in its own container */}
        <article data-progress className="min-w-0 max-w-[68ch] pb-4">
          <Lede>
            A 3,500-page marketing site taking a million visits a month, failing Core Web
            Vitals. No redesign allowed, no SEO regression acceptable. I worked on it from
            2024 as one of the engineers, then led it from 2025 when mobile stalled: LCP,
            INP, CLS and the blocking time underneath them, across eighteen modules. 900+
            URLs moved from failing to passing and 75% of URLs into the passing range on
            mobile — and by the end the fixes had turned into standards and the standards
            into tooling.
          </Lede>

          <Reveal>
            <P>
              In July 2024 our marketing site was failing Core Web Vitals about as
              comprehensively as a site can. PageSpeed sat around 38–40 on mobile, 60–62 on
              desktop. Most URL groups in Search Console were outside the passing range. And
              organic search was our primary acquisition channel, which meant this wasn’t an
              engineering vanity metric — it was the pipe the business drank from.
            </P>
            <P>
              Two constraints never moved. <B>No redesign</B> — the site was running live
              campaigns. <B>No SEO regression</B> — a performance win that cost rankings
              isn’t a win.
            </P>
            <P>
              A cross-functional effort spun up under Pranav K S, and I was one of the
              engineers on it.
            </P>
          </Reveal>

          {/* ---- 01 ---- */}
          <Section id="first-lesson">
            <Reveal>
              <P>My piece was templates, the second-largest module on the site.</P>
              <P>
                We had Next.js streaming enabled on template inner pages, showing a loading
                UI while content resolved. It’s a feature you turn on to make a page feel
                faster. Here it was doing the exact opposite: the loading skeleton was
                painting first, and the browser was recording <em>that</em> as the largest
                contentful paint.
              </P>
            </Reveal>

            <PullQuote>We were measuring our own placeholder.</PullQuote>

            <Reveal>
              <P>Turning streaming off on those routes moved the number immediately.</P>
            </Reveal>

            <MetricBar
              caption="Template LCP · desktop"
              note="over ~12 months"
              rows={[
                { tag: "before", value: "2.9s", pct: 100, tone: "bad" },
                { tag: "after", value: "1.2s", pct: 41, tone: "good" },
              ]}
            />

            <Reveal>
              <P>
                It wasn’t the whole fix — template LCP went from <B>2.9s to 1.2s</B> over
                about a year, and it got there the way these things always do, a dozen
                changes compounding, none of them individually decisive. But that first one
                taught me the habit that shaped everything after: before optimising
                anything, check what the metric is actually looking at. Half of performance
                work is discovering you were measuring something other than what you
                assumed.
              </P>
              <P>
                Templates went green on desktop days later. By September, desktop was green
                across the board and mobile Poor URLs were at zero.
              </P>
              <P>
                And then mobile stopped dead. It sat in “Needs improvement” and would not
                shift.
              </P>
            </Reveal>
          </Section>

          {/* ---- 02 ---- */}
          <Section id="mobile">
            {/* leads the section rather than closing it — this image is the section's
                thesis, so the evidence lands before the explanation */}
            <Figure
              id="fig 01 · baseline"
              caption="Desktop green, mobile stuck. Where I picked it up."
              panels={[
                {
                  src: `${IMG}/baseline.png`,
                  alt: "Search Console Core Web Vitals, February 2025. Mobile: 0 poor URLs, 1,666 needing improvement, 59 good. Desktop: 0 poor, 0 needing improvement, 1,724 good.",
                  state: "february 2025",
                  tone: "bad",
                  aspect: "960/770",
                  hint: "Search Console Core Web Vitals — the mobile and desktop cards side by side, mobile at 1,666 needing improvement against 59 good, desktop entirely green",
                },
              ]}
            />

            <Reveal>
              <P>
                That split is the whole story, and most performance write-ups skip it.
              </P>
              <P>
                Desktop is a fast CPU on a good connection. Mobile is a mid-range Android on
                patchy 4G, where every kilobyte of JavaScript costs main-thread time you
                don’t have. A fix that shows clearly on desktop can be invisible on mobile.
              </P>
              <P>
                But it runs the other way too, and that’s the useful part:{" "}
                <B>anything that works on mobile has already worked on desktop.</B> Mobile
                is the strictly harder constraint. There is no point optimising for the easy
                case.
              </P>
              <P>
                In January 2025 the SEO team formalised the work as a project. I took it
                over and made mobile the only thing we measured against.
              </P>
            </Reveal>

          </Section>

          {/* ---- 03 ---- */}
          <Section id="lcp">
            <Reveal>
              <P>
                LCP took more tickets than everything else combined, and I want to be honest
                about the shape of it — there was no hero fix. There were many, each worth a
                few hundred milliseconds.
              </P>
            </Reveal>

            <Reveal>
              <SubAnchor>Finding what was actually shipping</SubAnchor>
              <P>
                I ran the bundles through the analyzer rather than guessing, which is how you
                discover that a page is importing an animation library for one hover effect,
                or that a pricing bundle is riding along inside the signup form module.
                Framer Motion came out of home and pricing. The email list moved to an API
                route handler instead of shipping to the client. The phone input got
                lazy-loaded. None of it clever — all of it main-thread time back on a device
                that has none to spare.
              </P>
            </Reveal>

            <Reveal>
              <SubAnchor>Request discovery</SubAnchor>
              <P>
                On template inner pages the LCP image wasn’t present in the initial HTML, so
                the preload scanner couldn’t start fetching it during parse. Same image, same
                bytes, seconds later. The same class of bug turned up again on customer inner
                pages months afterwards, which is how I knew we had a pattern problem rather
                than a page problem.
              </P>

              <SubAnchor>The critical rendering path</SubAnchor>
              <P>
                Everything upstream of first paint got audited — what blocks, what can be
                deferred, what has no business being there at all.
              </P>

              <SubAnchor>CSS</SubAnchor>
              <P>
                Unused CSS in templates. Arbitrary Tailwind classes replaced with built-ins
                in the NPS module, which alone dropped that bundle sharply. Homepage CSS
                bundle. Pricing CSS split so locale-specific styles only load when needed.
              </P>

              <SubAnchor>Images</SubAnchor>
              <P>
                Template images were served as originals straight from S3, arriving at full
                weight regardless of what device asked. I wrote a migration script to move
                them into the CMS’s media library so they came back with generated responsive
                formats, then changed the frontend to consume that format set directly rather
                than leaning on runtime image optimisation to paper over it. Smaller bytes,
                chosen at build time, correct everywhere that asset is used from then on.
              </P>
              <P>
                The interesting part isn’t any one of these. It’s that no one of them would
                have been enough.
              </P>
            </Reveal>
          </Section>

          {/* ---- 04 ---- */}
          <Section id="blocking-time">
            <Reveal>
              <P>
                The suspicion was that third-party tags were hurting us, but suspicion
                doesn’t buy engineering time on someone else’s roadmap. So I counted:{" "}
                <B>48 tags, 593 KiB</B>, accumulated over years by teams who each had a
                reason to add one and no reason to ever remove one.
              </P>
              <P>
                Then I stopped arguing and measured it — the same page run twice through an
                INP debugger, once with tags loading and once without, both reports side by
                side. The gap made the case for me.
              </P>
            </Reveal>

            <Figure
              id="fig 02 · gtm-comparison"
              caption="Same page, same device, tags loading versus deferred. Lighthouse on an emulated Moto G Power, 8 April 2025."
              panels={[
                {
                  src: `${IMG}/gtm-before.png`,
                  alt: "Lighthouse report with all tags loading on page load: performance 32, Total Blocking Time 1,960 ms, LCP 8.4 s, FCP 3.4 s, Speed Index 10.0 s.",
                  state: "tags on load",
                  tone: "bad",
                  aspect: "17/10",
                  hint: "Lighthouse run with all 48 tags on load",
                },
                {
                  src: `${IMG}/gtm-after.png`,
                  alt: "Lighthouse report with tags deferred to first interaction: performance 87, Total Blocking Time 110 ms, LCP 2.9 s, FCP 2.7 s, Speed Index 4.5 s.",
                  state: "tags deferred",
                  tone: "good",
                  aspect: "17/10",
                  hint: "Same page and device, tags loading after first interaction",
                },
              ]}
            />

            <Reveal>
              <P>
                The fix was almost embarrassing.{" "}
                <B>
                  Stop loading the tags on page load. Load them after the first user
                  interaction instead.
                </B>{" "}
                Analytics doesn’t need to run before a human has done anything. Nothing was
                removed, no team lost their tag, and the main thread stayed clear during
                exactly the window that gets measured. Blocking time went from red to green.
              </P>
            </Reveal>

            <MetricBar
              caption="Total Blocking Time"
              note="lighthouse · emulated Moto G Power"
              rows={[
                { tag: "on load", value: "1,960ms", pct: 100, tone: "bad" },
                { tag: "deferred", value: "110ms", pct: 6, tone: "good" },
              ]}
            />

            <PullQuote>
              The best performance fixes are rarely clever. They’re usually a question about
              whether something needs to happen <em>when</em> it’s happening.
            </PullQuote>
          </Section>

          {/* ---- 05 ---- */}
          <Section id="inp">
            <Reveal>
              <P>
                INP replaced FID in March 2024 and it’s a different animal. FID measured the
                delay before your first interaction got processed. INP measures the full
                latency of every interaction across a visit, including painting the response
                — and it’s reported from field data.
              </P>
              <P>
                You cannot verify a fix from your own machine. Not with a better laptop, not
                with a cleverer profiler. You need real people on real phones actually
                clicking things. Every decision below comes from that.
              </P>
            </Reveal>

            <Reveal>
              <SubAnchor>I set our bar harder than Google’s</SubAnchor>
              <P>
                The official threshold is 200ms. But I kept finding sites that passed it and
                fell apart under heavy CPU throttling — fine at 6×, broken beyond. Passing on
                a good device says nothing about someone on a cheap Android, which described
                most of our mobile traffic. So we held to{" "}
                <B>under 200ms at 20× throttling</B>. Slower to reach, much more likely to be
                true.
              </P>
            </Reveal>

            <Reveal>
              <P>
                Measured against that bar, the demo flow — the most interaction-heavy path on
                the site — came down from <B>800ms to 280ms</B>. Not passing Google’s
                threshold on a good laptop. Passing it on a device being deliberately
                punished.
              </P>
            </Reveal>

            <MetricBar
              caption="Demo flow INP"
              note="at 20× CPU throttling"
              rows={[
                { tag: "before", value: "800ms", pct: 100, tone: "bad" },
                { tag: "after", value: "280ms", pct: 35, tone: "good" },
              ]}
            />

            <Reveal>
              <SubAnchor>I refused to roll out everywhere at once</SubAnchor>
              <P>
                Selective hydration was the technique I expected to work, and the tempting
                move was to ship it site-wide and watch the graph. Instead it went to two
                modules — Customers and Legal — and I waited for field data to tell me
                whether I was right. I was. Only then did it go to nine more.
              </P>
            </Reveal>

            <Aside label="The part I got wrong">
              <p>
                The site-wide INP fix shipped on 14 March 2025. Blog turned green in April.
                Nothing else moved. Not templates, not the homepage, not anything.
              </p>
              <p>
                I’d assumed a fix lands everywhere at once. It doesn’t.{" "}
                <B>INP validation is a function of traffic.</B> Blog was pulling 150k+ clicks
                a month, so its field data refreshed fast enough to show the change within
                weeks. Templates and homepage sat nearer 10k. Identical fix, identical
                effectiveness, completely different time-to-proof.
              </p>
              <p>
                That reframed the entire programme. Writing the fix was maybe a third of the
                job. The rest was sequencing modules by traffic, understanding how Google
                averages a URL group over a rolling window, and — mostly — managing the
                expectation upstairs that a graph would sit flat for months on work that was
                already finished.
              </p>
            </Aside>

            {/* same Search Console view as fig 01, two months later — the two frame
                identically on purpose, so the reader compares rather than re-reads */}
            <Figure
              id="fig 03 · first-inp-fix"
              caption="April 2025 — 992 mobile URLs good, up from 59 in February. The same view as fig 01, two months on."
              panels={[
                {
                  src: `${IMG}/first-inp-fix.png`,
                  alt: "Search Console Core Web Vitals, April 2025. Mobile: 0 poor URLs, 1,211 needing improvement, 992 good — the good line jumping vertically after the site-wide INP fix. Desktop: 2,188 good.",
                  state: "april 2025",
                  tone: "good",
                  aspect: "960/770",
                  hint: "The same Search Console Core Web Vitals view as fig 01, two months on",
                },
              ]}
            />

            <Reveal>
              <P>
                Where waiting wasn’t viable we generated interactions manually on the
                thin-traffic modules, which drew exactly the challenge it deserved:{" "}
                <em>aren’t you just masking the problem?</em>
              </P>
              <P>
                Fair question, and the answer had to be data rather than assertion. 80% of
                mobile users were experiencing good INP against 4.5% poor. The homepage had
                gone from 350ms+ to 162ms — a real halving, on a page still dragging twelve
                months of pre-fix history through its rolling average. Blog sat at 149ms. We
                weren’t manufacturing a pass. We were shortening the wait for one already
                earned.
              </P>
            </Reveal>

            <PullQuote>
              That exchange is the part of this project I’d most want to be asked about.
            </PullQuote>
          </Section>

          {/* ---- 06 ---- */}
          <Section id="blog">
            <Reveal>
              <P>
                Blog deserves its own section, because it carried this programme in two
                directions at once.
              </P>
            </Reveal>

            <Reveal>
              <SubAnchor>The hardest surface to optimise</SubAnchor>
              <P>
                Fifteen hundred posts, written by marketers, full of shortcodes — embedded
                template previews, GIFs, CTAs, forms — each one dropping components into the
                page from content rather than from code. You can’t reason about a page’s
                weight when the page’s contents are authored in a CMS. Blog got round after
                round of code optimisation over two years for exactly that reason.
              </P>
            </Reveal>

            <Aside label="Against the grain" tone="quiet">
              <p>
                One of those rounds is worth calling out, because it runs against everything
                else here: I went through the blog shortcodes and{" "}
                <B>removed Suspense boundaries</B>. Not added — removed. They’d been wrapped
                around components that weren’t deferring anything meaningful, so all they
                contributed was overhead and extra render passes. It’s the same lesson as the
                loading UI earlier: a React feature applied by reflex rather than by
                measurement usually costs you. Later, when I made Suspense boundaries the
                default for new pages, it was with that qualification attached — boundaries
                around work that actually defers, not boundaries everywhere.
              </p>
            </Aside>

            <Reveal>
              <P>
                Beyond that: template preview images inside shortcodes lazy-loaded, hero
                images moved onto generated formats, image quality and sizing fixed across
                the module.
              </P>
            </Reveal>

            <Reveal>
              <SubAnchor>The fastest feedback loop we had</SubAnchor>
              <P>
                Blog pulled 150k+ clicks a month against roughly 10k for templates and
                homepage, so its field data refreshed in weeks rather than months. It was the
                first module to turn green, in April 2025, and the bulk of that first wave of
                900+ URLs was blog. That made it the proving ground — if a technique worked,
                blog told us first, and blog’s numbers were what earned the room to keep going
                on everything else.
              </P>
            </Reveal>

            <MetricBar
              caption="Clicks per month — why time-to-proof differed"
              note="field data refresh"
              rows={[
                { tag: "blog", value: "150k+", pct: 100, tone: "good" },
                { tag: "templates", value: "~10k", pct: 7, tone: "flat" },
                { tag: "homepage", value: "~10k", pct: 7, tone: "flat" },
              ]}
            />

            <Reveal>
              <P>Blog INP settled at 149ms average.</P>
            </Reveal>
          </Section>

          {/* ---- 07 ---- */}
          <Section id="cls">
            <Reveal>
              <P>
                Unreserved space and late-injected content, fixed across pricing, homepage,
                use-cases and the HR toolkit.
              </P>
              <P>
                The instructive one was a regression rather than a fix. A region-based header
                banner resolved the visitor’s country from a client-side IP lookup, appeared
                after first paint, and shoved everything below it down the page. Good URLs
                dropped measurably. It had shipped as a marketing feature, not as performance
                work — which is how most regressions arrive, and why we had a bot posting the
                Search Console graph into Slack every morning. Unglamorous, and it caught
                things in a day instead of a quarter.
              </P>
            </Reveal>

          </Section>

          {/* ---- 08 ---- */}
          <Section id="making-it-stick">
            <Reveal>
              <P>
                About a year in, the same bugs started coming back. Not the hard ones — the
                ones we’d already solved. A lazy-load attribute on an LCP element. An unsized
                image. A component imported eagerly that three pages needed.
              </P>
              <P>
                A solved bug that returns is a process failure, not an engineering one. That
                was the point at which fixing things one at a time stopped being enough.
              </P>
            </Reveal>

            <Reveal>
              <SubAnchor>First, standards</SubAnchor>
              <P>
                I took what we’d learned to the team and we turned it into code review
                criteria — short, specific, drawn entirely from regressions we had actually
                shipped, rather than a generic performance guide nobody reads.
              </P>

              <SubAnchor>Then, defaults</SubAnchor>
              <P>
                Selective hydration had started as a fix applied to failing modules. Once it
                had proven out across eleven of them, I proposed it as the default: every new
                page wraps its non-critical interactive regions in Suspense boundaries rather
                than hydrating wholesale. It stopped being something we retrofitted after
                Search Console complained and became how pages get built here.
              </P>

              <SubAnchor>Then I stopped relying on memory altogether</SubAnchor>
              <P>
                CSS bloat was never going to survive as a checklist item — each route’s
                Tailwind config carried a broad glob that scanned every one of roughly 500
                components in the repo, so every page shipped styles for classes it never
                used. Nobody can audit that by hand, and it grew back every time someone
                added a component.
              </P>
              <P>
                So I wrote an agent for it. It traces a route’s real import graph from its
                entry files, resolves the path aliases, discards everything that can’t contain
                a Tailwind class, and rewrites the config to list only the components that
                route actually uses plus the shared layout. It previews before it writes,
                leaves the theme and shared config untouched, and reports what changed. One
                command, any route.
              </P>
            </Reveal>

            <Reveal>
              <P>
                The review criteria went the same way — from a document people were meant to
                remember into a review agent that reads the diff.
              </P>
            </Reveal>

            <PullQuote tone="amber">
              Fix the bug. Turn the fix into a standard. Turn the standard into something that
              doesn’t need anyone to remember it.
            </PullQuote>
          </Section>

          {/* ---- 09 ---- */}
          <Section id="what-it-cost">
            <Reveal>
              <P>
                A stricter bar meant slower progress — modules took longer to clear than they
                would have against Google’s threshold, and I’d defend that trade every time.
              </P>
              <P>
                Module-by-module was slower than one site-wide change. It was also
                attributable and reversible, and nothing ever had to be rolled back.
              </P>
              <P>
                Generating interactions manually is defensible but not comfortable. It
                accelerated validation of a fix that was already real, and it would have been
                indefensible without the field data behind it.
              </P>
              <P>
                And the one worth saying plainly: optimising for the metric is not the same as
                optimising for the user. Core Web Vitals is a good proxy, but a proxy. Some of
                this made pages genuinely faster on a cheap phone. Some of it moved a number
                nobody would consciously notice. Keeping that distinction visible is what stops
                performance work quietly becoming score-chasing.
              </P>
            </Reveal>
          </Section>

          {/* ---- 10 ---- */}
          <Section id="where-it-landed">
            <Reveal className="mb-8">
              <Readout
                items={[
                  { label: "Mobile users · good INP", value: "80%", note: "against 4.5% poor" },
                  {
                    label: "Template LCP",
                    value: "1.2s",
                    was: "2.9s",
                    note: "desktop · second-largest module",
                  },
                  {
                    label: "URLs into passing range",
                    value: "75%",
                    note: "mobile, across five URL groups",
                  },
                ]}
              />
            </Reveal>

            <Reveal>
              <P>
                900+ URLs from failing to passing on mobile in the first wave. Homepage INP
                350ms+ → 162ms, blog averaging 149ms, 80% of mobile users on good INP. Demo
                flow INP 800ms → 280ms at 20× throttling. Template LCP 2.9s → 1.2s. Blocking
                time red to green. <B>75% of URLs into the passing range on mobile</B>, across
                five URL groups — blog first and largest among them — and desktop green
                throughout.
              </P>
            </Reveal>

            <Figure
              id="fig 04 · all-green"
              caption="April 2026 — mobile and desktop both fully green. 1,581 good URLs, none needing improvement."
              panels={[
                {
                  src: `${IMG}/final-cwv.png`,
                  alt: "Search Console Core Web Vitals, April 2026. Mobile: 0 poor URLs, 0 needing improvement, 1,581 good. Desktop identical. The third point in the sequence after February 2025 and April 2025.",
                  state: "april 2026",
                  tone: "good",
                  aspect: "990/794",
                  hint: "Search Console Core Web Vitals, both cards fully green",
                },
              ]}
            />

            <Reveal>
              <P>
                The outcome I didn’t expect was becoming the person who explains this. The SEO
                team asked me to walk them through how Core Web Vitals actually work.
                Engineers on other squads started asking how INP behaves. Leadership stopped
                talking about it as a metric and started talking about it as organic traffic.
                Somewhere in there it stopped being a ticket someone picked up and became a
                standard the team holds by default — which outlasts any individual fix, and is
                the reason the work picked up an internal award in 2026.
              </P>
              <P>
                It’s still running. There was an LCP release last week. New modules are
                arriving with the homepage revamp. Which is the honest state of performance on
                a living site: not a project with an end date, but a thing you keep holding.
              </P>
            </Reveal>
          </Section>

          {/* ---- endnote ---- */}
          <Reveal>
            <p className="border-t border-stone-200 dark:border-stone-800 mt-16 pt-6 text-[13.5px] leading-[1.7] italic text-stone-400 dark:text-stone-500 max-w-[62ch]">
              The 2024 phase was led by Pranav K S, with me as one of the engineers on it; I
              took over the Core Web Vitals work from 2025. The project was scoped and driven
              from the SEO side by Vimalraj B, and backed by Balaji CM and Ijaz Ahamed — who
              asked the right questions, protected the roadmap space, and supported the calls
              that needed making.
            </p>
          </Reveal>

          {/* ---- CTA ---- */}
          <Reveal>
            <section className="mt-12 border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-7">
              <h2 className="font-display text-[19px] font-medium tracking-tight mb-2">
                Want the technical detail?
              </h2>
              <p className="text-[14.5px] leading-relaxed text-stone-500 dark:text-stone-400 max-w-[48ch] mb-5">
                Deeper write-ups on the LCP work, INP under throttling, and the CSS-splitting
                agent are on the way.
              </p>
              <Link
                href="/#contact"
                className="magnet inline-block font-medium text-[14px] px-5 py-3 rounded-lg bg-emerald-600 dark:bg-emerald-400 text-white dark:text-stone-950"
              >
                Get in touch →
              </Link>
            </section>
          </Reveal>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono font-medium text-[12.5px] text-stone-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mt-10 mb-20"
          >
            ← All work
          </Link>
        </article>
      </div>
    </main>
  );
}

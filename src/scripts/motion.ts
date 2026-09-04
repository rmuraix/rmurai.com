import { animate } from "motion/mini";
import { inView } from "motion";

/**
 * Animated elements start hidden only while `html.js-motion` is set, and that
 * class is added by a tiny inline script in <head> (see Layout.astro). Marking
 * the document ready cancels the watchdog that would otherwise strip the class
 * and show everything, so a failed module load never hides content.
 */
const root = document.documentElement;
root.dataset.motionReady = "1";

if (root.classList.contains("js-motion")) {
  const EASE = [0.16, 1, 0.3, 1] as const;
  const compact = window.matchMedia("(max-width: 640px)").matches;

  // Mobile gets a tighter timeline and a shorter travel, per the design spec.
  const DURATION = compact ? 0.42 : 0.55;
  const DISTANCE = compact ? 8 : 14;
  const CHAR_STAGGER = compact ? 0.045 : 0.062;
  const CHAR_START = 0.22;
  const ITEM_STAGGER = compact ? 0.05 : 0.07;

  const delayOf = (element: Element) =>
    Number.parseFloat((element as HTMLElement).dataset.revealDelay ?? "0") || 0;

  const reveal = (element: Element, delay = 0) =>
    animate(
      element,
      { opacity: [0, 1], transform: [`translateY(${DISTANCE}px)`, "translateY(0px)"] },
      { duration: DURATION, delay, ease: EASE },
    );

  /* ---------------------------------------------------------------- hero --
     The headline types in character by character; everything below it waits
     for the last character to land. */
  const chars = document.querySelectorAll<HTMLElement>("[data-reveal-char]");
  const typeEnd = chars.length > 0 ? CHAR_START + chars.length * CHAR_STAGGER : 0;

  chars.forEach((char, index) => {
    animate(
      char,
      { opacity: [0, 1] },
      { duration: 0.001, delay: CHAR_START + index * CHAR_STAGGER, ease: "linear" },
    );
  });

  const hero = document.querySelector("#index");

  if (hero) {
    for (const element of hero.querySelectorAll("[data-reveal]")) {
      const start = element.hasAttribute("data-reveal-after-type") ? typeEnd : 0;
      reveal(element, start + delayOf(element));
    }
  }

  /* ------------------------------------------------------- below the fold --
     Elements that cross the viewport together are treated as one burst and
     staggered; an element reached on its own later just fades in. This gives a
     list its cascade without pre-animating rows the reader has not reached. */
  const revealed = new WeakSet<Element>();
  let burstDeadline = 0;
  let burstIndex = 0;

  for (const element of document.querySelectorAll("[data-reveal]")) {
    if (hero?.contains(element)) continue;

    let stop: (() => void) | undefined;

    stop = inView(
      element,
      () => {
        if (revealed.has(element)) return;
        revealed.add(element);
        stop?.();

        const now = performance.now();
        if (now > burstDeadline) burstIndex = 0;
        burstDeadline = now + 120;

        reveal(element, delayOf(element) + burstIndex++ * ITEM_STAGGER);
      },
      { amount: 0.15 },
    );
  }
}

/* ------------------------------------------------------- section indicator --
   Independent of the reveal choreography so it also works under
   prefers-reduced-motion. */
const indicators = document.querySelectorAll<HTMLAnchorElement>("[data-indicator-for]");

if (indicators.length > 0) {
  const byId = new Map<string, HTMLAnchorElement>();
  for (const link of indicators) byId.set(link.dataset.indicatorFor!, link);

  const order = [...byId.keys()];
  const sections = new Map<string, Element>();

  const observer = new IntersectionObserver(
    () => {
      const middle = window.innerHeight / 2;
      let current: string | undefined;

      // Two sections can straddle the middle of the viewport; the one whose
      // box contains it wins, and the nearest one wins in the gaps.
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const id of order) {
        const box = sections.get(id)?.getBoundingClientRect();
        if (!box) continue;

        const distance =
          box.top <= middle && box.bottom >= middle ? 0 : Math.min(Math.abs(box.top - middle), Math.abs(box.bottom - middle));

        if (distance < bestDistance) {
          bestDistance = distance;
          current = id;
        }
      }

      if (!current) return;

      for (const [id, link] of byId) link.setAttribute("aria-current", String(id === current));
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
  );

  for (const id of order) {
    const section = document.getElementById(id);
    if (!section) continue;
    sections.set(id, section);
    observer.observe(section);
  }
}

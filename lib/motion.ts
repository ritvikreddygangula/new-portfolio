// Site motion on one clock: Lenis is driven by GSAP's ticker and ScrollTrigger reads Lenis.
// Reduced motion keeps native scroll and skips every reveal; content is never hidden there.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const EASE = "expo.out";

export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const html = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  html.classList.add("ready");

  let lenis: Lenis | null = null;
  const raf = (time: number) => lenis?.raf(time * 1000);
  if (!reduced) {
    lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, touchMultiplier: 1.2 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
  }

  // In-page links glide to their section and move focus there.
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    const target = document.querySelector<HTMLElement>(url.hash);
    if (!target) return;
    e.preventDefault();
    history.pushState(null, "", url.hash);
    const top = url.hash === "#top";
    if (lenis) lenis.scrollTo(top ? 0 : target, { offset: top ? 0 : -8, duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else if (top) window.scrollTo(0, 0);
    else target.scrollIntoView();
    target.focus({ preventScroll: true });
  };
  document.addEventListener("click", onClick);

  let refreshTimer = 0;
  const onLayout = () => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 60);
  };
  window.addEventListener("layout", onLayout);
  document.fonts?.ready.then(onLayout);

  const ctx = gsap.context(() => {
    const belt = document.querySelector<HTMLElement>("[data-belt]");
    const sections = gsap.utils.toArray<HTMLElement>("main section[id]");

    // Frame: the header steps aside on the way down and returns on the way up.
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        html.classList.toggle("is-scrolled", y > 24);
        if (belt) {
          // The belt climbs the ranks with the page: white, yellow, orange, green, blue, brown, black.
          belt.style.setProperty("--sp", self.progress.toFixed(4));
          belt.dataset.rank = String(Math.min(6, Math.floor(self.progress * 6.4)));
        }
      },
    });

    sections.forEach((section) => {
      const id = section.id;
      const set = (on: boolean) => {
        document.querySelectorAll(`[data-nav="${id}"]`).forEach((a) => (on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
      };
      ScrollTrigger.create({ trigger: section, start: "top 50%", end: "bottom 50%", onToggle: (self) => set(self.isActive) });
    });

    if (reduced) return;

    // Section rules draw themselves as the section arrives.
    gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((rule) => {
      gsap.fromTo(rule, { scaleX: 0 }, {
        scaleX: 1, ease: "none", transformOrigin: "0 50%",
        scrollTrigger: { trigger: rule, start: "top 96%", end: "top 58%", scrub: 0.5 },
      });
    });

    // Headings rise out of a mask; blocks settle up; the portrait wipes open.
    gsap.utils.toArray<HTMLElement>("[data-reveal='line']").forEach((el) => {
      const inner = el.firstElementChild;
      gsap.set(el, { autoAlpha: 1 });
      gsap.fromTo(inner, { yPercent: 108 }, { yPercent: 0, duration: 1.1, ease: EASE, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
    gsap.utils.toArray<HTMLElement>("[data-reveal='clip']").forEach((el) => {
      gsap.set(el, { autoAlpha: 1 });
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: EASE, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      const img = el.querySelector("img");
      if (img) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: EASE, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    });
    const blocks = gsap.utils.toArray<HTMLElement>("[data-reveal='']");
    gsap.set(blocks, { autoAlpha: 0, y: 26 });
    ScrollTrigger.batch(blocks, {
      start: "top 90%",
      once: true,
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.95, ease: EASE, stagger: 0.07, overwrite: true }),
    });
  });

  return () => {
    ctx.revert();
    document.removeEventListener("click", onClick);
    window.removeEventListener("layout", onLayout);
    gsap.ticker.remove(raf);
    lenis?.destroy();
  };
}

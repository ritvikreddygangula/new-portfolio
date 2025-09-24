import { useEffect, useRef } from "react";

export function useScrollFadeIn<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.classList.add("fade-in-up");
        } else {
          node.classList.remove("fade-in-up");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.15,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

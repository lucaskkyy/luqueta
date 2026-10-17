"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Server-rendered content stays visible until IntersectionObserver is ready. */
export function FadeInUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!node || !("IntersectionObserver" in window) || motion.matches) return;
    const bounds = node.getBoundingClientRect();
    // Keep first-screen content painted; only reveal content arriving on scroll.
    if (bounds.top < window.innerHeight && bounds.bottom > 0) return;
    node.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.dataset.reveal = "visible";
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px 40px 0px" },
    );
    observer.observe(node);
    const show = () => {
      if (motion.matches) {
        node.dataset.reveal = "visible";
        observer.disconnect();
      }
    };
    motion.addEventListener("change", show);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", show);
      delete node.dataset.reveal;
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`fade-in-up ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

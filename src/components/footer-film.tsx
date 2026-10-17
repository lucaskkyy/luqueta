"use client";
import { useEffect, useRef } from "react";
/** Only used when an owner-supplied local film is configured. */
export function FooterFilm({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (motion.matches) ref.current?.pause();
      else
        void ref.current?.play().catch(() => {
          /* Poster remains visible when playback is unavailable. */
        });
    };
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);
  return (
    <video
      ref={ref}
      className="footer-video"
      muted
      playsInline
      loop
      preload="none"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Brand } from "./brand";
import { Arrow } from "./icons";
const links = [
  ["Início", "/"],
  ["Portfólio", "/portfolio"],
  ["O Estúdio", "/#studio"],
  ["Serviços", "/#servicos"],
  ["FAQ", "/#faq"],
];
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 1000) setOpen(false);
    };
    document.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header className={`header ${scrolled || open ? "header-solid" : ""}`}>
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={href === pathname ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/orcamento" className="nav-cta">
          VAMOS CRIAR <Arrow />
        </Link>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
      <div
        className={`mobile-menu ${open ? "is-open" : ""}`}
        id="mobile-menu"
        inert={!open}
      >
        <nav aria-label="Navegação mobile">
          {links.map(([label, href], i) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              <span>0{i + 1}</span>
              {label}
              <Arrow />
            </Link>
          ))}
          <Link href="/orcamento" onClick={() => setOpen(false)}>
            Vamos criar <Arrow />
          </Link>
        </nav>
      </div>
    </header>
  );
}

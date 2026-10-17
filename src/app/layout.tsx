import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import localFont from "next/font/local";
import { brandDescription, brandTitle, siteUrl } from "@/lib/seo";
import "./globals.css";
const displayFont = localFont({
  src: "../../node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2",
  variable: "--font-display",
  weight: "400",
  display: "swap",
});
const bodyFont = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/manrope/files/manrope-latin-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../../node_modules/@fontsource/manrope/files/manrope-latin-500-normal.woff2",
      weight: "500",
    },
    {
      path: "../../node_modules/@fontsource/manrope/files/manrope-latin-600-normal.woff2",
      weight: "600",
    },
    {
      path: "../../node_modules/@fontsource/manrope/files/manrope-latin-700-normal.woff2",
      weight: "700",
    },
  ],
  variable: "--font-body",
  display: "swap",
  preload: true,
});
const socialImage = siteUrl
  ? [
      {
        url: new URL("/og-image.png", siteUrl).href,
        width: 1200,
        height: 630,
        alt: "LS Design — O jogo começa no visual. Design esportivo.",
      },
    ]
  : [];
export const metadata: Metadata = {
  metadataBase: siteUrl,
  icons: {
    icon: [
      {
        url: "/assets/branding/LS_logo_instagram_original.png",
        type: "image/png",
        sizes: "1080x1080",
      },
    ],
    apple: [
      {
        url: "/assets/branding/LS_logo_instagram_original.png",
        type: "image/png",
        sizes: "1080x1080",
      },
    ],
  },
  title: { default: brandTitle, template: "%s | LS Design" },
  description: brandDescription,
  robots: siteUrl
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title: brandTitle,
    description: brandDescription,
    siteName: "LS Design",
    locale: "pt_BR",
    type: "website",
    images: socialImage,
    ...(siteUrl ? { url: siteUrl.href } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: brandTitle,
    description: brandDescription,
    images: socialImage.map((image) => image.url),
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Header />
        <noscript>
          <nav className="noscript-nav" aria-label="Navegação sem JavaScript">
            <Link href="/">Início</Link>
            <Link href="/portfolio">Portfólio</Link>
            <Link href="/orcamento">Orçamento</Link>
          </nav>
        </noscript>
        {children}
        <Footer />
      </body>
    </html>
  );
}

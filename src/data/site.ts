export const instagram = "https://www.instagram.com/flyer.ls/";
export const whatsappNumber = /^\d{10,15}$/.test(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
)
  ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  : undefined;
export const whatsappUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber}`
  : undefined;
// Optional local assets, e.g. /artworks/footer.webp or /artworks/studio-film.mp4.
// No external video or generic photography is loaded.
export const studioMedia: {
  creatorImage?: string;
  creatorName?: string;
  footerImage?: string;
  footerVideo?: string;
} = {};
export const services = [
  "Artes de matchday",
  "Resultados e campeonatos",
  "Identidade esportiva",
  "Design para atletas",
  "Pacotes mensais",
  "Projetos personalizados",
];

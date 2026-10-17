/** Set the final public origin at build time. Never guess a production domain. */
export function parseSiteUrl(value?: string): URL | undefined {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value.trim());
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    )
      return undefined;
    return url;
  } catch {
    return undefined;
  }
}
export const siteUrl = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const brandTitle = "LS Design | Design Esportivo";
export const brandDescription =
  "Design esportivo para atletas, clubes, equipes e campeonatos. Estúdio criativo independente com mais de 750 projetos entregues. Criatividade, identidade e impacto visual.";
export function canonical(path: string) {
  return siteUrl ? { canonical: new URL(path, siteUrl).href } : undefined;
}

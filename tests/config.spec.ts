import { expect, test } from "@playwright/test";
import { parseSiteUrl } from "../src/lib/seo";
import {
  createWhatsAppMessageLink,
  formatBriefing,
  readBriefing,
  validateBriefing,
} from "../src/lib/briefing";

test("domain configuration rejects incomplete URLs and never guesses a host", () => {
  for (const input of [
    undefined,
    "",
    "sem-dominio",
    "http://example.com",
    "https://user:password@example.com",
    "https://example.com/path",
  ])
    expect(parseSiteUrl(input)).toBeUndefined();
  expect(parseSiteUrl("https://example.com")?.origin).toBe(
    "https://example.com",
  );
});

test("briefing normalization and WhatsApp serialization preserve accented content", () => {
  const form = new FormData();
  for (const [key, value] of Object.entries({
    name: "  Revisão LS  ",
    organization: "Equipe de teste",
    service: "Artes de matchday",
    message: "Identidade & emoção\nFormato: 4:5",
  }))
    form.set(key, value);
  const data = readBriefing(form);
  expect(data.name).toBe("Revisão LS");
  expect(validateBriefing(data)).toBeUndefined();
  const message = formatBriefing(data);
  const link = new URL(createWhatsAppMessageLink("https://wa.me", message));
  expect(link.searchParams.get("text")).toBe(message);
  expect(message).toContain("Prazo desejado: A combinar");
  expect(
    validateBriefing({ ...data, service: "Serviço inválido" })?.field,
  ).toBe("service");
});

test("empty project selections show a useful state instead of a blank grid", async () => {
  const { createElement } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { ProjectGallery } = await import("../src/components/project-gallery");
  const markup = renderToStaticMarkup(
    createElement(ProjectGallery, { projects: [] }),
  );
  expect(markup).toContain("Nenhum projeto nesta seleção");
  expect(markup).toContain("Escolha outra categoria");
});

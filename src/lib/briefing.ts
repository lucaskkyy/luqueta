import { services } from "@/data/site";
export type BriefingField =
  "name" | "organization" | "contact" | "service" | "message" | "deadline";
export type BriefingData = Record<BriefingField, string>;
export function readBriefing(form: FormData): BriefingData {
  const read = (field: BriefingField) => String(form.get(field) ?? "").trim();
  return {
    name: read("name"),
    organization: read("organization"),
    contact: read("contact"),
    service: read("service"),
    message: read("message"),
    deadline: read("deadline"),
  };
}
export function validateBriefing(
  data: BriefingData,
): { field: BriefingField; message: string } | undefined {
  for (const [field, label, limit] of [
    ["name", "Informe seu nome.", 100],
    ["organization", "Informe o time, a organização ou o projeto.", 150],
    ["message", "Descreva o que você precisa para o projeto.", 3000],
  ] as const) {
    if (!data[field]) return { field, message: label };
    if (data[field].length > limit)
      return { field, message: `Use até ${limit} caracteres.` };
  }
  if (!services.includes(data.service))
    return { field: "service", message: "Selecione um serviço da lista." };
  if (
    data.contact &&
    !(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact) ||
      (/^\+?[\d\s().-]{8,25}$/.test(data.contact) &&
        data.contact.replace(/\D/g, "").length >= 8)
    )
  ) {
    return {
      field: "contact",
      message:
        "Informe um e-mail válido ou um WhatsApp com DDD, ou deixe este campo vazio.",
    };
  }
  if (data.contact.length > 150)
    return { field: "contact", message: "Use até 150 caracteres." };
  if (data.deadline.length > 150)
    return { field: "deadline", message: "Use até 150 caracteres." };
}
export function formatBriefing(data: BriefingData) {
  return `Olá, LS Design! Gostaria de solicitar um orçamento.\n\nNome: ${data.name}\nTime, organização ou projeto: ${data.organization}\nContato: ${data.contact || "Não informado"}\nServiço: ${data.service}\nDescrição: ${data.message}\nPrazo desejado: ${data.deadline || "A combinar"}\n\nVamos conversar sobre os detalhes?`;
}
export function createWhatsAppMessageLink(baseUrl: string, message: string) {
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

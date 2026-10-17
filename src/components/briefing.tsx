"use client";
import { useState } from "react";
import { instagram, services, whatsappNumber, whatsappUrl } from "@/data/site";
import { Arrow } from "./icons";
import {
  readBriefing,
  validateBriefing,
  formatBriefing,
  createWhatsAppMessageLink,
} from "@/lib/briefing";
export function Briefing() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [manualMessage, setManualMessage] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopied(false);
    setWhatsappMessage("");
    setManualMessage("");
    const form = event.currentTarget;
    const data = readBriefing(new FormData(form));
    const validation = validateBriefing(data);
    if (validation) {
      const field = form.elements.namedItem(validation.field) as
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      field.setCustomValidity(validation.message);
      field.reportValidity();
      setError(validation.message);
      return;
    }
    const text = formatBriefing(data);
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;
    if (whatsappNumber && whatsappUrl && submitter?.value !== "copy") {
      setWhatsappMessage(createWhatsAppMessageLink(whatsappUrl, text));
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setManualMessage("");
      } catch {
        setManualMessage(text);
        setError(
          "A cópia automática não está disponível. Selecione e copie a mensagem abaixo.",
        );
      }
    }
  }
  return (
    <form
      onSubmit={submit}
      className="briefing"
      onChange={(event) => {
        const field = event.target;
        if (
          field instanceof HTMLInputElement ||
          field instanceof HTMLTextAreaElement ||
          field instanceof HTMLSelectElement
        )
          field.setCustomValidity("");
        setCopied(false);
        setWhatsappMessage("");
        setManualMessage("");
        setError("");
      }}
    >
      <div className="form-row">
        <label>
          Nome
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Como podemos chamar você?"
          />
        </label>
        <label>
          Time, organização ou projeto
          <input
            name="organization"
            autoComplete="organization"
            required
            maxLength={150}
            placeholder="Quem entra em campo?"
          />
        </label>
      </div>
      <label>
        E-mail ou WhatsApp <span className="optional">(opcional)</span>
        <input
          name="contact"
          autoComplete="email"
          maxLength={150}
          placeholder="Seu canal de contato"
        />
      </label>
      <label>
        Serviço
        <select name="service">
          {services.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </label>
      <label>
        Descrição
        <textarea
          name="message"
          rows={5}
          required
          maxLength={3000}
          placeholder="Conte sua ideia, os formatos e as referências que tem em mente."
        />
      </label>
      <label>
        Prazo desejado <span className="optional">(opcional)</span>
        <input
          name="deadline"
          maxLength={150}
          placeholder="Uma data, um evento ou a combinar"
        />
      </label>
      <button
        className="button primary"
        type="submit"
        name="action"
        value={whatsappNumber ? "whatsapp" : "copy"}
      >
        {whatsappNumber ? "PREPARAR MENSAGEM" : "COPIAR BRIEFING"} <Arrow />
      </button>
      {whatsappNumber && (
        <button
          className="button secondary"
          type="submit"
          name="action"
          value="copy"
        >
          COPIAR BRIEFING <Arrow />
        </button>
      )}
      <p className="form-note" role="status">
        {error ||
          (copied
            ? "Briefing copiado. Nada foi enviado ainda. Envie a mensagem pelo Instagram da LS Design."
            : whatsappNumber
              ? "Prepare a mensagem e confirme o envio no WhatsApp. Seus dados não são armazenados neste site."
              : "Copie seu briefing e envie pelo Instagram. Nenhum dado é enviado ou armazenado neste site.")}
      </p>
      {manualMessage && (
        <label>
          Mensagem para copiar
          <textarea
            readOnly
            value={manualMessage}
            rows={10}
            onFocus={(event) => event.currentTarget.select()}
          />
        </label>
      )}
      {whatsappMessage && (
        <a
          className="button primary"
          href={whatsappMessage}
          target="_blank"
          rel="noopener noreferrer"
        >
          CONTINUAR NO WHATSAPP <Arrow />
        </a>
      )}
      <a
        className="instagram-contact"
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
      >
        CONVERSAR NO INSTAGRAM @FLYER.LS <Arrow />
      </a>
      <noscript>
        <p className="form-note">
          Para montar o briefing automaticamente, ative o JavaScript ou entre em
          contato diretamente pelo Instagram.
        </p>
      </noscript>
    </form>
  );
}

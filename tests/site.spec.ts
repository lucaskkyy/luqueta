import { expect, test } from "@playwright/test";

test("all routes fit the viewport and keep their titles readable", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of ["/", "/portfolio", "/orcamento"]) {
    expect((await page.goto(route))?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const clipped = await page
      .locator("h1,h2,h3,.button")
      .evaluateAll((elements) =>
        elements
          .filter(
            (el) =>
              !el.closest("dialog:not([open])") &&
              el.clientWidth > 0 &&
              el.scrollWidth > el.clientWidth + 2,
          )
          .map((el) => el.textContent),
      );
    expect(clipped).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test("every navbar destination works, including sections from an inner page", async ({
  page,
}) => {
  for (const [label, path, section] of [
    ["Início", "/", null],
    ["Portfólio", "/portfolio", null],
    ["O Estúdio", "/#studio", "studio"],
    ["Serviços", "/#servicos", "servicos"],
    ["FAQ", "/#faq", "faq"],
    ["Vamos criar", "/orcamento", null],
  ] as const) {
    await page.goto("/portfolio");
    const toggle = page.locator(".menu-toggle");
    if (await toggle.isVisible()) {
      await toggle.click();
      await page
        .getByRole("navigation", { name: "Navegação mobile" })
        .getByRole("link", { name: new RegExp(label, "i") })
        .click();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
    } else if (label === "Vamos criar") {
      await page.locator("header .nav-cta").click();
    } else {
      await page
        .getByRole("navigation", { name: "Navegação principal" })
        .getByRole("link", { name: label, exact: true })
        .click();
    }
    await expect(page).toHaveURL(`http://localhost:3100${path}`);
    if (section) {
      await expect
        .poll(async () =>
          Math.round((await page.locator(`#${section}`).boundingBox())!.y),
        )
        .toBeLessThan(180);
      expect(
        (await page.locator(`#${section}`).boundingBox())!.y,
      ).toBeGreaterThan(75);
    }
  }
});

test("menu and desktop navigation support keyboard access", async ({
  page,
}) => {
  await page.goto("/");
  const toggle = page.locator(".menu-toggle");
  if (await toggle.isVisible()) {
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  } else {
    const portfolio = page
      .getByRole("navigation", { name: "Navegação principal" })
      .getByRole("link", { name: "Portfólio" });
    await portfolio.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/portfolio$/);
  }
});

test("filters and project navigation preserve the selected category and focus", async ({
  page,
}) => {
  await page.goto("/portfolio");
  for (const [category, count] of [
    ["Matchday", 3],
    ["Atletas", 1],
    ["Campeonatos", 2],
    ["Social / anúncios", 1],
  ] as const) {
    await page.getByRole("button", { name: category, exact: true }).click();
    await expect(page.locator(".project-grid article")).toHaveCount(count);
    await expect(
      page.getByRole("button", { name: category, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
  }
  await page.getByRole("button", { name: "Matchday", exact: true }).click();
  const trigger = page.getByRole("button", {
    name: "Ampliar projeto: Magnus x Caieiras",
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("img")).toHaveAttribute(
    "alt",
    /Magnus x Caieiras/,
  );
  await page
    .getByRole("button", { name: "Próximo projeto", exact: true })
    .click();
  await expect(dialog.locator("h2")).toHaveText("Dia de jogo (Bonny x Bases)");
  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator("h2")).toHaveText("Juvenas vs Twister");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.locator("h2")).toHaveText("Dia de jogo (Bonny x Bases)");
  await page
    .getByRole("button", { name: "Projeto anterior", exact: true })
    .click();
  await expect(dialog.locator("h2")).toHaveText("Magnus x Caieiras");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  await expect(page.locator(".project-grid article")).toHaveCount(7);
});

test("FAQ starts closed and supports Enter, Space and automatic single expansion", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".faq-item[open]")).toHaveCount(0);
  const question = page.locator("#faq-question-3");
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".faq-item[open]")).toHaveCount(1);
  await expect(page.locator("#faq-answer-3")).toBeVisible();
  await expect(question).toHaveAttribute("aria-controls", "faq-answer-3");
  await page.keyboard.press("Space");
  await expect(page.locator(".faq-item[open]")).toHaveCount(0);
  await question.click();
  await page.locator("#faq-question-0").click();
  await expect(page.locator(".faq-item[open]")).toHaveCount(1);
  await expect(page.locator("#faq-question-0").locator("..")).toHaveAttribute(
    "open",
    "",
  );
});

async function fillBriefing(page: import("@playwright/test").Page) {
  await page.getByLabel("Nome", { exact: true }).fill("Teste LS");
  await page.getByLabel("Time, organização ou projeto").fill("Equipe teste");
  await page
    .getByLabel("Descrição", { exact: true })
    .fill("Projeto de identidade esportiva.");
  await page.getByLabel("Prazo desejado").fill("A combinar após briefing");
}

test("briefing validates required values and malformed optional contact", async ({
  page,
}) => {
  await page.goto("/orcamento");
  await fillBriefing(page);
  await page.getByLabel("Nome", { exact: true }).fill("   ");
  await page.getByRole("button", { name: "COPIAR BRIEFING" }).click();
  await expect(page.getByRole("status")).toContainText("Informe seu nome");
  await page.getByLabel("Nome", { exact: true }).fill("Teste LS");
  await page.getByLabel("E-mail ou WhatsApp").fill("contato inválido");
  await page.getByRole("button", { name: "COPIAR BRIEFING" }).click();
  await expect(page.getByRole("status")).toContainText("e-mail válido");
});

test("briefing copies an organized message and offers the official Instagram", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/orcamento");
  await fillBriefing(page);
  await page.getByRole("button", { name: "COPIAR BRIEFING" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Briefing copiado. Nada foi enviado",
  );
  const message = await page.evaluate(() => navigator.clipboard.readText());
  for (const value of [
    "Nome: Teste LS",
    "Time, organização ou projeto: Equipe teste",
    "Contato: Não informado",
    "Serviço: Artes de matchday",
    "Descrição: Projeto de identidade esportiva.",
    "Prazo desejado: A combinar após briefing",
  ])
    expect(message).toContain(value);
  await expect(
    page.getByRole("link", { name: "CONVERSAR NO INSTAGRAM" }),
  ).toHaveAttribute("href", "https://www.instagram.com/flyer.ls/");
});

test("clipboard failure provides a selectable message for manual copying", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("Unavailable")) },
      configurable: true,
    }),
  );
  await page.goto("/orcamento");
  await fillBriefing(page);
  await page.getByRole("button", { name: "COPIAR BRIEFING" }).click();
  await expect(page.getByLabel("Mensagem para copiar")).toHaveValue(
    /Equipe teste/,
  );
});

test("reduced motion does not hide content or animate the marquee", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator(".marquee-track")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page
      .locator(".hero-copy")
      .evaluate((el) => getComputedStyle(el).opacity),
  ).toBe("1");
});

test("FAQ remains closed and operable with JavaScript disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://localhost:3100");
  await expect(page.locator("h1")).toBeVisible();
  expect(
    await page
      .locator(".hero-copy")
      .evaluate((el) => getComputedStyle(el).opacity),
  ).toBe("1");
  await expect(page.locator(".faq-item[open]")).toHaveCount(0);
  await page.locator("#faq-question-3").click();
  await expect(page.locator(".faq-item[open]")).toHaveCount(1);
  await expect(page.locator("#faq-answer-3")).toBeVisible();
  await context.close();
});

test("SEO endpoints and primary metadata are correct for the current configuration", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("LS Design | Design Esportivo");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "LS Design | Design Esportivo",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /mais de 750 projetos/,
  );
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("<urlset");
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("User-Agent: *");
  expect(
    (await request.get("/og-image.png")).headers()["content-type"],
  ).toContain("image/png");
});

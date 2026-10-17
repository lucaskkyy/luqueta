import { expect, test } from "@playwright/test";

test("real artwork remains complete, loaded and correctly selected", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.locator(".real-art-composition");
  const images = hero.locator("img");
  await expect(images).toHaveCount(6);
  await expect(images.first()).toHaveAttribute("src", /estamos-classificados/);
  await expect(images.first()).toHaveAttribute("width", "1440");
  await expect(images.first()).toHaveAttribute("height", "1800");
  await expect(hero.locator('img[src*="confirmados-supercopa"]')).toHaveCount(
    0,
  );
  await expect(hero.locator(".placeholder-label")).toHaveCount(0);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((node: HTMLImageElement) => node.decode());
    const result = await image.evaluate((node: HTMLImageElement) => {
      const style = getComputedStyle(node);
      return {
        fit: style.objectFit,
        ratio: parseFloat(style.width) / parseFloat(style.height),
        sourceRatio: node.naturalWidth / node.naturalHeight,
        loaded: node.complete && node.naturalWidth > 0,
      };
    });
    expect(result.loaded).toBe(true);
    expect(result.fit).toBe("contain");
    expect(Math.abs(result.ratio - result.sourceRatio)).toBeLessThan(0.005);
  }
  await page.goto("/portfolio");
  await expect(page.locator(".project-grid article")).toHaveCount(7);
  await expect(
    page.getByRole("button", {
      name: "Ampliar projeto: Confirmados Supercopa Juvenas",
    }),
  ).toBeVisible();
  for (const image of await page.locator(".project-grid img").all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((node: HTMLImageElement) => node.decode());
    expect(
      await image.evaluate(
        (node: HTMLImageElement) => getComputedStyle(node).objectFit,
      ),
    ).toBe("contain");
  }
  await expect(page.locator(".project-grid .image-error")).toHaveCount(0);
});

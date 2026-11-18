import { test, expect } from "@playwright/test";

test("Главная страница открывается", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await expect(page).toHaveTitle("frontend-ultimate");
});

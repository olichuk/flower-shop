import { test, expect } from "@playwright/test";

test.describe("F.LOVER — критичний шлях користувача", () => {
  test("головна сторінка відображає каталог квітів", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await expect(page).toHaveTitle(/F.LOVER|flower/i);
    await expect(page.locator(".catalog")).toBeVisible();
    await expect(page.locator(".flower-card").first()).toBeVisible();
  });

  test("фільтр по категорії показує правильні товари", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.click('button:has-text("Троянди")');
    const cards = page.locator(".flower-card");
    await expect(cards.first()).toBeVisible();
  });

  test("додавання товару до кошика", async ({ page }) => {
    await page.goto("http://localhost:5173");
    // Натискаємо першу кнопку "Додати до кошика"
    await page.locator(".flower-card").first().locator("button").click();
    // Лічильник кошика має збільшитись
    const badge = page.locator(".navbar__cart-count");
    await expect(badge).not.toHaveText("0");
  });
});

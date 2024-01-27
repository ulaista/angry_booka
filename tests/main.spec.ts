import { test, expect } from "@playwright/test";

test('Main Home Page Test', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:3000'); // Replace with your actual URL

  // Ensure the navbar is visible
  const navbar = await page.waitForSelector('#navbar');
  expect(navbar).not.toBeNull();

  // Ensure the carousel is visible
  const carousel = await page.waitForSelector('#carousel');
  expect(carousel).not.toBeNull();

  // Check if the quote is displayed
  const quote = await page.textContent('#quote');
  expect(quote).not.toBeNull();

  // Check if the quote author is displayed
  const quoteAuthor = await page.textContent('#quoteAuthor');
  expect(quoteAuthor).not.toBeNull();
});


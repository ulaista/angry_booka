import { test, expect } from "@playwright/test";

test('PC Page Test', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:3000/personal-cabinet'); // Replace with your actual URL

  // Ensure the navbar is visible
  const navbar = await page.waitForSelector('#navbar');
  expect(navbar).not.toBeNull();

  // Check if the main content is visible
  const readerTicket = await page.waitForSelector('#reader-ticket');
  expect(readerTicket).not.toBeNull();
});
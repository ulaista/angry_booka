import { test, expect } from "@playwright/test";

test('Library Page Test', async ({ page }) => {
    // Navigate to the page
    await page.goto('http://localhost:3000/library'); // Replace with your actual URL
  
    // Ensure the navbar is visible
    const navbar = await page.waitForSelector('#navbar');
    expect(navbar).not.toBeNull();
  
    // Check if the search input is visible
    const searchInput = await page.waitForSelector('#search-input');
    expect(searchInput).not.toBeNull();
  });
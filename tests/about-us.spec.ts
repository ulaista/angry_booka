import { test, expect } from "@playwright/test";

test('About Us Page Test', async ({ page }) => {
    // Navigate to the page
    await page.goto('http://localhost:3000/about-us'); // Replace with your actual URL
  
    // Ensure the navbar is visible
    const navbar = await page.waitForSelector('#navbar');
    expect(navbar).not.toBeNull();
  
    // Check if the team members' cards are visible
    const teamMemberCards = await page.$$('#team-member-card');
    expect(teamMemberCards.length).toBe(4);
  });
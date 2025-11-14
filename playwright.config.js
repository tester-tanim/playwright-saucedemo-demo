// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Directory where test files are located
  fullyParallel: true, // Run tests in parallel
  forbidOnly: !!process.env.CI, // Prevent `test.only` in CI environments
  retries: process.env.CI ? 2 : 0, // Retry twice on CI, none locally
  workers: process.env.CI ? 1 : undefined, // Use one worker on CI
  reporter: 'html', // Generate an HTML report
  use: {
    baseURL: 'https://www.saucedemo.com/', // Set a base URL
    trace: 'on-first-retry', // Capture traces on first retry
  },
  projects: [
    // Configure projects for different browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 150 * 1000,
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries:2,
  // workers: process.env.CI ? 1: undefined,
  workers:1,
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
    }],
    ['json', { 
      outputFile: 'test-results/test-results.json' 
    }],
    ['line'],
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }]
  ],  
  use: {
    trace: 'retain-on-failure',
    headless: true,
    actionTimeout: 60*1000,
    navigationTimeout: 60*1000,
    screenshot: 'on',
    video: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ]

 
});

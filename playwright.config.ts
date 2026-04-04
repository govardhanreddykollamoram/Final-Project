import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 150 * 1000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  // retries:2,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1: undefined,
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
    }],
    ['json', { 
      outputFile: 'test-results/test-results.json' 
    }],
    ['line'],
    // Allure reporter (requires `allure-playwright` package)
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    actionTimeout: 60*1000,
    navigationTimeout: 60*1000,
    screenshot: 'on',
    video: 'on',
  },

  /* Configure projects for major browsers */
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

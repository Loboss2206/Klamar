import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [['json', { outputFile: '/app/test-results/report.json' }]],
  timeout: 120000,
  use: {
    baseURL: 'http://front',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on',
    screenshot: 'only-on-failure',
    launchOptions: {
      slowMo: 500,
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    }
  ],
};

export default config;

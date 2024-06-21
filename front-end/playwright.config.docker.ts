import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [['json', { outputFile: '/app/result/report.json' }]],
  timeout: 120000,
  workers: 1,
  use: {
    baseURL: 'http://front',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on',
    screenshot: 'on',
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

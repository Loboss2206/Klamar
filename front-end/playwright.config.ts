import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [['html', { open: 'always' }]],
  timeout: 120000,
  use: {
    baseURL: 'http://localhost:4200',
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    launchOptions: {
      slowMo: 200,
    }
  },
};

export default config;

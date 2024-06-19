import { PlaywrightTestConfig } from '@playwright/test';
import { environment } from 'src/environments/environment';

const config: PlaywrightTestConfig = {
  reporter: [['html', { open: 'always' }]],
  use: {
    baseURL: environment.testUrl,
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    launchOptions: {
      slowMo: 1000,
    }
  },
};

export default config;

import { defineConfig } from '@playwright/test';

// Use separate port for tests to avoid conflicts with production server
// In CI, use port 3001 to avoid conflicts with production (port 3000)
// Locally, use port 3000 (or PORT env var if set)
const TEST_PORT = process.env.CI === 'true' ? '3001' : (process.env.PORT || '3000');
const TEST_URL = `http://localhost:${TEST_PORT}`;

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: TEST_URL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: `PORT=${TEST_PORT} pnpm dev`,
    url: TEST_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});


# Setup guide

## Prerequisites

- Node.js 18 or later
- npm 9 or later

## Installing the app

```bash
cd playwright-practice-app
npm install
npm start
```

The dev server runs on `http://localhost:3000` with hot reload. Leave it running in one terminal while you write tests in another.

## Building a Playwright framework against this app

### Recommended project structure

```
your-framework/
├── playwright.config.ts
├── tests/
│   ├── auth.spec.ts
│   ├── dashboard.spec.ts
│   ├── form.spec.ts
│   ├── table.spec.ts
│   ├── elements.spec.ts
│   ├── users.spec.ts
│   ├── alerts.spec.ts
│   └── drag-drop.spec.ts
├── pages/                  # Page Object Model classes
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── ...
└── fixtures/
    └── auth.fixture.ts     # a fixture that logs in once and reuses storage state
```

### Suggested order of implementation

1. **Login flow** (`/login`) — the simplest possible smoke test, and the foundation for an authenticated-session fixture.
2. **Form page** (`/form`) — practice locating fields, filling different input types, and asserting validation messages.
3. **Table page** (`/table`) — practice waiting for async data, asserting on table rows, and testing pagination/sort/filter combinations.
4. **User management** (`/users`) — practice full CRUD flows and modal interactions.
5. **Elements page** (`/elements`) — practice the long tail: tooltips (hover), accordions, file uploads, iframes, and disabled-state assertions.
6. **Alerts page** (`/alerts`) — practice handling native dialogs, which Playwright intercepts via the `page.on('dialog', ...)` event rather than normal locators.
7. **Drag and drop** (`/drag-drop`) — practice `dragTo()` and manual `dispatchEvent`-based drag sequences; button fallbacks are included if native DnD proves flaky in your environment.

### Handling native dialogs

The Alerts page triggers real `window.alert`, `window.confirm`, and `window.prompt` calls. Playwright auto-dismisses these unless you register a handler first:

```ts
page.on('dialog', async (dialog) => {
  console.log(dialog.message());
  await dialog.accept('optional prompt text');
});
```

### Reusing an authenticated session

Because the mock auth layer stores the session in `localStorage`, you can use Playwright's `storageState` to skip logging in for every test:

```ts
// global-setup.ts
import { chromium } from '@playwright/test';

export default async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('login-email-input').fill('qa.engineer@example.com');
  await page.getByTestId('login-password-input').fill('Practice123!');
  await page.getByTestId('login-submit').click();
  await page.waitForURL(/dashboard/);
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}
```

Then reference `storageState: 'storageState.json'` in `playwright.config.ts`.

### Resetting state between tests

All mock data lives in memory inside the browser tab and resets on a full page reload (`page.reload()` or a fresh `page.goto()` in a new context). There is no database to seed or tear down.

## Troubleshooting

- **Port 3000 already in use** — stop whatever else is running on that port, or set `PORT=3001 npm start`.
- **TypeScript errors on install** — confirm you're on Node 18+; run `node -v` to check.
- **Playwright can't reach the app** — make sure `npm start` is running before `npx playwright test`, or configure a `webServer` block in `playwright.config.ts` to start it automatically.

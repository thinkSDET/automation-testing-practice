# Quick start

## 1. Install dependencies

```bash
npm install
```

## 2. Run the app

```bash
npm start
```

This opens the app at `http://localhost:3000`.

## 3. Log in

```
email:    qa.engineer@example.com
password: Practice123!
```

## 4. Add Playwright (in a separate step, once you're ready)

From the project root:

```bash
npm init playwright@latest
```

When prompted, TypeScript is the right choice, and `http://localhost:3000` is a sensible `baseURL` for `playwright.config.ts`.

A minimal first test to confirm everything is wired up:

```ts
import { test, expect } from '@playwright/test';

test('can log in and reach the dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('login-email-input').fill('qa.engineer@example.com');
  await page.getByTestId('login-password-input').fill('Practice123!');
  await page.getByTestId('login-submit').click();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByTestId('stats-grid')).toBeVisible();
});
```

Run it with:

```bash
npx playwright test
```

## 5. Where to go next

Each page in `src/pages/` is annotated with `data-testid` attributes you can target directly — no CSS or text selectors needed. Start with `/login` and `/form` for basic flows, then move to `/table` and `/users` for anything involving async data and CRUD.

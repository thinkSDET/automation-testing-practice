# QA Sandbox

A self-contained React + TypeScript practice application, built to be a **target** for a Playwright + TypeScript automation framework. There is no real backend — every "API" call is an in-memory mock (`src/api/mockApi.ts`) that simulates network latency, validation errors, and failure scenarios, so your tests are exercising realistic async behavior without needing a server.

## Why this exists

Automation frameworks are best learned against an application you control. This one is deliberately built to include the elements that come up again and again in real Playwright suites: authentication, forms with validation, tables with sorting/filtering/pagination, modals, toasts, native browser dialogs, drag-and-drop, file uploads, iframes, and simulated network delays and errors.

## Login credentials

```
email:    qa.engineer@example.com
password: Practice123!
```

Three failed attempts trigger a temporary lockout, so you can also practice negative-path tests.

## Pages

| Route | What it covers |
|---|---|
| `/login` | Sign in, registration, and forgot-password flows; field validation; error states; account lockout |
| `/dashboard` | Async data loading, skeleton loaders, retry-on-error, a toggle to force a metrics failure |
| `/form` | A multi-field form (text, email, select, radio, checkbox, textarea) with client-side validation and a simulated server error |
| `/table` | A paginated, sortable, filterable, searchable orders table (server-style, backed by the mock API) |
| `/elements` | Checkboxes, radios, single/multi selects, a range slider, a date picker, tooltips, a modal, an accordion, delayed dynamic content, an enable/disable toggle, drag-and-drop file upload, and a same-origin iframe |
| `/users` | Full CRUD — create, edit, suspend/reactivate, and delete users via modals, with toast confirmations |
| `/alerts` | Native `alert()` / `confirm()` / `prompt()` dialogs, toast notifications, dismissible banners, and an async action with visible state changes |
| `/drag-drop` | An HTML5 drag-and-drop kanban board (plus button fallbacks, since native DnD needs special handling in Playwright) |

## `data-testid` convention

Every interactive element has a `data-testid` attribute, so your selectors don't depend on CSS classes or text content that might change. Open any page's source in `src/pages/` to see the exact identifiers available.

## Getting started

See `QUICK_START.md` for the fastest path, or `SETUP_GUIDE.md` for a more detailed walkthrough including how to wire up Playwright against this app.

## Tech stack

- React 18 + TypeScript
- React Router 6
- Create React App (`react-scripts`) — zero custom build config
- No backend, no database — everything lives in `src/api/mockApi.ts`

## Project layout

See `FILE_MANIFEST.md` for the full file listing.

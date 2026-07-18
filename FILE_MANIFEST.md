# File manifest

## Guides
| File | Purpose |
|---|---|
| `README.md` | Project overview, credentials, page-by-page feature summary |
| `QUICK_START.md` | Fastest path to running the app and your first Playwright test |
| `SETUP_GUIDE.md` | Detailed setup, recommended framework structure, dialog handling, session reuse |
| `FILE_MANIFEST.md` | This file |

## Config
| File | Purpose |
|---|---|
| `package.json` | Dependencies and npm scripts (`start`, `build`, `test`) |
| `tsconfig.json` | TypeScript compiler configuration |
| `.gitignore` | Excludes `node_modules`, build output, Playwright artifacts |

## App core
| File | Purpose |
|---|---|
| `public/index.html` | HTML shell / mount point |
| `src/index.tsx` | React entry point, wraps the app in `BrowserRouter` |
| `src/index.css` | Global design tokens (color, type, radius, shadow variables) and resets |
| `src/App.tsx` | Route definitions and the protected-route layout wrapper |
| `src/App.css` | Shared component styles — cards, buttons, forms, tables, badges, modals, toasts, tabs, tooltips, drag-and-drop |
| `src/react-app-env.d.ts` | Create React App TypeScript ambient types |
| `src/api/mockApi.ts` | The in-memory "backend" — auth, dashboard stats, orders, users, form submission, all with simulated latency and error paths |
| `src/context/AuthContext.tsx` | React context providing session state and `login`/`logout` |
| `src/components/Navbar.tsx` / `.css` | Top navigation bar shown on every authenticated page |

## Pages
| File | Route | Covers |
|---|---|---|
| `src/pages/LoginPage.tsx` / `.css` | `/login` | Sign in, register, forgot password, validation, lockout |
| `src/pages/DashboardPage.tsx` | `/dashboard` | Async stat cards, skeleton loaders, forced error + retry, activity feed |
| `src/pages/FormPage.tsx` | `/form` | Multi-field form, client validation, simulated server error |
| `src/pages/TablePage.tsx` | `/table` | Sortable/filterable/searchable/paginated orders table |
| `src/pages/ElementsPage.tsx` | `/elements` | Checkboxes, radios, selects, range, date picker, tooltip, modal, accordion, delayed content, file upload, iframe |
| `src/pages/UserManagementPage.tsx` | `/users` | Full CRUD with modals and toast confirmations |
| `src/pages/AlertsPage.tsx` | `/alerts` | Native `alert`/`confirm`/`prompt`, toasts, dismissible banners, async status |
| `src/pages/DragDropPage.tsx` | `/drag-drop` | HTML5 drag-and-drop kanban board with button fallbacks |

## Total

23 files, ~3,350 lines across app code, styles, and documentation.

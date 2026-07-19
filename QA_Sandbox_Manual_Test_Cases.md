# QA Sandbox — Manual Test Case Suite

A complete set of manual functional test cases for the QA Sandbox practice application, covering authentication, dashboards, forms, tables, CRUD, alerts, and drag-and-drop.

- **Application under test:** QA Sandbox (React + TypeScript practice app)
- **Test environment:** Local build at `http://localhost:3000` (`npm start`); latest Chrome, Firefox, and Edge on desktop, plus Chrome (Android) and Safari (iOS) for responsive checks
- **Login credentials:** `qa.engineer@example.com` / `Practice123!`
- **Total test cases:** 132

## Column legend

| Field | Meaning |
|---|---|
| **TC ID** | Unique ID, prefixed by module (e.g. `LGN` = Login, `TBL` = Orders Table) |
| **Priority** | Business priority — High, Medium, or Low |
| **Test Type** | Positive, Negative, UI, Security, or Boundary |
| **Preconditions** | State required before executing the steps |
| **Test Steps** | Numbered, reproducible actions to execute |
| **Test Data** | Concrete input values to use |
| **Expected Result** | The correct, observable outcome |
| **Actual Result** | Left blank — fill in during execution |
| **Status** | Left as `Not Executed` — update during execution (Pass / Fail / Blocked / N/A) |
| **Automatable** | Whether this is a good near-term candidate for Playwright automation |

## Table of contents

1. [Authentication - Login (LGN)](#authentication---login-lgn) — 15 cases
1. [Authentication - Registration (REG)](#authentication---registration-reg) — 9 cases
1. [Authentication - Password Reset (PWD)](#authentication---password-reset-pwd) — 5 cases
1. [Dashboard (DASH)](#dashboard-dash) — 9 cases
1. [Support Request Form (FRM)](#support-request-form-frm) — 15 cases
1. [Orders Table (TBL)](#orders-table-tbl) — 17 cases
1. [UI Elements (ELM)](#ui-elements-elm) — 19 cases
1. [User Management (USR)](#user-management-usr) — 15 cases
1. [Alerts & Notifications (ALT)](#alerts--notifications-alt) — 13 cases
1. [Drag and Drop Board (DND)](#drag-and-drop-board-dnd) — 7 cases
1. [Navigation & Layout (NAV)](#navigation--layout-nav) — 8 cases

---

## Authentication - Login (LGN)

*15 test cases*

### TC-LGN-001 — Verify user can log in with valid credentials

- **Scenario:** Successful login
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /login page and is not authenticated.
- **Test steps:**
    1. Enter a valid email in the Email field.
    2. Enter the matching valid password in the Password field.
    3. Click the 'Sign in' button.
- **Test data:**
    - Email: qa.engineer@example.com
    - Password: Practice123!
- **Expected result:** User is redirected to the Dashboard page. Navbar shows the logged-in user's name.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-LGN-002 — Verify error is shown for an incorrect password

- **Scenario:** Invalid password
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /login page.
- **Test steps:**
    1. Enter a valid email.
    2. Enter an incorrect password.
    3. Click 'Sign in'.
- **Test data:**
    - Email: qa.engineer@example.com
    - Password: WrongPass1!
- **Expected result:** An 'Invalid email or password' error message is displayed. User remains on the login page.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-LGN-003 — Verify error is shown for an email with no matching account

- **Scenario:** Invalid email - unregistered account
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /login page.
- **Test steps:**
    1. Enter an email address that has no account.
    2. Enter any password.
    3. Click 'Sign in'.
- **Test data:**
    - Email: nobody@example.com
    - Password: Practice123!
- **Expected result:** An 'Invalid email or password' error message is displayed.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-LGN-004 — Verify validation error when Email is left blank

- **Scenario:** Empty email field
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /login page.
- **Test steps:**
    1. Leave the Email field empty.
    2. Enter any password.
    3. Click 'Sign in'.
- **Test data:**
    - Email: (blank)
    - Password: Practice123!
- **Expected result:** Inline validation error 'Email is required.' is displayed under the Email field. No API call is made.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-LGN-005 — Verify validation error when Password is left blank

- **Scenario:** Empty password field
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /login page.
- **Test steps:**
    1. Enter a valid email.
    2. Leave the Password field empty.
    3. Click 'Sign in'.
- **Test data:**
    - Email: qa.engineer@example.com
    - Password: (blank)
- **Expected result:** Inline validation error 'Password is required.' is displayed under the Password field.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-LGN-006 — Verify validation error for an incorrectly formatted email

- **Scenario:** Malformed email format
- **Priority:** Medium
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /login page.
- **Test steps:**
    1. Enter a malformed email address (missing '@' or domain).
    2. Enter any password.
    3. Click 'Sign in'.
- **Test data:**
    - Email: qa.engineer  Password: Practice123!
- **Expected result:** Inline validation error 'Enter a valid email address.' is displayed. No API call is made.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-LGN-007 — Verify validation errors appear for both fields simultaneously

- **Scenario:** Both fields empty
- **Priority:** Medium
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /login page.
- **Test steps:**
    1. Leave Email and Password empty.
    2. Click 'Sign in'.
- **Test data:**
    - Email: (blank)
    - Password: (blank)
- **Expected result:** Both 'Email is required.' and 'Password is required.' errors are displayed at the same time.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-LGN-008 — Verify account is temporarily locked after 3 failed login attempts

- **Scenario:** Account lockout after repeated failures
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /login page.
- **Test steps:**
    1. Attempt login with an incorrect password 3 times in a row.
    2. Attempt a 4th login (even with the correct password).
- **Test data:**
    - Email: qa.engineer@example.com
    - Password attempts: wrong x3, then correct
- **Expected result:** After the 3rd failed attempt, subsequent attempts show a lockout message stating the account is temporarily locked, even when correct credentials are then submitted.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-LGN-009 — Verify the password input masks characters

- **Scenario:** Password field masking
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is on the /login page.
- **Test steps:**
    1. Click into the Password field.
    2. Type any string.
- **Test data:**
    - Password: Practice123!
- **Expected result:** Characters are rendered as masked dots/asterisks, not plain text.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-LGN-010 — Verify a loading indicator displays while the login request is in flight

- **Scenario:** Loading state on submit
- **Priority:** Medium
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is on the /login page with valid credentials entered.
- **Test steps:**
    1. Click 'Sign in'.
    2. Observe the button immediately after clicking.
- **Test data:**
    - Email: qa.engineer@example.com
    - Password: Practice123!
- **Expected result:** The 'Sign in' button shows a spinner and is disabled until the (simulated) network request resolves.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-LGN-011 — Verify an authenticated user visiting /login is redirected to the Dashboard

- **Scenario:** Redirect when already authenticated
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User has an active, valid session (already logged in).
- **Test steps:**
    1. Manually navigate the browser to the /login URL.
- **Test data:**
    - N/A
- **Expected result:** User is automatically redirected to /dashboard and the login form is not shown.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-LGN-012 — Verify an unauthenticated user is redirected to /login when accessing a protected page

- **Scenario:** Redirect to login for protected route
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is not authenticated (no active session).
- **Test steps:**
    1. Manually navigate the browser to /dashboard, /table, /users, or any other protected route.
- **Test data:**
    - URL: /dashboard
- **Expected result:** User is redirected to /login instead of seeing the protected page content.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-LGN-013 — Verify a logged-in session survives a full browser refresh

- **Scenario:** Session persists across page refresh
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is logged in and on any authenticated page.
- **Test steps:**
    1. Refresh the browser (F5).
- **Test data:**
    - N/A
- **Expected result:** User remains logged in and lands back on the same (or default authenticated) page, not the login screen.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-LGN-014 — Verify the Logout button ends the session and redirects to login

- **Scenario:** Logout functionality
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is logged in.
- **Test steps:**
    1. Click the 'Log out' button in the navbar.
- **Test data:**
    - N/A
- **Expected result:** User's session is cleared, and the user is redirected to /login. Attempting to navigate back to a protected route redirects to /login again.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-LGN-015 — Verify switching between Sign in / Create account / Forgot password tabs preserves independent form state

- **Scenario:** Navigate between auth tabs
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is on the /login page.
- **Test steps:**
    1. Enter an email on the Sign in tab.
    2. Switch to 'Create account' tab.
    3. Switch to 'Forgot password' tab.
    4. Switch back to 'Sign in'.
- **Test data:**
    - Email: test@example.com
- **Expected result:** Tab switching works without errors; validation messages from a previous tab are cleared when switching tabs.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

---

## Authentication - Registration (REG)

*9 test cases*

### TC-REG-001 — Verify a new account can be created with valid, unique details

- **Scenario:** Successful registration
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /login page, 'Create account' tab selected.
- **Test steps:**
    1. Enter a full name.
    2. Enter a unique email address.
    3. Enter a password (8+ characters).
    4. Enter the same password in Confirm password.
    5. Click 'Create account'.
- **Test data:**
    - Name: Jamie Lee
    - Email: jamie.lee@example.com
    - Password: SecurePass1
    - Confirm: SecurePass1
- **Expected result:** A success notice 'Account created. You can now sign in.' is shown and the view switches to the Sign in tab.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-REG-002 — Verify registration is rejected for an email that already has an account

- **Scenario:** Duplicate email registration
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the Create account tab.
- **Test steps:**
    1. Enter any full name.
    2. Enter the existing account email.
    3. Enter matching passwords.
    4. Click 'Create account'.
- **Test data:**
    - Email: qa.engineer@example.com
- **Expected result:** An error notice 'An account with that email already exists.' is displayed. User remains on the registration form.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-REG-003 — Verify validation error when Full name is blank

- **Scenario:** Empty full name
- **Priority:** Medium
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the Create account tab.
- **Test steps:**
    1. Leave Full name blank.
    2. Fill in valid email and matching passwords.
    3. Click 'Create account'.
- **Test data:**
    - Name: (blank)
- **Expected result:** Inline error 'Full name is required.' is displayed under the Full name field.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-REG-004 — Verify validation error for a password under the minimum length

- **Scenario:** Password shorter than 8 characters
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the Create account tab.
- **Test steps:**
    1. Fill in name and valid email.
    2. Enter a password fewer than 8 characters.
    3. Enter the same value in Confirm password.
    4. Click 'Create account'.
- **Test data:**
    - Password: abc123
- **Expected result:** Inline error 'Password must be at least 8 characters.' is displayed.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-REG-005 — Verify validation error when Confirm password does not match Password

- **Scenario:** Password and confirmation mismatch
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the Create account tab.
- **Test steps:**
    1. Fill in name and valid email.
    2. Enter a valid password.
    3. Enter a different value in Confirm password.
    4. Click 'Create account'.
- **Test data:**
    - Password: SecurePass1
    - Confirm: SecurePass2
- **Expected result:** Inline error 'Passwords do not match.' is displayed under Confirm password.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-REG-006 — Verify validation error for a malformed email during registration

- **Scenario:** Invalid email format on registration
- **Priority:** Medium
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the Create account tab.
- **Test steps:**
    1. Fill in name.
    2. Enter a malformed email.
    3. Enter matching valid passwords.
    4. Click 'Create account'.
- **Test data:**
    - Email: jamie.lee@@example
- **Expected result:** Inline error 'Enter a valid email address.' is displayed.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-REG-007 — Verify all required-field validation errors appear together

- **Scenario:** All fields empty on submit
- **Priority:** Medium
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the Create account tab.
- **Test steps:**
    1. Leave all fields empty.
    2. Click 'Create account'.
- **Test data:**
    - N/A
- **Expected result:** Validation errors are shown for Full name, Email, and Password simultaneously. No API call is made.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-REG-008 — Verify a loading indicator shows while the registration request is in flight

- **Scenario:** Loading state during registration
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is on the Create account tab with valid data entered.
- **Test steps:**
    1. Click 'Create account'.
    2. Observe the button immediately after clicking.
- **Test data:**
    - N/A
- **Expected result:** The 'Create account' button shows a spinner and is disabled until the request resolves.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-REG-009 — Verify the user can immediately sign in after registering

- **Scenario:** Navigate to Sign in after successful registration
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** No
- **Preconditions:** A new account was just registered successfully.
- **Test steps:**
    1. After the success notice appears, confirm the Sign in tab is active.
    2. Enter the new account's credentials.
    3. Click 'Sign in'.
- **Test data:**
    - Newly registered email/password
- **Expected result:** User is able to log in successfully (in a real backend); in this practice app, only the seeded account authenticates, which is expected mock behavior.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

---

## Authentication - Password Reset (PWD)

*5 test cases*

### TC-PWD-001 — Verify a reset link confirmation is shown for a valid email

- **Scenario:** Successful reset request
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the 'Forgot password' tab.
- **Test steps:**
    1. Enter a valid, well-formatted email address.
    2. Click 'Send reset link'.
- **Test data:**
    - Email: qa.engineer@example.com
- **Expected result:** A success message confirms that a reset link has been sent to the provided address if an account exists.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-PWD-002 — Verify validation error when Email is blank

- **Scenario:** Empty email on reset request
- **Priority:** Medium
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the 'Forgot password' tab.
- **Test steps:**
    1. Leave the Email field empty.
    2. Click 'Send reset link'.
- **Test data:**
    - N/A
- **Expected result:** Inline error 'Enter a valid email address.' is displayed. No request is submitted.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-PWD-003 — Verify validation error for an invalid email format

- **Scenario:** Malformed email on reset request
- **Priority:** Medium
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the 'Forgot password' tab.
- **Test steps:**
    1. Enter a malformed email address.
    2. Click 'Send reset link'.
- **Test data:**
    - Email: not-an-email
- **Expected result:** Inline error 'Enter a valid email address.' is displayed.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-PWD-004 — Verify the response does not reveal whether the account exists

- **Scenario:** Reset request for non-existent account
- **Priority:** Medium
- **Test type:** Security
- **Automatable:** Yes
- **Preconditions:** User is on the 'Forgot password' tab.
- **Test steps:**
    1. Enter an email with no associated account.
    2. Click 'Send reset link'.
- **Test data:**
    - Email: unknown.person@example.com
- **Expected result:** The same generic confirmation message is shown regardless of whether the account exists, avoiding user enumeration.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-PWD-005 — Verify a loading indicator shows while the request is in flight

- **Scenario:** Loading state during reset request
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is on the 'Forgot password' tab with a valid email entered.
- **Test steps:**
    1. Click 'Send reset link'.
    2. Observe the button immediately after clicking.
- **Test data:**
    - N/A
- **Expected result:** The button shows a spinner and is disabled until the request resolves.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

---

## Dashboard (DASH)

*9 test cases*

### TC-DASH-001 — Verify dashboard stats and welcome message load after login

- **Scenario:** Dashboard loads successfully
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User has just logged in successfully.
- **Test steps:**
    1. Observe the Dashboard page immediately after login.
- **Test data:**
    - N/A
- **Expected result:** A personalized welcome message displays the user's name. Stat cards show skeleton loaders briefly, then populate with Active Users, Open Orders, Revenue Today, and Error Rate.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-DASH-002 — Verify all four stat cards render with values after loading completes

- **Scenario:** Stat cards display correct data
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the Dashboard and data has finished loading.
- **Test steps:**
    1. Wait for the loading skeletons to disappear.
    2. Inspect each stat card.
- **Test data:**
    - N/A
- **Expected result:** Active Users, Open Orders, Revenue Today, and Error Rate each display a non-empty, correctly formatted value.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-DASH-003 — Verify the recent activity list populates after a loading state

- **Scenario:** Recent activity feed loads
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the Dashboard.
- **Test steps:**
    1. Observe the 'Recent activity' card on page load.
- **Test data:**
    - N/A
- **Expected result:** A loading indicator briefly appears, then a list of recent activity items with messages and relative timestamps is displayed.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-DASH-004 — Verify enabling the error simulation causes the stats request to fail

- **Scenario:** Simulate metrics failure toggle
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the Dashboard.
- **Test steps:**
    1. Check the 'Simulate metrics failure' checkbox.
    2. Observe the stats section reload (or wait for the next load).
- **Test data:**
    - N/A
- **Expected result:** An error banner is displayed in place of the stat cards, with a message about failing to load dashboard metrics, and a 'Retry' button is shown.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-DASH-005 — Verify the Retry button reloads stats after a failure

- **Scenario:** Retry after simulated failure
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** The 'Simulate metrics failure' checkbox is checked and an error is currently displayed.
- **Test steps:**
    1. Uncheck 'Simulate metrics failure'.
    2. Click the 'Retry' button in the error banner.
- **Test data:**
    - N/A
- **Expected result:** The stats reload successfully and the stat cards display, replacing the error banner.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-DASH-006 — Verify Retry re-fails when the error toggle is still checked

- **Scenario:** Retry while error simulation still enabled
- **Priority:** Medium
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** The 'Simulate metrics failure' checkbox is checked and an error is displayed.
- **Test steps:**
    1. Without unchecking the toggle, click 'Retry'.
- **Test data:**
    - N/A
- **Expected result:** The error banner is displayed again after the retry attempt.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-DASH-007 — Verify skeleton placeholders show before real data arrives

- **Scenario:** Skeleton loading state
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User navigates to the Dashboard.
- **Test steps:**
    1. Immediately observe the stat card area before data finishes loading.
- **Test data:**
    - N/A
- **Expected result:** Animated skeleton placeholders are visible in place of stat values until the data resolves.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-DASH-008 — Verify the activity feed and stat cards load independently

- **Scenario:** Activity loading independent of stats loading
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User navigates to the Dashboard with 'Simulate metrics failure' checked.
- **Test steps:**
    1. Observe both the stat cards area and the Recent Activity card simultaneously.
- **Test data:**
    - N/A
- **Expected result:** The stat cards show an error state while the Recent Activity card still loads and displays its items successfully (the two data sources are independent).
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-DASH-009 — Verify the welcome message uses the actual session user's name

- **Scenario:** Welcome message reflects logged-in user
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is logged in as the seeded QA account.
- **Test steps:**
    1. Observe the header text on the Dashboard.
- **Test data:**
    - N/A
- **Expected result:** The welcome text includes the logged-in user's display name.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

---

## Support Request Form (FRM)

*15 test cases*

### TC-FRM-001 — Verify a fully valid form submits successfully and returns a ticket ID

- **Scenario:** Successful form submission
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is logged in and on the /form page.
- **Test steps:**
    1. Fill in Full name.
    2. Fill in a valid email.
    3. Select a Department.
    4. Select a Priority (or leave default 'Normal').
    5. Enter a message of 20+ characters.
    6. Click 'Submit request'.
- **Test data:**
    - Name: Alex Rivera
    - Email: alex.rivera@example.com
    - Department: Technical support
    - Message: 'The dashboard fails to load metrics intermittently.'
- **Expected result:** A success banner displays a generated ticket ID. The form fields reset to their defaults.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-FRM-002 — Verify validation error when Full name is empty

- **Scenario:** Required field: Full name missing
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /form page.
- **Test steps:**
    1. Leave Full name blank.
    2. Fill in all other required fields validly.
    3. Click 'Submit request'.
- **Test data:**
    - Name: (blank)
- **Expected result:** Inline error 'Full name is required.' is shown; form is not submitted.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-FRM-003 — Verify validation error when Email is empty

- **Scenario:** Required field: Email missing
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /form page.
- **Test steps:**
    1. Leave Email blank.
    2. Fill in all other required fields validly.
    3. Click 'Submit request'.
- **Test data:**
    - Email: (blank)
- **Expected result:** Inline error 'Email is required.' is shown; form is not submitted.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-FRM-004 — Verify validation error for a malformed email address

- **Scenario:** Invalid email format
- **Priority:** Medium
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /form page.
- **Test steps:**
    1. Enter a malformed email.
    2. Fill in all other required fields validly.
    3. Click 'Submit request'.
- **Test data:**
    - Email: alex.rivera#example.com
- **Expected result:** Inline error 'Enter a valid email address.' is shown.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-FRM-005 — Verify validation error when Department is left at the placeholder

- **Scenario:** Required field: Department not selected
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /form page.
- **Test steps:**
    1. Leave Department at 'Select a department…'.
    2. Fill in all other required fields validly.
    3. Click 'Submit request'.
- **Test data:**
    - Department: (unselected)
- **Expected result:** Inline error 'Choose a department.' is shown.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-FRM-006 — Verify validation error when Message is shorter than 20 characters

- **Scenario:** Message below minimum length
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /form page.
- **Test steps:**
    1. Enter a message shorter than 20 characters.
    2. Fill in all other required fields validly.
    3. Click 'Submit request'.
- **Test data:**
    - Message: 'Too short'
- **Expected result:** Inline error 'Message must be at least 20 characters.' is shown.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-FRM-007 — Verify validation error when Message is left blank

- **Scenario:** Empty message field
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /form page.
- **Test steps:**
    1. Leave Message blank.
    2. Fill in all other required fields validly.
    3. Click 'Submit request'.
- **Test data:**
    - Message: (blank)
- **Expected result:** Inline error 'Message cannot be empty.' is shown.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-FRM-008 — Verify the character counter below Message updates as the user types

- **Scenario:** Live character counter
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is on the /form page.
- **Test steps:**
    1. Click into the Message field.
    2. Type text incrementally and observe the counter.
- **Test data:**
    - Message: 'Testing the counter behavior'
- **Expected result:** The character count displayed updates in real time to match the number of trimmed characters typed.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-FRM-009 — Verify a server-side error is surfaced for an email containing 'bounce'

- **Scenario:** Simulated server rejection (bounce email)
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /form page with an otherwise valid form.
- **Test steps:**
    1. Enter an email address containing the word 'bounce'.
    2. Fill in all other fields validly.
    3. Click 'Submit request'.
- **Test data:**
    - Email: test.bounce@example.com
- **Expected result:** An error banner is shown stating the mail server rejected the address; no ticket ID is generated, and the form data is preserved.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-FRM-010 — Verify the Priority radio group defaults to 'Normal' on page load

- **Scenario:** Priority defaults to Normal
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User navigates to the /form page for the first time in a session.
- **Test steps:**
    1. Observe the Priority radio buttons without interacting with them.
- **Test data:**
    - N/A
- **Expected result:** The 'Normal' radio option is selected by default.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-FRM-011 — Verify selecting a different priority updates the selected radio option

- **Scenario:** Change priority selection
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is on the /form page.
- **Test steps:**
    1. Click the 'High' priority radio button.
    2. Click the 'Low' priority radio button.
- **Test data:**
    - N/A
- **Expected result:** Only one radio button is selected at a time, and the UI reflects the most recently clicked option.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-FRM-012 — Verify the 'Send me product updates' checkbox can be checked and unchecked

- **Scenario:** Subscribe checkbox toggling
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is on the /form page.
- **Test steps:**
    1. Click the Subscribe checkbox to check it.
    2. Click it again to uncheck it.
- **Test data:**
    - N/A
- **Expected result:** The checkbox state toggles correctly on each click and reflects the current state visually.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-FRM-013 — Verify the Reset button restores all fields to their default state

- **Scenario:** Reset button clears the form
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User has entered data into several form fields.
- **Test steps:**
    1. Fill in multiple fields (name, email, message, checkbox).
    2. Click the 'Reset' button.
- **Test data:**
    - N/A
- **Expected result:** All fields return to their initial empty/default values, and any validation errors or banners are cleared.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-FRM-014 — Verify the Submit button is disabled and shows a spinner while submitting

- **Scenario:** Submit button shows loading state
- **Priority:** Medium
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User has filled in a fully valid form.
- **Test steps:**
    1. Click 'Submit request'.
    2. Immediately observe the button.
- **Test data:**
    - N/A
- **Expected result:** The Submit button becomes disabled and displays a spinner until the (simulated) request completes.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-FRM-015 — Verify the form can be corrected and resubmitted after a validation failure

- **Scenario:** Successful resubmission after fixing errors
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** A previous submission attempt failed validation.
- **Test steps:**
    1. Submit the form with one or more invalid fields.
    2. Correct the invalid field(s).
    3. Click 'Submit request' again.
- **Test data:**
    - N/A
- **Expected result:** The form submits successfully once all validation errors are resolved, and a ticket ID is returned.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

---

## Orders Table (TBL)

*17 test cases*

### TC-TBL-001 — Verify the orders table populates with data on initial page load

- **Scenario:** Orders table loads default data
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is logged in and navigates to /table.
- **Test steps:**
    1. Observe the table immediately after navigation.
- **Test data:**
    - N/A
- **Expected result:** A brief loading indicator appears, then the table populates with the first page of order rows (Order ID, Customer, Product, Amount, Status, Date).
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-002 — Verify searching filters rows by matching customer name

- **Scenario:** Search by customer name
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /table page with data loaded.
- **Test steps:**
    1. Type a known customer name (or partial name) into the search box.
- **Test data:**
    - Search: 'Ava'
- **Expected result:** Only orders belonging to matching customers are displayed. The result count and pagination update accordingly.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-003 — Verify searching filters rows by matching order ID

- **Scenario:** Search by order ID
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /table page.
- **Test steps:**
    1. Type a known order ID (or partial ID) into the search box.
- **Test data:**
    - Search: 'ORD-1005'
- **Expected result:** Only the matching order row is displayed.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-004 — Verify an empty-state message appears when search yields no results

- **Scenario:** Search with no matches
- **Priority:** Medium
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /table page.
- **Test steps:**
    1. Type a search term that matches no orders.
- **Test data:**
    - Search: 'zzzznotreal'
- **Expected result:** The table body displays a 'No orders match these filters.' message instead of rows.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-005 — Verify clearing the search box restores the unfiltered result set

- **Scenario:** Clear search restores full list
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** A search filter is currently applied.
- **Test steps:**
    1. Clear all text from the search box.
- **Test data:**
    - N/A
- **Expected result:** The table returns to showing the full, unfiltered (but still paginated) order list.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-006 — Verify the status dropdown filters the table to only matching statuses

- **Scenario:** Filter by order status
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /table page.
- **Test steps:**
    1. Open the status filter dropdown.
    2. Select 'Shipped'.
- **Test data:**
    - Status: Shipped
- **Expected result:** Only orders with a status of 'Shipped' are displayed, each showing the Shipped badge.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-007 — Verify search and status filters apply together (AND logic)

- **Scenario:** Combine search and status filter
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /table page.
- **Test steps:**
    1. Enter a search term.
    2. Select a specific status from the dropdown.
- **Test data:**
    - Search: 'Chen'
    - Status: Delivered
- **Expected result:** Only rows matching both the search term and the selected status are shown.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-008 — Verify selecting 'All statuses' removes the status filter

- **Scenario:** Reset status filter to All
- **Priority:** Low
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** A specific status filter is currently applied.
- **Test steps:**
    1. Open the status dropdown.
    2. Select 'All statuses'.
- **Test data:**
    - N/A
- **Expected result:** Orders of every status are shown again, subject to any active search term.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-009 — Verify clicking a sortable column header toggles sort direction

- **Scenario:** Sort by column ascending/descending
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /table page.
- **Test steps:**
    1. Click the 'Amount' column header once.
    2. Observe row order.
    3. Click the 'Amount' header again.
    4. Observe row order.
- **Test data:**
    - N/A
- **Expected result:** First click sorts ascending (with an up arrow indicator); second click reverses to descending (down arrow indicator). Row values are correctly ordered in both directions.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-010 — Verify every sortable column (Order ID, Customer, Product, Amount, Status, Date) can be sorted

- **Scenario:** Sort by each available column
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /table page.
- **Test steps:**
    1. Click each column header in turn.
    2. Verify rows reorder according to that column's values.
- **Test data:**
    - N/A
- **Expected result:** Each column reorders the table rows correctly by its own values when clicked.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-011 — Verify changing the sort while on a later page returns to page 1

- **Scenario:** Sorting resets to page 1
- **Priority:** Low
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User has navigated to page 2 or later of the orders table.
- **Test steps:**
    1. Click any sortable column header.
- **Test data:**
    - N/A
- **Expected result:** The table resets to page 1 with the new sort order applied.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-012 — Verify the Next button advances to the following page of results

- **Scenario:** Pagination - Next page
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on page 1 of the orders table with more than one page of results.
- **Test steps:**
    1. Click the 'Next' button.
- **Test data:**
    - N/A
- **Expected result:** The table displays the next set of rows, and the page indicator updates (e.g., 'Page 2 of 6').
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-013 — Verify the Previous button returns to the prior page of results

- **Scenario:** Pagination - Previous page
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on page 2 or later of the orders table.
- **Test steps:**
    1. Click the 'Previous' button.
- **Test data:**
    - N/A
- **Expected result:** The table displays the prior set of rows, and the page indicator decrements accordingly.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-014 — Verify the Next button is disabled once the last page is reached

- **Scenario:** Next button disabled on last page
- **Priority:** Medium
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User has navigated to the final page of results.
- **Test steps:**
    1. Observe the 'Next' button state on the last page.
- **Test data:**
    - N/A
- **Expected result:** The 'Next' button is disabled and cannot be clicked.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-015 — Verify the Previous button is disabled on page 1

- **Scenario:** Previous button disabled on first page
- **Priority:** Medium
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is on page 1 of the orders table.
- **Test steps:**
    1. Observe the 'Previous' button state.
- **Test data:**
    - N/A
- **Expected result:** The 'Previous' button is disabled and cannot be clicked.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-016 — Verify the 'Page X of Y (N orders)' text reflects the current filter/sort state

- **Scenario:** Page indicator accuracy
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User has applied a search and/or status filter that reduces the result set.
- **Test steps:**
    1. Apply a filter that reduces total results.
    2. Observe the page indicator text.
- **Test data:**
    - N/A
- **Expected result:** The indicator correctly reflects the filtered total order count and total page count, not the full unfiltered dataset.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-TBL-017 — Verify a loading indicator appears while table data is being fetched

- **Scenario:** Loading indicator during data fetch
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is on the /table page.
- **Test steps:**
    1. Change the search term, status filter, sort, or page.
    2. Observe the toolbar area immediately after the change.
- **Test data:**
    - N/A
- **Expected result:** A brief loading spinner/text appears in the toolbar while new data is fetched, then disappears once data renders.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

---

## UI Elements (ELM)

*19 test cases*

### TC-ELM-001 — Verify checkboxes A, B, and C load with their correct default states

- **Scenario:** Checkbox default states
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User navigates to /elements.
- **Test steps:**
    1. Observe Checkbox A, B, and C without interacting.
- **Test data:**
    - N/A
- **Expected result:** Checkbox A is unchecked, Checkbox B is checked, and Checkbox C is unchecked and disabled.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-002 — Verify Checkbox A and B can be checked and unchecked

- **Scenario:** Toggle enabled checkboxes
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /elements page.
- **Test steps:**
    1. Click Checkbox A to check it, then click again to uncheck it.
    2. Click Checkbox B to uncheck it, then click again to check it.
- **Test data:**
    - N/A
- **Expected result:** Both checkboxes toggle state correctly on each click.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-003 — Verify Checkbox C cannot be interacted with

- **Scenario:** Disabled checkbox cannot be toggled
- **Priority:** Medium
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /elements page.
- **Test steps:**
    1. Attempt to click Checkbox C.
- **Test data:**
    - N/A
- **Expected result:** Checkbox C remains unchecked and its state does not change; it is visually rendered as disabled.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-004 — Verify only one size radio option can be selected at a time

- **Scenario:** Radio button single selection
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /elements page.
- **Test steps:**
    1. Click 'Small'.
    2. Click 'Large'.
    3. Click 'Medium'.
- **Test data:**
    - N/A
- **Expected result:** Selecting any option deselects the previously chosen option; only one radio button is active at a time. 'Medium' is selected by default before interaction.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-005 — Verify a single fruit can be selected from the dropdown

- **Scenario:** Single-select dropdown
- **Priority:** Low
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /elements page.
- **Test steps:**
    1. Open the single-select dropdown.
    2. Select 'Banana'.
- **Test data:**
    - N/A
- **Expected result:** The dropdown displays 'Banana' as the selected value.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-006 — Verify multiple options can be selected in the multi-select list

- **Scenario:** Multi-select dropdown - select multiple options
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /elements page.
- **Test steps:**
    1. Click 'TypeScript'.
    2. Ctrl/Cmd-click (or shift-click) 'Go' to add it to the selection.
- **Test data:**
    - N/A
- **Expected result:** Both 'TypeScript' and 'Go' appear selected (highlighted) simultaneously.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-007 — Verify moving the range slider updates the numeric label live

- **Scenario:** Range slider updates displayed value
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /elements page.
- **Test steps:**
    1. Note the default range value (50).
    2. Drag the slider to a new position, or use arrow keys.
- **Test data:**
    - Target value: 80
- **Expected result:** The numeric value displayed next to the slider updates in real time to match the slider's position.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-008 — Verify a date can be selected using the date input

- **Scenario:** Date picker selection
- **Priority:** Low
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /elements page.
- **Test steps:**
    1. Click the date input.
    2. Select a date from the picker (or type a date).
- **Test data:**
    - Date: 2026-08-15
- **Expected result:** The selected date is displayed in the date input field.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-009 — Verify the tooltip bubble appears only while hovering the trigger button

- **Scenario:** Tooltip appears on hover
- **Priority:** Medium
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is on the /elements page.
- **Test steps:**
    1. Move the mouse pointer over the 'Hover me' button.
    2. Move the mouse pointer away from the button.
- **Test data:**
    - N/A
- **Expected result:** The tooltip bubble appears while hovering and disappears once the pointer leaves the button.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-010 — Verify the modal can be opened and dismissed without confirming

- **Scenario:** Modal opens and closes via Cancel
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /elements page.
- **Test steps:**
    1. Click 'Open modal'.
    2. Click 'Cancel' inside the modal.
- **Test data:**
    - N/A
- **Expected result:** The modal appears when opened and closes when Cancel is clicked, with no further action taken.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-011 — Verify the modal can be dismissed by confirming

- **Scenario:** Modal closes via Confirm
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** The modal is open.
- **Test steps:**
    1. Click 'Confirm' inside the modal.
- **Test data:**
    - N/A
- **Expected result:** The modal closes.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-012 — Verify clicking outside the modal content closes it

- **Scenario:** Modal closes via overlay click
- **Priority:** Low
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** The modal is open.
- **Test steps:**
    1. Click on the dimmed overlay area outside the modal box.
- **Test data:**
    - N/A
- **Expected result:** The modal closes, equivalent to clicking Cancel.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-013 — Verify the toggle button correctly enables/disables the adjacent button

- **Scenario:** Enable/disable toggle interaction
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /elements page. The togglable button starts disabled.
- **Test steps:**
    1. Observe the togglable button is disabled and labeled 'Currently disabled'.
    2. Click 'Enable the button below'.
    3. Observe the togglable button.
    4. Click the togglable button.
    5. Click the toggle again to re-disable it.
- **Test data:**
    - N/A
- **Expected result:** After step 2, the togglable button becomes enabled and its label changes to 'Now enabled — click me'. It can be clicked while enabled. After step 5, it becomes disabled again.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-014 — Verify accordion items expand and collapse on click, and only track their own state

- **Scenario:** Accordion expands and collapses
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /elements page. The first accordion item is expanded by default.
- **Test steps:**
    1. Click the first item's header to collapse it.
    2. Click the second item's header to expand it.
    3. Click the second item's header again to collapse it.
- **Test data:**
    - N/A
- **Expected result:** Each header toggles the visibility of its own body content independently. Clicking an open header's title collapses it; clicking a closed header's title expands it.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-015 — Verify content that loads asynchronously appears after a short delay

- **Scenario:** Dynamic content appears after delay
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User navigates to /elements.
- **Test steps:**
    1. Immediately observe the 'Dynamic content' card.
    2. Wait approximately 2-3 seconds.
    3. Observe the card again.
- **Test data:**
    - N/A
- **Expected result:** A loading/waiting indicator is shown initially, then replaced by the loaded content banner after the delay elapses, without a page reload.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-016 — Verify a file can be selected and displayed via the upload zone's click-to-browse behavior

- **Scenario:** File upload via file picker
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /elements page.
- **Test steps:**
    1. Click the upload zone.
    2. Select one or more files from the file picker dialog.
- **Test data:**
    - Files: sample1.png, sample2.pdf
- **Expected result:** Each selected file appears as a labeled chip below the upload zone.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-017 — Verify a file can be uploaded by dragging it onto the upload zone

- **Scenario:** File upload via drag and drop
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /elements page.
- **Test steps:**
    1. Drag a file from the file system over the upload zone.
    2. Observe the zone's appearance while dragging over it.
    3. Drop the file.
- **Test data:**
    - File: sample.docx
- **Expected result:** The upload zone visually indicates an active drag state while hovering, and the dropped file appears as a chip after release.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-018 — Verify an uploaded file chip can be individually removed

- **Scenario:** Remove an uploaded file
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** At least one file has been uploaded and is listed as a chip.
- **Test steps:**
    1. Click the remove ('×') control on a specific file chip.
- **Test data:**
    - N/A
- **Expected result:** Only the selected file's chip is removed; any other uploaded files remain listed.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ELM-019 — Verify the embedded same-origin iframe renders and its internal button works

- **Scenario:** Iframe content renders and is interactive
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /elements page.
- **Test steps:**
    1. Locate the embedded frame on the page.
    2. Click the 'Click me' button inside the iframe.
- **Test data:**
    - N/A
- **Expected result:** The iframe renders its own content correctly, and clicking the button inside it updates text within the iframe (not the parent page).
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

---

## User Management (USR)

*15 test cases*

### TC-USR-001 — Verify the users table populates on navigating to /users

- **Scenario:** User list loads on page visit
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is logged in and navigates to /users.
- **Test steps:**
    1. Observe the page immediately after navigation.
- **Test data:**
    - N/A
- **Expected result:** A brief loading indicator appears, then the table populates with existing users, showing Name, Email, Role, Status, and Created date.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-USR-002 — Verify a new user can be created via the Add user modal

- **Scenario:** Add a new user successfully
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /users page.
- **Test steps:**
    1. Click '+ Add user'.
    2. Enter a Name.
    3. Enter a unique Email.
    4. Select a Role.
    5. Click 'Save'.
- **Test data:**
    - Name: Morgan Blake
    - Email: morgan.blake@example.com
    - Role: Editor
- **Expected result:** The modal closes, a confirmation toast appears, and the new user appears in the table with a status of 'Invited'.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-USR-003 — Verify creating a user with an already-used email is rejected

- **Scenario:** Add user with duplicate email
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /users page, Add user modal open.
- **Test steps:**
    1. Enter a Name.
    2. Enter an email that already belongs to an existing user.
    3. Select a Role.
    4. Click 'Save'.
- **Test data:**
    - Email: priya@example.com (existing)
- **Expected result:** An inline error 'A user with that email already exists.' is shown inside the modal; the modal remains open and no duplicate row is added.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-USR-004 — Verify validation prevents saving with an empty Name or Email

- **Scenario:** Add user with missing required fields
- **Priority:** Medium
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /users page, Add user modal open.
- **Test steps:**
    1. Leave Name and/or Email blank.
    2. Click 'Save'.
- **Test data:**
    - N/A
- **Expected result:** An inline error 'Name and email are required.' is shown; the modal remains open and no user is created.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-USR-005 — Verify canceling the Add user modal discards changes

- **Scenario:** Cancel Add user modal
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /users page, Add user modal open with some data entered.
- **Test steps:**
    1. Enter data into the Name/Email fields.
    2. Click 'Cancel'.
- **Test data:**
    - N/A
- **Expected result:** The modal closes without creating a new user, and the users table is unchanged.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-USR-006 — Verify a user's Name and Role can be updated

- **Scenario:** Edit an existing user
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /users page with at least one existing user.
- **Test steps:**
    1. Click 'Edit' on a user row.
    2. Change the Name.
    3. Change the Role.
    4. Click 'Save'.
- **Test data:**
    - New name: Priya N. Nair
    - New role: Admin
- **Expected result:** The modal closes, a confirmation toast appears, and the table row reflects the updated name and role badge.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-USR-007 — Verify the Email field cannot be modified in the Edit user modal

- **Scenario:** Email field disabled during edit
- **Priority:** Medium
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** The Edit user modal is open for an existing user.
- **Test steps:**
    1. Attempt to click into and edit the Email field.
- **Test data:**
    - N/A
- **Expected result:** The Email field is rendered as disabled/read-only and its value cannot be changed.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-USR-008 — Verify canceling an edit discards unsaved changes

- **Scenario:** Cancel Edit user modal
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** The Edit user modal is open with changes made to the Name or Role.
- **Test steps:**
    1. Modify the Name field.
    2. Click 'Cancel'.
- **Test data:**
    - N/A
- **Expected result:** The modal closes and the user's row in the table remains unchanged from before the edit.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-USR-009 — Verify a user's status can be toggled from Active to Suspended

- **Scenario:** Suspend an active user
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** A user with status 'Active' exists in the table.
- **Test steps:**
    1. Click 'Suspend' on that user's row.
- **Test data:**
    - N/A
- **Expected result:** The user's status badge updates to 'Suspended', and the row's action button now reads 'Reactivate'.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-USR-010 — Verify a suspended user's status can be toggled back to Active

- **Scenario:** Reactivate a suspended user
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** A user with status 'Suspended' exists in the table.
- **Test steps:**
    1. Click 'Reactivate' on that user's row.
- **Test data:**
    - N/A
- **Expected result:** The user's status badge updates to 'Active', and the action button reverts to 'Suspend'.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-USR-011 — Verify a user can be permanently removed after confirming the delete dialog

- **Scenario:** Delete user - confirm
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /users page with at least one user present.
- **Test steps:**
    1. Click 'Delete' on a user row.
    2. In the confirmation modal, click 'Delete user'.
- **Test data:**
    - N/A
- **Expected result:** A confirmation toast appears, the modal closes, and the deleted user's row no longer appears in the table.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-USR-012 — Verify canceling the delete confirmation does not remove the user

- **Scenario:** Delete user - cancel
- **Priority:** High
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** The delete confirmation modal is open for a user.
- **Test steps:**
    1. Click 'Cancel' in the confirmation modal.
- **Test data:**
    - N/A
- **Expected result:** The modal closes and the user remains present in the table, unmodified.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-USR-013 — Verify each role (Admin, Editor, Viewer) renders with a distinct badge style

- **Scenario:** Role badge reflects assigned role
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** Users with different roles exist in the table.
- **Test steps:**
    1. Visually inspect the Role column across multiple rows.
- **Test data:**
    - N/A
- **Expected result:** Each role displays its own visually distinct badge (e.g., differing colors), and the label text matches the assigned role.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-USR-014 — Verify each status (Active, Invited, Suspended) renders with a distinct badge style

- **Scenario:** Status badge reflects user state
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** Users in different statuses exist in the table.
- **Test steps:**
    1. Visually inspect the Status column across multiple rows.
- **Test data:**
    - N/A
- **Expected result:** Each status displays its own visually distinct badge, and the label matches the user's current status.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-USR-015 — Verify confirmation toasts disappear automatically after a few seconds

- **Scenario:** Toast auto-dismisses after user action
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** A user action (create/update/delete) has just completed, showing a toast.
- **Test steps:**
    1. Observe the toast notification.
    2. Wait several seconds without interacting.
- **Test data:**
    - N/A
- **Expected result:** The toast disappears on its own after a short delay without requiring user interaction.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

---

## Alerts & Notifications (ALT)

*13 test cases*

### TC-ALT-001 — Verify clicking the trigger opens a native alert dialog

- **Scenario:** Native browser alert() dialog
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /alerts page.
- **Test steps:**
    1. Click 'Trigger alert()'.
    2. Observe the browser dialog.
    3. Dismiss the dialog (OK).
- **Test data:**
    - N/A
- **Expected result:** A native browser alert dialog appears with the expected message text, and clicking OK dismisses it.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ALT-002 — Verify accepting a native confirm dialog records the acceptance

- **Scenario:** Native confirm() - accept
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /alerts page.
- **Test steps:**
    1. Click 'Trigger confirm()'.
    2. Click 'OK'/accept on the native dialog.
- **Test data:**
    - N/A
- **Expected result:** The page displays a result message indicating 'User accepted'.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ALT-003 — Verify dismissing a native confirm dialog records the dismissal

- **Scenario:** Native confirm() - dismiss
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /alerts page.
- **Test steps:**
    1. Click 'Trigger confirm()'.
    2. Click 'Cancel' on the native dialog.
- **Test data:**
    - N/A
- **Expected result:** The page displays a result message indicating 'User dismissed'.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ALT-004 — Verify text entered into a native prompt is captured and displayed

- **Scenario:** Native prompt() - enter text
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /alerts page.
- **Test steps:**
    1. Click 'Trigger prompt()'.
    2. Clear the default value and type custom text.
    3. Click 'OK'.
- **Test data:**
    - Prompt input: 'Automation test'
- **Expected result:** The page displays 'You typed: Automation test', reflecting the exact entered text.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ALT-005 — Verify canceling a native prompt does not display a typed value

- **Scenario:** Native prompt() - cancel
- **Priority:** Low
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is on the /alerts page.
- **Test steps:**
    1. Click 'Trigger prompt()'.
    2. Click 'Cancel' on the dialog.
- **Test data:**
    - N/A
- **Expected result:** No 'You typed:' result text is shown (or it reflects a null/cancelled result), since the dialog was cancelled.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ALT-006 — Verify clicking the info toast button shows an info-styled toast

- **Scenario:** Info toast notification
- **Priority:** Low
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /alerts page.
- **Test steps:**
    1. Click 'Info toast'.
- **Test data:**
    - N/A
- **Expected result:** A toast notification appears with the informational message and auto-dismisses after roughly 3.5 seconds.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ALT-007 — Verify clicking the success toast button shows a success-styled toast

- **Scenario:** Success toast notification
- **Priority:** Low
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /alerts page.
- **Test steps:**
    1. Click 'Success toast'.
- **Test data:**
    - N/A
- **Expected result:** A toast notification appears confirming success and auto-dismisses after roughly 3.5 seconds.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ALT-008 — Verify clicking the error toast button shows an error-styled toast

- **Scenario:** Error toast notification
- **Priority:** Low
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /alerts page.
- **Test steps:**
    1. Click 'Error toast'.
- **Test data:**
    - N/A
- **Expected result:** A toast notification appears with an error message and auto-dismisses after roughly 3.5 seconds.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ALT-009 — Verify triggering several toasts in quick succession stacks them without overlap

- **Scenario:** Multiple toasts stack correctly
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is on the /alerts page.
- **Test steps:**
    1. Click 'Info toast', 'Success toast', and 'Error toast' in quick succession.
- **Test data:**
    - N/A
- **Expected result:** All three toasts are visible simultaneously, stacked vertically without visually overlapping, and each dismisses independently on its own timer.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ALT-010 — Verify the slow action button reflects idle, loading, and done states

- **Scenario:** Async action shows in-progress and completed states
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /alerts page.
- **Test steps:**
    1. Observe the status text reads 'idle'.
    2. Click 'Run 2.5s action'.
    3. Immediately observe the button and status text.
    4. Wait for the action to complete.
- **Test data:**
    - N/A
- **Expected result:** On click, the button shows a spinner and is disabled, and the status text changes to 'loading'. After ~2.5 seconds, the status changes to 'done' and a success toast appears.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ALT-011 — Verify each alert banner can be dismissed independently

- **Scenario:** Dismiss individual banner
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** All four banners (info, success, warning, error) are visible on the /alerts page.
- **Test steps:**
    1. Click 'Dismiss' on the info banner only.
- **Test data:**
    - N/A
- **Expected result:** Only the info banner disappears; the success, warning, and error banners remain visible.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ALT-012 — Verify an empty-state message appears once all banners are dismissed

- **Scenario:** Dismiss all banners
- **Priority:** Low
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** All four banners are visible.
- **Test steps:**
    1. Dismiss the info, success, warning, and error banners one at a time.
- **Test data:**
    - N/A
- **Expected result:** After the last banner is dismissed, a message indicating all banners were dismissed (and that a refresh restores them) is displayed.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-ALT-013 — Verify reloading the page brings back any dismissed banners

- **Scenario:** Refresh restores dismissed banners
- **Priority:** Low
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** One or more banners have been dismissed.
- **Test steps:**
    1. Refresh the browser page.
- **Test data:**
    - N/A
- **Expected result:** All four banners are visible again, since dismissal state is not persisted.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

---

## Drag and Drop Board (DND)

*7 test cases*

### TC-DND-001 — Verify the board loads with the correct default cards and column counts

- **Scenario:** Initial board state
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User navigates to /drag-drop.
- **Test steps:**
    1. Observe the three columns and their card counts.
- **Test data:**
    - N/A
- **Expected result:** 'To do' shows 3 cards, 'In progress' shows 1 card, and 'Done' shows 1 card, matching the counts displayed in each column header.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-DND-002 — Verify a card can be dragged between columns using native drag-and-drop

- **Scenario:** Drag a card from To do to In progress
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is on the /drag-drop page.
- **Test steps:**
    1. Press and hold a card in the 'To do' column.
    2. Drag it over the 'In progress' column.
    3. Release to drop it.
- **Test data:**
    - Card: 'Write test plan'
- **Expected result:** The card moves out of 'To do' and appears in 'In progress'. Both column card counts update accordingly.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-DND-003 — Verify a column visually indicates when a dragged card is hovering over it

- **Scenario:** Column highlights during drag-over
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** A card is currently being dragged.
- **Test steps:**
    1. Drag a card and hover it over a different column without dropping.
- **Test data:**
    - N/A
- **Expected result:** The hovered column shows a distinct visual state (e.g., highlighted background/border) while the card is over it, and the highlight clears when the drag leaves or ends.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-DND-004 — Verify the right-arrow button advances a card to the next column

- **Scenario:** Move card right via button
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** A card exists in the 'To do' column.
- **Test steps:**
    1. Click the '→' button on a card in 'To do'.
- **Test data:**
    - N/A
- **Expected result:** The card moves to the 'In progress' column, and card counts update in both columns.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-DND-005 — Verify the left-arrow button moves a card to the previous column

- **Scenario:** Move card left via button
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** A card exists in the 'Done' or 'In progress' column.
- **Test steps:**
    1. Click the '←' button on a card in 'In progress' or 'Done'.
- **Test data:**
    - N/A
- **Expected result:** The card moves to the preceding column, and card counts update in both columns.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-DND-006 — Verify left/right move buttons are disabled at the first/last column

- **Scenario:** Move button disabled at boundaries
- **Priority:** Medium
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** Cards exist in both the 'To do' and 'Done' columns.
- **Test steps:**
    1. Inspect the '←' button on a card in 'To do'.
    2. Inspect the '→' button on a card in 'Done'.
- **Test data:**
    - N/A
- **Expected result:** The '←' button is disabled for cards already in the first column ('To do'), and the '→' button is disabled for cards already in the last column ('Done').
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-DND-007 — Verify moving several cards does not corrupt column contents

- **Scenario:** Card order preserved after multiple moves
- **Priority:** Low
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** The board is in its default state.
- **Test steps:**
    1. Move two different cards from 'To do' into 'In progress' using drag-and-drop or the move buttons.
    2. Move one card from 'In progress' into 'Done'.
- **Test data:**
    - N/A
- **Expected result:** Each column contains exactly the expected cards with no duplication or loss, and counts match the visible card list in every column.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

---

## Navigation & Layout (NAV)

*8 test cases*

### TC-NAV-001 — Verify each navbar link navigates to its corresponding page

- **Scenario:** Navbar links route to correct pages
- **Priority:** High
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is logged in.
- **Test steps:**
    1. Click each navbar link in turn: Dashboard, Form, Orders, Elements, Users, Alerts, Drag & Drop.
- **Test data:**
    - N/A
- **Expected result:** Each click navigates to the correct route and the corresponding page content renders, with the active link visually highlighted.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-NAV-002 — Verify the navbar highlights the link matching the current route

- **Scenario:** Active nav link highlighting
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is logged in and navigates to any authenticated page.
- **Test steps:**
    1. Navigate to the Orders page.
    2. Observe the navbar.
- **Test data:**
    - N/A
- **Expected result:** The 'Orders' navbar link is visually styled as active, and no other link is highlighted.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-NAV-003 — Verify the logged-in user's name is visible in the navbar

- **Scenario:** Current user name displayed in navbar
- **Priority:** Low
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** User is logged in.
- **Test steps:**
    1. Observe the right side of the navbar on any authenticated page.
- **Test data:**
    - N/A
- **Expected result:** The logged-in user's name is displayed next to the Logout button.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-NAV-004 — Verify the hamburger menu opens and closes the nav links on a narrow viewport

- **Scenario:** Mobile navigation menu toggle
- **Priority:** Medium
- **Test type:** UI
- **Automatable:** Yes
- **Preconditions:** Browser viewport is set to a mobile width (e.g., 375px) or the window is resized narrow.
- **Test steps:**
    1. Resize the browser to a narrow/mobile width.
    2. Click the hamburger (menu) icon.
    3. Click it again, or click a nav link.
- **Test data:**
    - Viewport width: 375px
- **Expected result:** At narrow widths, the standard nav links are hidden behind a hamburger icon. Clicking it reveals the link list; selecting a link or clicking again collapses it.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-NAV-005 — Verify navigating to a non-existent route shows a not-found page

- **Scenario:** Unknown route shows 404 page
- **Priority:** Medium
- **Test type:** Negative
- **Automatable:** Yes
- **Preconditions:** User is logged in or logged out.
- **Test steps:**
    1. Manually navigate the browser to a URL that does not match any defined route.
- **Test data:**
    - URL: /this-page-does-not-exist
- **Expected result:** A '404 — Page not found' message is displayed instead of a blank page or application crash.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-NAV-006 — Verify visiting the root URL redirects a logged-in user to the Dashboard

- **Scenario:** Root path redirects when authenticated
- **Priority:** Medium
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is logged in.
- **Test steps:**
    1. Navigate the browser to the root URL ('/').
- **Test data:**
    - N/A
- **Expected result:** The user is redirected to /dashboard.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-NAV-007 — Verify browser history navigation works correctly across app pages

- **Scenario:** Browser back/forward navigation
- **Priority:** Low
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is logged in and has visited multiple pages in sequence.
- **Test steps:**
    1. Navigate: Dashboard -> Orders -> Users.
    2. Click the browser Back button twice.
    3. Click the browser Forward button once.
- **Test data:**
    - N/A
- **Expected result:** Back navigation returns to Orders, then Dashboard, in the correct order; Forward returns to Orders. Each page's content matches its route.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

### TC-NAV-008 — Verify deep-linking to a specific authenticated route works when already logged in

- **Scenario:** Direct URL access to an authenticated page while logged in
- **Priority:** Low
- **Test type:** Positive
- **Automatable:** Yes
- **Preconditions:** User is logged in.
- **Test steps:**
    1. Type or paste the URL for /users directly into the address bar and navigate.
- **Test data:**
    - URL: /users
- **Expected result:** The User Management page loads directly without being redirected to login.
- **Actual result:** _(fill in during execution)_
- **Status:** Not Executed

---

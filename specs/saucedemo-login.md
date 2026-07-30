# Test Plan: SauceDemo Login

**Target:** https://www.saucedemo.com
**Seed:** tests/seed.spec.ts
**Date:** 2026-07-30

## Overview
This plan covers the SauceDemo login experience for the primary authentication states requested: successful login, account lockout, empty-field validation, and invalid credential handling.

## Preconditions
- The SauceDemo site is reachable at the target URL.
- The browser is not already authenticated to the inventory area.
- The login form is visible and the demo credentials shown on the page are available for use.

## Scenarios

### Scenario 1.1 — Standard user logs in successfully
- **Priority:** P0
- **Tags:** @smoke, @regression, @critical
- **Preconditions:** The login page is visible and the user is not already signed in.
- **Steps:**
  1. Open the SauceDemo login page — expected: The username field, password field, and login button are visible.
  2. Enter username "standard_user" and password "secret_sauce" — expected: The login request is accepted and the user is redirected to the inventory page.
- **Assertions:**
  - The inventory products page is displayed.
  - The URL changes away from the login page to the inventory experience.
- **Edge cases considered:**
  - Refreshing the page after a successful login.
  - Navigating away and back to the app while the session is still active.

### Scenario 1.2 — Locked-out user shows the appropriate error
- **Priority:** P0
- **Tags:** @regression, @critical
- **Preconditions:** The login page is visible and the locked-out account is available for the test.
- **Steps:**
  1. Open the SauceDemo login page — expected: The login form is ready for input.
  2. Enter username "locked_out_user" and password "secret_sauce" — expected: The form submits and an error message is shown.
- **Assertions:**
  - An error banner is visible to the user.
  - The error text clearly states that the account is locked out.
- **Edge cases considered:**
  - Repeated login attempts after the first failed submission.
  - Clearing the form before retrying.

### Scenario 1.3 — Empty username submission shows validation feedback
- **Priority:** P0
- **Tags:** @regression
- **Preconditions:** The login page is visible and the password field is available for input.
- **Steps:**
  1. Leave the username field empty.
  2. Enter password "secret_sauce" and submit the form — expected: The login attempt is blocked and an error message appears.
- **Assertions:**
  - The error message indicates that the username is required.
  - The user remains on the login page and is not redirected.
- **Edge cases considered:**
  - A username entered as whitespace only.
  - Submitting after the error is already visible.

### Scenario 1.4 — Empty password submission shows validation feedback
- **Priority:** P0
- **Tags:** @regression
- **Preconditions:** The login page is visible and the username field is available for input.
- **Steps:**
  1. Enter username "standard_user".
  2. Leave the password field empty and submit the form — expected: The login attempt is blocked and an error message appears.
- **Assertions:**
  - The error message indicates that the password is required.
  - The user remains on the login page and is not redirected.
- **Edge cases considered:**
  - A password entered as whitespace only.
  - Clearing the password after a previous attempt.

### Scenario 1.5 — Invalid credentials show authentication failure
- **Priority:** P0
- **Tags:** @regression
- **Preconditions:** The login page is visible and the invalid credential combination is ready.
- **Steps:**
  1. Enter a non-existent username such as "invalid_user" and password "secret_sauce".
  2. Submit the form — expected: The login attempt fails and an authentication error is displayed.
- **Assertions:**
  - The error message indicates that the username and password do not match any known user.
  - The user remains on the login page.
- **Edge cases considered:**
  - Using a known username with an incorrect password.
  - Retrying after the error banner has appeared.

## Not covered (and why)
- Checkout, cart, and product-detail flows are not covered because this request is limited to the login journey.
- Browser-specific accessibility checks are intentionally left out of this plan so the focus stays on core login behavior.

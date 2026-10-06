# 🎭 Playwright TypeScript MCP Agents

An AI-assisted **Playwright + TypeScript test automation framework** that combines **Playwright Test**, **Model Context Protocol (MCP)**, and **AI-powered Planner, Generator, and Healer agents** to streamline end-to-end test automation.

The project demonstrates how AI agents can explore an application, create structured test plans, generate Playwright tests, execute them, and help diagnose or heal failing tests.

## 🚀 Project Overview

Traditional test automation generally follows this flow:

```text
Requirements
    ↓
Manual Test Design
    ↓
Automation Development
    ↓
Test Execution
    ↓
Failure Analysis
    ↓
Test Maintenance
```

This project explores an AI-assisted workflow:

```text
                    ┌──────────────────┐
                    │   Application    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  🎭 Planner      │
                    │ Explore & Plan   │
                    └────────┬─────────┘
                             │
                      specs/*.md
                             │
                             ▼
                    ┌──────────────────┐
                    │  🎭 Generator    │
                    │ Generate Tests   │
                    └────────┬─────────┘
                             │
                       tests/*.spec.ts
                             │
                             ▼
                    ┌──────────────────┐
                    │ Playwright Test  │
                    │    Execution     │
                    └────────┬─────────┘
                             │
                         Failures
                             │
                             ▼
                    ┌──────────────────┐
                    │   🎭 Healer      │
                    │ Diagnose / Fix   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Re-run & Verify  │
                    └──────────────────┘
```

Playwright's official Test Agents follow the same Planner → Generator → Healer concept: the Planner creates Markdown test plans, the Generator converts plans into Playwright tests, and the Healer helps diagnose and repair failing tests.

---

## ✨ Key Features

* 🎭 **Playwright Test with TypeScript**
* 🤖 **AI-assisted test planning**
* 🧠 **Planner Agent**
* 🏗️ **Generator Agent**
* 🩺 **Healer Agent**
* 🔌 **Playwright MCP integration**
* 🧩 **Page Object Model**
* 🧰 **Custom Playwright fixtures**
* 📝 **Markdown-based test specifications**
* 🌐 **Cross-browser testing**

  * Chromium
  * Firefox
  * WebKit
* 📊 **HTML test reporting**
* 🔄 **Automatic retries on CI**
* ⚡ **Parallel test execution**
* 🛡️ **Repository-level AI agent instructions through `AGENTS.md`**

---

## 🧰 Technology Stack

| Technology          | Purpose                                   |
| ------------------- | ----------------------------------------- |
| **Playwright**      | Browser automation and E2E testing        |
| **TypeScript**      | Test automation language                  |
| **Node.js**         | Runtime                                   |
| **Playwright Test** | Test runner                               |
| **MCP**             | AI-to-browser/test automation integration |
| **VS Code**         | AI-assisted development environment       |
| **GitHub Actions**  | CI/CD                                     |
| **HTML Reporter**   | Test reporting                            |

The project currently uses `@playwright/test` and is configured around Playwright 1.62.x in `package.json`.

---

## 🏗️ Project Structure

```text
playwright-ts-mcp-agents/
│
├── .github/
│   └── ...
│
├── .playwright-mcp/
│   └── ...
│
├── .vscode/
│   └── mcp.json
│
├── specs/
│   └── *.md
│
├── src/
│   ├── pages/
│   │   └── ...
│   │
│   ├── fixtures/
│   │   └── ...
│   │
│   └── utils/
│       └── ...
│
├── tests/
│   ├── data/
│   │   └── ...
│   │
│   └── *.spec.ts
│
├── AGENTS.md
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

### Directory Responsibilities

#### `.github/`

Contains repository-level configuration and AI agent definitions used to guide automation development.

#### `.playwright-mcp/`

Contains project-specific Playwright MCP configuration and supporting MCP-related resources.

#### `.vscode/`

Contains VS Code configuration.

The repository registers the Playwright Test MCP server using:

```json
{
  "servers": {
    "playwright-test": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "playwright",
        "run-test-mcp-server"
      ]
    }
  }
}
```

This allows an MCP-compatible AI development environment to interact with Playwright's testing capabilities.

#### `specs/`

Contains human-readable Markdown test plans.

Example:

```text
specs/
├── dashboard.md
├── login.md
└── checkout.md
```

The Planner Agent can explore an application and produce structured plans that can subsequently be consumed by the Generator Agent.

#### `src/`

Contains reusable automation framework components such as:

```text
src/
├── pages/
├── fixtures/
└── utils/
```

The project follows a Page Object Model approach to keep UI interactions separate from test scenarios.

#### `tests/`

Contains executable Playwright test specifications.

Test data can be maintained separately under:

```text
tests/data/
```

---

# 🤖 AI Agent Workflow

The project is designed around three major AI-assisted testing stages.

## 1. 🎭 Planner Agent

The Planner explores the application and converts requirements or user flows into a structured test plan.

### Input

```text
Application URL
+
Feature / requirement
+
Optional seed test
```

### Output

```text
specs/<feature>.md
```

Example:

```text
User Login

1. Navigate to login page
2. Enter valid credentials
3. Click Login
4. Verify dashboard is displayed
```

The advantage is that the test design becomes a reviewable artifact before automation code is generated.

---

## 2. 🏗️ Generator Agent

The Generator consumes the Markdown test plan and produces executable Playwright tests.

```text
specs/login.md
       │
       ▼
Generator Agent
       │
       ▼
tests/login.spec.ts
```

The generated tests should follow the repository's framework conventions, including reusable fixtures, Page Objects, accessible locators, and Playwright web-first assertions.

---

## 3. 🩺 Healer Agent

When a generated test fails, the Healer can investigate the failure and help identify the appropriate repair.

Typical problems include:

* Locator changes
* UI changes
* Timing issues
* Changed page structure
* Assertion mismatches
* Test-data problems

The intended workflow is:

```text
Test Failure
     ↓
Analyze Failure
     ↓
Inspect Application
     ↓
Identify Root Cause
     ↓
Update Test
     ↓
Re-run
     ↓
Verify
```

AI-generated fixes should still be reviewed before being committed.

---

# 🔌 Playwright MCP

The project integrates Playwright with **Model Context Protocol (MCP)**.

MCP allows an AI assistant to interact with Playwright through structured tools rather than relying only on generated code.

The official Playwright MCP approach uses structured accessibility snapshots, allowing AI agents to identify page elements and interact with them without requiring screenshot-based visual reasoning.

Conceptually:

```text
AI Assistant
     │
     │ MCP
     ▼
Playwright Test MCP
     │
     ▼
Playwright
     │
     ▼
Browser
     │
     ▼
Web Application
```

---

# 📋 Automation Architecture

The framework follows a layered architecture:

```text
┌────────────────────────────────────────────┐
│              AI Agent Layer                │
│                                            │
│ Planner → Generator → Healer               │
└──────────────────────┬─────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────┐
│                MCP Layer                   │
│                                            │
│          Playwright Test MCP               │
└──────────────────────┬─────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────┐
│           Automation Framework             │
│                                            │
│ Page Objects │ Fixtures │ Utils │ Tests    │
└──────────────────────┬─────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────┐
│              Playwright Test               │
│                                            │
│ Chromium │ Firefox │ WebKit                │
└────────────────────────────────────────────┘
```

---

# 🧩 Coding Standards

The repository includes `AGENTS.md` to provide consistent instructions to AI coding agents.

## Locator Priority

Locators should follow this order:

```text
1. getByRole()
2. getByLabel()
3. getByTestId()
4. getByText()
5. CSS / XPath only when explicitly approved
```

Example:

```typescript
await page.getByRole('button', { name: 'Login' }).click();
```

Instead of:

```typescript
await page.locator('#login-button').click();
```

---

## Page Object Model

Page Objects should contain page-specific interaction logic.

Example:

```typescript
export class LoginPage extends BasePage {
  readonly username;
  readonly password;
  readonly loginButton;

  constructor(page: Page) {
    super(page);

    this.username = page.getByLabel('Username');
    this.password = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', {
      name: 'Login'
    });
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
```

Assertions should remain in the test layer rather than inside Page Objects.

---

# 🧪 Writing Tests

Tests should use the project's custom fixture instead of importing `test` directly from `@playwright/test`.

Example:

```typescript
import { test, expect } from '../src/fixtures/base';

test.describe('Login', () => {

  test('should login successfully', async ({ loginPage }) => {

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(
        'user@example.com',
        'password'
      );
    });

    await expect(loginPage.dashboard).toBeVisible();
  });

});
```

Use Playwright's web-first assertions:

```typescript
await expect(locator).toBeVisible();
await expect(locator).toHaveText('Dashboard');
```

Avoid hard waits:

```typescript
// ❌ Avoid
await page.waitForTimeout(3000);
```

Instead rely on Playwright's built-in auto-waiting and web-first assertions.

---

# ⚙️ Playwright Configuration

The current Playwright configuration:

* Uses `tests/` as the test directory
* Enables fully parallel execution
* Enables retries on CI
* Uses the HTML reporter
* Collects traces on the first retry
* Runs against Chromium, Firefox and WebKit

Configured browser projects:

```text
Chromium
Firefox
WebKit
```

---

# 🚀 Getting Started

## Prerequisites

Install:

* Node.js 20+
* npm
* VS Code (recommended for the MCP workflow)
* An MCP-compatible AI coding assistant

---

## 1. Clone the Repository

```bash
git clone https://github.com/sandipchopkar95/playwright-ts-mcp-agents.git
cd playwright-ts-mcp-agents
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Install Playwright Browsers

```bash
npx playwright install
```

---

# ▶️ Run Tests

Run the complete test suite:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test tests/example.spec.ts
```

Run using a specific browser:

```bash
npx playwright test --project=chromium
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

---

# 📊 View Test Report

After execution:

```bash
npx playwright show-report
```

The HTML report provides:

* Test status
* Steps
* Errors
* Attachments
* Traces where available

---

# 🔌 MCP Setup in VS Code

The repository already contains:

```text
.vscode/mcp.json
```

with the Playwright Test MCP server configuration.

The server is started through:

```bash
npx playwright run-test-mcp-server
```

This allows an MCP-compatible AI assistant to work with the Playwright test environment.

For the official Playwright MCP server, Microsoft documents configuration for MCP clients such as VS Code and other AI coding environments.

---

# 🧠 Example AI-Assisted Workflow

A typical workflow can look like this:

### Step 1 — Provide a requirement

```text
Test the login functionality of the application.

Requirements:
- Valid user can login
- Invalid password should show an error
- Empty username should show validation
- Empty password should show validation
```

### Step 2 — Planner

The Planner explores the application and creates:

```text
specs/login.md
```

### Step 3 — Review

Review the generated scenarios before automation.

### Step 4 — Generator

Generate Playwright tests from the approved plan.

```text
tests/login.spec.ts
```

### Step 5 — Execute

```bash
npx playwright test
```

### Step 6 — Heal

If a test fails, use the Healer to investigate and repair the test.

### Step 7 — Verify

Run the affected test again and review the final result.

---

# 🔄 Agentic QA Loop

The overall workflow can be summarized as:

```text
       ┌──────────────┐
       │ Requirements │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │   Planner    │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │  specs/*.md  │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │  Generator   │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │ tests/*.spec │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │    Execute   │
       └──────┬───────┘
              │
        ┌─────┴─────┐
        │           │
      PASS         FAIL
        │           │
        ▼           ▼
      Report      Healer
                    │
                    ▼
                 Re-run
                    │
                    ▼
                  Verify
```

---

# 🛡️ Security Guidelines

Never commit sensitive information to the repository.

Do not commit:

```text
.env
credentials
API keys
authentication tokens
storage-state.json
browser session data
```

Use environment variables or secure CI/CD secrets for sensitive configuration.

The repository's agent rules explicitly prohibit committing credentials, auth tokens, `.env` files, and storage state.

---

# 🎯 Why This Project?

The purpose of this project is to explore how **AI agents + MCP + Playwright** can improve the software testing lifecycle.

Instead of using AI only for code generation, the project treats AI as an assistant across multiple QA activities:

```text
Explore
  ↓
Understand
  ↓
Plan
  ↓
Generate
  ↓
Execute
  ↓
Analyze
  ↓
Heal
  ↓
Verify
```

This approach can help reduce repetitive automation work while keeping the resulting tests inside a conventional, maintainable Playwright framework.

---

# 📚 References

* [Playwright](https://playwright.dev/)
* [Playwright Test Agents](https://playwright.dev/docs/test-agents)
* [Playwright MCP](https://github.com/microsoft/playwright-mcp)
* [Model Context Protocol](https://modelcontextprotocol.io/)
* [Playwright Test](https://playwright.dev/docs/test-intro)

---

# 👨‍💻 Author

**Sandip Chopkar**

Senior QA Automation Engineer

**Focus Areas**

* Playwright
* TypeScript
* Selenium
* API Testing
* AI-assisted Testing
* MCP
* Test Automation
* CI/CD

GitHub: [sandipchopkar95](https://github.com/sandipchopkar95)

---

## ⭐ If you find this project useful

Feel free to star the repository, explore the implementation, and experiment with AI-assisted Playwright test automation.

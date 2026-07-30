import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import users from '../data/users.json';

test.describe('Authentication', () => {
  test('standard user can log in @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const inventoryPage = await loginPage.login(users.standard.username, users.standard.password);

    await expect(inventoryPage.productsHeading).toBeVisible();
  });
});

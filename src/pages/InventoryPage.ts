import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly productsHeading: ReturnType<Page['getByText']>;

  constructor(page: Page) {
    super(page);
    this.productsHeading = page.getByText('Products', { exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    await this.waitForReady();
  }
}

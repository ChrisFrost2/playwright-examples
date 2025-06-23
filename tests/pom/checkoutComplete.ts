import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutCompletePage extends BasePage {
  readonly backToProductsButton: Locator;
  readonly header: Locator;

  constructor(page: Page) {
    super(page, 'checkout-complete.html');
    this.backToProductsButton = this.page.locator('[data-test="back-to-products"]');
    this.header = this.page.locator(`xpath=//span[text() = "Checkout: Complete!"]`);
  }
}
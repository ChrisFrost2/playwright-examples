import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';
import { step } from '../decorators/step';

export class CartPage extends BasePage {
  readonly checkout_button: Locator;

  constructor(page: Page) {
    super(page, 'cart.html');
    this.checkout_button = this.page.locator('[data-test="checkout"]');    
  }

  @step
    async removeProductFromCart(productName: string) {
      const productLocator = this.page.locator(`xpath=//div[text() = '${productName}']/../../..//button[text()='Remove']`);
      await productLocator.click();
    }
}
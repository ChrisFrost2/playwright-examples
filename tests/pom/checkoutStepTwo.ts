import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutStepTwoPage extends BasePage {
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page, 'checkout-step-two.html');
    this.finishButton = this.page.locator('[data-test="finish"]');
  }
}
import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';
import { step } from '../decorators/step';

export class CheckoutStepOnePage extends BasePage {
  readonly headereader: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator

  constructor(page: Page) {
    super(page, 'checkout-step-one.html');
    this.headereader = this.page.locator(`xpath=//span[text() = "Checkout: Your Information"]`);
    this.firstNameInput = this.page.locator('[data-test="firstName"]');
    this.lastNameInput = this.page.locator('[data-test="lastName"]');
    this.postalCodeInput = this.page.locator('[data-test="postalCode"]');
    this.continueButton = this.page.locator('[data-test="continue"]');
  }

  @step
  async fillInformationForm(firstName: string, lastName: string, postalCode: string) {    
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }
}
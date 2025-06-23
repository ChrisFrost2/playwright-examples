import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';
import { step } from '../decorators/step';

export class LoginPage extends BasePage {
  readonly username_input: Locator;
  readonly password_input: Locator;
  readonly login_button: Locator;
  readonly error_message_container: Locator;

  constructor(page: Page) {
    super(page, '');
    this.username_input = page.locator("#user-name");
    this.password_input = page.locator("#password");
    this.login_button = page.locator("#login-button");
    this.error_message_container = page.locator('[data-test="error"]');
  }

  @step
  async login(username: string, password: string) {
    await this.username_input.fill(username);
    await this.password_input.fill(password);
    await this.login_button.click();
  }

  async userStillOnLogin() {
    expect(this.page).toHaveURL(this.url);
  }

  async errorMessagePresented(message: string) {
    expect(this.error_message_container.isVisible());
    expect(this.error_message_container).toContainText(message);
  }
}
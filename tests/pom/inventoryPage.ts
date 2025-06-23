import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';
import { step } from '../decorators/step';

export class InventoryPage extends BasePage {
  readonly shopping_cart_badge: Locator;
  readonly shopping_cart_icon: Locator;

  constructor(page: Page) {
    super(page, 'inventory.html');
    this.shopping_cart_badge = this.page.locator('[data-test="shopping-cart-badge"]');
    this.shopping_cart_icon = this.page.locator('[data-test="shopping-cart-link"]');
  }

  @step
  async addProductToCart(productName: string) {
    const productLocator = this.page.locator(`xpath=//div[text() = '${productName}']/../../..//button[text()='Add to cart']`);
    await productLocator.click();
  }

  @step
  async removeProductFromCart(productName: string) {
    const productLocator = this.page.locator(`xpath=//div[text() = '${productName}']/../../..//button[text()='Remove']`);
    await productLocator.click();
  }

  @step
  async moreThanOneProductInCart() {
    await expect(this.shopping_cart_badge).toBeVisible();
  }

  @step
  async noProductsInCart() {
    await expect(this.shopping_cart_badge).toBeHidden();
  }

  async getNumberOfProductsInCart() {
    return await this.shopping_cart_badge.textContent()
  }
}
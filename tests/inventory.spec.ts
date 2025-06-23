import { test } from './fixtures/allFixtures'
import { expect } from '@playwright/test';

test.describe('Inventory tests', () => {
  test('Add product to cart, checkout', {
    tag: ['@cart'],
    annotation: [{
      type: 'issue',
      description: 'https://github.com/microsoft/playwright/issues/23180'
    }]
  }, async ({ page, inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
    await inventoryPage.open();
    await inventoryPage.isOpened();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.moreThanOneProductInCart();
    await inventoryPage.shopping_cart_icon.click();
    await cartPage.checkout_button.click();
    await checkoutStepOnePage.fillInformationForm('Bob', 'Smith', '41-902');
    checkoutStepOnePage.continueButton.click();
    checkoutStepTwoPage.finishButton.click();
    await expect(checkoutCompletePage.header).toBeVisible();
  });

  test('Add product to cart and remove from inventory page', { tag: '@cart' }, async ({ page, inventoryPage }) => {
    await inventoryPage.open();
    await inventoryPage.isOpened();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.moreThanOneProductInCart();
    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    await inventoryPage.noProductsInCart();
  });

  test('Add product to cart and remove from cart page', { tag: ['@cart', '@regression'] }, async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.isOpened();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.moreThanOneProductInCart();
    await inventoryPage.shopping_cart_icon.click();
    await cartPage.removeProductFromCart('Sauce Labs Backpack');
    await inventoryPage.noProductsInCart();
  });
});

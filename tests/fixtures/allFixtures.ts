import { test as base } from '@playwright/test';
import { LoginPage } from '../pom/loginPage';
import { InventoryPage } from '../pom/inventoryPage';
import { CartPage } from '../pom/cartPage';
import { CheckoutStepOnePage } from '../pom/checkoutStepOne';
import { CheckoutStepTwoPage } from '../pom/checkoutStepTwo';
import { CheckoutCompletePage } from '../pom/checkoutComplete';

type AllFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutStepOnePage: CheckoutStepOnePage;
    checkoutStepTwoPage: CheckoutStepTwoPage;
    checkoutCompletePage: CheckoutCompletePage;
};

export const test = base.extend<AllFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutStepOnePage: async ({ page }, use) => {
        await use(new CheckoutStepOnePage(page));
    },
    checkoutStepTwoPage: async ({ page }, use) => {
        await use(new CheckoutStepTwoPage(page));
    },
    checkoutCompletePage: async ({ page }, use) => {
        await use(new CheckoutCompletePage(page));
    }
});
export { expect } from '@playwright/test';
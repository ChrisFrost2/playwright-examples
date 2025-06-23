import { test } from './fixtures/allFixtures'
import { expect } from '@playwright/test';

test.describe('Login tests', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach(async ({ page, loginPage }) => {
        await loginPage.open();
    });

    test('Successful login for standard_user', {
        tag: ['@smokeTest', '@login'],
        annotation: [{
            type: 'issue',
            description: 'https://github.com/microsoft/playwright/issues/23180'
        }]
    }, async ({ page, loginPage, inventoryPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.isOpened();
    });

    [
        { user: 'locked_out_user', password: 'secret_sauce', message: 'Sorry, this user has been locked out.' },
        { user: 'standard_user', password: 'wrong_password', message: 'Username and password do not match any user in this service' },
        { user: 'standard_user', password: '', message: 'Password is required' },
        { user: '', password: 'wrong_password', message: 'Username is required' }
    ].forEach(({ user, password, message }) => {
        test(`Failed login - login as  '${user}' with password '${password}' presents error message`, {
            tag: '@smokeTest',
            annotation: [{
                type: 'issue',
                description: 'https://github.com/microsoft/playwright/issues/23180'
            }]
        }, async ({ page, loginPage }) => {
            await loginPage.login(user, password);
            await loginPage.errorMessagePresented(message);
        });
    });

    test.skip('Failed login - user not authorized because is locked out', async ({ page, loginPage }) => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        await loginPage.errorMessagePresented('Sorry, this user has been locked out.');
        // test.info().annotations.push({ type: 'issue', description: 'Login failed as expected!' });    
    });

    test.skip('Failed login - user not authorized and still on login page when passing wrong login or password', async ({ page, loginPage }) => {
        await loginPage.login('standard_user', 'wrong_password');
        await loginPage.errorMessagePresented('Username and password do not match any user in this service');
        // test.info().annotations.push({ type: 'issue', description: 'Login failed as expected!' });    
    });

    test.skip('Failed login - user not authorized and still on login page when did not pass password', async ({ page, loginPage }) => {
        await loginPage.login('standard_user', '');
        await loginPage.errorMessagePresented('Password is required');
    });

    test.skip('Failed login - user not authorized and still on login page when did not pass username', async ({ page, loginPage }) => {
        await loginPage.password_input.fill('wrong_password');
        await loginPage.login_button.click();
        await loginPage.errorMessagePresented('Username is required');
    });
});
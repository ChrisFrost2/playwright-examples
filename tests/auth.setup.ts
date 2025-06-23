import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from './pom/loginPage';

const authFile = path.join(__dirname, '../storage/.auth/user.json');

setup('authenticate', async ({ page}) => {  
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login( 'standard_user', 'secret_sauce');
  await page.context().storageState({ path: authFile });
});
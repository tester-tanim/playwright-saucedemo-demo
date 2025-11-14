// tests/saucedemo.spec.js
const { test, expect } = require('@playwright/test');

test('A user logs in, adds a product to cart, verifies it, and logs out', async ({ page }) => {
  const baseURL = 'https://www.saucedemo.com/';
  const validUser = 'standard_user';
  const validPassword = 'secret_sauce';
  let stepCounter = 0;

  // 1. Navigate to the login page
  await page.goto(baseURL);
  await page.waitForTimeout(2000); // Wait 2 seconds to see the login page
  await page.screenshot({ path: `screenshots/step_${++stepCounter}_login_page.png` });
  console.log('Step 1: Login page loaded');

  // 2. Log in with valid credentials
  await page.locator("//input[@id='user-name']").fill(validUser);
  await page.waitForTimeout(1000); // Wait 1 second after entering username
  
  await page.locator("//input[@id='password']").fill(validPassword);
  await page.waitForTimeout(1000); // Wait 1 second after entering password
  await page.screenshot({ path: `screenshots/step_${++stepCounter}_credentials_entered.png` });
  console.log('Step 2: Credentials entered');
  
  await page.locator("//input[@id='login-button']").click();
  await page.waitForTimeout(2000); // Wait 2 seconds to see login process
  await page.screenshot({ path: `screenshots/step_${++stepCounter}_login_clicked.png` });
  console.log('Step 3: Login clicked');

  // 3. Verify login was successful by checking the inventory page URL
  await expect(page).toHaveURL(baseURL + 'inventory.html');
  await page.waitForTimeout(2000); // Wait 2 seconds to see inventory page
  await page.screenshot({ path: `screenshots/step_${++stepCounter}_inventory_page.png` });
  console.log('Step 4: Inventory page loaded');

  // 4. Add the first product to the cart
  const firstProductName = await page.locator("//a//div[text()='Sauce Labs Backpack']").innerText();
  await page.waitForTimeout(1000); // Wait 1 second before clicking
  await page.screenshot({ path: `screenshots/step_${++stepCounter}_before_add_to_cart.png` });
  console.log('Step 5: Found product - ' + firstProductName);
  
  await page.locator("(//button[text()='Add to cart'])[1]").click();
  await page.waitForTimeout(1500); // Wait 1.5 seconds to see product added
  await page.screenshot({ path: `screenshots/step_${++stepCounter}_after_add_to_cart.png` });
  console.log('Step 6: Product added to cart');

  // 5. Go to the cart
  await page.locator("//a[@class='shopping_cart_link']").click();
  await page.waitForTimeout(2000); // Wait 2 seconds to see cart page
  await page.screenshot({ path: `screenshots/step_${++stepCounter}_cart_clicked.png` });
  console.log('Step 7: Cart clicked');
  
  await expect(page).toHaveURL(baseURL + 'cart.html');
  await page.waitForTimeout(1500); // Wait 1.5 seconds to see cart contents
  await page.screenshot({ path: `screenshots/step_${++stepCounter}_cart_page.png` });
  console.log('Step 8: Cart page loaded');

  // 6. Verify the correct product name is in the cart
  await expect(page.locator("//a//div[@class='inventory_item_name']")).toHaveText(firstProductName);
  await page.waitForTimeout(2000); // Wait 2 seconds before logging out
  await page.screenshot({ path: `screenshots/step_${++stepCounter}_cart_verified.png` });
  console.log('Step 9: Cart verified with product');

  // 7. Log out via the burger menu
  await page.locator("//div[@class='bm-burger-button']").click();
  await page.waitForTimeout(1500); // Wait 1.5 seconds for menu to appear
  await page.screenshot({ path: `screenshots/step_${++stepCounter}_menu_opened.png` });
  console.log('Step 10: Menu opened');
  
  // Wait for the logout link to be visible and then click it
  const logoutLink = page.locator("//nav//a[text()='Logout']");
  await logoutLink.waitFor({ state: 'visible' });
  await page.waitForTimeout(1000); // Wait 1 second before clicking logout
  await page.screenshot({ path: `screenshots/step_${++stepCounter}_before_logout.png` });
  console.log('Step 11: Logout link visible');
  
  await logoutLink.click();
  await page.waitForTimeout(2000); // Wait 2 seconds to see logout process
  await page.screenshot({ path: `screenshots/step_${++stepCounter}_logout_clicked.png` });
  console.log('Step 12: Logout clicked');

  // 8. Verify logout was successful by checking we are back on the login page
  await expect(page).toHaveURL(baseURL);
  await expect(page.locator("//input[@id='login-button']")).toBeVisible();
  await page.waitForTimeout(1500); // Wait 1.5 seconds to see final result
  await page.screenshot({ path: `screenshots/step_${++stepCounter}_logout_verified.png` });
  console.log('Step 13: Logout verified - Back to login page');
});

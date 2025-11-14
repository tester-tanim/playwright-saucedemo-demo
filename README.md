# Playwright SauceDemo Demo

A comprehensive Playwright automation test suite for the [SauceDemo](https://www.saucedemo.com/) e-commerce application. This project demonstrates end-to-end testing capabilities including login, product browsing, cart management, and user authentication flows.

## Project Overview

This project automates a complete user workflow on the SauceDemo test application:
1. **Login** with valid credentials
2. **Browse Products** and add items to cart
3. **Verify Cart** contents
4. **Logout** and return to login page

All test steps are captured with screenshots for easy debugging and verification.

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager

## Installation

1. Clone or navigate to the project directory:
```bash
cd playwright-saucedemo-demo
```

2. Install dependencies:
```bash
npm install
```

This will install Playwright v1.56.1 and all required dependencies.

## Project Structure

```
playwright-saucedemo-demo/
├── tests/
│   └── saucedemo.spec.js       # Main test suite
├── screenshots/                 # Screenshot output directory
├── test-results/                # Test execution reports
├── playwright-report/           # HTML test reports
├── playwright.config.js         # Playwright configuration
├── package.json                 # Project dependencies and scripts
└── README.md                    # This file
```

## Configuration

The `playwright.config.js` file contains the test configuration:

- **Test Directory**: `./tests/`
- **Browser**: Chromium (Desktop Chrome)
- **Base URL**: `https://www.saucedemo.com/`
- **Parallel Execution**: Enabled
- **Reporter**: HTML report generation
- **Trace Capture**: On first retry for debugging
- **Retries**: 2 on CI, 0 locally

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with browser UI visible (headed mode)
```bash
npm run test-headed
```

### View HTML test report
```bash
npm run report
```

## Test Details

### Main Test: Login → Add to Cart → Verify → Logout

**File**: `tests/saucedemo.spec.js`

**Test Credentials**:
- Username: `standard_user`
- Password: `secret_sauce`

**Test Steps**:
1. Navigate to SauceDemo homepage
2. Enter valid login credentials
3. Verify successful login by checking inventory page URL
4. Locate and add "Sauce Labs Backpack" product to cart
5. Navigate to cart and verify product is present
6. Open burger menu and click logout
7. Verify logout success by returning to login page

**Features**:
- Comprehensive step-by-step screenshots (13+ screenshots per test run)
- Console logging for debugging
- URL verification using assertions
- Element text verification
- Visual confirmation at each step

## Screenshots

Screenshots are automatically captured at each step and saved to the `screenshots/` directory with descriptive names:
- `step_1_login_page.png` - Initial login page
- `step_2_credentials_entered.png` - Username and password entered
- `step_3_login_clicked.png` - After login button click
- ... and more for each test step

## Test Reports

After test execution:
1. **HTML Report**: Generated automatically in `playwright-report/` directory
2. **Console Output**: Detailed step logging to stdout
3. **Screenshots**: Visual evidence of test execution in `screenshots/` directory

View the HTML report with:
```bash
npm run report
```

## Technology Stack

- **Playwright**: v1.56.1 - End-to-end testing framework
- **Node.js**: JavaScript runtime
- **XPath Selectors**: For element location
- **Playwright Test**: Built-in test runner with assertions

## XPath Selectors Used

- **Login Field**: `//input[@id='user-name']`
- **Password Field**: `//input[@id='password']`
- **Login Button**: `//input[@id='login-button']`
- **Product Name**: `//a//div[text()='Sauce Labs Backpack']`
- **Add to Cart**: `(//button[text()='Add to cart'])[1]`
- **Cart Link**: `//a[@class='shopping_cart_link']`
- **Menu Button**: `//div[@class='bm-burger-button']`
- **Logout Link**: `//nav//a[text()='Logout']`

## Common Issues & Solutions

### Tests fail with timeout errors
- Increase `waitForTimeout()` values in the test file
- Check internet connectivity to `saucedemo.com`
- Verify the SauceDemo application is accessible

### Screenshots not being saved
- Ensure `screenshots/` directory exists
- Check write permissions in the project directory
- Verify the path in the test file

### Port conflicts
- No specific ports are required for this test suite
- Tests connect directly to the SauceDemo public website

## CI/CD Integration

The configuration includes CI/CD optimization:
- Runs with 1 worker in CI environments
- Automatically retries failed tests 2 times
- Prevents use of `test.only` in CI
- Compatible with GitHub Actions, Jenkins, GitLab CI, etc.

## Contributing

To extend this project:
1. Add new test cases to `tests/saucedemo.spec.js`
2. Follow the existing pattern of XPath selectors and screenshot captures
3. Update `playwright.config.js` for additional browser configurations
4. Run tests locally before committing changes

## License

ISC

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [SauceDemo Application](https://www.saucedemo.com/)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)


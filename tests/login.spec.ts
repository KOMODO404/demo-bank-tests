import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  
  test.beforeEach(async ({ page }) => {
  await page.goto('/')
  });

  test('successful login  with correct credentials', async ({ page }) => {
    // Arrange
    const userId = 'Tester12';
    const userPassword = 'Haslo123';
    const expectedUserName = 'Jan Demobankowy';
    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const incorrectSUerId = 'tester';
    const expectedErrorText = 'identyfikator ma min. 8 znaków';
    // Act
    await page.getByTestId('login-input').fill(incorrectSUerId);
    await page.getByTestId('password-input').click();
    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorText,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = 'testerLO';
    const incorrectPassword = '1234';
    const expectedErrorText = 'hasło ma min. 8 znaków';
    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectPassword);
    await page.getByTestId('password-input').blur();
    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorText,
    );
  });
});

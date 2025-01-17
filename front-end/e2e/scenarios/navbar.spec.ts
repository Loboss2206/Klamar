import { test, expect } from '@playwright/test';
import { environment } from 'src/environments/environment';
import { LoginFixture } from 'src/components/login/login.fixture';

test.describe('Navbar Component', () => {
  const baseURL = environment.testUrl;

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('should display the logo', async ({ page }) => {
    const logo = page.locator('.logo-icon');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', '../../assets/squid.svg');
  });

  test('should display the correct title', async ({ page }) => {
    const title = page.locator('.nav_current_page_head>span');
    await expect(title).toHaveText('Sélection utilisateur');
  });

  test('should toggle dropdown menu on admin link click', async ({ page }) => {
    const adminLink = page.locator('.dropdown-toggle');
    await adminLink.click();

    const gestionDesQuestions = page.locator('a:has-text("Gestion des questions")');
    await expect(gestionDesQuestions).toBeVisible();

    const gestionDesQuizzes = page.locator('a:has-text("Gestion des quizzes")');
    await expect(gestionDesQuizzes).toBeVisible();

    const gestionDesUtilisateurs = page.locator('a:has-text("Gestion des utilisateurs")');
    await expect(gestionDesUtilisateurs).toBeVisible();

    const statistiques = page.locator('a:has-text("Statistiques")');
    await expect(statistiques).toBeVisible();

    await adminLink.click();
    await expect(gestionDesQuestions).not.toBeVisible();
    await expect(gestionDesQuizzes).not.toBeVisible();
    await expect(gestionDesUtilisateurs).not.toBeVisible();
    await expect(statistiques).not.toBeVisible();

  });

  test('should navigate to correct admin pages', async ({ page }) => {
    const adminLink = page.locator('.dropdown-toggle');
    await adminLink.click();

    const gestionDesQuestions = page.locator('a:has-text("Gestion des questions")');
    await gestionDesQuestions.click();
    if (environment.production) {
      expect(page).toHaveURL(`${baseURL}/login;returnUrl=%2Fadmin%2FselectQuestion`);

      const loginFixture = new LoginFixture(page);
      await loginFixture.fillUsername("admin");
      await loginFixture.fillPassword("admin");
      await loginFixture.clickLogin();
    }

    await expect(page).toHaveURL(`${baseURL}/admin/selectQuestion`);
    await page.goto(baseURL);

    await adminLink.click();
    const gestionDesQuizzes = page.locator('a:has-text("Gestion des quizzes")');
    await gestionDesQuizzes.click();
    if (environment.production) {
      expect(page).toHaveURL(`${baseURL}/login;returnUrl=%2Fadmin%2FquizManager`);

      const loginFixture = new LoginFixture(page);
      await loginFixture.fillUsername("admin");
      await loginFixture.fillPassword("admin");
      await loginFixture.clickLogin();
    }
    await expect(page).toHaveURL(`${baseURL}/admin/quizManager`);
    await page.goto(baseURL);

    await adminLink.click();
    let gestionDesUtilisateurs = page.locator('a:has-text("Gestion des utilisateurs")');
    await gestionDesUtilisateurs.click();
    if (environment.production) {
      expect(page).toHaveURL(`${baseURL}/login;returnUrl=%2Fadmin%2FselectUserToModify`);

      const loginFixture = new LoginFixture(page);
      await loginFixture.fillUsername("admin");
      await loginFixture.fillPassword("admin");
      await loginFixture.clickLogin();
    }
    await expect(page).toHaveURL(`${baseURL}/admin/selectUserToModify`);
    await page.goto(baseURL);
  });

  test('should display and function the quit button', async ({ page }) => {
    const quitButton = page.locator('.quitContainer');
    await expect(quitButton).toBeVisible();

    await quitButton.click();
    await expect(page).toHaveURL(baseURL);
  });
});

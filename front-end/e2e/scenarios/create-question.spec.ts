import { test, expect } from '@playwright/test';
import { LoginFixture } from 'src/components/login/login.fixture';
import { SelectQuestionFixture } from 'src/components/select-question/select-question.fixture';
import { SelectQuestionEditFixture } from 'src/components/select-question-edit/select-question-edit.fixture';

test.describe('User feature', () => {
    const baseURL = 'http://localhost:4200';

    test('should toggle dropdown menu on admin link click', async ({ page }) => {
        await page.goto(`${baseURL}`);
        const adminLink = await page.locator('.dropdown-toggle');
        await adminLink.click();

        const gestionDesQuestions = await page.locator('a:has-text("Gestion des questions")');
        expect(gestionDesQuestions).toBeVisible();

        const gestionDesQuizzes = await page.locator('a:has-text("Gestion des quizzes")');
        expect(gestionDesQuizzes).toBeVisible();

        const gestionDesUtilisateurs = await page.locator('a:has-text("Gestion des utilisateurs")');
        expect(gestionDesUtilisateurs).toBeVisible();

        await gestionDesUtilisateurs.click();
        expect(page).toHaveURL(`${baseURL}/login;returnUrl=%2Fadmin%2FselectUserToModify`);

        const loginFixture = new LoginFixture(page);
        await loginFixture.fillUsername("admin");
        await loginFixture.fillPassword("admin");
        await loginFixture.clickLogin();
        expect(page).toHaveURL(`${baseURL}/admin/selectUserToModify`);
    });

    test(`Should go to create question page`, async ({ page }) => {
        await page.goto(`${baseURL}/admin/selectQuestion`);
        const loginFixture = new LoginFixture(page);
        await loginFixture.fillUsername("admin");
        await loginFixture.fillPassword("admin");
        await loginFixture.clickLogin();

        let selectQuestionFixture = new SelectQuestionFixture(page);
        let createButtonQuestion = await selectQuestionFixture.getCreateQuestionButton();
        expect(createButtonQuestion).toBeVisible();

        await selectQuestionFixture.clickOnCreateQuestion();
        expect(page).toHaveURL(`${baseURL}/admin/createQuestion`);
    });

    test(`Should write in the form and create the question`, async ({ page }) => {
        await page.goto(`${baseURL}/admin/createQuestion`);
        const loginFixture = new LoginFixture(page);
        await loginFixture.fillUsername("admin");
        await loginFixture.fillPassword("admin");
        await loginFixture.clickLogin();

        let selectQuestioneEditFixture = new SelectQuestionEditFixture(page);
        await selectQuestioneEditFixture.getQuestionForm();

        const inputQuestion = await selectQuestioneEditFixture.getInput('question');
        await inputQuestion.fill('Quelle est la capitale de la France ?');

        const inputReponse1 = await selectQuestioneEditFixture.getInput('prop1');
        await inputReponse1.fill('Paris');
        const inputReponse2 = await selectQuestioneEditFixture.getInput('prop2');
        await inputReponse2.fill('Londres');
        const inputReponse3 = await selectQuestioneEditFixture.getInput('prop3');
        await inputReponse3.fill('Madrid');
        const inputReponse4 = await selectQuestioneEditFixture.getInput('prop4');
        await inputReponse4.fill('Berlin');

        const inputIndice1 = await selectQuestioneEditFixture.getInput('hint1');
        await inputIndice1.fill('Capitale de la France');
        const inputIndice2 = await selectQuestioneEditFixture.getInput('hint2');
        await inputIndice2.fill('Ville lumière');

        const inputCategorie = await selectQuestioneEditFixture.getInput('categorie');
        await inputCategorie.fill('Géographie');

        await selectQuestioneEditFixture.clickSubmitButton();

        expect(page).toHaveURL(`${baseURL}/admin/selectQuestion`);
    });

    test(`check if the question have been created`, async ({ page }) => {
        await page.goto(`${baseURL}/admin/selectQuestion`);
        const loginFixture = new LoginFixture(page);
        await loginFixture.fillUsername("admin");
        await loginFixture.fillPassword("admin");
        await loginFixture.clickLogin();

        let selectQuestionFixture = new SelectQuestionFixture(page);
        let createButtonQuestion = await selectQuestionFixture.getCreateQuestionButton();
        expect(createButtonQuestion).toBeVisible();


        let questionItem = await page.locator(".cellspacing").getByText("Quelle est la capitale de la France ?");
        expect(questionItem).toBeVisible();

        await questionItem.click();
        expect(page).toHaveURL(new RegExp(`${baseURL}/admin/editQuestion/[1-9]*`));
    });

    test(`Should write in the form and modify the question`, async ({ page }) => {
        await page.goto(`${baseURL}/admin/selectQuestion`);
        const loginFixture = new LoginFixture(page);
        await loginFixture.fillUsername("admin");
        await loginFixture.fillPassword("admin");
        await loginFixture.clickLogin();


        let questionItem = await page.locator(".cellspacing").getByText("Quelle est la capitale de la France ?").last();
        expect(questionItem).toBeVisible();

        await questionItem.click();

        let selectQuestioneEditFixture = new SelectQuestionEditFixture(page);
        await selectQuestioneEditFixture.getQuestionForm();

        const inputQuestion = await selectQuestioneEditFixture.getInput('question');
        await inputQuestion.fill('Quelle est la capitale de la Suisse ?');

        const inputReponse1 = await selectQuestioneEditFixture.getInput('prop1');
        await inputReponse1.fill('Zurich');

        const inputIndice1 = await selectQuestioneEditFixture.getInput('hint1');
        await inputIndice1.fill('Capitale de la Suisse');


        await selectQuestioneEditFixture.clickSubmitButton();

        expect(page).toHaveURL(`${baseURL}/admin/selectQuestion`);
    });

    test(`Create Quiz`, async ({ page }) => {
        await page.goto(`${baseURL}/admin/selectQuestion`);
        const loginFixture = new LoginFixture(page);
        await loginFixture.fillUsername("admin");
        await loginFixture.fillPassword("admin");
        await loginFixture.clickLogin();

        let selectQuestionFixture = new SelectQuestionFixture(page);
        let createButtonQuestion = await selectQuestionFixture.getCreateQuestionButton();
        expect(createButtonQuestion).toBeVisible();

        let questionItem = await page.locator(".cellspacing").getByText("Quelle est la capitale de la Suisse ?").last();
        expect(questionItem).toBeVisible();

        let deleteButton = await questionItem.locator("..").locator("..").getByRole('button', { name: "Supprimer" });
        expect(deleteButton).toBeVisible();
        await deleteButton.click();
        expect(page).toHaveURL(`${baseURL}/admin/selectQuestion`);
    });
});

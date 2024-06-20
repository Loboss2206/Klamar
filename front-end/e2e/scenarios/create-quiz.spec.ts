import { test, expect } from '@playwright/test';
import { testUrl } from '../../e2e/e2e.config';
import { QuizManagerFixture } from '../../src/components/quiz-manager/quiz-manager.fixture';
import { NavbarFixture } from 'src/components/navbar/navbar.fixture';
import { LoginFixture } from 'src/components/login/login.fixture';
import { SelectQuestionEditFixture } from 'src/components/select-question-edit/select-question-edit.fixture';
import { time } from 'highcharts';
// test.describe is a hook that creates a test group and lets you define lifecycle stages such as beforeEach.
test.describe('Quiz Feature', () => {

  test('Create a quiz successfully', async ({ page }) => {
    await page.goto(testUrl);

    //create all fixtures
    const quizManagerFixture = new QuizManagerFixture(page);
    const navbarFixture = new NavbarFixture(page);
    const loginFixture = new LoginFixture(page);
    const selectQuestionFixture = new SelectQuestionEditFixture(page);

    await navbarFixture.clickNavbarAdminMenu();
    await navbarFixture.clickGoToQuizManager();
    await loginFixture.fillUsername("admin");
    await loginFixture.fillPassword("admin");
    await loginFixture.clickLogin();
    await expect(page).toHaveURL("http://localhost:4200/admin/quizManager");

    await quizManagerFixture.clickCreateQuizButton();

    await page.locator(`#includeMemory`).check();
    await page.locator('#memoryConfigButton').getByRole('button', { name: 'Paramètres' }).click()
    const questionDsd = await page.locator('.cdk-drop-list.imagesContainer').nth(0).locator('img').last();
    expect(questionDsd).toBeVisible();
    const questionQuiz = await page.locator('.cdk-drop-list.imagesContainer').nth(1);
    expect(questionQuiz).toBeVisible();

    const originElement = questionDsd
    const destinationElement = questionQuiz


    await originElement.hover();
    await page.mouse.down();
    const box = (await destinationElement.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await destinationElement.hover();
    await page.mouse.up();
    await page.getByRole('button', { name: 'Fermer' }).click()

    const inputName = await quizManagerFixture.getInput('quiz-name');
    await inputName.type('Quiz carré');
    const inputTheme = await quizManagerFixture.getTextArea('quiz-description');
    await inputTheme.type('E2E description');
    await quizManagerFixture.clickSaveButton();
    await page.waitForTimeout(10000);

    /*await test.step(`Quiz form visible`, async () => {
      const quizForm = await quizManagerFixture.getQuizForm();
      const isVisible = await quizForm.isVisible();
      expect(isVisible).toBeTruthy();
    });
    */

    /*await test.step(`Create Quiz`, async () => {
      await quizManagerFixture.clickCreateQuizButton();

      await test.step('Create a question', async () => {
        await quizManagerFixture.clickCreateQuestionButton();

        await selectQuestionFixture.getQuestionForm();

        const inputQuestion = await selectQuestionFixture.getInput('question');
        await inputQuestion.type('Quelle est la capitale de la France ?');

        const inputReponse1 = await selectQuestionFixture.getInput('prop1');
        await inputReponse1.type('Paris');
        const inputReponse2 = await selectQuestionFixture.getInput('prop2');
        await inputReponse2.type('Londres');
        const inputReponse3 = await selectQuestionFixture.getInput('prop3');
        await inputReponse3.type('Madrid');
        const inputReponse4 = await selectQuestionFixture.getInput('prop4');
        await inputReponse4.type('Berlin');

        const inputIndice1 = await selectQuestionFixture.getInput('hint1');
        await inputIndice1.type('Capitale de la France');
        const inputIndice2 = await selectQuestionFixture.getInput('hint2');
        await inputIndice2.type('Ville lumière');

        const inputCategorie = await selectQuestionFixture.getInput('categorie');
        await inputCategorie.type('Géographie');

        await selectQuestionFixture.clickSubmitButton();
      });

      await test.step('Move question to quiz', async () => {
        const questionDsd = await page.getByText('Quelle est la capitale de la France ?');
        expect(questionDsd).toBeVisible();
        const questionQuiz = await page.locator('.cdk-drop-list.questionsContainer').nth(1);
        expect(questionQuiz).toBeVisible();

        const originElement = questionDsd
        const destinationElement = questionQuiz

        await originElement.hover();
        await page.mouse.down();
        const box = (await destinationElement.boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await destinationElement.hover();
        await page.mouse.up();

        // Wait for the data to be updated
        await page.waitForSelector('.cdk-drop-list.questionsContainer:nth-child(2) .question');

        // Check if the question is now in the quiz
        const movedQuestion = await page.locator('.cdk-drop-list.questionsContainer:nth-child(2) .question').getByText('dsd');
        await page.waitForTimeout(2000);
      });
    });

    const inputName = await quizManagerFixture.getInput('quiz-name');
    await inputName.type('Quiz carré');
    const inputTheme = await quizManagerFixture.getTextArea('quiz-description');
    await inputTheme.type('E2E description');
    await quizManagerFixture.clickSaveButton();

    await page.waitForTimeout(10000);*/
  });
});

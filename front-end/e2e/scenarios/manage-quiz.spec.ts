import { test, expect } from '@playwright/test';
import { testUrl } from '../../e2e/e2e.config';
import { QuizManagerFixture } from '../../src/components/quiz-manager/quiz-manager.fixture';
import { NavbarFixture } from 'src/components/navbar/navbar.fixture';
import { LoginFixture } from 'src/components/login/login.fixture';
import { SelectQuestionEditFixture } from 'src/components/select-question-edit/select-question-edit.fixture';
import { time } from 'highcharts';
import { async } from 'rxjs';
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

    await test.step(`Components visible`, async () => {
      const addQuizButton = await quizManagerFixture.getCreateQuizButton();
      const isVisible = await addQuizButton.isVisible();
      expect(isVisible).toBeTruthy();

      const searchBar = await quizManagerFixture.getSearchQuizSelector();
      const isVisible2 = await searchBar.isVisible();
      expect(isVisible2).toBeTruthy();

      const quizTable = await quizManagerFixture.getQuizTable();
      const isVisible3 = await quizTable.isVisible();
      expect(isVisible3).toBeTruthy();
    });

    await test.step(`Create Quiz`, async () => {
      await quizManagerFixture.clickCreateQuizButton();

      await test.step('Add simon to the quiz', async () => {
        await quizManagerFixture.checkSimon();
        await quizManagerFixture.clickParameterButtonSimon();

        const inputNumberOfRound = await quizManagerFixture.getInput("numberOfRound");
        inputNumberOfRound.fill("7");
        const inputNumberOfBoxes = await quizManagerFixture.getInput("numberOfBoxes");
        inputNumberOfBoxes.fill("3");
        const inputNumberOfRetriesAllowed = await quizManagerFixture.getInput("numberOfRetriesAllowed");
        inputNumberOfRetriesAllowed.fill("3");

        await quizManagerFixture.clickSaveSimonButton();
      });

      await test.step('Add memory to the quiz', async () => {
        await quizManagerFixture.checkMemory();
        await quizManagerFixture.clickParameterButtonMemory();

        const imageToDrag = quizManagerFixture.getImageToDrag(0);
        expect(imageToDrag).toBeVisible();
        const zoneToDrop = quizManagerFixture.getZoneToDropImage();
        expect(zoneToDrop).toBeVisible();

        const originElement = imageToDrag
        const destinationElement = zoneToDrop

        await originElement.hover();
        await page.mouse.down();
        const box = (await destinationElement.boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await destinationElement.hover();
        await page.mouse.up();
        await page.getByRole('button', { name: 'Fermer' }).click()
      });

      await test.step('Create a question', async () => {
        await quizManagerFixture.clickCreateQuestionButton();

        await selectQuestionFixture.getQuestionForm();

        const inputQuestion = await selectQuestionFixture.getInput('question');
        await inputQuestion.fill('Quelle est la capitale de la France ?');

        const inputReponse1 = await selectQuestionFixture.getInput('prop1');
        await inputReponse1.fill('Paris');
        const inputReponse2 = await selectQuestionFixture.getInput('prop2');
        await inputReponse2.fill('Londres');
        const inputReponse3 = await selectQuestionFixture.getInput('prop3');
        await inputReponse3.fill('Madrid');
        const inputReponse4 = await selectQuestionFixture.getInput('prop4');
        await inputReponse4.fill('Berlin');

        const inputIndice1 = await selectQuestionFixture.getInput('hint1');
        await inputIndice1.fill('Capitale de la France');
        const inputIndice2 = await selectQuestionFixture.getInput('hint2');
        await inputIndice2.fill('Ville lumière');

        const inputCategorie = await selectQuestionFixture.getInput('categorie');
        await inputCategorie.fill('Géographie');

        await selectQuestionFixture.clickSubmitButton();
      });

      await test.step('Move question to quiz', async () => {
        const questionDsd = await page.getByText('Quelle est la capitale de la France ?').last();
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

        await page.waitForSelector('.cdk-drop-list.questionsContainer:nth-child(2) .question');

        await page.locator('.cdk-drop-list.questionsContainer:nth-child(2) .question').getByText('dsd');
        await page.waitForTimeout(2000);
      });

      const inputName = await quizManagerFixture.getInput('quiz-name');
      await inputName.fill('Quiz E2E');
      const inputDescription = await quizManagerFixture.getTextArea('quiz-description');
      await inputDescription.fill('E2E description');
      await quizManagerFixture.clickSaveButton();

      await page.waitForTimeout(2000);
    });
  });

  test('Modify a quiz successfully', async ({ page }) => {
    await page.goto(testUrl);

    //create all fixtures
    const quizManagerFixture = new QuizManagerFixture(page);
    const navbarFixture = new NavbarFixture(page);
    const loginFixture = new LoginFixture(page);

    await navbarFixture.clickNavbarAdminMenu();
    await navbarFixture.clickGoToQuizManager();
    await loginFixture.fillUsername("admin");
    await loginFixture.fillPassword("admin");
    await loginFixture.clickLogin();
    await expect(page).toHaveURL("http://localhost:4200/admin/quizManager");

    await page.waitForTimeout(2000);
    let lastQuiz = (await quizManagerFixture.getAllQuizs()).length - 2;

    expect(quizManagerFixture.getEditQuizButton(lastQuiz)).toBeVisible();
    quizManagerFixture.clickEditButton(lastQuiz);

    expect(await quizManagerFixture.getCreateQuestionButton()).toBeVisible();
    const inputName = await quizManagerFixture.getInput('quiz-name');
    await inputName.fill('Quiz E2E modified');
    const inputDescription = await quizManagerFixture.getTextArea('quiz-description');
    await inputDescription.fill('E2E description modified');
    await quizManagerFixture.clickSaveButton();

    await page.waitForTimeout(2000);
  });

  test('Delete a quiz successfully', async ({ page }) => {

    await page.goto(testUrl);

    //create all fixtures
    const quizManagerFixture = new QuizManagerFixture(page);
    const navbarFixture = new NavbarFixture(page);
    const loginFixture = new LoginFixture(page);

    await navbarFixture.clickNavbarAdminMenu();
    await navbarFixture.clickGoToQuizManager();
    await loginFixture.fillUsername("admin");
    await loginFixture.fillPassword("admin");
    await loginFixture.clickLogin();
    await expect(page).toHaveURL("http://localhost:4200/admin/quizManager");

    await page.waitForTimeout(2000);
    let lastQuiz = (await quizManagerFixture.getAllQuizs()).length - 2;
    expect(quizManagerFixture.getQuizCell(lastQuiz, 1)).toBeVisible();
    expect(quizManagerFixture.getQuizCell(lastQuiz, 2)).toBeVisible();
    expect(quizManagerFixture.getQuizCell(lastQuiz, 3)).toBeVisible();
    expect(quizManagerFixture.getQuizCell(lastQuiz, 4)).toBeVisible();
    expect(quizManagerFixture.getQuizCell(lastQuiz, 5)).toBeVisible();
    await quizManagerFixture.clickDeleteButton(lastQuiz);
    expect(quizManagerFixture.getQuizCell(lastQuiz, 1)).not.toBeVisible();
    expect(quizManagerFixture.getQuizCell(lastQuiz, 2)).not.toBeVisible();
    expect(quizManagerFixture.getQuizCell(lastQuiz, 3)).not.toBeVisible();
    expect(quizManagerFixture.getQuizCell(lastQuiz, 4)).not.toBeVisible();
    expect(quizManagerFixture.getQuizCell(lastQuiz, 5)).not.toBeVisible();
    await page.waitForTimeout(2000);

  });
});

import { test, expect } from '@playwright/test';

test.describe('Play Quiz', async () => {
  const baseURL = 'http://localhost:4200';
  const regexp4base64 = new RegExp('(data:image/png;base64,)|(data:image/jpeg;base64,)|(data:image/jpg;base64,)|(data:image/gif;base64,)|(data:image/webp;base64,)');
  test('Play a Quiz with question', async ({ page }) => {
    await page.goto(baseURL);
    await test.step('should have a user list containing a user', async () => {
      const userList = page.locator('.userContainer');
      await expect(userList).toBeVisible();
      await expect(userList).toHaveCount(1);
      const userItem = page.locator('.userItem');
      await expect(userItem).toBeVisible();
      await expect(userItem).toHaveCount(1);
      const avatar = page.locator('.imgUser');
      await expect(avatar).toBeVisible();
      await expect(avatar).toHaveAttribute('src', regexp4base64);
      const name = page.locator('.userName');
      await expect(name).toBeVisible();
      await expect(name).toHaveText('Utilisa teur');
    });

    await test.step('should click on the user', async () => {
      const userItem = page.locator('.userItem');
      await userItem.click();
      await expect(page).toHaveURL(`${baseURL}/selectQuiz`);
    });

    await test.step('should have a list of quizzes', async () => {
      const quizList = page.locator('.quizContainer');
      await expect(quizList).toBeVisible();
      await expect(quizList).toHaveCount(1);
      const quizcontainer = page.locator('.quizContainer>div');
      await expect(quizcontainer).toHaveCount(2);
      const quizItem = page.locator('.quizItem');
      await expect(quizItem).toHaveCount(2);
      const quizImage = page.locator('.imgQuiz').nth(0);
      await expect(quizImage).toHaveAttribute('src', regexp4base64);
      const quizTitle = page.locator('.quizTitle').nth(0);
      await expect(quizTitle).toHaveText('Quiz 1');
    });
    await test.step('should click on a quiz', async () => {
      const quizItem = page.locator('.quizItem').nth(0);
      await quizItem.click();
      await expect(page).toHaveURL(`${baseURL}/quiz`);
    });

    await test.step('should see a question without image', async () => {
      const question = page.locator('.question');
      await expect(question).toBeVisible();
      await expect(question).toHaveText('Question 1');

      const imageContainer = page.locator('.question-image-container');
      await expect(imageContainer).toBeVisible();
      const image = page.locator('.question-image');
      await expect(image).not.toBeVisible();

      const answersContainer = page.locator('.griddy');
      await expect(answersContainer).toBeVisible();
      await expect(answersContainer).toHaveCount(1);

      const answers = page.locator('.griddy>app-quizbutton');
      await expect(answers).toHaveCount(4);

      const answer1 = page.locator('app-quizbutton').nth(0);
      await expect(answer1).toBeVisible();
      await expect(answer1).toHaveText('Reponse 1');

      const answer2 = page.locator('app-quizbutton').nth(1);
      await expect(answer2).toBeVisible();
      await expect(answer2).toHaveText('Reponse 2');

      const answer3 = page.locator('app-quizbutton').nth(2);
      await expect(answer3).toBeVisible();
      await expect(answer3).toHaveText('Reponse 3');

      const answer4 = page.locator('app-quizbutton').nth(3);
      await expect(answer4).toBeVisible();
      await expect(answer4).toHaveText('Reponse 4');

      const nextButton = page.locator('button:has-text("Passer la question")');
      await expect(nextButton).toBeVisible();

      const tipButton = page.locator('button:has-text("Indice")');
      await expect(tipButton).toBeVisible();

    });

    await test.step('should click on an answer that is wrong', async () => {
      const answer1 = page.locator('app-quizbutton').nth(0);
      await answer1.click();

      const overlay = page.locator('.overlay');
      await expect(overlay).toBeVisible();

      const tipMessage = page.locator('.AstuceContent');
      await expect(tipMessage).toHaveText('tip 2');

      await overlay.click();

      const question = page.locator('.question');
      await expect(question).toBeVisible();
      await expect(question).toHaveText('Question 1');

      const imageContainer = page.locator('.app-quizbutton:nth-child(0)>div');
      await expect(imageContainer).toBeHidden();

      for (let i = 1; i < 4; i++) {
        const answer = page.locator('app-quizbutton').nth(i);
        await expect(answer).toBeVisible();
      }
    });

    await test.step('should click on an answer that is correct', async () => {
      const answer2 = page.locator('app-quizbutton').nth(1);
      await answer2.click();

      const question = page.locator('.question');
      await expect(question).toBeVisible();
      await expect(question).toHaveText('Question image');

      for (let i = 1; i < 4; i++) {
        const answer = page.locator('app-quizbutton').nth(i);
        await expect(answer).toBeVisible();
      }
    });

    await test.step('should see a question with image', async () => {
      const question = page.locator('.question');
      await expect(question).toBeVisible();
      await expect(question).toHaveText('Question image');

      const imageContainer = page.locator('.question-image-container');
      await expect(imageContainer).toBeVisible();
      const image = page.locator('.question-image-container>img');
      await expect(image).toBeVisible();
      await expect(image).toHaveAttribute('src', regexp4base64);

      const answersContainer = page.locator('.griddy');
      await expect(answersContainer).toBeVisible();
      await expect(answersContainer).toHaveCount(1);

      const answers = page.locator('.griddy>app-quizbutton');
      await expect(answers).toHaveCount(4);

      const answer1 = page.locator('.buttonImg').nth(0);
      await expect(answer1).toBeVisible();
      await expect(answer1).toHaveAttribute('src', regexp4base64);

      const answer2 = page.locator('.buttonImg').nth(1);
      await expect(answer2).toBeVisible();
      await expect(answer2).toHaveAttribute('src', regexp4base64);

      const answer3 = page.locator('.buttonImg').nth(2);
      await expect(answer3).toBeVisible();
      await expect(answer3).toHaveAttribute('src', regexp4base64);

      const answer4 = page.locator('.buttonImg').nth(3);
      await expect(answer4).toBeVisible();
      await expect(answer4).toHaveAttribute('src', regexp4base64);

      const nextButton = page.locator('button:has-text("Passer la question")');
      await expect(nextButton).toBeVisible();

      const tipButton = page.locator('button:has-text("Indice")');
      await expect(tipButton).toBeVisible();

    });

    await test.step('should click on an answer that is wrong', async () => {
      const answer1 = page.locator('app-quizbutton').nth(0);
      await answer1.click();

      const overlay = page.locator('app-tips div').nth(1);
      await expect(overlay).toBeVisible();

      const tipMessage = page.locator('.AstuceContent');
      await expect(tipMessage).toHaveText(' Indice 2 ');

      await overlay.click();

      const question = page.locator('.question');
      await expect(question).toBeVisible();
      await expect(question).toHaveText('Question image');

      const imageContainer = page.locator('.question-image-container');
      await expect(imageContainer).toBeVisible();

      for (let i = 1; i < 4; i++) {
        const answer = page.locator('app-quizbutton').nth(i);
        await expect(answer).toBeVisible();
      }
    }
    );

    await test.step('should click on an answer that is correct', async () => {
      const answer4 = page.locator('app-quizbutton').nth(3);
      await answer4.click();
      await expect(page).toHaveURL(`${baseURL}/felicitations`);
    });

    await test.step('should see the congratulation page', async () => {
      await expect(page).toHaveURL(`${baseURL}/felicitations`);
      await expect(page.locator('.finish_text')).toHaveText('FELICITATIONS');
    });

    await test.step('should click on the button to restart the quiz', async () => {
      const restartButton = page.locator('.buttonBackground');
      await restartButton.click();
      await expect(page).toHaveURL(`${baseURL}/quiz`);
    });
  });

  test('Play a Quiz of Simon', async ({ page }) => {

  });

});

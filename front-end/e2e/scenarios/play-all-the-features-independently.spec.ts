import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { SimonGameFixture } from 'src/components/simon-game/simon-game.fixture';
import { MemoryGameFixture } from 'src/components/memory-container/memory-container.fixture';

test.describe('Play Quiz', async () => {
  const regexp4base64 = new RegExp('(data:image/png;base64,)|(data:image/jpeg;base64,)|(data:image/jpg;base64,)|(data:image/gif;base64,)|(data:image/webp;base64,)');
  test('Play a Quiz with question', async ({ page }) => {
    await page.goto(testUrl);
    await test.step('should have a user list containing a user', async () => {
      const userList = page.locator('.userContainer');
      await expect(userList).toBeVisible();
      await expect(userList).toHaveCount(1);
      const userItem = page.locator('.userItem').first();
      await expect(userItem).toBeVisible();
      const avatar = page.locator('.imgUser').first();
      await expect(avatar).toBeVisible();
      await expect(avatar).toHaveAttribute('src', regexp4base64);
      const name = page.locator('.userName').first();
      await expect(name).toBeVisible();
      await expect(name).toHaveText('Utilisa teur');
      await userItem.click();
      await expect(page).toHaveURL(`${testUrl}/selectQuiz`);
    });

    await test.step('should have a list of quizzes', async () => {
      const quizList = page.locator('.quizContainer');
      await expect(quizList).toBeVisible();
      await expect(quizList).toHaveCount(1);
      const quizcontainer = page.locator('.quizContainer>div');
      await expect(quizcontainer).toHaveCount(4);
      let quizItem = page.locator('.quizItem');
      await expect(quizItem).toHaveCount(4);
      const quizImage = page.locator('.imgQuiz').nth(0);
      await expect(quizImage).toHaveAttribute('src', regexp4base64);
      const quizTitle = page.locator('.quizTitle').nth(0);
      await expect(quizTitle).toHaveText('Quiz 1');
      quizItem = page.locator('.quizItem').nth(0);
      await quizItem.click();
      await expect(page).toHaveURL(`${testUrl}/quiz`);
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
      await expect(tipMessage).toHaveText('tip 1');

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

    await test.step('should click on the tip button', async () => {
      const tipButton = page.locator('button:has-text("Indices")');
      await tipButton.click();

      const overlay = page.locator('.overlay');
      await expect(overlay).toBeVisible();

      const tipMessage = page.locator('.AstuceContent').first();
      await expect(tipMessage).toHaveText(' tip 1 tip 2 ');

      await overlay.click({ force: true });

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
    });

    await test.step('should see another question and skip it', async () => {
      const question = page.locator('.question');
      await expect(question).toBeVisible();
      await expect(question).toHaveText('Question 2');

      const imageContainer = page.locator('.question-image-container');
      await expect(imageContainer).toBeVisible();
      const image = page.locator('.question-image-container>img');
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

      const tipButton = page.locator('button:has-text("Indices")');
      await expect(tipButton).toBeVisible();

      const skipButton = page.locator('button:has-text("Passer la question")');
      await skipButton.click({ force: true });

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
      await expect(tipMessage).toHaveText(' Indice 1 ');

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
    });



    await test.step('should click on an answer that is correct', async () => {
      const answer4 = page.locator('app-quizbutton').nth(3);
      await answer4.click();
      await expect(page).toHaveURL(`${testUrl}/felicitations`);
    });

    await test.step('should see the congratulation page', async () => {
      await expect(page).toHaveURL(`${testUrl}/felicitations`);
      await expect(page.locator('.finish_text')).toHaveText('FELICITATIONS');
    });

    await test.step('should click on the button to restart the quiz', async () => {
      const restartButton = page.locator('.buttonBackground');
      await restartButton.click();
      await expect(page).toHaveURL(`${testUrl}/quiz`);
    });
  });

  test('Play a Quiz of Simon', async ({ page }) => {
    const simonFixture = new SimonGameFixture(page);
    await page.goto(testUrl);
    await test.step('should have a user list containing a user', async () => {
      const userList = page.locator('.userContainer');
      await expect(userList).toBeVisible();
      await expect(userList).toHaveCount(1);
      const userItem = page.locator('.userItem').first();
      await expect(userItem).toBeVisible();
      const avatar = page.locator('.imgUser').first();
      await expect(avatar).toBeVisible();
      await expect(avatar).toHaveAttribute('src', regexp4base64);
      const name = page.locator('.userName').first();
      await expect(name).toBeVisible();
      await expect(name).toHaveText('Utilisa teur');
    });

    await test.step('should click on the user', async () => {
      const userItem = page.locator('.userItem').first();
      await userItem.click();
      await expect(page).toHaveURL(`${testUrl}/selectQuiz`);
    });

    await test.step('should have a list of quizzes', async () => {
      const quizList = page.locator('.quizContainer');
      await expect(quizList).toBeVisible();
      await expect(quizList).toHaveCount(1);
      const quizImage = page.locator('.imgQuiz').nth(0);
      await expect(quizImage).toHaveAttribute('src', regexp4base64);
      const quizTitle = page.locator('.quizTitle').nth(0);
      await expect(quizTitle).toHaveText('Quiz 1');
    });
    await test.step('should click on a quiz', async () => {
      const quizItem = page.locator('.quizItem').nth(1);
      await quizItem.click();
      await expect(page).toHaveURL(`${testUrl}/simon`);
    });

    await test.step('should play a normal game of Simon', async () => {

      const startButton = await simonFixture.getStartButton();
      await startButton.click();

      async function getSimonSequence(nb: number) {
        const sequence: number[] = [];
        for (let i = 0; i < nb; i++) {
          let el = await simonFixture.waitForActiveOfSimonButtons();
          console.log('el:', await (await el.getProperty('id')).jsonValue());
          let id = await el.getAttribute('id');
          let idNumber;
          if (id) {
            idNumber = Number(id.split('-')[1]);
            sequence.push(idNumber);
            await simonFixture.waitForNotActiveOfSimonButtonByID(idNumber);
          }
        }
        return sequence;
      }

      async function playSequence(sequence: number[]) {
        for (let i of sequence) {
          const button = await simonFixture.getASimonButtonByID(i);
          await button.click();
        }
      }

      let numberOfGoodSequence = 0;
      let currentNbOfSequence = 0;

      while (true) {
        await simonFixture.waitForCongratsToBeNotFullscreen();
        await simonFixture.waitForCongratsMessage('Regardez la séquence...');
        console.log('Simon game is playing...');
        await page.waitForTimeout(2000);
        const sequence = await (await getSimonSequence(++currentNbOfSequence));
        console.log('Sequence:', sequence);
        if (sequence.length === 0) break;
        await simonFixture.waitForCongratsMessage('C\'est à vous de jouer !');
        console.log('Simon game is waiting for user input...');
        await page.waitForTimeout(2000);
        await simonFixture.waitForCongratsToBeNotFullscreen();
        await playSequence(sequence);
        console.log('Simon game is playing the sequence...');
        await page.waitForTimeout(1000);
        const successMessage = await simonFixture.getCongratsMessageText('Bravo !');
        if (successMessage && numberOfGoodSequence < 4) {
          console.log('Sequence successfully followed!');
          numberOfGoodSequence++;
          await page.waitForTimeout(1000 * (currentNbOfSequence + 1));
        } else if (numberOfGoodSequence === 4) {
          await expect(page).toHaveURL(`${testUrl}/felicitations`);
          console.log('Sequence successfully followed!');
          console.log('Simon game successfully played!');
          return;
        }
        else {
          console.log('Failed to follow the sequence.');
          break;
        }
      }
    });
  });

  test('Play a Quiz of Memory', async ({ page }) => {
    await page.goto(testUrl);

    await test.step('should have a user list containing a user', async () => {
      const userList = page.locator('.userContainer');
      await expect(userList).toBeVisible();
      await expect(userList).toHaveCount(1);
      const userItem = page.locator('.userItem').first();
      await expect(userItem).toBeVisible();
      await expect(userItem).toHaveCount(1);
      const avatar = page.locator('.imgUser').first();
      await expect(avatar).toBeVisible();
      await expect(avatar).toHaveAttribute('src', regexp4base64);
      const name = page.locator('.userName').first();
      await expect(name).toBeVisible();
      await expect(name).toHaveText('Utilisa teur');
    });

    await test.step('should click on the user', async () => {
      const userItem = page.locator('.userItem');
      await userItem.click();
      await expect(page).toHaveURL(`${testUrl}/selectQuiz`);
    });

    await test.step('should have a list of quizzes', async () => {
      const quizList = page.locator('.quizContainer');
      await expect(quizList).toBeVisible();
      await expect(quizList).toHaveCount(1);
      const quizImage = page.locator('.imgQuiz').nth(0);
      await expect(quizImage).toHaveAttribute('src', regexp4base64);
      const quizTitle = page.locator('.quizTitle').nth(2);
      await expect(quizTitle).toHaveText('QuizMemory');
    });

    await test.step('should click on a quiz', async () => {
      const quizItem = page.locator('.quizItem').nth(2);
      await quizItem.click();
      await expect(page).toHaveURL(`${testUrl}/memory`);
    });

    await test.step('should play a normal game of Memory', async () => {
      const memoryGameFixture = new MemoryGameFixture(page);

      async function makeATry(c1: number, c2: number, lastTurn: boolean) {
        if (lastTurn) nbPairs++;
        await memoryGameFixture.clickMemoryItemByIndex(c1);
        console.log("Testing new pair...");
        await memoryGameFixture.clickMemoryItemByIndex(c2);
      }

      let nbPairs = 0;
      let lastTurn = false;

      while (true) {
        await page.waitForTimeout(5000);
        let memoryItems = await memoryGameFixture.getAllMemoryItems();
        for (let i = 0; i < memoryItems.length - 1; i++) {
          if ((await memoryGameFixture.isMemoryItemHidden(i))) {
            continue;
          }
          for (let j = i + 1; j < memoryItems.length; j++) {
            if ((await memoryGameFixture.isMemoryItemHidden(j))) {
              continue;
            }
            if (lastTurn) {
              for (let k = 0; k < memoryItems.length - 1; k++) {
                if ((await memoryGameFixture.isMemoryItemHidden(k))) {
                  continue;
                }
                for (let m = k + 1; m < memoryItems.length; m++) {
                  if ((await memoryGameFixture.isMemoryItemHidden(m))) {
                    continue;
                  }
                  await makeATry(k, m, lastTurn);
                  break;
                }
                if (nbPairs === (memoryItems.length / 2)) {
                  await expect(page).toHaveURL(`${testUrl}/felicitations`);
                  console.log('Sequence successfully followed!');
                  console.log('Memory game successfully played!');
                  return;
                }
              }
            }
            await makeATry(i, j, lastTurn);
            await page.waitForTimeout(1000);

            if (await memoryGameFixture.isMemoryItemHidden(i) && await memoryGameFixture.isMemoryItemHidden(j)) {
              nbPairs++;
              i++;
              j = i + 1;
              if (nbPairs === (memoryItems.length / 2) - 1) lastTurn = true;
            }
          }
        }
      }
    });
  });
});

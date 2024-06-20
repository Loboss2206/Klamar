import { test, expect } from '@playwright/test';
import {LoginFixture} from "../../src/components/login/login.fixture";
import {SelectUserStatFixture} from "../../src/components/select-user-stat/select-user-stat.fixture";
import {SelectStatFixture} from "../../src/components/select-stat/select-stat.fixture";
import {StatQuestionPageFixture} from "../../src/components/stat-question-page/stat-question-page.fixture";
import {StatSimonPageFixture} from "../../src/components/stat-simon-page/stat-simon-page.fixture";
import {StatMemoryPageFixture} from "../../src/components/stat-memory-page/stat-memory-page.fixture";

test.describe('Stat Component', () => {
  const baseURL = 'http://localhost:4200/stats/';



  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL + "selectUserStat");
  });

  test('Select a user to display stat', async ({ page, context }) => {
    const loginFixture = new LoginFixture(page);
    const selectUserStatFixture = new SelectUserStatFixture(page);
    const selectStatFixture = new SelectStatFixture(page);
    const statQuestionPageFixture = new StatQuestionPageFixture(page);
    const statSimonPageFixture = new StatSimonPageFixture(page);
    const statMemoryPageFixture = new StatMemoryPageFixture(page);
    await loginFixture.fillUsername("admin");
    await loginFixture.fillPassword("admin");
    await Promise.all([
      loginFixture.clickLogin(),
      page.waitForURL(baseURL + 'selectUserStat') // Remplacer par l'URL de destination après connexion
    ]);
    await selectUserStatFixture.searchUser("Utilisa")
    await Promise.all([
      selectUserStatFixture.clickUser("Utilisa","Teur"),
      page.waitForURL(baseURL + 'selectStat/1717579279450') // Remplacer par l'URL de destination après connexion
    ]);
    await page.waitForTimeout(1000);
    const isStatQuestionGraphicPresent = await selectStatFixture.isStatQuestionGraphicPresent();
    expect(isStatQuestionGraphicPresent).toBe(true);

    const isStatSimonGraphicPresent = await selectStatFixture.isStatSimonGraphicPresent();
    expect(isStatSimonGraphicPresent).toBe(true);

    const isStatMemoryGraphicPresent = await selectStatFixture.isStatMemoryGraphicPresent();
    expect(isStatMemoryGraphicPresent).toBe(true);

    const isResultPagePresent = await selectStatFixture.resultPagePresent();
    expect(isResultPagePresent).toBe(true);

    await Promise.all([
      selectStatFixture.clickOnStatQuestion(),
      page.waitForURL(baseURL + 'questionStat/1717579279450') // Remplacer par l'URL de destination après connexion
    ]);
    const isQuestionTextPresent = await statQuestionPageFixture.isQuestionTextPresent();
    expect(isQuestionTextPresent).toBe(true);

    const isQuestionImagePresent = await statQuestionPageFixture.isQuestionImagePresent();
    expect(isQuestionImagePresent).toBe(true);

    const isStatForQuestionPresent = await statQuestionPageFixture.isStatForQuestionPresent()
    expect(isStatForQuestionPresent).toBe(true);

    const isImageTitleQuestionPresent = await statQuestionPageFixture.isImageTitleQuestionPresent();
    expect(isImageTitleQuestionPresent).toBe(true);

    const isResponseTextPresent = await statQuestionPageFixture.isResponseTextPresent();
    expect(isResponseTextPresent).toBe(true);

    const isStatImagePresent = await statQuestionPageFixture.isStatImagePresent();
    expect(isStatImagePresent).toBe(true);

    const isImageQuestionPresent = await statQuestionPageFixture.isImagePresent();
    expect(isImageQuestionPresent).toBe(true);

    await page.goBack();
    await page.waitForLoadState('load');
    await selectStatFixture.clickOnStatSimonSkiped();

    const isCommonStatPresent = await statSimonPageFixture.isCommonStatPresent();
    expect(isCommonStatPresent).toBe(true)

    const isSkippedTitlePresent = await statSimonPageFixture.isSkippedTitlePresent();
    expect(isSkippedTitlePresent).toBe(true)

    const isNbColorPresent = await statSimonPageFixture.isNbColorPresent();
    expect(isNbColorPresent).toBe(true)

    const isFinalSequencePresent = await statSimonPageFixture.isFinalSequencePresent();
    expect(isFinalSequencePresent).toBe(true)

    await page.goBack();
    await page.waitForLoadState('load');
    await selectStatFixture.clickOnStatMemory();

    const isStatPresent = await statMemoryPageFixture.isStatPresent()
    expect(isStatPresent).toBe(true)

    const isImageMemoryPresent = await  statMemoryPageFixture.isImagePresent()
    expect(isImageMemoryPresent)

    const isStatCommonPresent = await statMemoryPageFixture.isStatCommonPresent()
    expect(isStatCommonPresent)
  });
});

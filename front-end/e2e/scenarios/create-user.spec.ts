import { test, expect } from '@playwright/test';
import { UserCreatorFixture } from 'src/components/userManager/userCreator.fixture';
import { SelectUserContainerForModificationFixture } from 'src/components/select-user-container-for-modification/select-user-container-for-modification.fixture';
import { environment } from 'src/environments/environment';

test.describe('User feature', () => {
  const baseURL = environment.testUrl;

  test('should toggle dropdown menu on admin link click', async ({ page }) => {
    await page.goto(baseURL);
    const adminLink = await page.locator('.dropdown-toggle');
    await adminLink.click();

    const gestionDesQuestions = await page.locator('a:has-text("Gestion des questions")');
    await expect(gestionDesQuestions).toBeVisible();

    const gestionDesQuizzes = await page.locator('a:has-text("Gestion des quizzes")');
    await expect(gestionDesQuizzes).toBeVisible();

    const gestionDesUtilisateurs = await page.locator('a:has-text("Gestion des utilisateurs")');
    await expect(gestionDesUtilisateurs).toBeVisible();

    await gestionDesUtilisateurs.click();

    await expect(page).toHaveURL(`${baseURL}/admin/selectUserToModify`);
  });

  test('Create user button should be visible', async ({ page }) => {
    await page.goto(`${baseURL}/admin/selectUserToModify`);
    const selectUserContainerForModificationFixture = new SelectUserContainerForModificationFixture(page);

    const createUserButton = await selectUserContainerForModificationFixture.getNewUserCreationButton();
    await expect(createUserButton).toBeVisible();

    await selectUserContainerForModificationFixture.clickOnNewUserCreationButton();
    await expect(page).toHaveURL(`${baseURL}/admin/createUser`);
  });

  test('user form inputs should be visible', async ({ page }) => {
    await page.goto(`${baseURL}/admin/createUser`);
    const userCreatorFixture = new UserCreatorFixture(page);
    let createButton = await userCreatorFixture.getCreateButton();
    await expect(createButton).toBeVisible();

    let firstNameInput = await userCreatorFixture.getFirstNameInput();
    await expect(firstNameInput).toBeVisible();
    await firstNameInput.fill("Huguette");

    let lastNameInput = await userCreatorFixture.getLastNameInput();
    await expect(lastNameInput).toBeVisible();
    await lastNameInput.fill("Li");

    let birthDateInput = await userCreatorFixture.getBirthDateInput();
    await await expect(birthDateInput).toBeVisible();
    await birthDateInput.fill("1950-02-16");

    let hobbiesInput = await userCreatorFixture.getHobbiesInput();
    await expect(hobbiesInput).toBeVisible();
    await hobbiesInput.fill("Géographie, Histoire");

    let typeOfDaltoSelect = await userCreatorFixture.getTypeOfDaltoSelect();
    await expect(typeOfDaltoSelect).toBeVisible();
    await typeOfDaltoSelect.selectOption("Deuteranopie");

    let choiceSimonRadioTrue = await userCreatorFixture.getChoiceSimonRadio('true');
    await expect(choiceSimonRadioTrue).toBeVisible();
    await choiceSimonRadioTrue.check();

    let choiceSimonRadioFalse = await userCreatorFixture.getChoiceSimonRadio('false');
    await expect(choiceSimonRadioFalse).toBeVisible();
    await choiceSimonRadioFalse.check();

    let secTipsForSimonInput = await userCreatorFixture.getSecTipsForSimonInput();
    await expect(secTipsForSimonInput).toBeVisible();
    await secTipsForSimonInput.fill("10");

    let secTipsForMemoryInput = await userCreatorFixture.getSecTipsForMemoryInput();
    await expect(secTipsForMemoryInput).toBeVisible();
    await secTipsForMemoryInput.fill("15");

    let secVisibleCardForMemoryInput = await userCreatorFixture.getSecVisibleCardForMemoryInput();
    await expect(secVisibleCardForMemoryInput).toBeVisible();
    await secVisibleCardForMemoryInput.fill("5");

    let choicePrintTipsAfterErrorTrue = await userCreatorFixture.getChoicePrintTipsAfterErrorRadio('true');
    await expect(choicePrintTipsAfterErrorTrue).toBeVisible();
    await choicePrintTipsAfterErrorTrue.check();

    let choicePrintTipsAfterErrorFalse = await userCreatorFixture.getChoicePrintTipsAfterErrorRadio('false');
    await expect(choicePrintTipsAfterErrorFalse).toBeVisible();
    await choicePrintTipsAfterErrorFalse.check();

    let choicePrintTipsAfterClickTrue = await userCreatorFixture.getChoicePrintTipsAfterClickRadio('true');
    await expect(choicePrintTipsAfterClickTrue).toBeVisible();
    await choicePrintTipsAfterClickTrue.check();

    let choicePrintTipsAfterClickFalse = await userCreatorFixture.getChoicePrintTipsAfterClickRadio('false');
    await expect(choicePrintTipsAfterClickFalse).toBeVisible();
    await choicePrintTipsAfterClickFalse.check();

    let choicePrintTipsOneByOneTrue = await userCreatorFixture.getChoicePrintTipsOneByOneRadio('true');
    await expect(choicePrintTipsOneByOneTrue).toBeVisible();
    await choicePrintTipsOneByOneTrue.check();

    let choicePrintTipsOneByOneFalse = await userCreatorFixture.getChoicePrintTipsOneByOneRadio('false');
    await expect(choicePrintTipsOneByOneFalse).toBeVisible();
    await choicePrintTipsOneByOneFalse.check();

    await userCreatorFixture.clickOnCreateButton();
    await expect(page).toHaveURL(`${baseURL}/admin/selectUserToModify`); //await because of the message prompt after the click
  });

  test('User item should be modified', async ({ page }) => {
    await page.goto(`${baseURL}/admin/selectUserToModify`);

    const selectUserContainerForModificationFixture = new SelectUserContainerForModificationFixture(page);

    const userItemCreated = await selectUserContainerForModificationFixture.getUserByName("Huguette Li");
    await expect(userItemCreated).toBeVisible();
    await userItemCreated.click();

    const parentDiv = page.locator(".customDiv");
    let modifyUsereButton = await parentDiv.getByText("Modifier");
    let getModifyButton = await modifyUsereButton;
    await expect(getModifyButton).toBeVisible();

    await getModifyButton.click();
    await expect(page).toHaveURL(new RegExp(`${baseURL}/admin/modifyUser/[1-9]*`));

    const userCreatorFixture = new UserCreatorFixture(page);
    let modifyButton = await userCreatorFixture.getModifyButton();
    await expect(modifyButton).toBeVisible();

    let firstNameInput = await userCreatorFixture.getFirstNameInput();
    await expect(firstNameInput).toBeVisible();
    await firstNameInput.fill("Georgette");

    await userCreatorFixture.clickOnModifyButton();
    await expect(page).toHaveURL(`${baseURL}/admin/selectUserToModify`);
  });

  test('User item should be deleted', async ({ page }) => {
    await page.goto(`${baseURL}/admin/selectUserToModify`);

    const selectUserContainerForModificationFixture = new SelectUserContainerForModificationFixture(page);
    page.on('dialog', async (dialog) => {
      await expect(dialog.message()).toEqual('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
      await dialog.accept();
    });

    const userItemCreated = await selectUserContainerForModificationFixture.getUserByName("Georgette Li");
    await expect(userItemCreated).toBeVisible();
    await userItemCreated.click();

    const parentDiv = page.locator(".customDiv");
    let deleteButton = await parentDiv.getByText("Supprimer");
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();

    await expect(userItemCreated).not.toBeVisible();
  });
});

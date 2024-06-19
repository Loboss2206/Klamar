import { test, expect } from '@playwright/test';
import { LoginFixture } from 'src/components/login/login.fixture';
import { UserCreatorFixture } from 'src/components/userManager/userCreator.fixture';
import { SelectUserContainerForModificationFixture } from 'src/components/select-user-container-for-modification/select-user-container-for-modification.fixture';

test.describe('User feature', () => {
    const baseURL = 'http://localhost:4200';

    test('should toggle dropdown menu on admin link click', async ({ page }) => {
        await page.goto(baseURL);
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

    test('Create user button should be visible', async ({ page }) => {
        await page.goto(`${baseURL}/admin/selectUserToModify`);
        const loginFixture = new LoginFixture(page);
        await loginFixture.fillUsername("admin");
        await loginFixture.fillPassword("admin");
        await loginFixture.clickLogin();
        const selectUserContainerForModificationFixture = new SelectUserContainerForModificationFixture(page);

        const createUserButton = await selectUserContainerForModificationFixture.getNewUserCreationButton();
        expect(createUserButton).toBeVisible();

        await selectUserContainerForModificationFixture.clickOnNewUserCreationButton();
        expect(page).toHaveURL(`${baseURL}/admin/createUser`);
    });

    test('user form inputs should be visible', async ({ page }) => {
        await page.goto(`${baseURL}/admin/createUser`);
        const loginFixture = new LoginFixture(page);
        await loginFixture.fillUsername("admin");
        await loginFixture.fillPassword("admin");
        await loginFixture.clickLogin();
        const userCreatorFixture = new UserCreatorFixture(page);
        let createButton = await userCreatorFixture.getCreateButton();
        expect(createButton).toBeVisible();

        let firstNameInput = await userCreatorFixture.getFirstNameInput();
        expect(firstNameInput).toBeVisible();
        await firstNameInput.fill("Huguette");

        let lastNameInput = await userCreatorFixture.getLastNameInput();
        expect(lastNameInput).toBeVisible();
        await lastNameInput.fill("Li");

        let birthDateInput = await userCreatorFixture.getBirthDateInput();
        await expect(birthDateInput).toBeVisible();
        await birthDateInput.fill("1950-02-16");

        let hobbiesInput = await userCreatorFixture.getHobbiesInput();
        expect(hobbiesInput).toBeVisible();
        await hobbiesInput.fill("Géographie, Histoire");

        let baseZoomInput = await userCreatorFixture.getBaseZoomInput();
        expect(baseZoomInput).toBeVisible();
        await baseZoomInput.fill("105");


        let typeOfDaltoSelect = await userCreatorFixture.getTypeOfDaltoSelect();
        expect(typeOfDaltoSelect).toBeVisible();
        await typeOfDaltoSelect.selectOption("Deuteranopie");

        let choiceSimonRadioTrue = await userCreatorFixture.getChoiceSimonRadio('true');
        expect(choiceSimonRadioTrue).toBeVisible();
        await choiceSimonRadioTrue.check();

        let choiceSimonRadioFalse = await userCreatorFixture.getChoiceSimonRadio('false');
        expect(choiceSimonRadioFalse).toBeVisible();
        await choiceSimonRadioFalse.check();

        let secTipsForSimonInput = await userCreatorFixture.getSecTipsForSimonInput();
        expect(secTipsForSimonInput).toBeVisible();
        await secTipsForSimonInput.fill("10");

        let secTipsForMemoryInput = await userCreatorFixture.getSecTipsForMemoryInput();
        expect(secTipsForMemoryInput).toBeVisible();
        await secTipsForMemoryInput.fill("15");

        let secVisibleCardForMemoryInput = await userCreatorFixture.getSecVisibleCardForMemoryInput();
        expect(secVisibleCardForMemoryInput).toBeVisible();
        await secVisibleCardForMemoryInput.fill("5");

        let choicePrintTipsAfterErrorTrue = await userCreatorFixture.getChoicePrintTipsAfterErrorRadio('true');
        expect(choicePrintTipsAfterErrorTrue).toBeVisible();
        await choicePrintTipsAfterErrorTrue.check();

        let choicePrintTipsAfterErrorFalse = await userCreatorFixture.getChoicePrintTipsAfterErrorRadio('false');
        expect(choicePrintTipsAfterErrorFalse).toBeVisible();
        await choicePrintTipsAfterErrorFalse.check();

        let choicePrintTipsAfterClickTrue = await userCreatorFixture.getChoicePrintTipsAfterClickRadio('true');
        expect(choicePrintTipsAfterClickTrue).toBeVisible();
        await choicePrintTipsAfterClickTrue.check();

        let choicePrintTipsAfterClickFalse = await userCreatorFixture.getChoicePrintTipsAfterClickRadio('false');
        expect(choicePrintTipsAfterClickFalse).toBeVisible();
        await choicePrintTipsAfterClickFalse.check();

        let choicePrintTipsOneByOneTrue = await userCreatorFixture.getChoicePrintTipsOneByOneRadio('true');
        expect(choicePrintTipsOneByOneTrue).toBeVisible();
        await choicePrintTipsOneByOneTrue.check();

        let choicePrintTipsOneByOneFalse = await userCreatorFixture.getChoicePrintTipsOneByOneRadio('false');
        expect(choicePrintTipsOneByOneFalse).toBeVisible();
        await choicePrintTipsOneByOneFalse.check();

        await userCreatorFixture.clickOnCreateButton();
        await expect(page).toHaveURL(`${baseURL}/admin/selectUserToModify`); //await because of the message prompt after the click
    });

    test('User item should be modified', async ({ page }) => {
        await page.goto(`${baseURL}/admin/selectUserToModify`);
        const loginFixture = new LoginFixture(page);
        await loginFixture.fillUsername("admin");
        await loginFixture.fillPassword("admin");
        await loginFixture.clickLogin();
        const selectUserContainerForModificationFixture = new SelectUserContainerForModificationFixture(page);

        const userItemCreated = await selectUserContainerForModificationFixture.getUserByName("Huguette Li");
        expect(userItemCreated).toBeVisible();
        await userItemCreated.click();

        const parentDiv = page.locator(".customDiv");
        let modifyUsereButton = await parentDiv.getByText("Modifier");
        let getModifyButton = await modifyUsereButton;
        expect(getModifyButton).toBeVisible();

        await getModifyButton.click();
        expect(page).toHaveURL(new RegExp(`${baseURL}/admin/modifyUser/[1-9]*`));

        const userCreatorFixture = new UserCreatorFixture(page);
        let modifyButton = await userCreatorFixture.getModifyButton();
        expect(modifyButton).toBeVisible();

        let firstNameInput = await userCreatorFixture.getFirstNameInput();
        expect(firstNameInput).toBeVisible();
        await firstNameInput.fill("Georgette");

        await userCreatorFixture.clickOnModifyButton();
        await expect(page).toHaveURL(`${baseURL}/admin/selectUserToModify`);
    });

    test('User item should be deleted', async ({ page }) => {
        await page.goto(`${baseURL}/admin/selectUserToModify`);
        const loginFixture = new LoginFixture(page);
        await loginFixture.fillUsername("admin");
        await loginFixture.fillPassword("admin");
        await loginFixture.clickLogin();
        const selectUserContainerForModificationFixture = new SelectUserContainerForModificationFixture(page);
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toEqual('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
            await dialog.accept();
        })

        const userItemCreated = await selectUserContainerForModificationFixture.getUserByName("Georgette Li");
        expect(userItemCreated).toBeVisible();
        await userItemCreated.click();

        const parentDiv = page.locator(".customDiv");
        let deleteButton = await parentDiv.getByText("Supprimer");
        expect(deleteButton).toBeVisible();
        await deleteButton.click();

        expect(userItemCreated).not.toBeVisible();
    });
});

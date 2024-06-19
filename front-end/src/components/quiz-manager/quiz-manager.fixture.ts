import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class QuizManagerFixture extends E2EComponentFixture {
    getInput(id: string) {
        const selector = `input[id="${id}"]`;
        return this.page.waitForSelector(selector);
    }

    getTextArea(id: string) {
        const selector = `textarea[id="${id}"]`;
        return this.page.waitForSelector(selector);
    }

    getCreateQuizButton() {
        return this.page.getByRole('button', { name: 'Créer un quiz' });
    }

    async clickCreateQuizButton() {
        const button = await this.getCreateQuizButton();
        return button.click();
    }

    getCreateQuestionButton() {
        return this.page.getByRole('button', { name: 'Créer une question' });
    }

    async clickCreateQuestionButton() {
        const button = await this.getCreateQuestionButton();
        return button.click();
    }

    getSearchQuizSelector() {
        return this.page.waitForSelector('app-search-quiz-selector');
    }

    getQuizTable() {
        return this.page.waitForSelector('app-material-table');
    }

    isEditMode() {
        return this.page.waitForSelector('*ngIf="editMode"');
    }

    getCancelButton() {
        return this.page.getByRole('button', { name: 'Annuler' });
    }

    async clickCancelButton() {
        const button = await this.getCancelButton();
        return button.click();
    }

    getSaveButton() {
        return this.page.getByRole('button', { name: 'Sauvegarder' });
    }

    async clickSaveButton() {
        const button = await this.getSaveButton();
        return button.click();
    }

    getSaveSimonButton() {
        return this.page.locator('#overlaySimonConfig').getByRole('button', { name: 'Sauvegarder' })
    }

    async clickSaveSimonButton() {
        const button = await this.getSaveSimonButton();
        return button.click();
    }

    async openFileChooser() {
        const fileInput = await this.page.waitForSelector('input[type="file"]');
        return fileInput.click();
    }

    async selectFile(filePath: string) {
        const fileInput = await this.page.setInputFiles('input[type="file"]', filePath);
        return fileInput;
    }

    getMemoryConfig() {
        return this.page.waitForSelector('*ngIf="isInMemoryEdit"');
    }

    getQuestionsPicklist() {
        return this.page.waitForSelector('app-questions-picklist');
    }

    getAddQuestionButton() {
        return this.page.getByRole('button', { name: 'Ajouter une question' });
    }

    async clickAddQuestionButton() {
        const button = await this.getAddQuestionButton();
        return button.click();
    }

    getQuizCell(index: number, indexCell: number) {
        return this.page.locator(`tr:nth-child(${index}) > td:nth-child(${indexCell})`)
    }

    getDeleteQuizButton(index: number) {
        return this.page.locator(`tr:nth-child(${index}) > td:nth-child(5) > .material-table-actions > app-genericbutton:nth-child(2) > .delete-button`)
    }

    async clickDeleteButton(index: number) {
        const button = await this.getDeleteQuizButton(index);
        return button.click();
    }

    getEditQuizButton(index: number) {
        return this.page.locator(`tr:nth-child(${index}) > td:nth-child(5) > .material-table-actions > app-genericbutton:nth-child(1) > .edit-button`)
    }

    async clickEditButton(index: number) {
        const button = await this.getEditQuizButton(index);
        return button.click();
    }

    async getAllQuizs() {
        return await this.page.$$('tr');
    }


    // SIMON PART 
    getParameterButtonSimon() {
        return this.page.locator('div').filter({ hasText: /^Inclure le simon \?Paramètres$/ }).getByRole('button')
    }

    async clickParameterButtonSimon() {
        const button = await this.getParameterButtonSimon();
        return button.click();
    }

    getCheckboxSimon() {
        return this.page.locator(`#includeSimon`);
    }

    async checkSimon() {
        const checkbox = await this.getCheckboxSimon();
        return checkbox.check();
    }

    // MEMORY PART
    getParameterButtonMemory() {
        return this.page.locator('#memoryConfigButton').getByRole('button', { name: 'Paramètres' });
    }

    async clickParameterButtonMemory() {
        const button = await this.getParameterButtonMemory();
        return button.click();
    }

    getCheckboxMemory() {
        return this.page.locator(`#includeMemory`);
    }

    async checkMemory() {
        const checkbox = await this.getCheckboxMemory();
        return checkbox.check();
    }

    getImageToDrag(index: number) {
        return this.page.locator('.cdk-drop-list.imagesContainer').nth(index).locator('img').last();
    }

    getZoneToDropImage() {
        return this.page.locator('.cdk-drop-list.imagesContainer').nth(1);
    }
}

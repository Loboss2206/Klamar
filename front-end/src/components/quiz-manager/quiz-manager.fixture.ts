import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class QuizManagerFixture extends E2EComponentFixture {

    // Méthode pour obtenir le formulaire principal
    getQuizForm() {
        return this.page.waitForSelector('#form');
    }

    // Méthode pour obtenir un input par ID
    getInput(id: string) {
        const selector = `input[id="${id}"]`;
        return this.page.waitForSelector(selector);
    }

    getTextArea(id: string) {
        const selector = `textarea[id="${id}"]`;
        return this.page.waitForSelector(selector);
    }

    // Méthode pour obtenir le bouton "Créer un quiz"
    getCreateQuizButton() {
        return this.page.getByRole('button', { name: 'Créer un quiz' });
    }

    // Méthode pour cliquer sur le bouton "Créer un quiz"
    async clickCreateQuizButton() {
        const button = await this.getCreateQuizButton();
        return button.click();
    }

    getCreateQuestionButton() {
        return this.page.getByRole('button', { name: 'Créer une question' });
    }

    // Méthode pour cliquer sur le bouton "Créer un quiz"
    async clickCreateQuestionButton() {
        const button = await this.getCreateQuestionButton();
        return button.click();
    }

    // Méthode pour obtenir le sélecteur de recherche de quiz
    getSearchQuizSelector() {
        return this.page.waitForSelector('app-search-quiz-selector');
    }

    // Méthode pour obtenir la table de quiz
    getQuizTable() {
        return this.page.waitForSelector('app-material-table');
    }

    // Méthode pour vérifier si l'édition est en mode activé
    isEditMode() {
        return this.page.waitForSelector('*ngIf="editMode"');
    }

    // Méthode pour obtenir les paramètres du Simon
    getSimonConfigForm() {
        return this.page.waitForSelector('form[formGroup="simonConfigForm"]');
    }

    // Méthode pour obtenir le bouton "Annuler"
    getCancelButton() {
        return this.page.getByRole('button', { name: 'Annuler' });
    }

    // Méthode pour cliquer sur le bouton "Annuler"
    async clickCancelButton() {
        const button = await this.getCancelButton();
        return button.click();
    }

    // Méthode pour obtenir le bouton "Sauvegarder"
    getSaveButton() {
        return this.page.getByRole('button', { name: 'Sauvegarder' });
    }

    // Méthode pour cliquer sur le bouton "Sauvegarder"
    async clickSaveButton() {
        const button = await this.getSaveButton();
        return button.click();
    }

    // Méthode pour ouvrir le fichier image
    async openFileChooser() {
        const fileInput = await this.page.waitForSelector('input[type="file"]');
        return fileInput.click();
    }

    // Méthode pour sélectionner un fichier image
    async selectFile(filePath: string) {
        const fileInput = await this.page.setInputFiles('input[type="file"]', filePath);
        return fileInput;
    }

    // Méthode pour obtenir les paramètres de configuration de la mémoire
    getMemoryConfig() {
        return this.page.waitForSelector('*ngIf="isInMemoryEdit"');
    }

    // Méthode pour obtenir la liste des questions
    getQuestionsPicklist() {
        return this.page.waitForSelector('app-questions-picklist');
    }

    // Méthode pour obtenir le bouton pour ajouter une nouvelle question
    getAddQuestionButton() {
        return this.page.getByRole('button', { name: 'Ajouter une question' });
    }

    // Méthode pour cliquer sur le bouton pour ajouter une nouvelle question
    async clickAddQuestionButton() {
        const button = await this.getAddQuestionButton();
        return button.click();
    }
}

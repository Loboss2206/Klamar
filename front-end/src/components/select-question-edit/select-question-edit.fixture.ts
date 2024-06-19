import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class SelectQuestionEditFixture extends E2EComponentFixture {
    getQuestionForm() {
        return this.page.waitForSelector('form.user-modifier-form');
    }

    getInput(id: string) {
        const selector = `input[id="${id}"]`;
        return this.page.waitForSelector(selector);
    }

    getSubmitButton() {
        return this.page.getByRole('button', { name: /Créer\/modifier la question/i });
    }

    // Méthode pour cliquer sur le bouton de soumission
    async clickSubmitButton() {
        const button = await this.getSubmitButton();
        return button.click();
    }
}
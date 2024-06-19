import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";


export class SelectQuestionFixture extends E2EComponentFixture {
    getCreateQuestionButton() {
        return this.page.getByText("Créer une question");
    }

    clickOnCreateQuestion() {
        return this.getCreateQuestionButton().click();
    }
}

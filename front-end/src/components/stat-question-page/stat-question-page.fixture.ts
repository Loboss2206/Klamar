import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class StatQuestionPageFixture extends E2EComponentFixture {

  isQuestionTextPresent() {
    return this.page.getByText('Question 1Reponse 1 Reponse 2 Bonne réponseReponse 3 Reponse 4 Points remporté').isVisible();
  }

  isQuestionImagePresent() {
    return this.page.getByText('Question imageBonne réponsePoints remportées : 1/1Nombre d’erreurs : 0Temps').isVisible();
  }

  isResponseTextPresent() {
    return this.page.getByText('Reponse 1 Reponse 2 Bonne ré').isVisible();
  }

  isStatForQuestionPresent() {
    return this.page.getByText('Nombre d’erreurs : 1Temps').isVisible();
  }

  isImageTitleQuestionPresent() {
    return this.page.locator('app-stat-question-page img').first().isVisible();
  }

  isImagePresent() {
    return this.page.locator('div:nth-child(2) > app-result-question > .questionStat > app-question-display-stat > .quizContainer > .griddy').isVisible();
  }

  isStatImagePresent() {
    return this.page.getByText('Nombre d’erreurs : 0Temps').isVisible();
  }
}

import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class SelectStatFixture extends E2EComponentFixture {

  async isStatQuestionGraphicPresent(): Promise<boolean> {
    return this.page.getByText('Statistique Questions[object').isVisible();
  }

  async isStatSimonGraphicPresent(): Promise<boolean> {
    return this.page.getByText('Statistique Simon[object').isVisible();
  }

  async isStatMemoryGraphicPresent(): Promise<boolean> {
    return this.page.getByText('Statistique Memory[object').isVisible();
  }

  async resultPagePresent(): Promise<boolean> {
    return this.page.locator('app-quizresultpage div').filter({ hasText: 'Quiz du18/06/2024 13:36Question67%Plus d\'informationsSimon100%Plus d\'' }).nth(3).isVisible();
  }

  async clickOnStatQuestion(){
    const statButton = this.page.locator('app-quizresultbox').filter({ hasText: 'Quiz du18/06/2024 13:36Question84%Plus d\'informationsSimonPas de SimonMemoryPas' }).getByRole('button').first();
    return statButton.click();
  }
  async clickOnStatSimonSkiped(){
    const simonButton = this.page.getByText('SimonSimon passéPlus d\'').getByRole('button').first();
    return simonButton.click();
  }

  async clickOnStatMemory(){
    const memoryButton = this.page.locator('app-quizresultbox').filter({ hasText: 'Quiz du18/06/2024 13:36Question67%Plus d\'informationsSimon100%Plus d\'' }).getByRole('button').nth(2).first();
    return memoryButton.click();
  }

  async getStatGraphic(){
    return this.page.locator('app-quizresultpage div')
      .filter({ hasText: "Quiz du18/06/2024 13:36Question67%Plus d'informationsSimon100%Plus d'" })
      .nth(3);
  }
}

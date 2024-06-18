import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class SimonGameFixture extends E2EComponentFixture {
  async getCongratsMessage() {
    return await this.page.$('div.congrats span:has-text("Bravo !")');
  }

  async getASimonButtonByID(i: number) {
    return await this.page.locator(`#button-${i}`);
  }

  async waitForNotActiveOfSimonButtonByID(i: number) {
    return await this.page.waitForSelector(`#button-${i}:not(.active)`);
  }

  async waitForActiveOfSimonButtons() {
    return await this.page.waitForSelector('.simon-button.active');
  }

  async getStartButton() {
    return await this.page.locator('div.congrats');
  }
}

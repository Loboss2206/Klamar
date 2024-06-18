import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class SimonGameFixture extends E2EComponentFixture {

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

  async waitForCongratsToBeNotFullscreen() {
    return await this.page.waitForSelector('div.congrats:not(.fullscreen)');
  }

  async getCongratsMessageText(text: string) {
    return await this.page.$(`div.congrats span:has-text("${text}")`);
  }

  async waitForCongratsMessage(text: string) {
    return await this.page.waitForSelector(`div.congrats span:has-text("${text}")`);
  }
}

import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class SelectUserStatFixture extends E2EComponentFixture {

  getUser(name : string, surname : string) {
    return this.page.locator('app-select-user-item').filter({ hasText: name +' ' + surname}).locator('div').first();
  }
  async clickUser(name : string, surname : string) {
    const userLink = this.getUser(name, surname);
    return userLink.click();
  }

  async searchUser(input: string) {
    const searchBar = this.page.getByPlaceholder('Rechercher');
    await searchBar.fill(input);
  }
}

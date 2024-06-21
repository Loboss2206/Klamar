import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class LoginFixture extends E2EComponentFixture {
  async fillUsername(username: string) {
    let nom = await this.page.getByPlaceholder('Nom d\'utilisateur');
    await nom.fill(username);
  }

  async fillPassword(password: string) {
    let mdp = await this.page.getByPlaceholder('Mot de passe');
    await mdp.fill(password);
  }

  getLoginButton() {
    return this.page.locator('button:has-text("Se connecter")');
  }

  async clickLogin() {
    const button = await this.getLoginButton();
    return button.click();
  }
}

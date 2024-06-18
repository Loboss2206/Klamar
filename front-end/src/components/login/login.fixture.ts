import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class LoginFixture extends E2EComponentFixture {
    async fillUsername(username: string) {
        await this.page.fill('input[ng-reflect-name=username]', username);
    }

    async fillPassword(password: string) {
        await this.page.fill('input[ng-reflect-name=password]', password);
    }

    getLoginButton() {
        return this.page.locator('button:has-text("Se connecter")');
    }

    async clickLogin() {
        const button = await this.getLoginButton();
        return button.click();
    }
}
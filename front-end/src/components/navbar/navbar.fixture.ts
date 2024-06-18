import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class NavbarFixture extends E2EComponentFixture {
    getNavbarAdminMenu() {
        return this.page.locator('.dropdown-toggle');
    }

    async clickNavbarAdminMenu() {
        const adminLink = await this.getNavbarAdminMenu();
        return adminLink.click();
    }

    getGoToQuizManager() {
        return this.page.locator('a:has-text("Gestion des quizzes")');
    }

    async clickGoToQuizManager() {
        const button = await this.getGoToQuizManager();
        return button.click();
    }
}

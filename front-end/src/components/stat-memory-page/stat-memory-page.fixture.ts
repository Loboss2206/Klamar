import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class StatMemoryPageFixture extends E2EComponentFixture {
  async isStatPresent() {
    return this.page.locator('app-result-memory div').filter({ hasText: 'Nombre d’erreurs : 0Nombre d’' }).isVisible();
  }

  async isImagePresent() {
    return this.page.locator('app-result-memory div').filter({ hasText: 'Nombre d’erreurs : 0Nombre d’' }).locator('div');
  }

  async isStatCommonPresent() {
    return this.page.locator('app-result-memory div').filter({ hasText: 'Nombre d’erreurs : 0Nombre d’' }).locator('div').isVisible();
  }
}

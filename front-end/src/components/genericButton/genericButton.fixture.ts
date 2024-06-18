import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class GenericButtonFixture extends E2EComponentFixture {
    getGenericButton() {
        return this.page.getByRole('button').first();
    }
}


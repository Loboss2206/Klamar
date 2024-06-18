import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";


export class SelectUserItemFixture extends E2EComponentFixture {
    getUserItemByName(name: string) {
        return this.page.getByText(name);
    }
}

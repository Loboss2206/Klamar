import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";
import { GenericButtonFixture } from "../genericButton/genericButton.fixture";
import { SelectUserItemFixture } from "../select-user-item/select-user-item.fixture";

export class SelectUserContainerForModificationFixture extends E2EComponentFixture {
    getNewUserCreationButton() {
        let genericButton = new GenericButtonFixture(this.page);
        return genericButton.getGenericButton();
    }

    clickOnNewUserCreationButton() {
        return this.getNewUserCreationButton().click();
    }

    getUserByName(name: string) {
        let selectUserItemFixture = new SelectUserItemFixture(this.page);
        return selectUserItemFixture.getUserItemByName(name);
    }

    getDeleteButton() {
        return this.page.getByRole('button', {
            name: "Supprimer"
        });
    }

    getModifyButton() {
        return this.page.getByRole('button', {
            name: "Modifier"
        });
    }

    clickOnDeleteButton() {
        return this.getDeleteButton().click();
    }

    clickOnModifyButton() {
        return this.getModifyButton().click();
    }
}

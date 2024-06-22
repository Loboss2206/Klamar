import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class UserCreatorFixture extends E2EComponentFixture {
  getCreateButton() {
    return this.page.getByRole('button', {
      name: "Créer l'utilisateur"
    });
  }

  getModifyButton() {
    return this.page.getByRole('button', {
      name: "Modifier l'utilisateur"
    });
  }

  clickOnCreateButton() {
    return this.getCreateButton().click();
  }

  clickOnModifyButton() {
    return this.getModifyButton().click();
  }

  getFirstNameInput() {
    return this.page.getByRole('textbox', { name: /Prénom/i });
  }

  getLastNameInput() {
    return this.page.getByPlaceholder(/Doe/i);
  }

  getBirthDateInput() {
    return this.page.getByRole('textbox', { name: /Date de naissance/i });
  }

  getHobbiesInput() {
    return this.page.getByRole('textbox', { name: /Intérêt\/hobbies/i });
  }

  getBaseZoomInput() {
    return this.page.getByRole('spinbutton', { name: /Zoom de base/i });
  }

  getTypeOfDaltoSelect() {
    return this.page.getByRole('combobox', { name: /Daltonisme/i });
  }

  getChoiceSimonRadio(value: string) {
    return this.page.locator(`input[name="choiceSimon"][value="${value}"]`);
  }

  getSecTipsForSimonInput() {
    return this.page.getByRole('spinbutton', { name: /Nombre de secondes d’inactivité avant de réafficher la séquence \?/i }).first();

  }

  getSecTipsForMemoryInput() {
    return this.page.getByRole('spinbutton', { name: /Nombre de secondes d’inactivité avant d’afficher un indice/i }).last();
  }

  getSecVisibleCardForMemoryInput() {
    return this.page.getByRole('spinbutton', { name: /Temps pour voir toutes les cartes faces visibles au début de la partie/i });
  }

  getChoicePrintTipsAfterErrorRadio(value: string) {
    return this.page.locator(`input[name="choicePrintTipsAfterError"][value="${value}"]`);
  }

  getChoicePrintTipsAfterClickRadio(value: string) {
    return this.page.locator(`input[name="choicePrintTipsAfterClick"][value="${value}"]`);
  }

  getChoicePrintTipsOneByOneRadio(value: string) {
    return this.page.locator(`input[name="choicePrintTipsOneByOne"][value="${value}"]`);
  }
}

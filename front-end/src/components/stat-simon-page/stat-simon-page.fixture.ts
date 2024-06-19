import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class StatSimonPageFixture extends E2EComponentFixture {
  async isStatPresent(){
    return this.page.getByText('Le simon a été passéNombre d’').isVisible()
  }
  async isSkippedTitlePresent(){
    return this.page.getByText('Le simon a été passé').isVisible()
  }

  async isCommonStatPresent(){
    return this.page.getByText('Nombre d’erreurs : 0Nombre d’').isVisible()
  }

  async isFinalSequencePresent(){
    return this.page.getByRole('heading', { name: 'Taille de la séquence finale :' }).isVisible()
  }

  async isNbColorPresent(){
    return this.page.getByRole('heading', { name: 'Nombre de couleurs :' }).isVisible()
  }
}

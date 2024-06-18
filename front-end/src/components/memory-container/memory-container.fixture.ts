import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class MemoryGameFixture extends E2EComponentFixture {
    getSkipMemoryButton() {
        return this.page.waitForSelector('.skipButton');
    }

    async clickSkipMemoryButton() {
        const button = await this.getSkipMemoryButton();
        return button.click();
    }

    getTextHintsElement() {
        return this.page.waitForSelector('#textHints');
    }

    async getMemoryItems() {
        const selector = `.memoryItem`;
        return await this.page.$$(selector);
    }

    getMemoryItemByIndex(index: number) {
        const selector = `.memoryContainer app-memory-item:nth-child(${index + 1})`;
        return this.page.waitForSelector(selector);
    }

    async clickMemoryItemByIndex(index: number) {
        const button = await this.getMemoryItemByIndex(index);
        await button.click();
    }

    async isMemoryItemHidden(index: number): Promise<boolean> {
        const selector = `.memoryContainer app-memory-item:nth-child(${index + 1}) > .memoryItem.hidden`;
        const element = await this.page.$(selector);
        return element !== null;
    }

    getMemoryItemByPicURL(picURL: string) {
        const selector = `.memoryContainer app-memory-item[picURL="${picURL}"]`;
        return this.page.waitForSelector(selector);
    }

    async getAllMemoryItems() {
        return await this.page.$$('.memoryContainer app-memory-item');
    }
}

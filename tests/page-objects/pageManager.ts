import {Page} from "@playwright/test";
import {MainPage} from "./mainPage";
import {CellPhonesPage} from "./cellPhonesPage";

export class PageManager {

    private readonly page: Page;
    private readonly mainPage: MainPage;
    private readonly cellPhonesPage: CellPhonesPage;

    constructor(page: Page) {
        this.page = page;
        this.mainPage = new MainPage(this.page);
        this.cellPhonesPage = new CellPhonesPage(this.page);
    }

    onMainPage() {
        return this.mainPage;
    };

    onCellPhonesPage() {
        return this.cellPhonesPage;
    };
}
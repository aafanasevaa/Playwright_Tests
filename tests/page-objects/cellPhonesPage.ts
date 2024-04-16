import {expect, Locator, Page} from '@playwright/test';
import {HelperBase} from "./helperBase";

export class CellPhonesPage extends HelperBase {
    readonly sortByDropdownFilter: Locator;
    readonly productPageSizeDropdownFilter: Locator;
    readonly viewModeDropdownFilter: Locator;
    readonly breadcrumbsHeader: Locator;
    readonly itemCard: Locator;


    constructor(page: Page) {
        super(page);
        this.sortByDropdownFilter = page.getByTestId('products-orderby');
        this.productPageSizeDropdownFilter = page.getByTestId('products-pagesize');
        this.viewModeDropdownFilter = page.getByTestId('products-viewmode');
        this.breadcrumbsHeader = page.locator('//*[@class=\'breadcrumb\']');
        this.itemCard = page.locator('.item-box');
    };

    async checkTheDisplayOfElements() {
        await expect(this.sortByDropdownFilter).toBeVisible();
        await expect(this.productPageSizeDropdownFilter).toBeVisible();
        await expect(this.viewModeDropdownFilter).toBeVisible();
        //header assert
        await expect(this.breadcrumbsHeader).toBeVisible();
        await expect(this.breadcrumbsHeader.getByTitle('Home')).toBeVisible();
        await expect(this.breadcrumbsHeader.getByTitle('Electronics')).toBeVisible();
        await expect(this.breadcrumbsHeader.getByText('Cell phones')).toBeVisible();
        expect(await this.itemCard.all()).toHaveLength(3);
        await expect(this.page).toHaveURL('./cell-phones');
    };

    async clickOnTheItemCard(parameter: string) {
        await this.itemCard.getByRole('link', { name: parameter, exact: true }).click();
        await expect(this.page.locator('.current-item')).toHaveText(parameter);
    };



}
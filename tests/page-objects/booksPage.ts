import {expect, Locator, Page} from '@playwright/test';
import {HelperBase} from "./helperBase";

export class BooksPage extends HelperBase {
    readonly sortByDropdownFilter: Locator;
    readonly productPageSizeDropdownFilter: Locator;
    readonly viewModeDropdownFilter: Locator;
    readonly priceFilter: Locator;
    readonly breadcrumbsHeader: Locator;
    readonly itemCard: Locator;

    constructor(page: Page) {
        super(page);
        this.sortByDropdownFilter = page.getByTestId('products-orderby');
        this.productPageSizeDropdownFilter = page.getByTestId('products-pagesize');
        this.viewModeDropdownFilter = page.getByTestId('products-viewmode');
        this.priceFilter = page.locator('.product-filters');
        this.breadcrumbsHeader = page.locator('//*[@class=\'breadcrumb\']');
        this.itemCard = page.locator('.item-box');
    };

    async checkTheDisplayOfPageElements() {
        await expect(this.page).toHaveURL('/books');
        await expect(this.sortByDropdownFilter).toBeVisible();
        await expect(this.productPageSizeDropdownFilter).toBeVisible();
        await expect(this.viewModeDropdownFilter).toBeVisible();
        await expect(this.priceFilter).toBeVisible();
        let priceValues = "Filter by price Under 25.00 25.00 - 50.00 Over 50.00";
        expect(String(await this.priceFilter.allInnerTexts()).replace(/(\r\n|\n|\r)/gm, " "))
            .toEqual(priceValues);
         //header assert
        await expect(this.breadcrumbsHeader).toBeVisible();
        await expect(this.breadcrumbsHeader.getByTitle('Home')).toBeVisible();
        await expect(this.breadcrumbsHeader.getByText('Books')).toBeVisible();
        expect(await this.itemCard.all()).toHaveLength(6);
    };

    async clickOnTheItemCard(parameter: string) {
        await this.itemCard.getByRole('link', { name: parameter, exact: true }).click();
        await expect(this.page.locator('.current-item')).toHaveText(parameter);
    };
}

import {expect, Locator, Page} from '@playwright/test';
import {HelperBase} from "./helperBase";

export class SearchResultsPage extends HelperBase {
    readonly pageTitle: Locator;
    readonly searchBox: Locator;
    readonly advancedSearchCheckbox: Locator;
    readonly sortByDropdownFilter: Locator;
    readonly productPageSizeDropdownFilter: Locator;
    readonly viewModeDropdownFilter: Locator;
    readonly searchResultsContents: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('.page-title');
        this.searchBox = page.locator('.search-text');
        this.advancedSearchCheckbox = page.getByRole('checkbox', {name: 'Advanced search'});
        this.sortByDropdownFilter = page.getByTestId('products-orderby');
        this.productPageSizeDropdownFilter = page.getByTestId('products-pagesize');
        this.viewModeDropdownFilter = page.locator('//*[@class=\'products-viewmode\']');
        this.searchResultsContents = page.locator('.search-results');
    };

    async checkTheDisplayOfPageElements(itemName: string) {
        await expect(this.page).toHaveURL('/search?q=' + itemName);
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText('Search');
        await expect(this.searchBox).toBeVisible();
        await expect(this.searchBox).toHaveValue(itemName);
        await expect(this.advancedSearchCheckbox).toBeVisible();
        await expect(this.advancedSearchCheckbox).not.toBeChecked();
        await expect(this.sortByDropdownFilter).toBeVisible();
        await expect(this.productPageSizeDropdownFilter).toBeVisible();
        await expect(this.viewModeDropdownFilter).not.toBeVisible();
        await expect(this.searchResultsContents).toBeVisible();
    };

    async checkTheResultsOfTheSearchContainCorrectItems(itemName: string) {
        const correctRegExp = new RegExp(`.*${itemName}.*`, 'i');
        const incorrectRegExp = new RegExp(`\b(?!${itemName}\\b)\\w+`, 'i');
        //ensuring all displayed items contain search word in their titles
        expect(String(await this.searchResultsContents.locator('//h2[@class=\'product-title\']')
            .allTextContents())).toMatch(correctRegExp);
        //ensuring there are no items displayed on the page which do not contain the search word in their titles
        expect(String(await this.searchResultsContents.locator('//h2[@class=\'product-title\']')
            .allTextContents())).not.toMatch(incorrectRegExp);
    }
}

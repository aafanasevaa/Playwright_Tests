import {expect, Locator, Page} from "@playwright/test";

export class HelperBase {

    readonly page: Page;

    readonly headerLogo: Locator;
    readonly registerButton: Locator;
    readonly loginButton: Locator;
    readonly cartButton: Locator;
    readonly wishlistButton: Locator;
    readonly searchBar: Locator;
    readonly searchButton: Locator;
    readonly headerMenu: Locator;
    readonly electronicsDropdown: Locator;

    constructor(page: Page) {
        this.page = page;

        this.headerLogo = page.getByRole('link', {name: 'Tricentis Demo Web Shop'});
        this.registerButton = page.getByRole('link', {name: 'Register'});
        this.loginButton = page.getByRole('link', {name: 'Log in'});
        this.cartButton = page.getByTestId( 'topcartlink');
        this.wishlistButton = page.locator('.header-links').locator('.ico-wishlist');
        this.searchBar = page.getByTestId('small-searchterms');
        this.searchButton = page.getByRole('button', {name: 'Search'});
        this.headerMenu = page.locator('.top-menu');
        this.electronicsDropdown = page.locator('(//*[contains(text(), \'Electronics\')]/following-sibling::ul)');
    }

    async checkTheDisplayOfHeaderElements() {
        await expect(this.headerLogo).toBeVisible();
        await expect(this.registerButton).toBeVisible();
        await expect(this.loginButton).toBeVisible();
        await expect(this.cartButton).toBeVisible();
        await expect(this.wishlistButton).toBeVisible();
        await expect(this.searchBar).toBeVisible();
        await expect(this.searchBar).toBeEditable();
        await expect(this.searchButton).toBeVisible();
        await expect(this.searchButton).toBeEnabled();
        await expect(this.headerMenu).toBeVisible();
        let a = "BOOKS COMPUTERS ELECTRONICS APPAREL & SHOES DIGITAL DOWNLOADS JEWELRY GIFT CARDS";
        expect(String(await this.headerMenu.allInnerTexts()).replace(/(\r\n|\n|\r)/gm, " ")).toEqual(a);
    };

    async clickOnCartButton() {
        await this.cartButton.click();
    };

    async clickOnWishListButton() {
        await this.wishlistButton.click();
    };

    async hoverOverHeaderInTheHeaderMenu(parameter: string) {
        await this.headerMenu.getByText(parameter).hover();
        await expect(this.headerMenu.getByText(parameter)).toHaveClass('hover');
    };

    async clickOnTheHeaderInTheHeaderMenu(parameter: string) {
        await this.headerMenu.getByText(parameter, {exact: true}).click();
    };

    async checkElectronicsSubmenuContent() {
        await expect(this.electronicsDropdown.first()).toHaveText("Camera, photo\n" + "Cell phones\n");
    };

    async clickOnOptionInElectronicsSubmenu(parameter: string) {
        await this.electronicsDropdown.getByRole('link', { name: parameter + "\n" }).click();
    };
}

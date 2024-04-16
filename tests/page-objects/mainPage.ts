import {expect, Locator, Page} from '@playwright/test';
import {HelperBase} from "./helperBase";

export class MainPage extends HelperBase {
    readonly headerLogo: Locator;
    readonly registerButton: Locator;
    readonly loginButton: Locator;
    readonly cartButton: Locator;
    readonly wishlistButton: Locator;
    readonly searchBar: Locator;
    readonly searchButton: Locator;
    readonly headerMenu: Locator;
    readonly academySlider: Locator;
    readonly categoriesBlock: Locator;
    readonly manufacturersBlock: Locator;
    readonly newsletterBlock: Locator;
    readonly communityPollBlock: Locator;
    readonly tagsBlock: Locator;
    readonly featuredProductsMenu: Locator;
    readonly footerMenu: Locator;
    readonly electronicsDropdown: Locator;


    constructor(page: Page) {
        super(page);
        this.headerLogo = page.getByRole('link', {name: 'Tricentis Demo Web Shop'});
        this.registerButton = page.getByRole('link', {name: 'Register'});
        this.loginButton = page.getByRole('link', {name: 'Log in'});
        this.cartButton = page.getByTestId( 'topcartlink');
        this.wishlistButton = page.locator('.header-links').getByText('Wishlist');
        this.searchBar = page.getByTestId('small-searchterms');
        this.searchButton = page.getByRole('button', {name: 'Search'});
        this.headerMenu = page.locator('.top-menu');
        this.academySlider = page.getByTestId('nivo-slider');
        this.categoriesBlock = page.locator('.block-category-navigation');
        this.manufacturersBlock = page.locator('.block-manufacturer-navigation');
        this.newsletterBlock = page.locator('.block-newsletter');
        this.communityPollBlock = page.locator('.block-poll');
        this.tagsBlock = page.locator('.block-popular-tags');
        this.featuredProductsMenu = page.locator('.product-grid');
        this.footerMenu = page.locator('.footer-menu-wrapper');
        this.electronicsDropdown = page.locator('(//*[contains(text(), \'Electronics\')]/following-sibling::ul)');
    };

    async checkTheDisplayOfElements() {
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
        await expect(this.academySlider).toBeVisible();
        await expect(this.categoriesBlock).toBeVisible();
        await expect(this.manufacturersBlock).toBeVisible();
        await expect(this.newsletterBlock).toBeVisible();
        await expect(this.communityPollBlock).toBeVisible();
        await expect(this.featuredProductsMenu).toBeVisible();
        await expect(this.footerMenu).toBeVisible();
    };

    async hoverOverHeaderInTheHeaderMenu(parameter: string) {
        await this.headerMenu.getByText(parameter).hover();
        await expect(this.headerMenu.getByText(parameter)).toHaveClass('hover');
    };

    async checkElectronicsSubmenuContent() {
       await expect(this.electronicsDropdown.first()).toHaveText("Camera, photo\n" + "Cell phones\n");
    };

    async clickOnOptionInElectronicsSubmenu(parameter: string) {
        await this.electronicsDropdown.getByRole('link', { name: parameter + "\n" }).click();
    };

}
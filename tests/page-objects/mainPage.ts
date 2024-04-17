import {expect, Locator, Page} from '@playwright/test';
import {HelperBase} from "./helperBase";

export class MainPage extends HelperBase {
    readonly academySlider: Locator;
    readonly categoriesBlock: Locator;
    readonly manufacturersBlock: Locator;
    readonly newsletterBlock: Locator;
    readonly communityPollBlock: Locator;
    readonly tagsBlock: Locator;
    readonly featuredProductsMenu: Locator;
    readonly footerMenu: Locator;

    constructor(page: Page) {
        super(page);

        this.academySlider = page.getByTestId('nivo-slider');
        this.categoriesBlock = page.locator('.block-category-navigation');
        this.manufacturersBlock = page.locator('.block-manufacturer-navigation');
        this.newsletterBlock = page.locator('.block-newsletter');
        this.communityPollBlock = page.locator('.block-poll');
        this.tagsBlock = page.locator('.block-popular-tags');
        this.featuredProductsMenu = page.locator('.product-grid');
        this.footerMenu = page.locator('.footer-menu-wrapper');
    };

    async checkTheDisplayOfPageElements() {
        await expect(this.academySlider).toBeVisible();
        await expect(this.categoriesBlock).toBeVisible();
        await expect(this.manufacturersBlock).toBeVisible();
        await expect(this.newsletterBlock).toBeVisible();
        await expect(this.communityPollBlock).toBeVisible();
        await expect(this.featuredProductsMenu).toBeVisible();
        await expect(this.footerMenu).toBeVisible();
    };
}

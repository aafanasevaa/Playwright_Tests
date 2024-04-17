import {expect, Locator, Page} from '@playwright/test';
import {HelperBase} from "./helperBase";

export class HealthBookPage extends HelperBase {
    readonly itemCard: Locator;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly priceLabel: Locator;
    readonly addToCartButton: Locator;
    readonly addToWishlistButton: Locator;
    readonly emailAFriendButton: Locator;
    readonly addToCompareListButton : Locator;
    readonly suggestedProductsGrid: Locator;
    readonly notificationBar: Locator;


    constructor(page: Page) {
        super(page);
        this.itemCard = page.getByTestId('product-details-form');
        this.itemName = page.locator('.product-name');
        this.itemDescription = page.locator( '.short-description');
        this.priceLabel = page.locator('//*[@itemprop="price"]');
        this.addToCartButton = page.getByTestId('add-to-cart-button-22');
        this.addToWishlistButton = page.getByRole('button', {name: 'Add to wishlist'});
        this.addToCompareListButton = page.getByRole('button', {name: 'Add to compare list'});
        this.emailAFriendButton = page.getByRole('button', {name: 'Email a friend'});
        this.suggestedProductsGrid = page.locator('.product-collateral');
        this.notificationBar = page.getByTestId('bar-notification');
    };

    async checkTheDisplayOfPageElements() {
        await expect(this.page).toHaveURL('/health');
        await expect(this.itemCard).toBeVisible();
        await expect(this.itemName).toHaveText('Health Book');
        await expect(this.itemDescription).toHaveText('Worried about your health. Get the newest insights here!');
        await expect(this.priceLabel).toBeVisible();
        await expect(this.priceLabel).toHaveText('10.00');
        await expect(this.addToCartButton).toBeVisible();
        await expect (this.addToCartButton).toBeEnabled();
        await expect(this.addToWishlistButton).toBeVisible();
        await expect(this.addToWishlistButton).toBeEnabled();
        await expect(this.addToCompareListButton).toBeVisible();
        await expect(this.addToCompareListButton).toBeEnabled();
        await expect(this.emailAFriendButton).toBeVisible();
        await expect(this.emailAFriendButton).toBeEnabled();
        await expect(this.suggestedProductsGrid).toBeVisible();
    };

    async clickOnAddToWishlistButton() {
        await this.addToWishlistButton.click();
        await expect(this.notificationBar).toBeVisible();
        await expect(this.notificationBar).toHaveText("The product has been added to your wishlist");
        await expect(this.wishlistButton).toHaveText("Wishlist (1)");
    };
}

import {expect, Locator, Page} from '@playwright/test';
import {HelperBase} from "./helperBase";

export class WishlistPage extends HelperBase {
    readonly pageTitle: Locator;
    readonly productsList: Locator;
    readonly priceField: Locator;
    readonly quantityField: Locator;
    readonly totalPrice: Locator;
    readonly updateWishListButton: Locator;
    readonly addToCartButton: Locator;
    readonly emailAFriendButton: Locator;
    readonly wishlistUrl: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('.page-title');
        this.productsList = page.locator('.cart');
        this.priceField = page.locator('.product-unit-price');
        this.quantityField = page.locator('//*[@class="qty nobr"]//input');
        this.totalPrice = page.locator('.product-subtotal');
        this.updateWishListButton = page.getByRole('button', {name: 'Update wishlist'});
        this.addToCartButton = page.getByRole('button', {name: 'Add to cart'});
        this.emailAFriendButton = page.getByRole('button', {name: 'Email a friend'});
        this.wishlistUrl = page.locator('.share-link');
    };

    async checkTheDisplayOfPageElements() {
        await expect(this.page).toHaveURL('/wishlist');
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText('\n' + 'Wishlist        ');
        await expect(this.productsList).toBeVisible();
        await expect(this.priceField).toBeVisible();
        await expect(this.priceField).not.toBeEmpty();
        await expect(this.quantityField).toBeVisible();
        await expect(this.quantityField).not.toBeEmpty();
        await expect(this.totalPrice).toBeVisible();
        await expect(this.totalPrice).not.toBeEmpty();
        await expect(this.updateWishListButton).toBeVisible();
        await expect(this.addToCartButton).toBeVisible();
        await expect(this.emailAFriendButton).toBeVisible();
        await expect(this.wishlistUrl).toBeVisible();
    };

    async checkIfTheItemIsDisplayedInWishlist(itemName: string) {
        await expect(this.productsList.locator('//a')).toHaveText(itemName);
    }
}

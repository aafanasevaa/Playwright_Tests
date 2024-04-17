import {expect, Locator, Page} from '@playwright/test';
import {HelperBase} from "./helperBase";

export class PhoneCoverPage extends HelperBase {
    readonly itemCard: Locator;
    readonly pictureThumbs: Locator;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly manufacturerDropdown: Locator;
    readonly colorDropdown: Locator;
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
        this.pictureThumbs = page.locator('.picture-thumbs');
        this.itemName = page.locator('.product-name');
        this.itemDescription = page.locator( '.short-description');
        this.manufacturerDropdown = page.getByTestId('product_attribute_80_2_37');
        this.colorDropdown = page.getByTestId('product_attribute_80_1_38');
        this.priceLabel = page.locator('//*[@itemprop="price"]');
        this.addToCartButton = page.getByTestId('add-to-cart-button-80');
        this.addToWishlistButton = page.getByRole('button', {name: 'Add to wishlist'});
        this.addToCompareListButton = page.getByRole('button', {name: 'Add to compare list'});
        this.emailAFriendButton = page.getByRole('button', {name: 'Email a friend'});
        this.suggestedProductsGrid = page.locator('.product-collateral');
        this.notificationBar = page.getByTestId('bar-notification');
    };

    async checkTheDisplayOfPageElements() {
        await expect(this.page).toHaveURL('/phone-cover');
        await expect(this.itemCard).toBeVisible();
        await expect(this.pictureThumbs).toBeVisible();
        await expect(this.itemName).toHaveText('Phone Cover');
        await expect(this.itemDescription).toHaveText('Phone Cover for Samsung and Apple models. Available in 4 different colors: Black, White, Blue and Yellow.');
        await expect(this.manufacturerDropdown).toBeVisible();
        let manufacturerValues = "Samsung Apple";
        expect(String(await this.manufacturerDropdown.allInnerTexts()).replace(/(\r\n|\n|\r)/gm, " ")).toEqual(manufacturerValues);
        await expect(this.colorDropdown).toBeVisible();
        let colorValues = 'Black White Blue Yellow';
        expect(String(await this.colorDropdown.allInnerTexts()).replace(/(\r\n|\n|\r)/gm, " ")).toEqual(colorValues);
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

    async clickOnAddToCartButton() {
        await this.addToCartButton.click();
        await expect(this.notificationBar).toBeVisible();
        await expect(this.notificationBar).toHaveText("The product has been added to your shopping cart");
        await expect(this.cartButton).toHaveText("Shopping cart (1)");
    };
}

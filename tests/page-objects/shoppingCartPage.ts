import {expect, Locator, Page} from '@playwright/test';
import {HelperBase} from "./helperBase";

export class ShoppingCartPage extends HelperBase {
    readonly pageTitle: Locator;
    readonly productsList: Locator;
    readonly priceField: Locator;
    readonly quantityField: Locator;
    readonly totalPrice: Locator;
    readonly updateShoppingCartButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly discountCodeInput: Locator;
    readonly applyCouponButton: Locator;
    readonly giftCardCodeInput: Locator;
    readonly addGiftCardButton: Locator;
    readonly shippingCountryDropdown: Locator;
    readonly stateProvinceDropdown: Locator;
    readonly estimateShippingButton: Locator;
    readonly agreeToTermsCheckbox: Locator;
    readonly checkOutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('.page-title');
        this.productsList = page.locator('.cart');
        this.priceField = page.locator('.product-unit-price');
        this.quantityField = page.locator('//*[@class="qty nobr"]//input');
        this.totalPrice = page.locator('.product-subtotal');
        this.updateShoppingCartButton = page.getByRole('button', {name: 'Update shopping cart'});
        this.continueShoppingButton = page.getByRole('button', {name: 'Continue shopping'});
        this.discountCodeInput = page.locator('input[name="discountcouponcode"]');
        this.applyCouponButton = page.getByRole('button', {name: 'Apply coupon'});
        this.giftCardCodeInput = page.locator('input[name="giftcardcouponcode"]');
        this.addGiftCardButton = page.getByRole('button', {name: 'Add gift card'});
        this.shippingCountryDropdown = page.locator('.country-input');
        this.stateProvinceDropdown = page.locator('.state-input');
        this.estimateShippingButton = page.getByRole('button', {name: 'Estimate shipping'});
        this.agreeToTermsCheckbox = page.getByTestId('termsofservice');
        this.checkOutButton = page.getByRole('button', {name: 'Checkout'});
    };

    async checkTheDisplayOfPageElements() {
        await expect(this.page).toHaveURL('/cart');
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText('Shopping cart');
        await expect(this.productsList).toBeVisible();
        await expect(this.priceField).toBeVisible();
        await expect(this.priceField).not.toBeEmpty();
        await expect(this.quantityField).toBeVisible();
        await expect(this.quantityField).not.toBeEmpty();
        await expect(this.totalPrice).toBeVisible();
        await expect(this.totalPrice).not.toBeEmpty();
        await expect(this.updateShoppingCartButton).toBeVisible();
        await expect(this.continueShoppingButton).toBeVisible();
        await expect(this.discountCodeInput).toBeVisible();
        await expect(this.discountCodeInput).toBeEditable();
        await expect(this.applyCouponButton).toBeVisible();
        await expect(this.giftCardCodeInput).toBeVisible();
        await expect(this.giftCardCodeInput).toBeEditable();
        await expect(this.addGiftCardButton).toBeVisible();
        await expect(this.shippingCountryDropdown).toBeVisible();
        await expect(this.shippingCountryDropdown).toBeEditable();
        await expect(this.stateProvinceDropdown).toBeVisible();
        await expect(this.stateProvinceDropdown).toBeEditable();
        await expect(this.estimateShippingButton).toBeVisible();
        await expect(this.agreeToTermsCheckbox).toBeVisible();
        await expect(this.checkOutButton).toBeVisible();
    };

    async checkIfTheItemIsDisplayedInCart(itemName: string) {
        await expect(this.productsList.locator('//a[@class=\'product-name\']')).toHaveText(itemName);
    }
}

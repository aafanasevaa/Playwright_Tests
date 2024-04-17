import { test, expect } from '@playwright/test';
import {PageManager} from "../page-objects/pageManager";

test('Add item to cart and check if it is displayed there', async ({ page }) => {
    const pm = new PageManager(page);
    let itemName = "Phone Cover";

    await test.step('Open the main page', async () => {
        await page.goto('./');
        await pm.onMainPage().checkTheDisplayOfHeaderElements();
        await pm.onMainPage().checkTheDisplayOfPageElements();
    });

    await test.step('Click on the "Electronics >> Cell phones" section in the header menu', async () => {
        await pm.onMainPage().hoverOverHeaderInTheHeaderMenu('Electronics');
        await pm.onMainPage().checkElectronicsSubmenuContent();
        await pm.onMainPage().clickOnOptionInElectronicsSubmenu('Cell phones');
        await pm.onCellPhonesPage().checkTheDisplayOfHeaderElements();
        await pm.onCellPhonesPage().checkTheDisplayOfPageElements();

    });

    await test.step('Click on the "Phone Cover" card on the "Cell phones" page', async () => {
        await pm.onCellPhonesPage().clickOnTheItemCard("Phone Cover");
        await pm.onPhoneCoverPage().checkTheDisplayOfHeaderElements();
        await pm.onPhoneCoverPage().checkTheDisplayOfPageElements();
    });

    await test.step('Click on "Add to cart" button located on the "Phone Cover" item', async () => {
        await pm.onPhoneCoverPage().clickOnAddToCartButton();
        // item is displayed in shopping cart directly
        await pm.onPhoneCoverPage().clickOnCartButton();
        await pm.onShoppingCartPage().checkTheDisplayOfHeaderElements();
        await pm.onShoppingCartPage().checkTheDisplayOfPageElements();
        await pm.onShoppingCartPage().checkIfTheItemIsDisplayedInCart(itemName);
    });
});


test('Add item to wishlist and check if it is displayed there', async ({ page }) => {
    const pm = new PageManager(page);
    let itemName = "Health Book";

    await test.step('Open the main page', async () => {
        await page.goto('./');
        await pm.onMainPage().checkTheDisplayOfHeaderElements();
        await pm.onMainPage().checkTheDisplayOfPageElements();
    });

    await test.step('Click on the "Books" section in the header menu', async () => {
        await pm.onMainPage().clickOnTheHeaderInTheHeaderMenu("Books");
        await pm.onBooksPage().checkTheDisplayOfHeaderElements();
        await pm.onBooksPage().checkTheDisplayOfPageElements();
    });

    await test.step('Click on the "Health Book" card on the "Books" page', async () => {
        await pm.onBooksPage().clickOnTheItemCard(itemName);
        await pm.onHealthBookPage().checkTheDisplayOfHeaderElements();
        await pm.onHealthBookPage().checkTheDisplayOfPageElements();
    });

    await test.step('Click on "Add to wishlist" button located next to the "Health Book" item', async () => {
        await pm.onHealthBookPage().clickOnAddToWishlistButton();
        // item is displayed on wishlist page directly
        await pm.onHealthBookPage().clickOnWishListButton();
        await pm.onWishlistPage().checkTheDisplayOfHeaderElements();
        await pm.onWishlistPage().checkTheDisplayOfPageElements();
        await pm.onWishlistPage().checkIfTheItemIsDisplayedInWishlist(itemName);
    });
});

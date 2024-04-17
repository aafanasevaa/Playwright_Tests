import { test } from '@playwright/test';
import {PageManager} from "../page-objects/pageManager";
import * as process from "node:process";

test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);

    await test.step('Open the main page', async () => {
        await page.goto('./');
        await pm.onMainPage().checkTheDisplayOfHeaderElements();
        await pm.onMainPage().checkTheDisplayOfPageElements();
    });
});

test('Add item to cart and check if it is displayed there', async ({ page }) => {
    const pm = new PageManager(page);
    let itemName = "Phone Cover";

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

test('Search for an item and check if it is displayed', async ({ page }) => {
    const pm = new PageManager(page);
    let itemName = "Heart";

    await test.step('Put "Heart" in the searchbox and press Enter', async () => {
        await pm.onMainPage().fillInValueInTheSearchBar(itemName);
        await page.keyboard.press('Enter');
    });

    await test.step('Check the results of the search displayed on the search page', async () => {
        await pm.onSearchResultsPage().checkTheDisplayOfHeaderElements();
        await pm.onSearchResultsPage().checkTheDisplayOfPageElements(itemName);
        await pm.onSearchResultsPage().checkTheResultsOfTheSearchContainCorrectItems(itemName);
    });
});

test('Login to account without password', async ({ page }) => {
    const pm = new PageManager(page);

    await test.step('Click on the "Log in" button in the right upper part of the page', async () => {
        await pm.onMainPage().clickOnLoginButtonInHeader();
        await pm.onLoginPage().checkTheDisplayOfHeaderElements();
        await pm.onLoginPage().checkTheDisplayOfPageElements();
    });

    await test.step('Fill in correct "Email" value in the "Returning Customer" box', async () => {
        await pm.onLoginPage().fillInEmailField(process.env.EMAIL);
    });

    await test.step('Click on the "Log in" button in the "Returning Customer" box', async () => {
        await pm.onLoginPage().clickOnLoginButtonWithIncorrectCredentials();
    });
});

test('Register an account without confirmed password', async ({ page }) => {
    const pm = new PageManager(page);

    await test.step('Click on the "Register" button in the right upper part of the page', async () => {
        await pm.onMainPage().clickOnRegisterButtonInHeader();
        await pm.onRegisterPage().checkTheDisplayOfHeaderElements();
        await pm.onRegisterPage().checkTheDisplayOfPageElements();
    });

    await test.step('Fill in correct values on the "Register" page with "Password Confirmed" field empty', async () => {
        await pm.onRegisterPage().selectGenderRadioButton(process.env.GENDER);
        await pm.onRegisterPage().fillInFirstNameField(process.env.FIRSTNAME);
        await pm.onRegisterPage().fillInLastNameField(process.env.LASTNAME);
        await pm.onRegisterPage().fillInEmailField(process.env.EMAIL);
        await pm.onRegisterPage().fillInPasswordField(process.env.PASSWORD);
    });

    await test.step('Click on the "Register" button in the "Register" box', async () => {
        await pm.onRegisterPage().clickOnRegisterButtonWithNoConfirmedPassword();
    });
});

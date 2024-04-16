import { test, expect } from '@playwright/test';
import {PageManager} from "../page-objects/pageManager";

test('Add item to cart and check if it is displayed there', async ({ page }) => {
    const pm = new PageManager(page);

    //Click on "Add to cart" button located on the "Phone Cover" item
    // click on "Add to cart" button located on the Phone Cover" item
    // check that the item is displayed in the cart

    await test.step('Open the main page', async () => {
        await page.goto('./');
        await pm.onMainPage().checkTheDisplayOfElements();
    });

    await test.step('Click on the "Electronics >> Cell phones" section in the header menu', async () => {
        await pm.onMainPage().hoverOverHeaderInTheHeaderMenu('Electronics');
        await pm.onMainPage().checkElectronicsSubmenuContent();
        await pm.onMainPage().clickOnOptionInElectronicsSubmenu('Cell phones');
        await pm.onCellPhonesPage().checkTheDisplayOfElements();

    });

    await test.step('Click on the "Phone Cover" card on the "Cell Phones" page', async () => {
        await pm.onCellPhonesPage().clickOnTheItemCard("Phone Cover");
    });

    await test.step('Click on "Add to cart" button located on the "Phone Cover" item', async () => {
       //todo add test
    });

});

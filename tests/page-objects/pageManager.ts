import {Locator, Page} from "@playwright/test";
import {MainPage} from "./mainPage";
import {CellPhonesPage} from "./cellPhonesPage";
import {PhoneCoverPage} from "./phoneCoverPage";
import {ShoppingCartPage} from "./shoppingCartPage";
import {BooksPage} from "./booksPage";
import {HealthBookPage} from "./healthBookPage";
import {WishlistPage} from "./wishlistPage";
import {SearchResultsPage} from "./searchResultsPage";
import {LogInPage} from "./logInPage";
import {RegisterPage} from "./registerPage";

export class PageManager {

    private readonly page: Page;
    private readonly mainPage: MainPage;
    private readonly cellPhonesPage: CellPhonesPage;
    private readonly phoneCoverPage: PhoneCoverPage;
    private readonly shoppingCartPage: ShoppingCartPage;
    private readonly booksPage: BooksPage;
    private readonly healthBookPage: HealthBookPage;
    private readonly wishlistPage: WishlistPage;
    private readonly searchResultsPage: SearchResultsPage;
    private readonly loginPage: LogInPage;
    private readonly registerPage: RegisterPage;

    constructor(page: Page) {
        this.page = page;
        this.mainPage = new MainPage(this.page);
        this.cellPhonesPage = new CellPhonesPage(this.page);
        this.phoneCoverPage = new PhoneCoverPage(this.page);
        this.shoppingCartPage = new ShoppingCartPage(this.page);
        this.booksPage = new BooksPage(this.page);
        this.healthBookPage = new HealthBookPage(this.page);
        this.wishlistPage = new WishlistPage(this.page);
        this.searchResultsPage = new SearchResultsPage(this.page);
        this.loginPage = new LogInPage(this.page);
        this.registerPage = new RegisterPage(this.page);
    };

    onMainPage() {
        return this.mainPage;
    };

    onCellPhonesPage() {
        return this.cellPhonesPage;
    };

    onPhoneCoverPage() {
        return this.phoneCoverPage;
    };

    onShoppingCartPage() {
        return this.shoppingCartPage;
    };

    onBooksPage() {
        return this.booksPage;
    };

    onHealthBookPage() {
        return this.healthBookPage;
    };

    onWishlistPage() {
        return this.wishlistPage;
    };

    onSearchResultsPage() {
        return this.searchResultsPage;
    };

    onLoginPage() {
        return this.loginPage;
    };

    onRegisterPage() {
        return this.registerPage;
    }
}
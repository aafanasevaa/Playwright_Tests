import {expect, Locator, Page} from '@playwright/test';
import {HelperBase} from "./helperBase";

export class LogInPage extends HelperBase {
    readonly pageTitle: Locator;
    readonly registerButtonInForm: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly forgotPasswordButton: Locator;
    readonly logInButtonInForm: Locator;
    readonly validationErrorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('.page-title');
        this.registerButtonInForm = page.locator('.register-button');
        this.emailInput = page.getByTestId('Email');
        this.passwordInput = page.getByTestId('Password');
        this.rememberMeCheckbox = page.getByTestId('RememberMe');
        this.forgotPasswordButton = page.locator('.forgot-password');
        this.logInButtonInForm = page.locator('.login-button');
        this.validationErrorMessage = page.locator('.validation-summary-errors')
    };

    async checkTheDisplayOfPageElements() {
        await expect(this.page).toHaveURL('/login');
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText('Welcome, Please Sign In!');
        await expect(this.registerButtonInForm).toBeVisible();
        await expect(this.registerButtonInForm).toBeEnabled();
        await expect(this.emailInput).toBeVisible();
        await expect(this.emailInput).toBeEmpty();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.passwordInput).toBeEmpty();
        await expect(this.rememberMeCheckbox).toBeVisible();
        await expect(this.forgotPasswordButton).toBeVisible();
        await expect(this.forgotPasswordButton).toBeEnabled();
        await expect(this.logInButtonInForm).toBeVisible();
        await expect(this.logInButtonInForm).toBeEnabled();
        await expect(this.validationErrorMessage).not.toBeVisible();
    };

    async fillInEmailField(email: any) {
        await this.emailInput.fill(email);
        // no strict assertion as input value is not displayed in html
        await expect(this.emailInput).not.toBeEmpty();
    };

    async clickOnLoginButtonWithIncorrectCredentials() {
        await this.logInButtonInForm.click();
        await expect(this.validationErrorMessage).toBeVisible();
        await expect(this.validationErrorMessage).toHaveText('Login was unsuccessful. Please correct the errors and try again.\n' +
            ' The credentials provided are incorrect')
    }
}

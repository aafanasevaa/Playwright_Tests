import {expect, Locator, Page} from '@playwright/test';
import {HelperBase} from "./helperBase";

export class RegisterPage extends HelperBase {
    readonly pageTitle: Locator;
    readonly genderRadioButtons: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmedPasswordInput: Locator;
    readonly registerButtonInForm: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('.page-title');
        this.genderRadioButtons = page.locator('//*[@class=\'gender\']/parent::*');
        this.firstNameInput = page.getByTestId('FirstName');
        this.lastNameInput = page.getByTestId('LastName');
        this.emailInput = page.getByTestId('Email');
        this.passwordInput = page.getByTestId('Password');
        this.confirmedPasswordInput = page.getByTestId('ConfirmPassword');
        this.registerButtonInForm = page.getByTestId('register-button');
    };

    async checkTheDisplayOfPageElements() {
        await expect(this.page).toHaveURL('/register');
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText('Register');
        await expect(this.genderRadioButtons).toBeVisible();
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.firstNameInput).toBeEmpty();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeEmpty();
        await expect(this.emailInput).toBeVisible();
        await expect(this.emailInput).toBeEmpty();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.passwordInput).toBeEmpty();
        await expect(this.confirmedPasswordInput).toBeVisible();
        await expect(this.confirmedPasswordInput).toBeEmpty();
        await expect(this.registerButtonInForm).toBeEnabled();
        await expect(this.registerButtonInForm).toBeVisible();
    };

    async selectGenderRadioButton(gender: any) {
        await this.genderRadioButtons.getByText(gender, {exact: true}).click();
        await expect(this.genderRadioButtons.getByText(gender, {exact: true})).toBeChecked();
    };

    async fillInFirstNameField(firstName: any) {
        await this.firstNameInput.fill(firstName);
        await expect(this.firstNameInput).not.toBeEmpty();
    };

    async fillInLastNameField(lastName: any) {
        await this.lastNameInput.fill(lastName);
        await expect(this.lastNameInput).not.toBeEmpty();
    };

    async fillInEmailField(email: any) {
        await this.emailInput.fill(email);
        await expect(this.emailInput).not.toBeEmpty();
    };

    async fillInPasswordField(password: any) {
        await this.passwordInput.fill(password);
        await expect(this.passwordInput).not.toBeEmpty();
    };

    async clickOnRegisterButtonWithNoConfirmedPassword() {
        await this.registerButtonInForm.click();
        await expect(this.confirmedPasswordInput.locator("//following-sibling::span//span")).
            toHaveText('Password is required.');
    }
}

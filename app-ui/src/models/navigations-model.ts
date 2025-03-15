
export enum NavigationKeys {
    home = "home", nearby = "nearby", cart = "cart", account = "account"
}

export interface NavigationTab {
    key: NavigationKeys;
    className?: string;
    title: string;
}

export enum LoginPages {
    login = "login", signup = "signup", forgotPassword = "forgotPassword"
}

export enum ValidationType {
    EMAIL, PASSWORD, NAME, LOGIN
}

export interface ValidationError {
    type: ValidationType;
    error: string;
}
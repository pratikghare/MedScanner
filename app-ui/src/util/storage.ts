import { Theme, Themes } from "../constants/locale";

const USER_KEY = "key";
const THEME_KEY = "theme";

export const setUserStorage = (value: string, locally: boolean = false): void => {
    sessionStorage.setItem(USER_KEY, value);
    locally && localStorage.setItem(USER_KEY, value);
}
export const getUserStorage = (): string | null => sessionStorage.getItem(USER_KEY) || localStorage.getItem(USER_KEY);
export const removeUserStorage = (): void => {
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_KEY);
}


export const setStorageTheme = (theme: Theme) => {
    localStorage.setItem(THEME_KEY, theme);
}
export const getStorageTheme = (): Theme | null => getThemeType(localStorage.getItem(THEME_KEY));

export const getThemeType = (theme: string | null): Theme | null => Themes.dark === theme ? Themes.dark : Themes.light === theme ? Themes.light : Themes.system === theme ? Themes.system : null;
export const getThemeTypeDefined = (theme: string | null, current: Theme): Theme => Themes.dark === theme ? Themes.dark : Themes.light === theme ? Themes.light : Themes.system === theme ? Themes.system : current;


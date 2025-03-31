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
export const getStorageTheme = (): Theme | null => {
    const localTheme = localStorage.getItem(THEME_KEY);
    return Themes.dark === localTheme ? Themes.dark : Themes.light === localTheme ? Themes.light : Themes.system === localTheme ? Themes.system : null;
}
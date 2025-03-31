import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme, Themes } from "../../constants/locale";

interface ThemeState {
    theme: Theme;
    current: Theme;
}

const initialState: ThemeState = {
    theme: Themes.system,
    current: Themes.light
};

const themeSlice = createSlice({
    name: "themeSlice",
    initialState,
    reducers: {
        setTheme: (_: ThemeState, action: PayloadAction<Theme>) => {
            const state: ThemeState = {
                theme: action.payload,
                current: action.payload
            }
            if(action.payload === Themes.system) {
                state.current = window.matchMedia("(prefers-color-scheme: dark)").matches ? Themes.dark : Themes.light;
            }
            return state;
        }
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

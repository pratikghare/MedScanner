import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme, Themes, ThemeState } from "../../constants/locale";

const initialState: ThemeState = {
    theme: Themes.light,
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
        },
        setCurrentTheme: (state :ThemeState, action: PayloadAction<Theme>) => ({...state, current: action.payload})
    },
});

export const { setTheme, setCurrentTheme } = themeSlice.actions;
export default themeSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigationTab } from "../../models";
import { navigationTabs } from "../../constants/navigations";

const currentTabSlice = createSlice({
    name: "currentTabSlice",
    initialState: navigationTabs[0],
    reducers: {
        currentTab: (_, action: PayloadAction<NavigationTab>) => action.payload,
        updateTheme: (state: any, action: PayloadAction<string>) => {
            state['theme'] = action.payload;
        }
    },
});


export const { currentTab, updateTheme } = currentTabSlice.actions;
export default currentTabSlice.reducer;
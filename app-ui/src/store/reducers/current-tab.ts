import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigationTab } from "../../models/navigations-model";
import { navigationTabs } from "../../constants/navigations";

const currentTabSlice = createSlice({
    name: "currentTabSlice",
    initialState: navigationTabs[0],
    reducers: {
        currentTab: (_, action: PayloadAction<NavigationTab>) => action.payload
    },
});


export const { currentTab } = currentTabSlice.actions;
export default currentTabSlice.reducer;
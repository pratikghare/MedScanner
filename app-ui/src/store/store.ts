import { configureStore } from "@reduxjs/toolkit";
import currentTabSlice from "./reducers/current-tab";

export const store = configureStore({
    reducer: {
        currentTab: currentTabSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
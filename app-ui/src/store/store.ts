import { configureStore } from "@reduxjs/toolkit";
import currentTabSlice from "./reducers/current-tab";
import currentLocationSlice from "./reducers/current-location";

export const store = configureStore({
    reducer: {
        currentTab: currentTabSlice,
        currentLocation: currentLocationSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
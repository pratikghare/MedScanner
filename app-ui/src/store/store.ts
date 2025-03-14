import { configureStore } from "@reduxjs/toolkit";
import currentLocationSlice from "./reducers/current-location";

export const store = configureStore({
    reducer: {
        currentLocation: currentLocationSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
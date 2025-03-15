import { configureStore } from "@reduxjs/toolkit";
import currentLocationSlice from "./reducers/current-location";
import loggedInUserSlice from "./reducers/current-user";

export const store = configureStore({
    reducer: {
        currentLocation: currentLocationSlice,
        loggedInUser: loggedInUserSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
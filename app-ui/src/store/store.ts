import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./reducers/current-user";

export const store = configureStore({
    reducer: {
        loggedInUser: currentUserSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
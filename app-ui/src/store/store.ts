import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./reducers/current-user";
import themeSlice from "./reducers/theme";
import confirmModal from "./reducers/confirm-modal-slice";

export const store = configureStore({
    reducer: {
        loggedInUser: currentUserSlice,
        themeSlice: themeSlice,
        confirmModal: confirmModal
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ["confirmModal.confirmBtn.callback"], // ✅ Ignore only this path
                ignoredActions: ["confirmModal/openConfirmModal"], // ✅ Ignore this action
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
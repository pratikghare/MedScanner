import { RootState } from "./store";

export const currentUserSelector = (state: RootState) => state.loggedInUser;
export const themeSelector = (state: RootState) => state.themeSlice;
export const confirmModalSelector = (state: RootState) => state.confirmModal;
export const currentLocationSelector = (state: RootState) => state.currentLocation;
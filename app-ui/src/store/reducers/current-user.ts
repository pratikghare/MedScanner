import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user-context";
import { removeUserStorage } from "../../util/storage";

const initialState: User = {
    email: "",
    userId: "",
    phone: "",
    name: "",
    initials: "",
    isLoggedIn: false
};

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setUser: (_state, action: PayloadAction<User>): User => ({...action.payload, isLoggedIn: true}),
        clearUser: () => {
            removeUserStorage();
            return initialState;
        },
    },
});

export const { setUser, clearUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;

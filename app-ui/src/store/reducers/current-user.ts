import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user-context";

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
        setUser: (_state, action: PayloadAction<User>): User => action.payload,
        clearUser: () => initialState,
    },
});

export const { setUser, clearUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;

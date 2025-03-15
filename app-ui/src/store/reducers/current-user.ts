import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user-model";

let initialState: User | any = null;

const loggedInUserSlice = createSlice({
    name: "loggedInUserSlice",
    initialState,
    reducers: {
        currentUser: (_state, action: PayloadAction<User>) => action.payload,
        logOut: (_state) => {
            sessionStorage.removeItem("user");
            localStorage.removeItem("user");
            return null;
        }
    },
});

export const { currentUser, logOut } = loggedInUserSlice.actions;
export default loggedInUserSlice.reducer;
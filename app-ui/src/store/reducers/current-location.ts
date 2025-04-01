import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLocation } from "../../models/user-context";

const initialState: UserLocation = {
    postCode: "",
    countryCode: "",
    country: "",
    city: ""
}

const currentLocationSlice = createSlice({
    name: "currentLocationSlice",
    initialState,
    reducers: {
        setCurentLocation: (_: any, action: PayloadAction<UserLocation>) => action.payload,
        resetLocation: () => initialState
    },
});

export const { setCurentLocation, resetLocation } = currentLocationSlice.actions;
export default currentLocationSlice.reducer;
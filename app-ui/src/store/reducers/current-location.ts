import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressLocation } from "../../models/user-model";

const initialState: AddressLocation | any = null;

const currentLocationSlice = createSlice({
    name: "currentLocation",
    initialState,
    reducers: {
        setCurrentLocation: (_state, action: PayloadAction<AddressLocation>) => action.payload,
    },
});

export const { setCurrentLocation } = currentLocationSlice.actions;
export default currentLocationSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const currentLocationSlice = createSlice({
    name: "currentTabSlice",
    initialState: {},
    reducers: {
        currentLocation: (_, action: PayloadAction) => action.payload,
    },
});


export const { currentLocation } = currentLocationSlice.actions;
export default currentLocationSlice.reducer;
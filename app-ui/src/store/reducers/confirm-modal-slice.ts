import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfirmModalProps } from "../../models/common";

const initialState: any = {
    title: undefined,
    body: undefined
};

const confirmModal = createSlice({
    name: "confirmModal",
    initialState,
    reducers: {
        openConfirmModal : (_state, action: PayloadAction<ConfirmModalProps>): ConfirmModalProps => action.payload,
        closeConfirmModal : () => initialState,
    },
});

export const { openConfirmModal, closeConfirmModal } = confirmModal.actions;
export default confirmModal.reducer;
import { ReactNode } from "react";

export interface ConfirmModalButtonProps {
    variant?: "flat" | "shadow" | "light" | "solid" | "bordered" | "faded" | "ghost";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    label?: string;
    hide?: boolean;
    callback?: Function;    // Callback should take onClose as parameter
}

export interface ConfirmModalProps {
    show?: boolean;
    title: ReactNode | string;
    body: ReactNode | string;
    type?: string;
    hideDivider?: boolean;
    moveableModal?: boolean;
    cancelBtn?: ConfirmModalButtonProps;
    confirmBtn?: ConfirmModalButtonProps;
}


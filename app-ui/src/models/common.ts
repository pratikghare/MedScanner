import { ReactNode } from "react";


interface ConfirmModalClassNames {
    body?: string;
    header?: string;
    confirmButton?: string;
    cancelButton?: string;
    confirmBtnColor?: "warning" | "default" | "primary" | "secondary" | "success" | "danger" | undefined;
    cancelBtnColor?: "warning" | "default" | "primary" | "secondary" | "success" | "danger" | undefined;
}

export interface ConfirmModalProps {
    header: ReactNode | string;
    body: ReactNode | string;
    onConfirm: Function;
    confirmLabel: string;
    classNames?: ConfirmModalClassNames;
    onClose: Function;
}
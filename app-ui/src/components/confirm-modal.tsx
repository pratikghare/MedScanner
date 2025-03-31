import React, { useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    useDraggable,
    Divider,
} from "@heroui/react";
import { ConfirmModalProps } from "../models/common";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { closeConfirmModal } from "../store/reducers/confirm-modal-slice";


export default function ConfirmModal(props: ConfirmModalProps) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const dispatch = useDispatch<AppDispatch>();

    const targetRef: any = React.useRef(null);
    const { moveProps } = useDraggable({ targetRef, canOverflow: true, isDisabled: !isOpen });

    useEffect(() => onOpen(), []);

    const close = () => {
        dispatch(closeConfirmModal());
        onClose();
    }

    const onModalClose = (callback?: Function) => {
        callback ? callback() : null;
        close();
    }

    return (
        <>
            <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            {
                                props.moveableModal ?
                                    <ModalHeader {...moveProps} className="flex flex-col gap-1">
                                        {props.title}
                                    </ModalHeader> :
                                    <ModalHeader className="flex flex-col gap-1">
                                        {props.title}
                                    </ModalHeader>
                            }
                            {!props.hideDivider && <Divider />}
                            <ModalBody>
                                <div className="min-h-[80px] flex w-full items-center">
                                    {(typeof props.body === "string") ? <p>{props.body}</p> : props.body}
                                </div>
                            </ModalBody>
                            {!props.hideDivider && <Divider />}
                            <ModalFooter>
                                {
                                    !props.cancelBtn?.hide &&
                                    <Button color={props.cancelBtn?.color ? props.cancelBtn.color : "danger"}
                                        variant={props.cancelBtn?.variant ? props.cancelBtn.variant : "light"}
                                        onPress={() => onModalClose(props.cancelBtn?.callback)}
                                    >
                                        {props.cancelBtn?.label ? props.cancelBtn.label : "Cancel"}
                                    </Button>
                                }
                                {
                                    !props.confirmBtn?.hide &&
                                    <Button color={props.confirmBtn?.color ? props.confirmBtn.color : "primary"}
                                        variant={props.confirmBtn?.variant}
                                        onPress={() => onModalClose(props.confirmBtn?.callback)}
                                    >
                                        {props.confirmBtn?.label ? props.confirmBtn.label : "Ok"}
                                    </Button>
                                }
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}


import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Divider,
} from "@heroui/react";
import { ConfirmModalProps } from "../models/common";
import { useEffect } from "react";


export default function ConfirmModal(props: ConfirmModalProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        if(props) onOpen();
    }, [props]);

    return (
        <>
            <Modal
                backdrop="opaque"
                classNames={{
                    body: "py-6",
                    // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    // header: "border-b-[1px] border-[#292f46]",
                    // footer: "border-t-[1px] border-[#292f46]",
                    // closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
                isOpen={isOpen}
                radius="lg"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {
                                    props.header
                                }
                            </ModalHeader>
                            <Divider />
                            <ModalBody>
                                {
                                    props.body
                                }
                            </ModalBody>
                            <Divider />
                            <ModalFooter>
                                <Button color={ props.classNames?.cancelBtnColor ? props.classNames.cancelBtnColor : "default" } variant="light" onPress={() => props.onClose ? props.onClose(onClose) : onClose()}>
                                    Cancel
                                </Button>
                                <Button color={ props.classNames?.confirmBtnColor ? props.classNames.confirmBtnColor : "primary" } className="shadow-lg shadow-indigo-500/20" onPress={() => props.onConfirm(onClose)}>
                                    { props.confirmLabel }
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

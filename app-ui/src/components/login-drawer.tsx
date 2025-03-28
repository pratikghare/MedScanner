import { useEffect, useRef, useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import Login from "../pages/login";
import { LoginType } from "../constants/locale";
import Register from "../pages/register";
import ForgotPassword from "../pages/forgot-password";

export default function LoginDrawer({ setSelected } : { setSelected: Function }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedType, setSelectedType] = useState<LoginType>(LoginType.LOGIN);
    const loginRef = useRef<any>(null);
    const registerRef = useRef<any>(null);

    useEffect(() => {
        onOpen();
    }, []);

    const onSubmit = (onClose: Function) => {
        if(selectedType === LoginType.LOGIN) loginRef.current?.login ? loginRef.current.login(onClose) : null;
        if(selectedType === LoginType.REGISTER) registerRef.current?.register ? registerRef.current.register(onClose) : null;
    }

    const openChange = () => {
        onOpenChange();
        setSelected();
    }

    return (
        <Drawer hideCloseButton backdrop="blur" className="rounded-none sm:rounded-md max-w-[639px] sm:max-w-md transition-ease" isOpen={isOpen} onOpenChange={openChange}>
            <DrawerContent>
                {(onClose) => (
                    <>
                        <DrawerHeader className="flex flex-col gap-1">{selectedType}</DrawerHeader>
                        <DrawerBody>
                            {
                                selectedType === LoginType.LOGIN ? <Login ref={loginRef} setSelectedType={setSelectedType} /> :
                                    selectedType === LoginType.REGISTER ? <Register ref={registerRef} setSelectedType={setSelectedType} /> :
                                        selectedType === LoginType.FORGOT ? <ForgotPassword /> : <></>
                            }
                        </DrawerBody>
                        <DrawerFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            {
                                selectedType && selectedType !== LoginType.FORGOT &&
                                <Button color="primary" onPress={() => onSubmit(onClose)}>
                                    {selectedType === LoginType.LOGIN ? "Sign in" : "Sign up"}
                                </Button>
                            }
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
}
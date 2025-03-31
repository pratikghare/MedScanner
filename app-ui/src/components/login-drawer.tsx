import { useEffect, useRef, useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
    Spinner,
} from "@heroui/react";
import Login from "../pages/login";
import { LoginType } from "../constants/locale";
import Register from "../pages/register";
import ForgotPassword from "../pages/forgot-password";

export default function LoginDrawer({ onDrawerClose } : { onDrawerClose: Function }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
    const [loader, setLoader] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<LoginType>(LoginType.LOGIN);
    const [isFormValidated, setIsFormValidated] = useState<boolean>(false);
    
    const loginRef = useRef<any>(null);
    const registerRef = useRef<any>(null);

    useEffect(() => {
        onOpen();
    }, []);

    const onSubmit = (onClose: Function) => {
        if(selectedType === LoginType.LOGIN) loginRef.current?.login ? loginRef.current.login(onClose) : null;
        if(selectedType === LoginType.REGISTER) registerRef.current?.register ? registerRef.current.register(onClose) : null;
    }

    const onChange = () => {
        onOpenChange();
        onDrawerClose();
    }

    return (
        <Drawer hideCloseButton backdrop="blur" className="rounded-none sm:rounded-md max-w-[639px] sm:max-w-md transition-ease" 
            isOpen={isOpen} onOpenChange={onChange}
            motionProps={{
                variants: {
                    enter: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.3 },
                    },
                    exit: {
                        x: 100,
                        opacity: 0,
                        transition: { duration: 0.3 },
                    },
                },
            }}
        >
            <DrawerContent>
                {(onClose) => (
                    <>
                        <DrawerHeader className="flex flex-col gap-1">{selectedType}</DrawerHeader>
                        <DrawerBody>
                            {
                                selectedType === LoginType.LOGIN ? <Login ref={loginRef} setSelectedType={setSelectedType} setIsFormValidated={setIsFormValidated} setLoader={setLoader} /> :
                                    selectedType === LoginType.REGISTER ? <Register ref={registerRef} setSelectedType={setSelectedType} setIsFormValidated={setIsFormValidated} setLoader={setLoader} /> :
                                        selectedType === LoginType.FORGOT ? <ForgotPassword setSelectedType={setSelectedType} /> : <></>
                            }
                        </DrawerBody>
                        <DrawerFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            {
                                selectedType && selectedType !== LoginType.FORGOT &&
                                <Button color={isFormValidated ? "primary" : "default"} onPress={() => onSubmit(onClose)}
                                    disabled={!isFormValidated || loader} className="min-w-20"
                                >
                                    {   
                                        loader ? <Spinner color="default" size="sm" /> :
                                        selectedType === LoginType.LOGIN ? "Sign in" : "Sign up"
                                    }
                                </Button>
                            }
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
}
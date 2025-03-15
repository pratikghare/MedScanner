import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, useDisclosure, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { ThemeSwitch } from "../components/theme-switch";
import { getUser } from "../services/user-service";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { User } from "../models/user-model";
import { currentUser } from "../store/reducers/current-user";
import { LoginPages, ValidationError, ValidationType } from "../models/navigations-model";
import ForgotPassword from "./forgot-password";
import Login from "./login";
import SignUp from "./signup";

interface LoginData {
    email: string;
    password: string;
    fullName?: string;
    isLocalChecked?: boolean;
}

export default function UserLoginDrawer(props: { isOpen: boolean, onClose: Function, updateTheme: Function }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selected, setSelected] = useState<LoginPages>(LoginPages.login);
    const [data, setData] = useState<LoginData | undefined>();
    const [validationLoader, setValidationLoader] = useState<boolean>(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
    const [validationError, setValidationError] = useState<ValidationError>();
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (close: Function) => {
        setValidationLoader(true);
        if(!data) return;
        if(selected === LoginPages.login) {
            getUser(data.email, data.password).then((user: User) => {
                if(user) {
                    dispatch(currentUser(user));
                    if(data.isLocalChecked) {
                        localStorage.setItem("user", JSON.stringify(user));
                    }
                    sessionStorage.setItem("user", JSON.stringify(user));
                    close();
                }
                else {
                    setValidationError({ type: ValidationType.LOGIN, error: "User ID/Email and Password do not match. Please try again." })
                }
            }).catch((error) => {
                console.log("Validation Error");
                setValidationError({ type: ValidationType.LOGIN, error })
            }).finally(() => {
                setValidationLoader(false);
            })
        }
        else if(selected === LoginPages.signup) {

        }
    }

    useEffect(() => {
        if (props.isOpen) onOpen();
        else setSelected(LoginPages.login);
    }, [props.isOpen]);

    const loginPages: any = {
        login: {
            title: "Log In",
            body: <Login setValidationError={setValidationError} setData={setData} validationError={validationError} validate={setIsSubmitDisabled} setSelected={setSelected} />,
            confirmButtonLabel: "Sign In"
        },
        signup: {
            title: "Sign Up",
            body: <SignUp validationLoader={validationLoader}  setSelected={setSelected} />,
            confirmButtonLabel: "Sign Up"
        },
        forgotPassword: {
            title: "Forgot Password",
            body: <ForgotPassword setSelected={setSelected} />,
            hideFooter: true
        }
    }

    return (
        <Drawer backdrop="blur" className="rounded-none md:rounded-lg" hideCloseButton isOpen={isOpen}
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
            onOpenChange={onOpenChange} onClose={() => props.onClose()}
        >
            <DrawerContent>
                {(onClose) => (
                    <>
                        <DrawerHeader className="flex justify-between gap-1">
                            <span>{loginPages[selected]?.title}</span>
                            <ThemeSwitch updateTheme={props.updateTheme} />
                        </DrawerHeader>
                        <DrawerBody>
                            {loginPages[selected]?.body}
                        </DrawerBody>
                        <DrawerFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            {
                                !loginPages[selected]?.hideFooter &&
                                <Button color="primary" disabled={isSubmitDisabled} className={ isSubmitDisabled ? "grayscale" : "" } onPress={() => { onSubmit(onClose) }}>
                                    {
                                        validationLoader ? <Spinner size="sm" color="default" /> :
                                        loginPages[selected]?.confirmButtonLabel
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
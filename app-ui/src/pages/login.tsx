import { Input, Checkbox, Link, Spinner } from "@heroui/react";
import { MailIcon, LockIcon } from "../components/icons";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { LoginType } from "../constants/locale";
import { setUserStorage } from "../util/storage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setUser } from "../store/reducers/current-user";
import { User } from "../models/user-context";
import { checkUserExist, loginUser } from "../services/user-service";

interface LoginProps {
    setSelectedType: Function;
    setIsFormValidated: Function;
    setLoader: Function;
}

function Login(props: LoginProps, ref: any) {
    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [storeLocally, setStoreLocally] = useState<boolean>(false);
    const [userExist, setUserExist] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const [error, setError] = useState<string| null>(null);
    const dispatch = useDispatch<AppDispatch>();

    useImperativeHandle(ref, () => ({
        login
    }));

    const checkUserExistence = () => {
        if(!userId.length) return;
        setUserExist(false);
        setLoader(true);

        checkUserExist(userId)
            .then((exist: any) => {
                setUserExist(exist);
            })
            .finally(() => {
                setLoader(false);
                setIsChecked(true);
            });
    }

    useEffect(() => {
        setUserExist(false);
        setIsChecked(false);
    }, [userId])

    useEffect(() => {
        if(userExist && userId.length && password.length) props.setIsFormValidated(true);
        else props.setIsFormValidated(false);
    }, [userExist, userId, password])

    const login = (onClose: Function) => {
        props.setLoader(true);
        loginUser(userId, password).then((user: User) => {
            if(user) {
                dispatch(setUser({ ...user, isLoggedIn: true }));
                setUserStorage(userId, storeLocally);
                setTimeout(onClose);
            }
            else setError("Invalid credentials. Please try again.")
        }).finally(() => {
            props.setLoader(false);
        })
    }

    return (
        <>
            <Input
                endContent={
                    loader ? <Spinner size="sm" /> :
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label={isChecked && !userExist ? "Email / User Id does not exist" : "Email / User Id"}
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                onFocusChange={(focus: boolean) => !focus ? checkUserExistence() : null}
                placeholder="Enter your email or user id"
                variant="bordered"
                isInvalid={!userExist && isChecked}
            />
            <div className="flex- flex-col items-center w-full space-y-1">
                <Input
                    endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                />
                <div className={"text-xs text-center text-danger-500 " + ( error ? "" : "invisible" )}>
                    { error ? error : "-" }
                </div>
            </div>

            <div className="flex py-2 px-1 justify-between">
                <Checkbox
                    classNames={{
                        label: "text-small",
                    }}
                    checked={storeLocally}
                    onChange={(event) => setStoreLocally(event.target.checked)}
                >
                    Remember me
                </Checkbox>
                <Link color="primary" className="cursor-pointer hover:underline" onPress={() => props.setSelectedType(LoginType.FORGOT)} size="sm">
                    Forgot password?
                </Link>
            </div>

            <Link color="primary" className="cursor-pointer ml-1 hover:underline" onPress={() => props.setSelectedType(LoginType.REGISTER)} size="sm">
                Not a member. Register here.
            </Link>
        </>
    );
}

export default forwardRef(Login);
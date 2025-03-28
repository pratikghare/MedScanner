import { Input, Checkbox, Link } from "@heroui/react";
import { MailIcon, LockIcon } from "../components/icons";
import { forwardRef, useImperativeHandle, useState } from "react";
import { LoginType } from "../constants/locale";

interface LoginProps {
    setSelectedType: Function;
}

function Login(props: LoginProps, ref: any) {
    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [storeLocally, setStoreLocally] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        login
    }));

    const checkUserExist = () => {
        console.log("USERID: ", userId);
    }

    const login = (onClose: Function) => {
        console.log("LOGIN!!!");
        sessionStorage.setItem("user", "pratik");
    }

    return (
        <>
            <Input
                endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email / User Id"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                onFocusChange={(focus: boolean) => !focus ? checkUserExist() : null}
                placeholder="Enter your email or user id"
                variant="bordered"
            />
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
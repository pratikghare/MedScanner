import { Input, Link } from "@heroui/react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { MailIcon, LockIcon } from "../components/icons";
import { LoginType } from "../constants/locale";

interface RegisterProps {
    setSelectedType: Function;
}

function Register(props: RegisterProps, ref: any) {
    const [firstName, setfirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checkPass, setCheckPass] = useState<string>("");

    useImperativeHandle(ref, () => ({
        register
    }));

    const register = (onClose: Function) => {
        console.log("REGISTER")
    }

    return (
        <>
            <div className="flex space-x-2">
                <Input
                    label="First name"
                    value={firstName}
                    onChange={(event) => setfirstName(event.target.value)}
                    placeholder="First name"
                    variant="bordered"
                />
                <Input
                    label="Last name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder="Last name"
                    variant="bordered"
                />
            </div>
            <Input
                label="User Id"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                placeholder="Choose a user id"
                variant="bordered"
            />
            <Input
                endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
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
            <Input
                endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Re-enter Password"
                value={checkPass}
                onChange={(event) => setCheckPass(event.target.value)}
                placeholder="Re-enter your password"
                type="password"
                variant="bordered"
            />

            <Link color="primary" className="cursor-pointer ml-1 hover:underline" onPress={() => props.setSelectedType(LoginType.LOGIN)} size="sm">
                Already a member? Login here.
            </Link>
        </>
    );
}

export default forwardRef(Register);
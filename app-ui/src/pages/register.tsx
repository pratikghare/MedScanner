import { Input, Link, Spinner, user } from "@heroui/react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { MailIcon, LockIcon } from "../components/icons";
import { LoginType } from "../constants/locale";
import { checkUserEmailExist, checkUserIdExist, registerUser } from "../services/user-service";

interface RegisterProps {
    setSelectedType: Function;
    setIsFormValidated: Function;
    setLoader: Function;
}

const Fields = {
    userId: "userId",
    email: "email"
} as const;
type FieldType = (typeof Fields)[keyof typeof Fields];

function Register(props: RegisterProps, ref: any) {
    const [firstName, setfirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checkPass, setCheckPass] = useState<string>("");

    const [fieldsEmpty, setFieldsEmpty] = useState<boolean>(true);
    const [userIdExist, setUserIdExist] = useState<boolean>(false);
    const [userIdLoader, setUserIdLoader] = useState<boolean>(false);
    const [emailExist, setEmailExist] = useState<boolean>(false);
    const [emailLoader, setEmailLoader] = useState<boolean>(false);
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
    const [reEnterTouched, setReEnterTouched] = useState<boolean>(false);
    const [emailValid, setEmailValid] = useState<boolean>(false);
    const [userIdValid, setUserIdValid] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        register
    }));

    useEffect(() => {
        if (!firstName.length || !lastName.length || !userId.length || !email.length || !password.length || !checkPass.length) setFieldsEmpty(true);
        else setFieldsEmpty(false);
    }, [firstName, lastName, userId, email, password, checkPass]);

    useEffect(() => {
        props.setIsFormValidated(!fieldsEmpty && !userIdExist && !emailExist && checkPass === password && emailValid && userIdValid);
    }, [fieldsEmpty, userIdExist, emailExist, emailValid, userIdValid, checkPass, password]);

    const register = () => {
        console.log("REGISTER")
        props.setLoader(true);
        registerUser(firstName + " " + lastName, firstName[0] + lastName[0], email, userId, password).then(() => {
            props.setSelectedType(LoginType.LOGIN)
        }).finally(() => props.setLoader(false));
    }
    const checkExist = (type: FieldType) => {
        if(type === Fields.email) {
            setEmailLoader(true);
            checkUserEmailExist(email).then((exist: boolean) => {
                setEmailLoader(false);
                setEmailExist(exist);
                setEmailValid(!exist);
            })
        }
        else if(type === Fields.userId) {
            setUserIdLoader(true);
            checkUserIdExist(userId).then((exist: boolean) => {
                setUserIdLoader(false);
                setUserIdExist(exist);
                setUserIdValid(!exist);
            })
        }
    }
    useEffect(() => {
        if(checkPass === password) setPasswordMatch(true);
    }, [checkPass]);
    useEffect(() => {
        setEmailValid(false);
    }, [email]);
    useEffect(() => {
        setUserIdValid(false);
    }, [userId]);

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
                label={userIdExist ? "User Id already exist" : "User Id"}
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                onFocusChange={(focus: boolean) => !focus && checkExist(Fields.userId)}
                placeholder="Choose a user id"
                variant="bordered"
                isInvalid={userIdExist}
                endContent={
                    userIdLoader && <Spinner size="sm" />
                }
            />
            <Input
                endContent={
                    emailLoader ? <Spinner size="sm" /> :
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label={emailExist ? "Email already registered" : "Email"}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onFocusChange={(focus: boolean) => !focus && checkExist(Fields.email)}
                placeholder="Enter your email"
                variant="bordered"
                isInvalid={emailExist}
            />
            <Input
                endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onFocusChange={(focus: boolean) => !focus && setPasswordMatch(checkPass === password)}
                placeholder="Enter your password"
                type="password"
                variant="bordered"
            />
            <Input
                endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label={!reEnterTouched || passwordMatch ? "Re-enter Password" : "Passwords do not match"}
                value={checkPass}
                onChange={(event) => setCheckPass(event.target.value)}
                onFocusChange={(focus: boolean) => {
                    setReEnterTouched(true);
                    !focus && setPasswordMatch(checkPass === password)
                }}
                placeholder="Re-enter your password"
                type="password"
                variant="bordered"
                isInvalid={!passwordMatch && reEnterTouched}
            />

            <Link color="primary" className="cursor-pointer ml-1 hover:underline" onPress={() => props.setSelectedType(LoginType.LOGIN)} size="sm">
                Already a member? Login here.
            </Link>
        </>
    );
}

export default forwardRef(Register);
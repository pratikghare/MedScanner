import { Input, Checkbox, Link, Button, InputOtp, Spinner } from "@heroui/react";
import { MailIcon, LockIcon } from "../components/icons";
import { useEffect, useState } from "react";
import { isUserPresent } from "../services/user-service";
import { ValidationError, ValidationType, LoginPages } from "../models/navigations-model";


export default function Login(props: { setSelected: Function, validationLoader: boolean, validate: Function, setData: Function, validationError?: ValidationError, setValidationError: Function }) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLocalChecked, setIsLocalChecked] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<ValidationError>();
    const [validationLoaders, setValidationLoaders] = useState<Set<ValidationType>>(new Set());


    const validateFields = (type: ValidationType) => {
        const loaders: Set<ValidationType> = new Set(validationLoaders);
        loaders.add(type);
        setValidationLoaders(loaders);
        
        if(email.length > 0) {
            isUserPresent(email).then((data: any) => {
                if(!data) {
                    setValidationError({ type, error: "The User ID or Email Address does not exist." });
                }
                else setValidationError(undefined);
                loaders.delete(type);
                setValidationLoaders(new Set(loaders));
            })
        }
        else {
            setValidationError({ type, error: "‎" });
            loaders.delete(type);
            setValidationLoaders(new Set(loaders));
        }
    }

    useEffect(() => {
        if(validationError?.type === ValidationType.LOGIN) {
            setValidationError(undefined);
            props.setValidationError(undefined);
        }
    }, [password])

    useEffect(() => {
        props.validate(email.length === 0 || password.length === 0 || validationError !== undefined);
        // console.log("{ email, password, isLocalChecked }", { email, password, isLocalChecked })
        props.setData({ email, password, isLocalChecked });
    }, [email, password, validationError, isLocalChecked])

    useEffect(() => {
        setValidationError(props.validationError);
    }, [props.validationError])
    
    
    return (
        <>
            <Input
                endContent={
                    validationLoaders.has(ValidationType.EMAIL) ?
                    <Spinner size="sm" color="primary" /> :
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                required
                label="User ID or Email"
                value={email}
                isInvalid={validationError?.type === ValidationType.EMAIL}
                validate={() => validationError?.type === ValidationType.EMAIL ? validationError?.error : null}
                onChange={(event) => setEmail(event.target.value)}
                onFocusChange={(focus: boolean) => focus ? null : validateFields(ValidationType.EMAIL)}
                placeholder="Enter User ID or Email"
                variant="bordered"
            />
            <p className={"text-danger-500 text-xs -m-2 ml-1 mb-1 " + (validationError?.type === ValidationType.EMAIL ? "" : "invisible")}>
                { validationError?.type === ValidationType.EMAIL ? validationError.error : "-"}
            </p>
            <Input
                endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                required
                label="Password"
                defaultValue=""
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
                    checked={isLocalChecked}
                    onChange={(event) => setIsLocalChecked(event.target.checked)}
                >
                    Remember me
                </Checkbox>
                <Link className="cursor-pointer hover:underline" color="primary" size="sm" onPress={() => props.setSelected(LoginPages.forgotPassword)}>
                    Forgot password?
                </Link>
            </div>
            <Link className="cursor-pointer ml-1 hover:underline" color="foreground" size="sm" onPress={() => props.setSelected(LoginPages.signup)}>
                Not a member? Register here.
            </Link>
            <p className={"text-danger-500 text-xs -m-2 ml-1 mb-1 " + (validationError?.type === ValidationType.LOGIN ? "" : "invisible")}>
                { validationError?.type === ValidationType.LOGIN ? validationError.error : "-"}
            </p>
        </>
    );
}
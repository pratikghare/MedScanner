import { Button, Input, InputOtp, Link, Spinner } from "@heroui/react";
import { useState, useEffect } from "react";
import { MailIcon } from "../components/icons";
import { LoginType } from "../constants/locale";

export default function ForgotPassword(props: { setSelectedType: Function }) {
    const [emailId, setEmailId] = useState<string>("");
    const [isEmailValidated, setIsEmailValidated] = useState<boolean>(false);
    // const [isOTPValidated, setIsOTPValidated] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [generateCount, setGenerateCount] = useState<number>(0);

    useEffect(() => {
        if (counter > 0) {
            setTimeout(() => {
                setCounter(counter - 1);
            }, 1000)
        }
    }, [counter])

    const getOTP = () => {
        setLoader(true);
        setTimeout(() => {
            setGenerateCount(generateCount+1);
            setIsEmailValidated(true);
            setLoader(false);
            setCounter(10);
        }, 3000);
    }

    const validateOTP = () => {
        props.setSelectedType(LoginType.LOGIN);
    }

    return (
        <div className="mt-5 grid">
            {
                !isEmailValidated ?
                    <Input
                        endContent={
                            loader ? <Spinner size="sm" color="primary" /> :
                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        value={emailId}
                        onChange={(event) => setEmailId(event.target.value)}
                        label="Email"
                        placeholder="Enter your email"
                        variant="bordered"
                    /> :
                    <div className="flex flex-col items-center justify-start w-full">
                        <InputOtp
                            className="justify-self-center"
                            size="lg"
                            isRequired
                            aria-label="OTP input field"
                            length={4}
                            name="otp"
                            placeholder="Enter code"
                        />
                        <Link isDisabled={counter > 0 || loader || generateCount > 3} className={"cursor-pointer text-xs ml-1 hover:underline h-[20px] "+ (generateCount > 3 ? "invisible" : "")} color="primary" size="sm" onPress={getOTP} >
                            { counter > 0 ? `You can generate new OTP in ${counter} seconds.` : loader ? "Generating " : "Generate OTP"}
                            {<Spinner size="sm" className={"ml-2 " + (loader ? "" : "hidden")} variant="dots" />}
                        </Link>
                    </div>
            }

            <Button color="primary" className="mt-4 justify-self-center" onPress={!isEmailValidated ? getOTP : validateOTP}>
                {!isEmailValidated ? "Get" : "Submit"} OTP
            </Button>
        </div>
    );
}
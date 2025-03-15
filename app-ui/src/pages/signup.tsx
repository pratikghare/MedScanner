import { Input, Link } from "@heroui/react";
import { MailIcon, LockIcon } from "../components/icons";
import { LoginPages } from "../models/navigations-model";

export default function SignUp(props: { setSelected: Function, validationLoader: boolean }) {
    return (
        <>
            <Input
                label="Name"
                required
                placeholder="Enter your full name"
                variant="bordered"
            />
            <Input
                label="User ID"
                required
                placeholder="Enter a User ID"
                variant="bordered"
            />
            <Input
                endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                required
                placeholder="Enter your Email"
                variant="bordered"
            />
            <Input
                endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                required
                placeholder="Enter your Password"
                type="password"
                variant="bordered"
            />
            <Input
                endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                required
                placeholder="Re-enter your Password"
                type="password"
                variant="bordered"
            />
            <Link className="cursor-pointer ml-1 hover:underline" color="primary" size="sm" onPress={() => props.setSelected(LoginPages.login)}>
                Login instead
            </Link>
        </>
    );
}
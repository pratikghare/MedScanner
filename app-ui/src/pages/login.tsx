import { Drawer, DrawerContent, DrawerHeader, DrawerBody, Input, Checkbox, DrawerFooter, Button, useDisclosure, Link } from "@heroui/react";
import { MailIcon, LockIcon } from "../components/icons";
import { useEffect } from "react";

export default function Login(props: { isOpen: boolean, onClose: Function }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        if(props.isOpen) onOpen();
    }, [props.isOpen]);

    return (
        <Drawer backdrop="blur" hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange} onClose={() => props.onClose()}>
            <DrawerContent>
                {(onClose) => (
                    <>
                        <DrawerHeader className="flex flex-col gap-1">Log in</DrawerHeader>
                        <DrawerBody>
                            <Input
                                endContent={
                                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Email"
                                placeholder="Enter your email"
                                variant="bordered"
                            />
                            <Input
                                endContent={
                                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                variant="bordered"
                            />
                            <div className="flex py-2 px-1 justify-between">
                                <Checkbox
                                    classNames={{
                                        label: "text-small",
                                    }}
                                >
                                    Remember me
                                </Checkbox>
                                <Link color="primary" href="#" size="sm">
                                    Forgot password?
                                </Link>
                            </div>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Sign in
                            </Button>
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
}
import { Card, CardHeader, Divider, CardFooter, User, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { ActivityIcon, CalendarDateRangeIcon, ChatBubbleTextIcon, ChevronDown, ChevronRight, ComputerMonitorIcon, DoubleChatBubbleIcon, MoonFilledIcon, PowerIcon, SunFilledIcon } from "../components/icons";
import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "@heroui/use-theme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { User as UserModel } from "../models/user-model"
import { NO_IMAGE } from "../constants/locale";
import ConfirmModal from "../components/confirm-modal";
import { ConfirmModalProps } from "../models/common";
import { logOut } from "../store/reducers/current-user";

interface CardItemProps {
    setSelected: Function;
    selected?: string;
    keyId: string;
    header: ReactNode;
    footerText: string;
    theme?: string;
    className?: string;
    footer?: ReactNode;
    disabled?: boolean;
}

const CardItem = (props: CardItemProps) => {
    const updateSelected = () => {
        if (props.keyId === "logout") props.setSelected(ModalType.logout);
        else props.selected === props.keyId ? props.setSelected("") : props.setSelected(props.keyId);
    }

    return (
        <div className={"min-w-[163px] " + (props.className ? props.className : "")}>
            <Card isDisabled={props.disabled} className="w-full flex flex-col" classNames={{ footer: "p-0" }}>
                <CardHeader className="flex gap-3 flex-1">
                    {props.header}
                </CardHeader>
                <Divider />
                <CardFooter className={"hover:bg-opacity-5 " + (props.theme === "light" ? "hover:bg-black" : "hover:bg-white")}>
                    {
                        props.footer ? props.footer :
                            <button className="w-full h-full flex justify-between text-xs p-3" disabled={props.disabled} onClick={updateSelected}>
                                <span>{props.footerText}</span>
                                {props.selected === props.keyId ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                            </button>
                    }
                </CardFooter>
            </Card>
        </div>
    );
}

enum ModalType {
    logout
}

export default function Account(props: { callback: Function }) {
    const { theme, setTheme } = useTheme();
    const [selected, setSelected] = useState<string>("");
    const loggedInUser: UserModel | null = useSelector((state: RootState) => state.loggedInUser);
    const [modalProps, setModalProps] = useState<ConfirmModalProps>();
    const dispatch = useDispatch<AppDispatch>();

    const changeTheme = (theme: string) => {
        setTheme(theme);
    }

    const updateModal = (type: ModalType) => {
        if(type === ModalType.logout) {
            setModalProps({
                header: "Logout",
                body: "Are you sure you want to log out?",
                onConfirm: logout,
                confirmLabel: "Yes",
                onClose: () => setModalProps(undefined),
                classNames: { confirmBtnColor: "danger", cancelBtnColor: undefined }
            });
        }
    }
    

    const logout = (callback: Function) => {
        dispatch(logOut());
        callback();
    }

    useEffect(() => {
        props.callback(theme);
    }, [theme])

    return (
        <section className="grid mt-5 mx-[5%] sm:mx-[5%] lg:mx-[20%] cursor-default">
            <div className="mb-4 flex w-full">
                <CardItem
                    selected={selected} setSelected={setSelected}
                    keyId="profile"
                    className={"flex-1 sm:flex-auto z-50 " + (selected === "profile" ? "active" : selected == "" ? "" : "hidden")}
                    header={
                        <User
                            avatarProps={{
                                isBordered: true,
                                showFallback: true,
                                radius: "md",
                                src: `${loggedInUser?.image ? loggedInUser.image : NO_IMAGE}`,
                                name: `${loggedInUser?.initials ? loggedInUser.initials : "-"}`
                            }}
                            classNames={{ base: "gap-3", name: "ml-[2px]" }}
                            description={`@${loggedInUser?.userId}`}
                            name={loggedInUser?.name}
                        />
                    }
                    footerText={"Your Profile"} theme={theme}
                />
            </div>

            {
                selected === "profile" &&
                <div className="mb-4 flex w-full">
                    SELECTED {selected}
                </div>
            }

            <div className="account-grid transition-ease">
                <CardItem className={selected === "orders" ? "active" : (selected == "" || selected == "profile") ? "" : "hidden"} selected={selected} setSelected={setSelected} keyId={"orders"} header={<CalendarDateRangeIcon />} footerText={"Orders"} theme={theme} />
                <CardItem disabled className={selected === "reviews" ? "active" : (selected == "" || selected == "profile") ? "grayscale" : "hidden"} selected={selected} setSelected={setSelected} keyId={"reviews"} header={<DoubleChatBubbleIcon />} footerText={"Reviews"} theme={theme} />
                <CardItem className={selected === "theme" ? "active" : (selected == "" || selected == "profile") ? "" : "hidden"} selected={selected} setSelected={setSelected} keyId={"theme"} header={
                    theme == "system" ? <ComputerMonitorIcon />
                        : theme === "light" ? <SunFilledIcon /> : <MoonFilledIcon />
                }
                    footerText={"Appearance"} theme={theme}
                    footer={
                        <Dropdown backdrop="blur">
                            <DropdownTrigger>
                                <button className="p-3 w-full h-full flex justify-between text-xs">
                                    <span>Appearance</span>
                                    <ChevronRight className="size-4" />
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Theme Select" variant="faded">
                                {/* <DropdownItem key="system" textValue="system" onPress={() => changeTheme("system")} classNames={{ title: "flex gap-3 items-center" }}>
                                    <ComputerMonitorIcon className="size-6" />
                                    <span>System</span>
                                </DropdownItem> */}
                                <DropdownItem key="light" textValue="light" onPress={() => changeTheme("light")} classNames={{ title: "flex gap-3 items-center" }}>
                                    <SunFilledIcon size={22} />
                                    <span className="ml-[2px]">Light</span>
                                </DropdownItem>
                                <DropdownItem key="dark" textValue="dark" onPress={() => changeTheme("dark")} classNames={{ title: "flex gap-3 items-center" }}>
                                    <MoonFilledIcon size={22} />
                                    <span className="ml-[2px]">Dark</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    }
                />
                <CardItem className={selected === "activity" ? "active" : (selected == "" || selected == "profile") ? "" : "hidden"} selected={selected}
                    setSelected={setSelected} keyId={"activity"} header={<ActivityIcon />} footerText={"Activity"} theme={theme}
                />
                <CardItem className={selected === "feedback" ? "active" : (selected == "" || selected == "profile") ? "" : "hidden"} selected={selected}
                    setSelected={setSelected} keyId={"feedback"} header={<ChatBubbleTextIcon />} footerText={"Feedback"} theme={theme}
                />
                <CardItem className={selected === "logout" ? "active" : (selected == "" || selected == "profile") ? "" : "hidden"} selected={selected}
                    setSelected={updateModal} keyId={"logout"} header={<PowerIcon />} footerText={"Logout"} theme={theme}
                />
            </div>

            {
                selected !== "profile" && selected.length > 0 &&
                <div className="mb-4 flex w-full">
                    SELECTED {selected}
                </div>
            }
            {
                modalProps &&
                <ConfirmModal onClose={modalProps.onClose} classNames={modalProps.classNames} header={modalProps.header} body={modalProps.body} onConfirm={modalProps.onConfirm} confirmLabel={modalProps.confirmLabel} />
            }
        </section>
    );
}
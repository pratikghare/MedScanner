import { Card, CardHeader, Divider, CardFooter, User, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, } from "@heroui/react";
import { ActivityIcon, CalendarDateRangeIcon, ChevronDown, ChevronRight, ComputerMonitorIcon, DoubleChatBubbleIcon, MoonFilledIcon, SunFilledIcon } from "../components/icons";
import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "@heroui/use-theme";


const CardItem = (props: { setSelected: Function, selected?: string, keyId: string, header: ReactNode, footerText: string, theme?: string, className?: string, footer?: ReactNode }) => {
    const updateSelected = () => {
        if(props.keyId === "logout") return;
        props.selected === props.keyId ? props.setSelected("") : props.setSelected(props.keyId);
    }

    return (
        <div className={"min-w-[163px] " + (props.className ? props.className : "")}>
            <Card className="w-full flex flex-col">
                <CardHeader className="flex gap-3 flex-1">
                    {props.header}
                </CardHeader>
                <Divider />
                <CardFooter className={"hover:bg-opacity-5 " + (props.theme === "light" ? "hover:bg-black" : "hover:bg-white")}>
                    {
                        props.footer ? props.footer :
                            <button className="w-full h-full flex justify-between text-xs" onClick={updateSelected}>
                                <span>{props.footerText}</span>
                                { props.selected === props.keyId ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                            </button>
                    }
                </CardFooter>
            </Card>
        </div>
    );
}

export default function Account() {
    const { theme, setTheme } = useTheme();
    const [selected, setSelected] = useState<string>("");

    const changeTheme = (theme: string) => {
        setTheme(theme);
    }

    useEffect(() => {
        console.log("SELECTED: ", selected)
    }, [selected])

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
                                radius: "md",
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                name: "PG"
                            }}
                            classNames={{ base: "gap-3", name: "ml-[2px]" }}
                            description="@pratikghare_"
                            name="Pratik Ghare"
                        />
                    }
                    footerText={"Your Profile"} theme={theme}
                />
            </div>

            {
                selected === "profile" &&
                <div className="mb-4 flex w-full">
                    SELECTED { selected }
                </div>
            }

            <div className="account-grid transition-ease">
                <CardItem className={selected === "orders" ? "active" : (selected == "" || selected == "profile") ? "" : "hidden"} selected={selected} setSelected={setSelected} keyId={"orders"} header={<CalendarDateRangeIcon />} footerText={"Orders"} theme={theme} />
                <CardItem className={selected === "reviews" ? "active" : (selected == "" || selected == "profile") ? "" : "hidden"} selected={selected} setSelected={setSelected} keyId={"reviews"} header={<DoubleChatBubbleIcon />} footerText={"Reviews"} theme={theme} />
                <CardItem className={selected === "theme" ? "active" : (selected == "" || selected == "profile") ? "" : "hidden"} selected={selected} setSelected={setSelected} keyId={"theme"} header={
                    theme == "system" ? <ComputerMonitorIcon />
                    : theme === "light" ? <SunFilledIcon /> : <MoonFilledIcon />
                }
                    footerText={"Appearance"} theme={theme}
                    footer={
                        <Dropdown backdrop="blur">
                            <DropdownTrigger>
                                <button className="w-full h-full flex justify-between text-xs">
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
                <CardItem className={selected === "activity" ? "active" : (selected == "" || selected == "profile") ? "" : "hidden"} selected={selected} setSelected={setSelected} keyId={"activity"} header={<ActivityIcon />} footerText={"Activity"} theme={theme} />
                <CardItem className={selected === "feedback" ? "active" : (selected == "" || selected == "profile") ? "" : "hidden"} selected={selected} setSelected={setSelected} keyId={"feedback"} header={<ActivityIcon />} footerText={"Feedback"} theme={theme} />
                <CardItem className={selected === "logout" ? "active" : (selected == "" || selected == "profile") ? "" : "hidden"} selected={selected} setSelected={setSelected} keyId={"logout"} header={<ActivityIcon />} footerText={"Logout"} theme={theme} />
            </div>

            {
                selected !== "profile" && selected.length > 0 &&
                <div className="mb-4 flex w-full">
                    SELECTED { selected }
                </div>
            }
        </section>
    );
}
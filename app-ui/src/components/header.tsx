import { ReactNode, useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    User,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    DropdownSection,
    NumberInput,
    PopoverContent,
    Popover,
    PopoverTrigger,
    Spinner,
} from "@heroui/react";
import { APP_NAME } from "../constants/locale";
import { ThemeSwitch } from "./theme-switch";
import useGeoLocation from "../hooks/useGeoLocation";
import { LocationIcon } from "./icons";
import { getGeoLocationDetails, getLocationByAddress } from "../services/LocationService";
import { useNavigate } from "react-router";

export const AppLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

const CurrentLocation = (props: { text?: string }) => {
    return (
        <span className="flex items-center">
            <LocationIcon className="size-4 mr-1" /> {props.text ? props.text : "Enable Permissions"}
        </span>
    );
}

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [profileSub, setProfileSub] = useState<ReactNode>();
    const position = useGeoLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
        if (position) {
            getGeoLocationDetails(position.latitude, position.longitude).then(data => {
                setProfileSub(<CurrentLocation text={`${data.city} (${data.postcode})`} />)
            })
        }
        else setProfileSub(<CurrentLocation />);
    }, [position])
    
    const onInputChange = (event: any) => {
        const term: string = event.target.value ? String(event.target.value).split(",").join("") : "";
        if(event.key === "Enter") {
            setLoader(true);
            if(term.length > 2) {
                getLocationByAddress(term).then((data: any) => {
                    console.log(data);
                    setProfileSub(<CurrentLocation text={`${data.city ? data.city : data.county ? data.county : data.state} (${data.postcode})`} />)
                }).finally(() => {
                    setIsOpen(false);
                    setLoader(false);
                })
            }
            else {
                setIsOpen(false);
                setLoader(false);
            }
        }
    }

    const logOut = () => {
        setIsLoggedIn(false);
    }

    return (
        <Navbar classNames={{ wrapper: "" }}>
            <NavbarContent className="">
                <NavbarBrand onClick={() => navigate("/")} className="cursor-pointer">
                    <AppLogo />
                    <p className="font-bold text-inherit">{APP_NAME}</p>
                </NavbarBrand>
            </NavbarContent>


            <NavbarContent justify="end" className="hidden">
                {
                    isLoggedIn ?
                        <NavbarItem aria-labelledby="User Icon" className="lg:flex -mb-1">
                            <Dropdown placement="bottom-start">
                                <DropdownTrigger>
                                    <User
                                        as="button"
                                        avatarProps={{
                                            isBordered: true,
                                            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                                        }}
                                        className="transition-transform"
                                        description={profileSub}
                                        name={<span className="ml-[3px]">Good Morning Pratik!</span>}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="User Actions" variant="flat">
                                    <DropdownSection showDivider>
                                        <DropdownItem key="profile" textValue="profile" className="h-14 gap-2">
                                            <p className="font-bold">Signed in as</p>
                                            <p className="font-bold">@pratikghare</p>
                                        </DropdownItem>
                                    </DropdownSection>
                                    <DropdownSection showDivider>
                                        <DropdownItem key="settings" textValue="settings">My Settings</DropdownItem>
                                        <DropdownItem key="team_settings" textValue="team_settings">Team Settings</DropdownItem>
                                        <DropdownItem key="analytics" textValue="analytics">Analytics</DropdownItem>
                                        <DropdownItem key="system" textValue="system">System</DropdownItem>
                                        <DropdownItem key="configurations" textValue="configurations">Configurations</DropdownItem>
                                        <DropdownItem key="help_and_feedback" textValue="help_and_feedback">Help & Feedback</DropdownItem>
                                    </DropdownSection>

                                    <DropdownSection>
                                        <DropdownItem key="logout" color="danger" onPress={logOut}>
                                            Log Out
                                        </DropdownItem>
                                    </DropdownSection>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarItem> :
                        <>
                            <NavbarItem>
                                <Button as={Link} color="primary" href="#" variant="flat">
                                    Login
                                </Button>
                            </NavbarItem>
                        </>
                }

                <NavbarItem className="">
                    <ThemeSwitch />
                </NavbarItem>

            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Popover
                        isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}
                        showArrow
                        backdrop="blur"
                        classNames={{
                            base: [
                                // arrow color
                                "before:bg-default-200",
                            ],
                            content: [
                                "max-w-[200px] px-2 border border-default-200",
                                "bg-gradient-to-br from-white to-default-300",
                                "dark:from-default-100 dark:to-default-50",
                            ],
                        }}
                        placement="right"
                    >
                        <PopoverTrigger>
                            <Button className="capitalize flex" color="default" variant="light">
                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-sm">{"Other"}</span>
                                    <span className="text-xs flex">
                                        <span>{profileSub}</span>
                                    </span>
                                </div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-1 py-2 w-full">
                                <p className="text-xs font-bold text-foreground">
                                    Enter location manually
                                </p>
                                <div className="mt-2 flex flex-col gap-2 w-full">
                                    <NumberInput aria-labelledby="location popover input" 
                                        autoFocus size="sm" variant="bordered" hideStepper 
                                        onKeyUp={onInputChange} 
                                        classNames={{ inputWrapper: loader ? "" : "pr-0" }}
                                        // endContent={<Spinner className={loader ? "visible" : "invisible"} size="sm" color="primary" />}
                                        endContent={
                                            loader ? <Spinner size="sm" color="primary" /> : 
                                            <Button variant="light" className="text-red-500" isIconOnly><LocationIcon /></Button>
                                        }
                                    />
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </NavbarItem>

                <NavbarItem className="">
                    <ThemeSwitch />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}


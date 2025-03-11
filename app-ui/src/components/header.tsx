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
} from "@heroui/react";
import { APP_NAME } from "../constants/locale";
import { ThemeSwitch } from "./theme-switch";
import useGeoLocation from "../hooks/useGeoLocation";
import { LocationIcon } from "./icons";
import { getGeoLocationDetails } from "../services/LocationService";
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
            <LocationIcon className="size-4 mr-1" /> { props.text ? props.text : "Current Location" }
        </span>
    );
}

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [profileSub, setProfileSub] = useState<ReactNode>();
    const position = useGeoLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(position) {
            getGeoLocationDetails(position.latitude, position.longitude).then(data => {
                setProfileSub(<CurrentLocation text={`${data.city} (${data.postcode})`} />)
            })
        }
        else setProfileSub(<CurrentLocation />);
    }, [position])

    const logOut = () => {
        setIsLoggedIn(false);
    }

    return (
        <Navbar classNames={{ wrapper: "justify-center sm:justify-between" }}>
            <NavbarContent className="justify-center sm:justify-start">
                <NavbarBrand onClick={() => navigate("/")} className="cursor-pointer justify-center sm:justify-start">
                    <AppLogo />
                    <p className="font-bold text-inherit">{APP_NAME}</p>
                </NavbarBrand>
            </NavbarContent>

            
            <NavbarContent justify="end" className="hidden sm:flex">
                {
                    isLoggedIn ?
                        <NavbarItem className="lg:flex -mb-1">
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
        </Navbar>
    );
}


import { CalendarDateRangeIcon, ChatBubbleBottomCenterTextIcon, ChatBubbleLeftRightIcon, ChevronDownIcon, ChevronRightIcon, PowerIcon, PresentationChartLineIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, Divider, CardFooter, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@heroui/react";
import { ReactNode, useState } from "react";
import { SunFilledIcon, MoonFilledIcon } from "../components/icons";
import { ComputerDesktopIcon } from "@heroicons/react/20/solid";
import { currentUserSelector, themeSelector } from "../store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { User as UserType } from "../models/user-context";
import { NO_IMAGE, Theme, Themes } from "../constants/locale";
import { AppDispatch } from "../store/store";
import { setTheme as setReducerTheme } from "../store/reducers/theme";
import { clearUser } from "../store/reducers/current-user";
import { setStorageTheme } from "../util/storage";
import { openConfirmModal } from "../store/reducers/confirm-modal-slice";

type CardType = (typeof AccountCardType)[keyof typeof AccountCardType];

interface ICardItem {
    type: CardType;
    header: ReactNode | string;
    footer: ReactNode | string;
    className?: string;
    disabled?: boolean;
    callback: Function;
    active?: boolean;
    theme?: string;
}

const AccountCardType = {
    profile: "profile",
    orders: "orders",
    reviews: "reviews",
    appearance: "appearance",
    activity: "activity",
    feedback: "feedback",
    logout: "logout"
} as const;

const CardItem = (props: ICardItem) => {
    const callback = () => {
        props.callback ? props.callback(props.type) : null;
    }

    const isText: boolean = typeof(props.footer) === "string";
    const disabled = props.disabled ? props.disabled : false;

    return (
        <div className={"max-card-width " + (props.className ? props.className : "")}>
            <Card isDisabled={props.disabled ? props.disabled : false} className="w-full h-full flex flex-col" classNames={{ footer: "p-0" }}>
                <CardHeader className="flex gap-3 flex-1">
                    {props.header}
                </CardHeader>
                <Divider />
                <CardFooter className={"hover:bg-opacity-5 " + (!disabled ? (props.theme === "dark" ? "hover:bg-white" : "hover:bg-black") : "")}>
                    {
                        !isText ? props.footer :
                            <button className={"w-full h-full flex justify-between text-xs p-3 " + (disabled ? "cursor-not-allowed" : "")} disabled={disabled} onClick={callback}>
                                <span>{props.footer}</span>
                                {props.active ? <ChevronDownIcon className="size-4" /> : <ChevronRightIcon className="size-4" />}
                            </button>
                    }
                </CardFooter>
            </Card>
        </div>
    );
}


export default function Account() {
    const [selectedCard, setSelectedCard] = useState<CardType | null>();

    const loggedInUser: UserType  = useSelector(currentUserSelector);
    const theme = useSelector(themeSelector);
    const dispatch = useDispatch<AppDispatch>();

    const updateSelected = (updated: CardType) => {
        if(updated === selectedCard) setSelectedCard(null);
        else setSelectedCard(updated);
    }
    
    const onConfirmLogout = () => dispatch(clearUser());
    
    const logout = (_: CardType) => {
        console.log("LOGOUT", _)

        dispatch(openConfirmModal({
            title: "Logout",
            show: true,
            body: "Are you sure you want to Logout",
            confirmBtn: {
                label: "Logout",
                color: "danger",
                callback: onConfirmLogout
            },
            cancelBtn: {
                color: "default"
            }
        }));
    }

    const updateTheme = (theme: Theme) => {
        dispatch(setReducerTheme(theme));
        setStorageTheme(theme);
        window.location.reload();
    }

    const Avatar = () => {
        return (
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
        );
    }
    
    const themeIcons: any = {
        dark: <MoonFilledIcon size={24} />,
        light: <SunFilledIcon size={24} />,
        system: <ComputerDesktopIcon className="size-6" />
    }

    const ThemeDropDown = () => (
        <Dropdown backdrop="blur">
            <DropdownTrigger>
                <button className="p-3 text-xs w-full h-full flex justify-between items-center">
                    <span>Appearance</span>
                    <ChevronRightIcon className="size-4" />
                </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Theme Select" variant="faded">
                <DropdownItem key="system" textValue="system" onPress={() => updateTheme(Themes.system)} classNames={{ title: "flex gap-3 items-center ml-[1px]" }}>
                    <ComputerDesktopIcon className="size-5" />
                    <span>System</span>
                </DropdownItem>
                <DropdownItem key="light" textValue="light" onPress={() => updateTheme(Themes.light)} classNames={{ title: "flex gap-3 items-center" }}>
                    <SunFilledIcon size={22} />
                    <span>Light</span>
                </DropdownItem>
                <DropdownItem key="dark" textValue="dark" onPress={() => updateTheme(Themes.dark)} classNames={{ title: "flex gap-3 items-center" }}>
                    <MoonFilledIcon size={22} />
                    <span>Dark</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );

    const cards: Array<ICardItem> = [
        {
            type: AccountCardType.profile,
            header: <Avatar />,
            footer: "Your Profile",
            callback: updateSelected,
            className: "active"
        },
        {
            type: AccountCardType.orders,
            header: <CalendarDateRangeIcon className="size-6" />,
            footer: "Orders",
            callback: updateSelected,
            disabled: true
        },
        {
            type: AccountCardType.reviews,
            header: <ChatBubbleLeftRightIcon className="size-6" />,
            footer: "Reviews",
            callback: updateSelected,
            disabled: true
        },
        {
            type: AccountCardType.appearance,
            header: themeIcons[theme.theme],
            footer: <ThemeDropDown />,
            callback: updateSelected
        },
        {
            type: AccountCardType.activity,
            header: <PresentationChartLineIcon className="size-6" />,
            footer: "Activity",
            callback: updateSelected,
            disabled: true
        },
        {
            type: AccountCardType.feedback,
            header: <ChatBubbleBottomCenterTextIcon className="size-6" />,
            footer: "Feedback",
            callback: updateSelected,
            disabled: true
        },
        {
            type: AccountCardType.logout,
            header: <PowerIcon className="size-6" />,
            footer: "Logout",
            callback: logout
        },
    ]

    return (
        <section className="account-grid transition-ease mt-3">
            {
                cards.map((card: ICardItem, index: number) => (
                    <CardItem key={card.type + "-" + index} className={card.className} active={selectedCard === card.type} theme={theme.current}
                        type={card.type} header={card.header} footer={card.footer} callback={card.callback} disabled={card.disabled}
                    />
                ))
            }
        </section>
    );
}

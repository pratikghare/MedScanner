import { Avatar } from "@heroui/react";
import { CartIcon, HomeIcon, LocationIcon } from "../components/icons";
import { NavigationKeys, NavigationTab } from "../models/navigations-model";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { User } from "../models/user-model";
import { NO_IMAGE } from "./locale";


export default function NavigationTitle(props: { keyId: NavigationKeys, title: string }) {
    const loggedInUser: User | null = useSelector((state: RootState) => state.loggedInUser);
    return (
        <div className="flex items-center space-x-2">
            {
                props.keyId === NavigationKeys.home ? <HomeIcon className="size-8" /> :
                    props.keyId === NavigationKeys.nearby ? <LocationIcon className="size-8" /> :
                        props.keyId === NavigationKeys.cart ? <CartIcon className="size-8" /> :
                            props.keyId === NavigationKeys.account ?
                                <Avatar
                                    showFallback
                                    className="transition-transform h-8 w-8"
                                    src={loggedInUser ? (loggedInUser?.image ? loggedInUser.image : NO_IMAGE) : undefined}
                                    name={loggedInUser ? loggedInUser.initials : undefined}
                                /> : <></>
            }
            <span className="hidden sm:block text-xs">{ props.title }</span>
        </div>
    );
}



export const navigationTabs: Array<NavigationTab> = [
    {
        key: NavigationKeys.home,
        title: "Home"
    },
    {
        key: NavigationKeys.nearby,
        title: "Pharmacist"
    },
    {
        key: NavigationKeys.cart,
        title: "Cart"
    },
    {
        key: NavigationKeys.account,
        title: "Account"
    }
];
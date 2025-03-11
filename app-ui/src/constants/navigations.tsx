import { Avatar } from "@heroui/react";
import { CartIcon, HomeIcon, LocationIcon } from "../components/icons";
import { NavigationTab } from "../models";
import Home from "../pages/home";

export const navigationTabs: Array<NavigationTab> = [
    {
        key: "home",
        className: "h-10 sm:h-auto"
    },
    {
        key: "pharmacist",
        className: "h-10 sm:h-auto"
    },
    {
        key: "cart",
        className: "h-10 sm:h-auto"
    },
    {
        key: "account",
        className: "h-10 sm:h-auto"
    }
];

export const navigationTitleMap: any = {
    home: (
        <div className="flex items-center space-x-2">
            <HomeIcon className="size-8 sm:size-6" />
            <span className="hidden sm:block text-xs">Home</span>
        </div>
    ),
    pharmacist: (
        <div className="flex items-center space-x-2">
            <LocationIcon className="size-8 sm:size-6" />
            <span className="hidden sm:block text-xs">Pharmacist</span>
        </div>
    ),
    cart: (
        <div className="flex items-center space-x-2">
            <CartIcon className="size-8 sm:size-6" />
            <span className="hidden sm:block text-xs">Cart</span>
        </div>
    ),
    account: (

        <div className="flex items-center space-x-2">
            
            <Avatar
                className="transition-transform h-8 w-8 sm:h-6 sm:w-6"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
            <span className="hidden sm:block text-xs">Account</span>
        </div>
    ),
};


export const navigationPages: any = {
    home: <Home/>,
    pharmacist: (
        <div className="flex items-center space-x-2">
            <LocationIcon className="size-8 sm:size-6" />
            <span className="hidden sm:block text-xs">Pharmacist</span>
        </div>
    ),
    cart: (
        <div className="flex items-center space-x-2">
            <CartIcon className="size-8 sm:size-6" />
            <span className="hidden sm:block text-xs">Cart</span>
        </div>
    ),
    account: (

        <div className="flex items-center space-x-2">
            
            <Avatar
                className="transition-transform h-8 w-8 sm:h-6 sm:w-6"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
            <span className="hidden sm:block text-xs">Account</span>
        </div>
    ),
};


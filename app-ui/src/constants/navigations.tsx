import { Avatar } from "@heroui/react";
import { CartIcon, HomeIcon, LocationIcon } from "../components/icons";
import { NavigationTab } from "../models";
import Home from "../pages/home";
import Account from "../pages/account";
import { Cart } from "../pages/cart";
import { NearBy } from "../pages/near-by";

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
                src="https://scontent.fpnq2-2.fna.fbcdn.net/v/t1.6435-9/151614621_3797628340284868_3282187223827585931_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=_XREEHBRpVMQ7kNvgE_ieXk&_nc_oc=AdjBf8IzLzTRVgYE6zSmql0JCS3mIL_i_wNbe2vv5-bcSGf9BJhI8a6bVE_9wkd1nW4&_nc_zt=23&_nc_ht=scontent.fpnq2-2.fna&_nc_gid=QeJ7sl5PMN6eFsC_QJCx6w&oh=00_AYF_sRIMfEnpLMNHCnHeVa3gKTNWVIMWzMad-uxNG5xIKA&oe=67FBAC4D"
            />
            <span className="hidden sm:block text-xs">Account</span>
        </div>
    ),
};


export const navigationPages: any = {
    home: <Home/>,
    pharmacist: <NearBy />,
    cart: <Cart />,
    account: <Account />,
};


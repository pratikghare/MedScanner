import NavigationTabs from "../components/navigation-tabs";
import { useEffect, useState } from "react";
import Account from "./account";
import { Cart } from "./cart";
import Home from "./home";
import { NearBy } from "./near-by";
import { useTheme } from "next-themes";
import UserLoginDrawer from "./user-login-drawer";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { User } from "../models/user-model";
import { NavigationKeys } from "../models/navigations-model";

export default function Landing() {
    const [key, setKey] = useState<NavigationKeys | string>(NavigationKeys.home);
    const loggedInUser: User | null = useSelector((state: RootState) => state.loggedInUser);
    const { theme, setTheme } = useTheme();
    const [selected, setSelected] = useState<NavigationKeys | string>(NavigationKeys.home);
    

    const navigationPages: any = {
        home: <Home theme={theme} />,
        pharmacist: <NearBy />,
        cart: <Cart />,
        account: <Account callback={setTheme} />,
    };

    useEffect(() => {
        const sessionTab: string | null = sessionStorage.getItem("key");
        if(sessionTab) {
            setKey(sessionTab);
            setSelected(sessionTab);
        }
    }, [])

    useEffect(() => {
        if(!loggedInUser && key === NavigationKeys.account) {
            setKey(NavigationKeys.home);
            setSelected(NavigationKeys.home);
        }
    }, [loggedInUser])

    const updateSelected = (selected: NavigationKeys) => {
        setSelected(selected);
        if((loggedInUser || selected !== "account")) {
            setKey(selected);
            sessionStorage.setItem("key", selected);
        }
    }

    const onClose = () => {
        if(!loggedInUser && selected === "account") setSelected(key);
    }

    return (
        <>
            {navigationPages[key]}
            <NavigationTabs selected={selected} changeTab={updateSelected} theme={theme} />
            <UserLoginDrawer updateTheme={setTheme} onClose={onClose} isOpen={!loggedInUser && selected === "account"} />
        </>
    );
}
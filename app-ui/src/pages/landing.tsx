import NavigationTabs from "../components/navigation-tabs";
import Login from "./login";
import { useEffect, useState } from "react";
import Account from "./account";
import { Cart } from "./cart";
import Home from "./home";
import { NearBy } from "./near-by";
import { useTheme } from "next-themes";

export default function Landing() {
    const [key, setKey] = useState("home");
    const [isLoggedIn] = useState<boolean>(true);
    const { theme, setTheme } = useTheme();
    const [selected, setSelected] = useState<string>("home");

    const navigationPages: any = {
        home: <Home/>,
        pharmacist: <NearBy />,
        cart: <Cart />,
        account: <Account callback={setTheme} />,
    };

    useEffect(() => {
        if((isLoggedIn || selected !== "account")) setKey(selected);
    }, [selected]);

    const onClose = () => {
        if(!isLoggedIn && selected === "account") setSelected(key);
    }

    return (
        <>
            {navigationPages[key]}
            <NavigationTabs selected={selected} changeTab={setSelected} theme={theme} />
            <Login onClose={onClose} isOpen={!isLoggedIn && selected === "account"} />
        </>
    );
}
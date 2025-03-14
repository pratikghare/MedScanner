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
        const sessionTab: string | null = sessionStorage.getItem("key");
        if(sessionTab) {
            setKey(sessionTab);
            setSelected(sessionTab);
        }
    }, [])

    const updateSelected = (selected: string) => {
        setSelected(selected);
        if((isLoggedIn || selected !== "account")) {
            setKey(selected);
            sessionStorage.setItem("key", selected);
        }
    }

    const onClose = () => {
        if(!isLoggedIn && selected === "account") setSelected(key);
    }

    return (
        <>
            {navigationPages[key]}
            <NavigationTabs selected={selected} changeTab={updateSelected} theme={theme} />
            <Login onClose={onClose} isOpen={!isLoggedIn && selected === "account"} />
        </>
    );
}
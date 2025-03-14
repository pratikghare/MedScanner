import { useDispatch, useSelector } from "react-redux";
import NavigationTabs from "../components/navigation-tabs";
import { navigationTabs } from "../constants/navigations";
import { AppDispatch, RootState } from "../store/store";
import Login from "./login";
import { useEffect, useState } from "react";
import { currentTab } from "../store/reducers/current-tab";
import { NavigationTab } from "../models";
import Account from "./account";
import { Cart } from "./cart";
import Home from "./home";
import { NearBy } from "./near-by";
import { useTheme } from "next-themes";

export default function Landing() {
    const selected = useSelector((state: RootState) => state.currentTab);
    const dispatch = useDispatch<AppDispatch>();
    const [key, setKey] = useState("home");
    const [isLoggedIn] = useState<boolean>(true);
    const { theme, setTheme } = useTheme();

    const navigationPages: any = {
        home: <Home/>,
        pharmacist: <NearBy />,
        cart: <Cart />,
        account: <Account callback={setTheme} />,
    };

    useEffect(() => {
        if((isLoggedIn || selected.key !== "account")) 
            setKey(selected.key);
    }, [selected.key]);

    const onClose = () => {
        if(!isLoggedIn && selected.key === "account") {
            const selectedTab: NavigationTab | undefined = navigationTabs.find((tab: NavigationTab) => tab.key === key);
            if(selectedTab) dispatch(currentTab(selectedTab));
        }
    }
    
    return (
        <>
            {navigationPages[key]}
            <NavigationTabs theme={theme} />
            <Login onClose={onClose} isOpen={!isLoggedIn && selected.key === "account"} />
        </>
    );
}
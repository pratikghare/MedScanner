import { ReactNode, useEffect, useState } from "react";
import NavigationTabs from "../components/navigation-tabs";
import LoginDrawer from "../components/login-drawer";
import { NavigationKeyType, NavigationTabKeys } from "../constants/locale";
import Home from "./home";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../store/selectors";
import { User } from "../models/user-context";
import Account from "./account";
import { getCurrentTabStorage, setCurrentTabStorage } from "../util/storage";

export default function Landing() {

    const tabs: Record<string, ReactNode> = {
        home: <Home /> ,
        nearBy: "nearBy",
        account: <Account/>
    };

    const [selectedKey, setSelectedKey] = useState<NavigationKeyType>(NavigationTabKeys.home);
    const [selected, setSelected] = useState<NavigationKeyType>(NavigationTabKeys.home);
    const loggedInUser: User = useSelector(currentUserSelector);

    useEffect(() => updateSelected(getCurrentTabStorage(), true), []);

    const updateSelected = (key: NavigationKeyType, force: boolean = false) => {
        setSelectedKey(key);
        if(loggedInUser.isLoggedIn || key !== NavigationTabKeys.account || force) {
            setSelected(key);
            setCurrentTabStorage(key);
        }
    }
    const updateAll = () => {
        const update: NavigationKeyType = selected === NavigationTabKeys.account ? NavigationTabKeys.home : selected;
        updateSelected(loggedInUser.isLoggedIn ? selectedKey : update, true);
    }

    return (
        <div className="w-full">
            {/* { tabs[selected] } */}
            {
                Object.keys(tabs).map((key: string, index: number) => (
                    <div key={key + "-" + index} className={key === selected ? "" : "hidden"}>{ tabs[key] }</div>
                ))
            }
            <NavigationTabs selected={selectedKey} setSelected={updateSelected} />
            {
                !loggedInUser.isLoggedIn && selectedKey === NavigationTabKeys.account && <LoginDrawer onDrawerClose={updateAll} />
            }
        </div>
    );
}
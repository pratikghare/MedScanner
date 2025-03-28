import { useState } from "react";
import NavigationTabs from "../components/navigation-tabs";
import LoginDrawer from "../components/login-drawer";
import { NavigationTabKeys } from "../constants/locale";
import Home from "./home";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../store/selectors";
import { User } from "../models/user-context";

export default function Landing() {
    type NavigationKeyType = (typeof NavigationTabKeys)[keyof typeof NavigationTabKeys];

    const [selectedKey, setSelectedKey] = useState<NavigationKeyType>(NavigationTabKeys.home);
    const [selected, setSelected] = useState<NavigationKeyType>(NavigationTabKeys.home);
    const loggedInUser: User = useSelector(currentUserSelector);

    const updateSelected = (key: NavigationKeyType, force: boolean = false) => {
        setSelectedKey(key);
        if(loggedInUser.isLoggedIn || key !== NavigationTabKeys.account || force) {
            setSelected(key);
        }
    }

    const updateAllSelected = () => {
        updateSelected(loggedInUser.isLoggedIn ? selectedKey : selected, true);
    }

    return (
        <div className="w-full">
            { selected === NavigationTabKeys.home && <Home /> }
            <NavigationTabs selected={selectedKey} setSelected={updateSelected} />
            {
                !loggedInUser.isLoggedIn && selectedKey === NavigationTabKeys.account && <LoginDrawer setSelected={updateAllSelected} />
            }
        </div>
    );
}
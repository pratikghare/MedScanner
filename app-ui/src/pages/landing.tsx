import { useState } from "react";
import NavigationTabs from "../components/navigation-tabs";
import LoginDrawer from "../components/login-drawer";
import { NavigationTabKeys } from "../constants/locale";

export default function Landing() {
    const [selectedKey, setSelectedKey] = useState<string>("home");
    const [selected, setSelected] = useState<string>("home");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const updateSelected = (key: string) => {
        setSelectedKey(key);
        if(isLoggedIn || key !== NavigationTabKeys.account) {
            setSelected(key);
        }
    }

    return (
        <div className="w-full">
            { selected }
            <NavigationTabs selected={selectedKey} setSelected={updateSelected} />
            {
                !isLoggedIn && selectedKey === NavigationTabKeys.account && <LoginDrawer />
            }
        </div>
    );
}
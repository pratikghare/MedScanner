import { Tabs, Tab, Avatar } from "@heroui/react";
import { NavigationTabKeys, NO_IMAGE } from "../constants/locale";
import { HomeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../store/selectors";

function NavigationTitle({ keyId }: { keyId: string }) {
    const iconsClass = "size-8";
    const loggedInUser = useSelector(currentUserSelector);

    return (
        <div className="flex items-center space-x-2">
            {
                keyId === NavigationTabKeys.home ? <HomeIcon className={iconsClass} /> :
                    keyId === NavigationTabKeys.nearBy ? <MapPinIcon className={iconsClass} /> :
                        keyId === NavigationTabKeys.account ? <>
                            <Avatar className={iconsClass}
                                src={`${loggedInUser?.image ? loggedInUser.image : NO_IMAGE}`}
                                name={loggedInUser?.initials ? loggedInUser.initials : undefined}
                                showFallback
                            />
                        </> : <></>
            }
            <span className="text-xs hidden sm:block">
                {
                    keyId === NavigationTabKeys.home ? "Home" :
                        keyId === NavigationTabKeys.nearBy ? "Near By" :
                            keyId === NavigationTabKeys.account ? "Account" : ""
                }
            </span>
        </div>
    );
}

export default function NavigationTabs({ selected, setSelected }: { selected: string, setSelected: Function }) {
    const changeTab = (key: any) => {
        setSelected(key);
    }

    return (
        <div className="fixed bottom-1 left-0 w-full flex justify-center">
            <Tabs className="backdrop-blur-md rounded-2xl" classNames={{ tabList: "h-12 px-0.5", tab: "h-10" }}
                aria-label="Tabs radius" size="lg" variant="bordered" color="primary" radius="sm"
                onSelectionChange={changeTab} selectedKey={selected}
            >
                <Tab key={NavigationTabKeys.home} shouldSelectOnPressUp
                    title={<NavigationTitle keyId={NavigationTabKeys.home} />}
                />
                <Tab key={NavigationTabKeys.nearBy} shouldSelectOnPressUp
                    title={<NavigationTitle keyId={NavigationTabKeys.nearBy} />}
                />
                <Tab key={NavigationTabKeys.account} shouldSelectOnPressUp
                    title={<NavigationTitle keyId={NavigationTabKeys.account} />}
                />
            </Tabs>
        </div>
    );
}
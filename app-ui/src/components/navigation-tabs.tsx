import { Tabs, Tab, Avatar } from "@heroui/react";
import { NavigationTabKeys } from "../constants/locale";
import { HomeIcon, MapPinIcon } from "@heroicons/react/24/outline";

function NavigationTitle({ keyId }: { keyId: string }) {
    const iconsClass = "size-8";
    return (
        <div className="flex items-center space-x-2">
            {
                keyId === NavigationTabKeys.home ? <HomeIcon className={iconsClass} /> :
                    keyId === NavigationTabKeys.nearyBy ? <MapPinIcon className={iconsClass} /> :
                        keyId === NavigationTabKeys.account ? <>
                            <Avatar className={iconsClass} 
                                src="https://i.pravatar.cc/150?u=a04258114e29026302d" 
                                showFallback
                            />
                        </> : <></>
            }
            <span className="text-xs hidden sm:block">
                {
                    keyId === NavigationTabKeys.home ? "Home" :
                        keyId === NavigationTabKeys.nearyBy ? "Near By" :
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
                <Tab key={NavigationTabKeys.nearyBy} shouldSelectOnPressUp
                    title={<NavigationTitle keyId={NavigationTabKeys.nearyBy} />}
                />
                <Tab key={NavigationTabKeys.account} shouldSelectOnPressUp
                    title={<NavigationTitle keyId={NavigationTabKeys.account} />}
                />
            </Tabs>
        </div>
    );
}
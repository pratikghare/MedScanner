import { Tabs, Tab } from "@heroui/react";
import { navigationTabs, navigationTitleMap } from "../constants/navigations";
import { NavigationTab } from "../models";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { currentTab } from "../store/reducers/current-tab";


export default function NavigationTabs() {
    const selected = useSelector((state: RootState) => state.currentTab);
    const dispatch = useDispatch<AppDispatch>();

    const changeTab = (key: any) => {
        const tab: NavigationTab | undefined = navigationTabs.find((nav: NavigationTab) => nav.key === key);
        if (tab) dispatch(currentTab({ ...tab, theme: selected.theme }))
    }

    return (
        <div className="fixed bottom-0 pb-2 flex justify-center w-full ">
            <Tabs size="lg" aria-label="Options" color="primary"
                variant={selected?.theme === "light" ? "bordered" : "solid"} selectedKey={selected.key}
                className="backdrop-blur-sm"
                onSelectionChange={(key) => changeTab(key)}
            >
                {
                    navigationTabs.map((tab: NavigationTab) => (
                        <Tab
                            className={tab.className}
                            key={tab.key}
                            shouldSelectOnPressUp
                            onClick={() => changeTab(tab)}
                            title={navigationTitleMap[tab.key]}
                        />
                    ))
                }
            </Tabs>
        </div>
    );
}

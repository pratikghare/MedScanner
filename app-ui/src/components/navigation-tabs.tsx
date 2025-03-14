import { Tabs, Tab } from "@heroui/react";
import { navigationTabs } from "../constants/navigations";
import { NavigationTab } from "../models";

export default function NavigationTabs(props: { theme?: string, changeTab: Function, selected: string }) {
    return (
        <div className="fixed bottom-0 pb-2 flex justify-center w-full ">
            <Tabs size="lg" aria-label="Options" color="primary" radius="sm"
                variant={props.theme === "light" ? "bordered" : "solid"} selectedKey={props.selected}
                className="backdrop-blur-sm rounded-2xl"
                onSelectionChange={(key) => props.changeTab(key)}
            >
                {
                    navigationTabs.map((tab: NavigationTab) => (
                        <Tab
                            className={tab.className + " rounded-sm"}
                            key={tab.key}
                            shouldSelectOnPressUp
                            onClick={() => props.changeTab(tab)}
                            title={tab.title}
                        />
                    ))
                }
            </Tabs>
        </div>
    );
}

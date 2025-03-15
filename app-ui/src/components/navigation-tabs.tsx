import { Tabs, Tab } from "@heroui/react";
import NavigationTitle, { navigationTabs } from "../constants/navigations";
import { NavigationTab } from "../models/navigations-model";

export default function NavigationTabs(props: { theme?: string, changeTab: Function, selected: string }) {
    return (
        <div className="fixed bottom-0 pb-2 flex justify-center w-full ">
            <Tabs size="lg" aria-label="Options" color="primary" radius="sm"
                variant={props.theme === "light" ? "bordered" : "bordered"} selectedKey={props.selected}
                className="backdrop-blur-md rounded-2xl"
                onSelectionChange={(key) => props.changeTab(key)}
            >
                {
                    navigationTabs.map((tab: NavigationTab) => (
                        <Tab
                            className={"h-10 sm:h-auto rounded-sm " + tab.className}
                            key={tab.key}
                            shouldSelectOnPressUp
                            onClick={() => props.changeTab(tab)}
                            title={
                                <NavigationTitle keyId={tab.key} title={tab.title} />
                            }
                        />
                    ))
                }
            </Tabs>
        </div>
    );
}

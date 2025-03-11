import { useSelector } from "react-redux";
import NavigationTabs from "../components/navigation-tabs";
import { navigationPages } from "../constants/navigations";
import { RootState } from "../store/store";

export default function Landing() {
    const selected = useSelector((state: RootState) => state.currentTab);
    
    return (
        <>
            {navigationPages[selected.key]}
            <NavigationTabs />
        </>
    );
}
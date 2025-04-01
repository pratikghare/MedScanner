
import Header from "./components/header";
import { Outlet } from "react-router";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { getStorageTheme, getUserStorage } from "./util/storage";
import { fetchLoggedInUser, startServer } from "./services/user-service";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store/store";
import { User } from "./models/user-context";
import { setUser } from "./store/reducers/current-user";
import { Spinner } from "@heroui/react";
import { confirmModalSelector, themeSelector } from "./store/selectors";
import { useTheme } from "@heroui/use-theme";
import { Theme, Themes } from "./constants/locale";
import { setTheme as setAppTheme } from "./store/reducers/theme";
import ConfirmModal from "./components/confirm-modal";
import { ConfirmModalProps } from "./models/common";

export default function App() {
    const [loader, setLoader] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(true);

    const { theme, setTheme } = useTheme();
    const appTheme = useSelector(themeSelector);
    const confirmModal: ConfirmModalProps = useSelector(confirmModalSelector);

    let isManualUpdate = useRef<any>(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const userId: string | null = getUserStorage();
        setTimeout(() => {
            setIsFetching(false);
        }, 1000)
        userId ?
            fetchLoggedInUser(userId).then((user: User) => {
                dispatch(setUser(user));
                setIsFetching(false);
                setLoader(false);
            }) :
            startServer().then(() => {
                setLoader(false);
                setIsFetching(false);
            });

        const theme: Theme | null = getStorageTheme();
        theme && dispatch(setAppTheme(theme));
    }, []);

    useLayoutEffect(() => {
        updateTheme();
        isManualUpdate.current = true;
    }, [appTheme]);

    useEffect(() => {
        // if(isManualUpdate.current) {
        //     isManualUpdate.current = false;
        //     return;
        // }
        updateTheme(false);
    }, [theme]);


    const updateTheme = (shouldUpdate: boolean = true) => {
        const localTheme: Theme | null = getStorageTheme();
        const theme: Theme = localTheme ? localTheme : appTheme.theme;

        if (appTheme.theme !== Themes.system || shouldUpdate) setTheme(theme);
    }

    const renderWithLoader = (body: ReactNode) => {
        return isFetching ? <></> :
        loader ? (
            <div className="min-h-dvh w-full flex flex-col justify-center items-center">
                {/* <Spinner /> */}
                <div className=" font-semibold text-blue-600 text-center relative">
                    It might take a minute to start the server, <br />please be patient<Spinner className="absolute bottom-0 ml-1" variant="dots" size="sm" />
                </div>
            </div>
        ) : body;
    }

    return (
        <section className="h-full w-full p-1 sm:p-3">
            {
                renderWithLoader(
                    <>
                        <Header />
                        <section className={`mt-3 flex justify-center`}>
                            <div className="app-container pl-3 pr-4 md:pl-4 md:pr-5">
                                <Outlet />
                            </div>
                        </section>
                        {
                            confirmModal?.show &&
                            <ConfirmModal title={confirmModal.title} body={confirmModal.body}
                                type={confirmModal.type} hideDivider={confirmModal.hideDivider} moveableModal={confirmModal.moveableModal}
                                cancelBtn={confirmModal.cancelBtn} confirmBtn={confirmModal.confirmBtn}
                            />
                        }
                    </> 
                )
            }
        </section>
    );
}
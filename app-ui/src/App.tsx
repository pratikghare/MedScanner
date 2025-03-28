
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "./components/header";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { APP_STORAGE } from "./constants/locale";

export default function App(){
    useEffect(() => {
        let loggedInUser = sessionStorage.getItem(APP_STORAGE.LOGIN_KEY);
        if(!loggedInUser) localStorage.getItem(APP_STORAGE.LOGIN_KEY);
        if(loggedInUser) {
            console.log("LOGGED IN")
        }
        else console.log("NO LOGGED IN")
    }, []);

    return (
        <NextThemesProvider defaultTheme="light" storageKey="theme">
            <section className="h-full w-full">
                <Header />
                <section className={`mt-3 flex justify-center`}>
                    <div className="app-container pl-3 pr-4 md:pl-4 md:pr-5">
                        <Outlet />
                    </div>
                </section>
            </section>
        </NextThemesProvider>
    );
}
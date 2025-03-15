import Header from "./components/header";
import "./App.scss";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { currentUser } from "./store/reducers/current-user";

export default function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        let user = localStorage.getItem("user");
        if(!user) user = sessionStorage.getItem("user");
        if(user) dispatch(currentUser(JSON.parse(user)));
    }, []);

    return (
        <div className="">
            <Header />
            <Outlet />
        </div>
    );
}

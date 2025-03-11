import Header from "./components/header";
import "./App.scss";
import { Outlet } from "react-router";

export default function App() {
    return (
        <div className="">
            <Header />
            <Outlet />
        </div>
    );
}

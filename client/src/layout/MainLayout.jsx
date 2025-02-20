import { Outlet } from "react-router-dom";
import Siderbar from "../components/Siderbar";
import Footer from './../components/Footer';
import { useEffect } from "react";

const MainLayout = () => {

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);
    
    return (
        <div className="flex h-screen bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary">
            <div className="w-[17.65%] max-lg:w-[74px] border-r-[1px] border-light-border dark:border-dark-border">
                <Siderbar />
            </div>
            <div className="w-[82.35%] max-lg:w-[calc(100%-74px)] overflow-x-hidden">
                <div className="flex flex-col justify-between md:gap-y-32">
                    <div className="w-full mx-auto">
                        <Outlet />
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
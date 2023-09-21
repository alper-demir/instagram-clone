import { Outlet } from "react-router-dom"
import Siderbar from "../components/Siderbar"

const Home = () => {
    return (
        <div className="flex h-screen">
            <div className="w-[17.65%] max-xl:w-[73px] max-md:w-0">
                <Siderbar />
            </div>
            <div className="w-[82.35%] max-[1160px]:w-full max-xl:w-full">
                <Outlet />
            </div>
        </div>
    )
}

export default Home
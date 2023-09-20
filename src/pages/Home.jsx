import { Outlet } from "react-router-dom"
import Siderbar from "../components/Siderbar"

const Home = () => {
    return (
        <div className="flex h-screen">
            <div className="w-[17.65%]">
                <Siderbar />
            </div>
            <div className="w-[82.35%]">
                <Outlet />
            </div>
        </div>
    )
}

export default Home
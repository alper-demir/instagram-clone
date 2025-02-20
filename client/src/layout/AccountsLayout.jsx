import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaBell, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../services/authService";
import useToast from "../hooks/useToast";

const AccountsLayout = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const handleLogout = () => {
        logout();
        navigate("/login")
        showToast("Çıkış yapıldı", "info");
    }

    return (
        <div className="h-screen flex flex-col md:flex-row">
            {/* Sol Menü */}
            <aside className="w-full md:w-1/4 lg:w-1/5 border-r max-md:border-b border-light-border dark:border-dark-border p-4">
                <ul className="space-y-4 mt-5">
                    <Link to="/accounts/edit" className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition">
                        <FaUser className="text-lg" />
                        <span>Profil Düzenle</span>
                    </Link>
                    <li className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition">
                        <FaLock className="text-lg" />
                        <span>Gizlilik</span>
                    </li>
                    <li className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition">
                        <FaBell className="text-lg" />
                        <span>Bildirimler</span>
                    </li>
                    <li className="flex items-center space-x-3 text-red-500 cursor-pointer p-2 hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition"
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt className="text-lg" />
                        <span>Çıkış Yap</span>
                    </li>
                </ul>
            </aside>

            {/* İçerik Alanı */}
            <main className="flex-1 p-6 flex items-center justify-center">
                <div className="w-full max-w-3xl shadow-lg rounded-lg p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AccountsLayout;

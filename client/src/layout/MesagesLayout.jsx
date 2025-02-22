import { Link, Outlet } from "react-router-dom"

const MesagesLayout = () => {
    return (
        <div className="w-full h-screen">
            <div className="flex">
                {/* Sol taraf chat yapılan kişiler geçmişi son mesajlar */}
                <div className="border-r-[1px] border-light-border dark:border-dark-border h-screen w-1/5 min-w-fit">

                    <div className="hover:bg-light-hover dark:hover:bg-dark-hover cursor-pointer">
                        <Link to={`t/chatsessionid111`}>
                            <div className="flex items-center gap-x-2 p-3">
                                <div><img src="" alt="Avatar" className="w-12 h-12 rounded-full object-cover" /></div>
                                <div className="flex flex-col">
                                    <div className="text-sm">Konuşulan kişi</div>
                                    <div className="text-xs">
                                        <span>Sen: </span> <span>son atılan mesaj</span> · <span>3s</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>

                {/* Main chat kısmı  */}
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MesagesLayout
import { Link } from "react-router-dom"
import img from "../assets/images/1.jpg"

const HomeMain = () => {
    return (
        <div className="flex max-xl:w-full mt-[3.15rem] mx-auto px-40 max-2xl:px-20 max-[1395px]:px-0 max-md:mt-20">

            {/* hikaye & post */}
            
            <div className="text-center text-xs w-[69.7%] max-[1160px]:w-full max-xl:w-full mb-20">
                <div className="hikayeler flex gap-[1.29rem] items-center mx-4">
                    <div className="flex flex-col justify-center items-center">
                        <img className="w-[3.75rem] h-[3.75rem] object-cover rounded-full ring-2 ring-red-500 p-[2px]" src={img} alt="" />
                        <span className="mt-[0.28rem]">alper.iron</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <img className="w-[3.75rem] h-[3.75rem] object-cover rounded-full ring-2 ring-red-500 p-[2px]" src={img} alt="" />
                        <span className="mt-[0.28rem]">alper.iron</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <img className="w-[3.75rem] h-[3.75rem] object-cover rounded-full ring-2 ring-red-500 p-[2px]" src={img} alt="" />
                        <span className="mt-[0.28rem]">alper.iron</span>
                    </div>

                </div>
                <Link to="/register" className="p-2 bg-indigo-500 text-lg text-white rounded hover:bg-indigo-600 transition-all">Kaydol sayfası (tıkla)</Link>

                <div className="w-[60%] flex flex-col mx-auto max-2xl:h-[550px] my-6 max-sm:w-full">

                    <div className="flex items-center gap-2 w-full max-sm:pl-4">
                        <img className="w-10 h-10 object-cover rounded-full ring-2 ring-red-500 p-[2px]" src={img} alt="" />
                        <span className="mt-[0.28rem] font-semibold text-sm">alper.iron</span>
                    </div>

                    <div className="mt-3">
                        <img src={img} alt="" className="h-[330px]" />
                    </div>

                    <div className="max-sm:p-2">

                        <div className="flex justify-between mt-2">
                            <div className="flex gap-5">
                                <svg aria-label="Beğen" class="x1lliihq x1n2onr6" color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Beğen</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>

                                <svg aria-label="Yorum Yap" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Yorum Yap</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>

                                <svg aria-label="Gönderi Paylaş" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Gönderi Paylaş</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                            </div>

                            <div>
                                <svg aria-label="Kaydet" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Kaydet</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                            </div>
                        </div>

                        <div className="text-start font-semibold text-sm mt-3">
                            <span>20.123 beğenme</span>
                        </div>

                        <div className="text-start text-sm mt-3 break-words">
                            <span className="font-semibold mr-2">alper.ironpostu</span>
                            <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo unde ea esse nostrum. Eveniet, aut.</span>
                        </div>

                        <div className="text-start font-semibold text-xs mt-3">
                            <span className="text-[#BABABA]">44 yorumun tümünü gör</span>
                        </div>

                        <div className="text-start font-semibold text-base mt-3">
                            <input type="text" placeholder="Yorum ekle" className="w-full border-0 border-b-[1px] outline-none" />
                        </div>
                    </div>

                </div>
                <div className="w-[60%] flex flex-col mx-auto max-2xl:h-[550px] my-16 max-sm:w-full">

                    <div className="flex items-center gap-2 w-full max-sm:pl-4">
                        <img className="w-10 h-10 object-cover rounded-full ring-2 ring-red-500 p-[2px]" src={img} alt="" />
                        <span className="mt-[0.28rem] font-semibold text-sm">alper.iron</span>
                    </div>

                    <div className="mt-3">
                        <img src={img} alt="" className="h-[330px]" />
                    </div>

                    <div className="max-sm:p-2">

                        <div className="flex justify-between mt-2">
                            <div className="flex gap-5">
                                <svg aria-label="Beğen" class="x1lliihq x1n2onr6" color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Beğen</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>

                                <svg aria-label="Yorum Yap" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Yorum Yap</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>

                                <svg aria-label="Gönderi Paylaş" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Gönderi Paylaş</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                            </div>

                            <div>
                                <svg aria-label="Kaydet" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Kaydet</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                            </div>
                        </div>

                        <div className="text-start font-semibold text-sm mt-3">
                            <span>20.123 beğenme</span>
                        </div>

                        <div className="text-start text-sm mt-3 break-words">
                            <span className="font-semibold mr-2">alper.ironpostu</span>
                            <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo unde ea esse nostrum. Eveniet, aut.</span>
                        </div>

                        <div className="text-start font-semibold text-xs mt-3">
                            <span className="text-[#BABABA]">44 yorumun tümünü gör</span>
                        </div>

                        <div className="text-start font-semibold text-base mt-3">
                            <input type="text" placeholder="Yorum ekle" className="w-full border-0 border-b-[1px] outline-none" />
                        </div>
                    </div>

                </div>
            </div>


            {/* geçiş & öneri */}
            <div className="w-[285px] text-sm mt-2 max-[1160px]:hidden">

                <div className="flex items-center justify-between gap-3 font-semibold">
                    <div className="flex gap-3 items-center">
                        <img src={img} alt="avatar" className="h-[2.75rem] w-[2.75rem] object-cover rounded-full" />
                        <span>alper.iron</span>
                    </div>
                    <div className="text-[#0095F6] text-xs font-semibold">
                        Geçiş Yap
                    </div>
                </div>

                <div className="flex justify-between mt-6 font-medium ">
                    <span className="text-[#7D7D7D]">Senin için önerilenler</span>
                    <span className="text-xs">Tümünü gör</span>
                </div>

                <div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                            <div>
                                <img src={img} alt="" className="h-[2.75rem] w-[2.75rem] object-cover rounded-full" />
                            </div>
                            <div className="text-xs flex flex-col">
                                <span className="font-semibold text-sm">kullanıcıadı</span>
                                <span>alper + 12 kişi takip ediyor</span>
                            </div>
                        </div>
                        <div>
                            <span className="text-[#0095F6] text-xs font-semibold">Takip Et</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                            <div>
                                <img src={img} alt="" className="h-[2.75rem] w-[2.75rem] object-cover rounded-full" />
                            </div>
                            <div className="text-xs flex flex-col">
                                <span className="font-semibold text-sm">kullanıcıadı</span>
                                <span>alper + 12 kişi takip ediyor</span>
                            </div>
                        </div>
                        <div>
                            <span className="text-[#0095F6] text-xs font-semibold">Takip Et</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                            <div>
                                <img src={img} alt="" className="h-[2.75rem] w-[2.75rem] object-cover rounded-full" />
                            </div>
                            <div className="text-xs flex flex-col">
                                <span className="font-semibold text-sm">kullanıcıadı</span>
                                <span>alper + 12 kişi takip ediyor</span>
                            </div>
                        </div>
                        <div>
                            <span className="text-[#0095F6] text-xs font-semibold">Takip Et</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                            <div>
                                <img src={img} alt="" className="h-[2.75rem] w-[2.75rem] object-cover rounded-full" />
                            </div>
                            <div className="text-xs flex flex-col">
                                <span className="font-semibold text-sm">kullanıcıadı</span>
                                <span>alper + 12 kişi takip ediyor</span>
                            </div>
                        </div>
                        <div>
                            <span className="text-[#0095F6] text-xs font-semibold">Takip Et</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                            <div>
                                <img src={img} alt="" className="h-[2.75rem] w-[2.75rem] object-cover rounded-full" />
                            </div>
                            <div className="text-xs flex flex-col">
                                <span className="font-semibold text-sm">kullanıcıadı</span>
                                <span>alper + 12 kişi takip ediyor</span>
                            </div>
                        </div>
                        <div>
                            <span className="text-[#0095F6] text-xs font-semibold">Takip Et</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HomeMain
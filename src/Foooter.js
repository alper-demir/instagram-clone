const Foooter = () => {
    return (
        <footer className=" items-center flex text-[#a8a6a6] text-xs flex-col mt-20 mb-10 overflow-auto flex-nowrap text-center">
            <div>
                <ul className="flex flex-row flex-wrap justify-center">
                    <li><a href="/">Meta</a></li>
                    <li><a href="/">Hakkında</a></li>
                    <li><a href="/">Blog</a></li>
                    <li><a href="/">İş Fırsatları</a></li>
                    <li><a href="/">Yardım</a></li>
                    <li><a href="/">API</a></li>
                    <li><a href="/">Gizlilik</a></li>
                    <li><a href="/">Koşullar</a></li>
                    <li><a href="/">Başlıca Hesaplar</a></li>
                    <li><a href="/">Konumlar</a></li>
                    <li><a href="/">Instagram Lite</a></li>
                    <li><a href="/">Kişi Yükleme ve Hesabı Olmayan Kişiler</a></li>
                </ul>
            </div>
            <div className="mt-3">
                <span>Türkçe</span>
                <i class="fa-solid fa-chevron-down ml-1"></i>
                <span className="ml-4">© 2023 Instagram from Meta</span>
            </div>
        </footer>
    )
}

export default Foooter
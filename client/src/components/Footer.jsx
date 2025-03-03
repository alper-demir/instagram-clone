import { Link } from "react-router-dom"

const footerLinks = [
    {
        id: 1,
        name: "Meta",
        url: "/"
    },
    {
        id: 2,
        name: "Hakkında",
        url: "/"
    },
    {
        id: 3,
        name: "Blog",
        url: "/"
    },
    {
        id: 4,
        name: "İş Fırsatları",
        url: "/"
    },
    {
        id: 5,
        name: "Yardım",
        url: "/"
    },
    {
        id: 6,
        name: "API",
        url: "/"
    },
    {
        id: 7,
        name: "Gizlilik",
        url: "/"
    },
    {
        id: 8,
        name: "Koşullar",
        url: "/"
    },
    {
        id: 9,
        name: "Başlıca Hesaplar",
        url: "/"
    },
    {
        id: 10,
        name: "Konumlar",
        url: "/"
    },
    {
        id: 11,
        name: "Instagram Lite",
        url: "/"
    },
    {
        id: 12,
        name: "Kişi Yükleme ve Hesabı Olmayan Kişiler",
        url: "/aa"
    },
]


const Footer = () => {
    return (
        <footer className=" items-center flex text-[#a8a6a6] text-xs flex-col mt-20 pb-10 overflow-auto flex-nowrap text-center">
            <div>
                <ul className="flex flex-row flex-wrap justify-center">
                    {footerLinks.map(link => (
                        <li key={link.id}><Link to={link.url}>{link.name}</Link></li>
                    ))}
                </ul>
            </div>
            <div className="mt-3">
                <span>Türkçe</span>
                <i className="fa-solid fa-chevron-down ml-1"></i>
                <span className="ml-4">© {new Date().getFullYear()} Instagram from Meta</span>
            </div>
        </footer>
    )
}

export default Footer
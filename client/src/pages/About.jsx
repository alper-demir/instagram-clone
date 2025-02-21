import { FaReact, FaNodeJs, FaDatabase, FaCloud, FaShieldAlt } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";

const About = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            {/* Başlık */}
            <h1 className="text-4xl font-bold text-center mb-6">
                📸 Instagram Clone Projesi
            </h1>

            {/* Açıklama */}
            <p className="text-lg text-center max-w-2xl">
                Bu proje, modern web teknolojileri kullanılarak geliştirilen bir <span className="font-semibold">Instagram Klonu</span>'dur.
                Kullanıcılar gönderi paylaşabilir, beğenebilir, yorum yapabilir ve diğer kullanıcılarla etkileşime girebilir.
            </p>

            {/* Teknolojiler ve Özellikler */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
                <div className="flex flex-col items-center p-6 bg-white dark:bg-dark-bg-secondary shadow-lg rounded-xl hover:scale-105 transition duration-300">
                    <FaReact className="text-blue-500 text-5xl mb-3" />
                    <h2 className="text-xl font-semibold">React & Redux</h2>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-center">
                        Modern ve performanslı frontend yapısı. Kullanıcı dostu arayüz ve hızlı performans.
                    </p>
                </div>

                <div className="flex flex-col items-center p-6 bg-white dark:bg-dark-bg-secondary shadow-lg rounded-xl hover:scale-105 transition duration-300">
                    <FaNodeJs className="text-green-500 text-5xl mb-3" />
                    <h2 className="text-xl font-semibold">Node.js & Express</h2>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-center">
                        Güçlü backend yapısı. API yönetimi ve kimlik doğrulama mekanizması.
                    </p>
                </div>

                <div className="flex flex-col items-center p-6 bg-white dark:bg-dark-bg-secondary shadow-lg rounded-xl hover:scale-105 transition duration-300">
                    <FaDatabase className="text-yellow-500 text-5xl mb-3" />
                    <h2 className="text-xl font-semibold">MongoDB</h2>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-center">
                        Esnek ve ölçeklenebilir veritabanı yapısı.
                    </p>
                </div>

                <div className="flex flex-col items-center p-6 bg-white dark:bg-dark-bg-secondary shadow-lg rounded-xl hover:scale-105 transition duration-300">
                    <FaCloud className="text-purple-500 text-5xl mb-3" />
                    <h2 className="text-xl font-semibold">Cloudinary</h2>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-center">
                        Medya yükleme ve yönetimi için güçlü bir bulut hizmeti.
                    </p>
                </div>

                <div className="flex flex-col items-center p-6 bg-white dark:bg-dark-bg-secondary shadow-lg rounded-xl hover:scale-105 transition duration-300">
                    <FaShieldAlt className="text-red-500 text-5xl mb-3" />
                    <h2 className="text-xl font-semibold">JWT Authentication</h2>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-center">
                        Kullanıcı güvenliği için JWT tabanlı kimlik doğrulama.
                    </p>
                </div>

                <div className="flex flex-col items-center p-6 bg-white dark:bg-dark-bg-secondary shadow-lg rounded-xl hover:scale-105 transition duration-300">
                    <RiTailwindCssFill className="text-cyan-500 text-5xl mb-3" />
                    <h2 className="text-xl font-semibold">TailwindCSS</h2>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-center">
                        Hızlı ve esnek stil oluşturma. Modern, ölçeklenebilir ve optimize edilmiş CSS yapısı.
                    </p>
                </div>

            </div>

            {/* Alt Bilgi */}
            <p className="mt-10 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                * Bu proje tamamen öğrenme amaçlıdır ve Instagram ile herhangi bir bağlantısı yoktur.
            </p>
        </div>
    );
};

export default About;
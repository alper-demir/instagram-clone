import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import { FiUpload, FiImage, FiTrash2 } from "react-icons/fi";
import { getUserProfile, updateUserProfile, updateUserProfilePicture } from "../../services/userService";
import { setUser } from "../../../store/userStore";

const Edit = () => {
    const [originalData, setOriginalData] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        bio: "",
        privacy: "public",
    });

    const [isChanged, setIsChanged] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState("");

    const dispatch = useDispatch();
    const { showToast } = useToast();
    const { username } = useSelector(state => state.user.user);
    const [currentUser, setCurrentUser] = useState();
    console.log(currentUser);

    const fetchUser = async () => {
        const { message, type, user } = await getUserProfile(username);
        setCurrentUser(user);
        if (type === "success") {
            setPreview(user.profilePicture);
            console.log(user);

        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    useEffect(() => {
        if (currentUser) {
            const initialData = {
                username: currentUser.username || "",
                bio: currentUser.bio || "",
                email: currentUser.email || "",
                privacy: currentUser.privacy || "public",
            };

            setFormData(initialData);
            setOriginalData(initialData);
            setPreview(currentUser.profilePicture || ""); // Mevcut profil resmini göster
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => {
            const updatedState = { ...prevState, [name]: value };
            // Sadece form verilerini kıyaslayarak isChanged güncelle
            setIsChanged(JSON.stringify(updatedState) !== JSON.stringify(originalData));
            return updatedState;
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            showToast("Dosya boyutu 5MB'dan büyük olamaz!", "warning");
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Lütfen bir görsel dosyası seçin.");
            return;
        }

        setPreview(URL.createObjectURL(file)); // ✅ Direkt URL önizleme
        setProfilePicture(file); // ✅ Dosya olarak kaydet
    };

    const handlePrivacyChange = () => {
        setFormData(prevState => {
            const updatedState = {
                ...prevState,
                privacy: prevState.privacy === "public" ? "private" : "public",
            };

            setIsChanged(JSON.stringify(updatedState) !== JSON.stringify(originalData));

            return updatedState;
        });
    };

    const handleProfileUpdate = async () => {
        // Mevcut kullanıcı bilgilerini redux store'dan al

        // Değişen alanları filtrele
        const updatedFields = Object.keys(formData).reduce((acc, key) => {
            if (formData[key] !== currentUser[key]) {
                acc[key] = formData[key]; // Sadece değişen alanları ekle
            }
            return acc;
        }, {});

        // Eğer değişiklik yoksa işlemi iptal et
        if (Object.keys(updatedFields).length === 0) {
            showToast("Hiçbir değişiklik yapılmadı.", "info");
            return;
        }

        console.log("Güncellenecek veriler:", updatedFields);

        try {
            const { message, type } = await updateUserProfile(currentUser._id, updatedFields);
            showToast(message, type);

            if (type === "success") {
                dispatch(setUser({ ...currentUser, ...updatedFields })); // Redux güncelle
            }
        } catch (error) {
            showToast("Profil güncellenirken hata!", "error");
            console.error(error);
        }
    };


    const handleRemoveImage = () => {
        setProfilePicture(null); // Base64 değerini sıfırla
        setPreview(currentUser.profilePicture || ""); // Önizlemeyi eski haline getir
    };


    const handleProfilePictureUpload = async () => {
        if (!profilePicture) return;

        const formData = new FormData();
        formData.append("profilePicture", profilePicture); // ✅ Dosya ekle

        try {
            const { message, type, profilePictureUrl } = await updateUserProfilePicture(currentUser._id, formData);
            showToast(message, type);
            if (type === "success") {
                fetchUser(); // Kullanıcı bilgilerini tekrar getir
                dispatch(setUser({
                    ...currentUser,  // Mevcut kullanıcı bilgilerini al
                    profilePicture: profilePictureUrl,  // Yeni profil resmi URL'si
                }));

            }
        } catch (error) {
            showToast("Resim yüklenirken hata oluştu!", "error");
            console.error(error);
        }
    };


    return (
        <div className="w-full mx-auto px-6 py-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Profili Düzenle</h2>

            {/* Profil Resmi Alanı */}
            <div className="flex flex-col items-center space-y-4 mb-6">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 flex items-center justify-center overflow-hidden">
                    {preview ? (
                        <img src={preview} alt="Profil Önizleme" className="w-full h-full object-cover" />
                    ) : (
                        <FiImage className="text-gray-400 text-4xl" />
                    )}
                </div>

                <label
                    htmlFor="profilePicture"
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-md text-sm transition hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <FiUpload />
                    Resim Seç
                </label>
                <input
                    type="file"
                    id="profilePicture"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {profilePicture && (
                    <div className="flex gap-2">
                        <button
                            onClick={handleProfilePictureUpload}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition cursor-pointer"
                        >
                            <FiUpload />
                            Yükle
                        </button>
                        <button
                            onClick={handleRemoveImage}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition cursor-pointer"
                        >
                            <FiTrash2 />
                            Kaldır
                        </button>
                    </div>
                )}
            </div>

            {/* Form Alanı */}
            <form className="space-y-5">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium">Kullanıcı Adı</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        disabled
                        className="cursor-not-allowed w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium">Biyografi</label>
                    <textarea
                        name="bio"
                        id="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Gizlilik Ayarı */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Gizlilik Ayarı</span>
                    <Switch
                        checked={formData.privacy === "private"}
                        onChange={handlePrivacyChange}
                        className={`${formData.privacy === "private" ? "bg-indigo-600" : "bg-gray-300"} 
                        relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                        <span
                            className={`${formData.privacy === "private" ? "translate-x-6" : "translate-x-1"} 
                            inline-block h-4 w-4 transform bg-white rounded-full transition`}
                        />
                    </Switch>
                </div>

                <button
                    type="button"
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md text-sm not-disabled:hover:bg-indigo-700 transition cursor-pointer disabled:cursor-not-allowed"
                    onClick={handleProfileUpdate}
                    disabled={!isChanged}
                >
                    Kaydet
                </button>
            </form>
        </div>
    );

};

export default Edit;
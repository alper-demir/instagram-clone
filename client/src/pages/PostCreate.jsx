import { useState } from "react";
import { uploadMediaToCloudinary, createPost } from "../services/postService";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { MdOutlineCloudUpload } from "react-icons/md";

const PostCreate = () => {
    const [files, setFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [caption, setCaption] = useState("");
    const [error, setError] = useState("");
    const userId = useSelector(state => state.user.user._id);

    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);

        // Dosya boyutu kontrolü
        const invalidFiles = selectedFiles.filter(file => file.size > MAX_FILE_SIZE);
        if (invalidFiles.length > 0) {
            setError("Hiçbir dosyanın boyutu 2MB'yi geçemez.");
            return;
        }

        if (selectedFiles.length + files.length > 5) {
            setError("En fazla 5 medya yükleyebilirsiniz.");
            return;
        } else {
            setError(""); // Hata mesajını temizle
        }

        const newFiles = [...files, ...selectedFiles].slice(0, 5);
        setFiles(newFiles);

        const urls = newFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    const removeFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        const newPreviewUrls = previewUrls.filter((_, i) => i !== index);

        setFiles(newFiles);
        setPreviewUrls(newPreviewUrls);

        if (newFiles.length < 5) setError(""); // Kullanıcı medya kaldırınca hata mesajını temizle
    };

    const handleSubmit = async () => {
        if (files.length === 0) {
            alert("Lütfen en az bir medya seçin!");
            return;
        }

        try {
            const mediaUrls = await uploadMediaToCloudinary(files);
            const postData = { caption, media: mediaUrls, userId };
            await createPost(postData);
            alert("Post başarıyla oluşturuldu!");
            setFiles([]);
            setPreviewUrls([]);
            setCaption("");
        } catch (error) {
            alert("Post oluşturulurken hata oluştu.");
        }
    };

    const isVideo = (file) => {
        const videoTypes = ["video/mp4", "video/webm", "video/ogg"];
        return videoTypes.includes(file.type);
    };

    return (
        <div className="min-h-screen">
            <div className="w-full my-4 overflow-x-hidden md:p-10 p-2 text-wrap break-all flex justify-center items-center">
                <div className="w-2xl mx-auto p-5 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Yeni Post Oluştur</h2>

                    {/* Dosya Yükleme Input */}
                    <label className="block cursor-pointer">
                        <input
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="flex items-center justify-center w-full h-40 border-2 border-dashed rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover cursor-pointer transition gap-x-2">
                            <MdOutlineCloudUpload className="text-2xl" />
                            <span>Medya Yükle (Max 5)</span>
                        </div>
                    </label>

                    {/* Hata Mesajı */}
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    {/* Önizleme Alanı */}
                    {previewUrls.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-3">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="relative w-full md:w-[48.8%] lg:w-[49%] xl:w-[49%]">
                                    {/* Medya Kartı */}
                                    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg relative">
                                        {isVideo(files[index]) ? (
                                            <video
                                                src={url}
                                                className="w-full h-full object-cover"
                                                controls
                                            />
                                        ) : (
                                            <img
                                                src={url}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>

                                    {/* Silme Butonu */}
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 shadow-md hover:bg-black/80 transition"
                                    >
                                        <AiOutlineClose size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Açıklama Alanı */}
                    <div className="relative w-full mt-4">
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Bir şeyler yaz..."
                            className="w-full p-4 h-40 resize-none border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                        />
                        {/* Karakter Sayısı */}
                        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                            {caption.length}/300
                        </div>
                    </div>


                    {/* Paylaş Butonu */}
                    <button
                        onClick={handleSubmit}
                        className="w-full py-2 rounded-lg mt-4 font-bold transition bg-blue-500 not-disabled:hover:bg-blue-600 text-white disabled:cursor-not-allowed cursor-pointer"
                        disabled={files.length === 0}
                    >
                        Paylaş
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCreate;
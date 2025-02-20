import multer from "multer";

// Bellek (memory storage) kullanarak dosyayı geçici olarak RAM'de tut
const storage = multer.memoryStorage();

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB sınırı
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Sadece resim dosyaları yüklenebilir!"), false);
        }
        cb(null, true);
    }
});

export default upload;
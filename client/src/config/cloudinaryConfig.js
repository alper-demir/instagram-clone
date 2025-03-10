import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dskwohumm",
  api_key: import.meta.env.VITE_CLOUDINARY_API_KEY || "696215464711432",
  api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET || "bktyGQ7XvZba1Es4BX-rRqjdA1Y",
});

export default cloudinary;
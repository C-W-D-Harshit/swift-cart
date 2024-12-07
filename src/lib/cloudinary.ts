import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
export async function handleUpload(file: string, folder: string) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "swift-cart/"+folder,
  });
  return res;
}

export default cloudinary;

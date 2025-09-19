import { api } from "./api"; // api ni import qiling

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await api.post("upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Upload javobi:", res.data);
    return res.data; // server qaytargan obyektni qaytaramiz
  } catch (error) {
    console.error("❌ Rasm yuklashda xatolik:", error);
    throw error;
  }
};

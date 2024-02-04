import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";

export const uploadImage = async (file) => {
  const storageRef = ref(storage, file.name);
  await uploadBytes(storageRef, file);
  const downloadImageUrl = await getDownloadURL(storageRef);

  return downloadImageUrl;
};

export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload && payload.exp ? payload.exp < currentTime : true;
  } catch (error) {
    console.error("Error: ", error);
    return true;
  }
};

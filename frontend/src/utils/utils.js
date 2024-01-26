import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";

export const uploadImage = async (file) => {
  const storageRef = ref(storage, file.name);
  await uploadBytes(storageRef, file);
  const downloadImageUrl = await getDownloadURL(storageRef);

  return downloadImageUrl;
};

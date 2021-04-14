import { useState } from "react";

const useArt = (initPlaceHolder: string) => {
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(initPlaceHolder);
  const setArt = async (files: FileList) => {
    let url: string;
    setLoading(true);
    const fileList = files;
    const data = new FormData();
    const { signature, timestamp } = await getSignature(); // Get returned sign and timestamp
    data.append("file", fileList[0]);
    data.append("signature", signature); // Signature
    data.append("timestamp", timestamp); // Timestamp
    data.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
        mode: "cors",
      }
    );
    const file = await res.json();
    url = await file.secure_url;
    let reader = new FileReader();
    reader.onload = (e) => {
      setPlaceholder(e.target.result as string);
      setLoading(false);
    };
    reader.readAsDataURL(fileList[0]);
    return { url };
  };
  return { loading: loading, setArt, placeholder };
};

async function getSignature() {
  //Call API which handles the signature and timestamp
  const response = await fetch("/api/cloud_sign");
  //Get the response in JSON format
  const data = await response.json();
  //Extract signature and timestamp
  const { signature, timestamp } = data;
  return { signature, timestamp };
}

export default useArt;

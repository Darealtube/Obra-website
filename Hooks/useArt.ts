import { useState } from "react";

/* 
 useArt handles the art load when you upload a file while creating a post,
 when changing your backdrop or avatar, and anything that requires changing
 an image. What it does is to first set loading to true, and while it's true,
 it calls upon the Cloudinary API in order to make a POST request that will
 submit the image and place it there. Then, setArt will get the post data that
 is returned by Cloudinary, namely the secure_url, the width, and the height of
 the image. Then the FileReader will load a temporary image to be loaded client side,
 and it will return the url, the width, and the height of the image. useArt returns
 the setArt function, the loading state, and the placeholder (returned by FileReader). 
 */

const useArt = (initPlaceHolder: string) => {
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(initPlaceHolder);
  const setArt = async (files: FileList) => {
    let url: string;
    let width: number, height: number;
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
    width = await file.width;
    height = await file.height;
    let reader = new FileReader();
    reader.onload = (e) => {
      setPlaceholder(e.target.result as string);
      setLoading(false);
    };
    reader.readAsDataURL(fileList[0]);
    return { url, width, height };
  };
  return { loading, setArt, placeholder };
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

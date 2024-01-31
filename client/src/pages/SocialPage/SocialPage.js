import "./SocialPage.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import exifr from "exifr";
import { storage } from "../../component/FireBase/FireBase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import axios from "axios";

import { fromBlob } from "image-resize-compress";
import { v4 as uuidv4 } from "uuid";

const SocialPage = ({ setIsToken }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [imageUpload, setImageUpload] = useState(null);
  const [newConvertedImage, setNewConvertedImage] = useState(null);

  const handleBlob = (blobFile) => {
    // quality value for webp and jpeg formats.
    const quality = 50;
    // output width. 0 will keep its original width and 'auto' will calculate its scale from height.
    const width = 0;
    // output height. 0 will keep its original height and 'auto' will calculate its scale from width.
    const height = 0;
    // file format: png, jpeg, bmp, gif, webp. If null, original format will be used.
    const format = "jpeg";
    // note only the blobFile argument is required
    fromBlob(blobFile, quality, width, height, format).then((blob) => {
      // will output the converted blob file
      // console.log(blob);
      setNewConvertedImage(blob);
      // will generate a url to the converted file
      // blobToURL(blob).then((url) => console.log(url));
    });
  };

  const [gpsLongLat, setGpsLongLat] = useState([]);
  // const [downloadImg, setDownloadImg] = useState(null);

  const getGPS = async (findImgURL) => {
    const { longitude, latitude } = await exifr.gps(findImgURL);
    setGpsLongLat([longitude.toFixed(4), latitude.toFixed(4)]);
  };

  const uploadImage = async (event) => {
    event.preventDefault();
    if (!newConvertedImage) return;
    // console.log(newConvertedImage);
    const imageRef = ref(storage, `images/${uuidv4()}`);
    try {
      const snapshot = await uploadBytes(imageRef, newConvertedImage);
      console.log("image uploaded");
      const downloadURL = await getDownloadURL(snapshot.ref);

      const formDetail = {
        img_link: downloadURL,
        longitude: gpsLongLat[0],
        latitude: gpsLongLat[1],
      };

      console.log(formDetail);

      await axios.post(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/postImage/`,
        formDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      setIsToken(false);
      navigate("/");
    }
  }, []);

  return (
    <main>
      <h1>Social Page</h1>
      <form onSubmit={uploadImage}>
        <label htmlFor="picture">Click here to upload pictures</label>
        <input
          type="file"
          name="picture"
          id="picture"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
            getGPS(URL.createObjectURL(event.target.files[0]));
            handleBlob(event.target.files[0]);
          }}
        />
        <button>Submit images</button>
      </form>
    </main>
  );
};
export default SocialPage;

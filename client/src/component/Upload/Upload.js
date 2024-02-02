import "./Upload.scss";
import { useState } from "react";
import exifr from "exifr";
import { storage } from "../../component/FireBase/FireBase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import axios from "axios";

import { fromBlob } from "image-resize-compress";
import { v4 as uuidv4 } from "uuid";

import Button from "@mui/material/Button";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { TextField } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

const Upload = ({ setIsUpdate }) => {
  const token = sessionStorage.getItem("token");

  const [gpsLongLat, setGpsLongLat] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [newConvertedImage, setNewConvertedImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  const handleBlob = (blobFile) => {
    const quality = 25;
    const width = 0;
    const height = 0;
    const format = "jpeg";
    fromBlob(blobFile, quality, width, height, format).then((blob) => {
      setNewConvertedImage(blob);
    });
  };

  const getGPS = async (findImgURL) => {
    const { longitude, latitude } = await exifr.gps(findImgURL);
    setGpsLongLat([longitude.toFixed(4), latitude.toFixed(4)]);
  };

  const uploadImage = async (event) => {
    event.preventDefault();

    if (!newConvertedImage) return;
    const imageRef = ref(storage, `images/${uuidv4()}`);
    try {
      const snapshot = await uploadBytes(imageRef, newConvertedImage);
      console.log("image uploaded");
      const downloadURL = await getDownloadURL(snapshot.ref);

      const postDetail = {
        description: message,
      };

      const { data: postId } = await axios.post(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/post/`,
        postDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(postId);

      const imageDetail = {
        post_id: postId,
        img_link: downloadURL,
        longitude: gpsLongLat[0],
        latitude: gpsLongLat[1],
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/post/image/`,
        imageDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setImageUpload(null);
      setMessage("");
      setIsUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="upload">
      {!imageUpload ? (
        ""
      ) : (
        <img
          src={URL.createObjectURL(imageUpload)}
          alt="Upload"
          className="upload__img"
        />
      )}
      <div className={!imageUpload ? "" : "upload__button--hidden"}>
        <Button
          component="label"
          variant="contained"
          fullWidth
          startIcon={<PhotoCameraIcon />}
        >
          Select Picture
          <input
            type="file"
            name="picture"
            id="picture"
            className="upload__input"
            accept="image/*,.png,.jpg,.jpeg,.gif"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
              getGPS(URL.createObjectURL(event.target.files[0]));
              handleBlob(event.target.files[0]);
            }}
          />
        </Button>
      </div>

      <TextField
        id="post"
        name="post"
        label="Post Description"
        value={message}
        multiline
        maxRows={4}
        fullWidth
        required
        onChange={handleChange}
      />

      <Button
        variant="contained"
        onClick={uploadImage}
        startIcon={<PublishIcon />}
      >
        Submit Post
      </Button>
    </form>
  );
};
export default Upload;

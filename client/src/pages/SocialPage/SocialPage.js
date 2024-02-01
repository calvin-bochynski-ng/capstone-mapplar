import "./SocialPage.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import exifr from "exifr";
import { storage } from "../../component/FireBase/FireBase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import axios from "axios";

import { fromBlob } from "image-resize-compress";
import { v4 as uuidv4 } from "uuid";

import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TextField } from "@mui/material";

const SocialPage = ({ setIsToken }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [gpsLongLat, setGpsLongLat] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [newConvertedImage, setNewConvertedImage] = useState(null);
  const [message, setMessage] = useState(null);

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

      console.log(postId);

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
      <form className="upload">
        {/* <label htmlFor="picture">Click here to upload pictures</label> */}
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
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

        {/* <label htmlFor="post">Please add a description to the post:</label>
        <textarea name="post" id="post" /> */}
        <TextField
          id="post"
          name="post"
          label="Post Description"
          multiline
          maxRows={4}
          fullWidth
          required
          onChange={handleChange}
        />
        <button onClick={uploadImage}>Submit images</button>
      </form>
    </main>
  );
};
export default SocialPage;

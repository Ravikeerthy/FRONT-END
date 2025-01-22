import React, { useRef, useState } from "react";
import { uploadImage } from "../API";

const UploadImage = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const fileInput = useRef();

  const handleImageUpload = async () => {
    setFile(fileInput.current.files[0]);
    setFileName(fileInput.current.files[0].name);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log([...formData]);
    formData.append("fileName", fileName);

    try {
      const response = await uploadImage(formData);
      console.log("UploadResponse: ", response);
      
    } catch (error) {
        alert("Error uploading image");
        console.error(error); 
    }
  };
  return (
    <div>
      <div className="form-group">
        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          ref={fileInput}
          className="form-control mb-3"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <button onClick={handleUpload} className="btn btn-secondary">Upload Image</button>
      </div>
    </div>
  );
};

export default UploadImage;

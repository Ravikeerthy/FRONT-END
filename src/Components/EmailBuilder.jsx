import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getAllTemplates,
  getEmailLayout,
  renderAndDownloadTemplate,
  uploadEmailConfig,
  uploadImage,
} from "../API";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadImage from "./UploadImage";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import Editor from "./Editor";

const EmailBuilder = () => {
  const [layoutHtml, setLayoutHtml] = useState("");
  const [emailConfig, setEmailConfig] = useState({
    imageURL: "",
    title: "Default Title",
    content: "Default Content",
    footer: "Default Footer",
  });
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  const fetchLayout = async () => {
    try {
      const data = await getEmailLayout();
      setLayoutHtml(data);
    } catch (err) {
      console.error("Error fetching layout:", err);
    }
  };

  const fetchTemplates = async () => {
    try {
      const data = await getAllTemplates();
      setTemplates(data);
    } catch (err) {
      console.error("Error fetching templates:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setEmailConfig((prev) => ({ ...prev, content: value }));
  };

  const handleFooterChange = (value) => {
    setEmailConfig((prev) => ({ ...prev, footer: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    try {
      const data = await uploadImage(formData);
      setEmailConfig((prev) => ({ ...prev, imageURL: data.imageURL }));
      alert("Image uploaded successfully!");
      e.target.value = null;
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image.");
    }
  };

  const handleSaveConfig = async () => {
    try {
      const data = await uploadEmailConfig(emailConfig);
      alert("Email configuration saved successfully.");
    } catch (err) {
      console.error("Error saving email config:", err);
      alert("Failed to save configuration.");
    }
  };

  const handleDownload = async () => {
    try {
      const html = `
      <html>
        <head>
          <title>${emailConfig.title}</title>
        </head>
        <body>
          <h1>${emailConfig.title}</h1>
          <p>${emailConfig.content}</p>
          ${
            emailConfig.imageURL
              ? `<img src="${emailConfig.imageURL}" alt="Email Image" />`
              : ""
          }
          <footer>${emailConfig.footer}</footer>
        </body>
      </html>
    `;
      const blob = await renderAndDownloadTemplate(emailConfig);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "email-template.html");
      document.body.appendChild(link);
      link.click();
      alert("Template downloaded successfully!");
    } catch (error) {
      console.error("Error downloading template:", error);
      alert("Failed to download template.");
    }
  };

  useEffect(() => {
    fetchLayout();
    fetchTemplates();
  }, []);

  return (
    <div>
      <div className="container mt-4">
        <h2 className="mb-4">Email Template Builder</h2>
        <button
          className="btn btn-success position-absolute"
          style={{ top: "100px", right: "100px" }}
          onClick={handleDownload}
        >
          Download Template
        </button>
        <div className="row">
          {/* Preview Section (Left) */}
          <div className="col-md-9">
            <h4>Preview</h4>
            <div className="border p-3 text-center">
            <Editor 
              title={emailConfig.title} 
              content={emailConfig.content} 
              footer={emailConfig.footer} 
            />
             
            </div>
          </div>

          {/* Editor Section (Right) */}
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control mb-3"
                value={emailConfig.title}
                onChange={handleInputChange}
                placeholder="Edit Title"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="content">Content</label>
              <ReactQuill
                className="form-control mb-3"
                value={emailConfig.content}
                onChange={handleContentChange}
                theme="snow"
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline"],
                    [{ align: [] }],
                    ["link"],
                    [{ color: [] }, { background: [] }],
                    ["image"],
                    ["blockquote"],
                    [{ size: ["small", "medium", "large", "huge"] }],
                  ],
                }}
                // style={{ height: "100px" }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="footer">Footer</label>
              <ReactQuill
                className="form-control mb-3"
                value={emailConfig.footer}
                onChange={handleFooterChange}
                theme="snow"
                modules={{
                  toolbar: [
                    [{ font: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline"],
                    [{ align: [] }],
                    [{ color: [] }, { background: [] }],
                    ["image"],
                    ["blockquote"],
                    [{ size: ["small", "medium", "large", "huge"] }],
                  ],
                }}
                // style={{ height: "100px" }}
              />
            </div>

            {/* <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                className="form-control mb-3"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div> */}
            <UploadImage />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-primary me-2" onClick={handleSaveConfig}>
            Save Configuration
          </button>

          <button
            className="btn btn-info"
            onClick={() => navigate("/getTemplate")}
          >
            Get All Templates
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailBuilder;

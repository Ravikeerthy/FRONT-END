import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Default background image URL
const DEFAULT_BACKGROUND_IMAGE = "https://via.placeholder.com/1200x800/007BFF/FFFFFF?text=Your+Custom+Background+Here";

const ClientTemplateEditor = () => {
  const [editorValue, setEditorValue] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(DEFAULT_BACKGROUND_IMAGE);  // Inbuilt default background image
  const [title, setTitle] = useState("Enter Title Here");
  const [content, setContent] = useState("Enter content here...");
  const [footer, setFooter] = useState("Enter footer here...");

  const handleBackgroundChange = (e) => {
    setBackgroundImage(e.target.value);
  };

  const handleSave = () => {
    const templateData = {
      title,
      content: editorValue,
      footer,
      backgroundImage,
    };
    console.log("Saved Template:", templateData);
    alert("Template Saved!");
  };

  const handleDiscard = () => {
    setEditorValue(content);
    setTitle("Enter Title Here");
    setFooter("Enter footer here...");
    setBackgroundImage(DEFAULT_BACKGROUND_IMAGE);  // Revert to default background image
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <h1>Client Template Editor</h1>

      {/* Input for Background Image URL */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="background-image">Background Image URL: </label>
        <input
          type="text"
          id="background-image"
          value={backgroundImage}
          onChange={handleBackgroundChange}
          placeholder="Enter background image URL (optional)"
          className="form-control"
        />
      </div>

      {/* Template Preview Area */}
      <div
        style={{
          width: "80%",
          height: "400px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          background: `url(${backgroundImage}) no-repeat center center`,
          backgroundSize: "cover",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            background: "transparent",
            border: "none",
            color: "#fff",
            padding: "5px 10px",
          }}
        />
        <ReactQuill
          value={editorValue}
          onChange={setEditorValue}
          theme="snow"
          placeholder="Enter content here..."
          style={{
            flex: "1",
            marginBottom: "20px",
            background: "transparent",
            color: "#fff",
            border: "none",
          }}
        />
        <textarea
          value={footer}
          onChange={(e) => setFooter(e.target.value)}
          style={{
            fontSize: "14px",
            fontStyle: "italic",
            background: "transparent",
            border: "none",
            color: "#fff",
            padding: "5px 10px",
          }}
        />
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={handleSave} className="btn btn-primary">
          Save Template
        </button>
        <button onClick={handleDiscard} className="btn btn-secondary">
          Discard Changes
        </button>
      </div>
    </div>
  );
};

export default ClientTemplateEditor;

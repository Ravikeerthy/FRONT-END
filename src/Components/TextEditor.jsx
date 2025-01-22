import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";

const TextEditor = () => {
  const [editorValue, setEditorValue] = useState("");
  const [originalValue, setOriginalValue] = useState("");



  const modules = {
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
  };

  const handleSave = () => {
    setOriginalValue(editorValue); 
    alert("Content Saved!");
  };

  
  const handleDiscard = () => {
    setEditorValue(originalValue); 
  };
  return (
   <div
      style={{
        display: "grid",
        gridTemplateColumns: "30% 70%",
        gap: "20px",
       
        padding: "10px",
      }}
    >
      
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h3>Drag Items</h3>
        {["Item 1", "Item 2", "Image URL", "Special Content"].map((item) => (
          <div
            key={item}
            draggable
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f7f7f7",
              cursor: "grab",
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Text Editor */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <h3>Text Editor</h3>
        <ReactQuill
          value={editorValue}
          onChange={setEditorValue}
          modules={modules}
          theme="snow"
          style={{ height: "300px" }}
        />
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleSave}
            className="btn btn-primary"
            style={{ margin: "30px" }}
          >
            Save
          </button>
          <button onClick={handleDiscard} className="btn btn-secondary" >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;

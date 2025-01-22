import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditorWithDndKit = () => {
  const [editorValue, setEditorValue] = useState("");
  const [originalValue, setOriginalValue] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  // Draggable Item Component
  const DraggableItem = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id,
    });

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f7f7f7",
          cursor: isDragging ? "grabbing" : "grab",
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {children}
      </div>
    );
  };

  // Droppable Area (Editor)
  const DroppableArea = () => {
    const { setNodeRef } = useDroppable({
      id: "editor-area",
    });

    return (
      <div
        ref={setNodeRef}
        style={{
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "10px",
          minHeight: "300px",
          background: `url(${backgroundImage}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      >
        <h3>Text Editor</h3>
        <ReactQuill
          value={editorValue}
          onChange={setEditorValue}
          theme="snow"
          style={{ height: "300px" }}
        />
      </div>
    );
  };

  const handleSave = () => {
    setOriginalValue(editorValue);
    alert("Content Saved!");
  };

  const handleDiscard = () => {
    setEditorValue(originalValue);
  };

  const handleBackgroundChange = (e) => {
    setBackgroundImage(e.target.value);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "30% 70%",
        gap: "20px",
        height: "100vh",
        padding: "10px",
      }}
    >
      {/* Draggable Items Section */}
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
        {["Item 1", "Item 2", "Image URL", "Special Content"].map((item, index) => (
          <DraggableItem key={index} id={item}>
            {item}
          </DraggableItem>
        ))}
      </div>

      {/* Droppable Area (Editor) */}
      <div>
        <DndContext onDragEnd={(e) => console.log(e)}>
          <DroppableArea />
        </DndContext>

        {/* Background Image Input */}
        <div style={{ marginTop: "20px" }}>
          <label>Background Image URL:</label>
          <input
            type="text"
            value={backgroundImage}
            onChange={handleBackgroundChange}
            placeholder="Enter image URL"
            className="form-control mb-3"
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleSave}
            className="btn btn-primary"
            style={{ marginRight: "10px" }}
          >
            Save
          </button>
          <button onClick={handleDiscard} className="btn btn-secondary">
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditorWithDndKit;

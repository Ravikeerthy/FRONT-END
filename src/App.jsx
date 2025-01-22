import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TemplateEditor from "./Components/TemplateEditor";
import TextEditor from "./Components/TextEditor";
import TextEditorWithDndKit from "./Components/TextEditorWithDndKit ";
import ClientTemplateEditor from "./Components/ClientTemplateEditor";
import EmailBuilder from "./Components/EmailBuilder";
import UploadImage from "./Components/UploadImage";
import GetTemplate from "./Components/GetTemplate";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Email Builder</h1>
      {/* <TextEditor /> */}
      {/* <TextEditorWithDndKit /> */}
      {/* <ClientTemplateEditor /> */}
      {/* <TemplateEditor /> */}
      {/* <EmailBuilder /> */}
      {/* <UploadImage/>
      <GetTemplate/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmailBuilder />} />
          <Route path="/getTemplate" element={<GetTemplate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

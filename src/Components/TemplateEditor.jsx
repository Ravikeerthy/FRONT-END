import React, { useEffect, useState } from 'react'
import { getEmailLayout, renderAndDownloadTemplate, uploadEmailConfig } from '../API';
import Editor from './Editor';
import UploadImage from './UploadImage';
import TextEditor from './TextEditor';

const TemplateEditor = () => {
    const[layout, setLayout] = useState('');
    const[fields, setFields] = useState(
       { title: "",
        content: "",
        footer: "",
        imageUrl: ""
    }
    );

    useEffect(()=>{
        const fetchLayout = async()=>{
            const html = await getEmailLayout();
            setLayout(html);
        }
        fetchLayout();
    },[]);

    const handleSave = async() => {
        const config = {
            ...content,
            html: layout,
        };
        await uploadEmailConfig(config);
        alert("Configuration Saved!")
    }

    const handleDownload = async() => {
        const config = {
            ...content,
            html: layout,
        };
        const blob = await renderAndDownloadTemplate(config);
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'template.html');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }
  return (
    <div>
    <Editor content={layout} onChange={(value) => setLayout(value)} />
    <TextEditor />
    <div className="row mt-4">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Title"
          value={fields.title}
          onChange={(e) => setFields({ ...fields, title: e.target.value })}
        />
        <textarea
          className="form-control mb-3"
          placeholder="Content"
          rows="5"
          value={fields.content}
          onChange={(e) => setFields({ ...fields, content: e.target.value })}
        />
        <textarea
          className="form-control mb-3"
          placeholder="Footer"
          rows="3"
          value={fields.footer}
          onChange={(e) => setFields({ ...fields, footer: e.target.value })}
        />
      </div>
      <div className="col-md-6">
        <UploadImage onUpload={(url) => setFields({ ...fields, imageUrl: url })} />
      </div>
    </div>

    <div className="d-flex justify-content-between mt-4">
      <button className="btn btn-primary" onClick={handleSave}>
        Save Configuration
      </button>
      <button className="btn btn-success" onClick={handleDownload}>
        Download Template
      </button>
    </div>
  </div>
  )
}

export default TemplateEditor

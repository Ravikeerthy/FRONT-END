import React, { useEffect, useState } from 'react'
import { getAllTemplates, uploadImage } from '../API';


const GetTemplate = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchTemplates = async () => {
        try {
            const response = await getAllTemplates();
            setTemplates(response);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to load templates");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    if (loading) return <p>Loading templates...</p>;
    if (error) return <p>{error}</p>;

  return (
  <div>
            <h1>All Templates</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {templates.map((template) => (
                    <div
                        key={template._id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "16px",
                            width: "200px",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src={uploadImage()} 
                            alt={template.name}
                            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                        />
                        <h3>{template.title}</h3>
                        <p>{template.content}</p>
                        <h6>{template.footer}</h6>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default GetTemplate

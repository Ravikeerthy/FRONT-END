import React from 'react';

const Editor = ({ title, content, footer }) => (
  <div className="card mb-4">
    <div className="card-header">HTML Layout Editor</div>
    <div className="card-body">
      
      <div
        style={{ textAlign: 'center' }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      
      <div
        style={{ textAlign: 'left' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      <div
        style={{ textAlign: 'left' }}
        dangerouslySetInnerHTML={{ __html: footer }}
      />
    </div>
  </div>
);

export default Editor;

// App.js
import React, { useState } from 'react';
import Viewer from './3DViewer';

const App = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    const fileType = uploadedFile.name.split('.').pop();
    setFile(URL.createObjectURL(uploadedFile));
    setFileType(fileType);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {file && <Viewer file={file} fileType={fileType} />}
    </div>
  );
};

export default App;

import { useState } from "react";
import Layout from "../components/Layout";

function FileUpload() {
  const [task, setTask] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleUpload = (event) => {
    event.preventDefault();

    if (!task || !selectedFile) {
      alert("Select a task and file.");
      return;
    }

    const newFile = {
      id: Date.now(),
      name: selectedFile.name,
      size: (selectedFile.size / 1024).toFixed(1) + " KB",
      task,
      uploadedDate: new Date().toLocaleDateString(),
      url: URL.createObjectURL(selectedFile),
    };

    setFiles([...files, newFile]);
    setSelectedFile(null);
    event.target.reset();
  };

  const handleDelete = (id) => {
    const file = files.find((item) => item.id === id);

    if (window.confirm("Delete this file?")) {
      if (file) URL.revokeObjectURL(file.url);
      setFiles(files.filter((item) => item.id !== id));
    }
  };

  return (
    <Layout>
      <div className="files-page">
        <div className="files-header">
          <h1>File Management</h1>
          <p>Upload and manage files related to tasks.</p>
        </div>

        <form className="upload-panel" onSubmit={handleUpload}>
          <h2>Upload File</h2>

          <div className="upload-form">
            <div className="upload-field">
              <label>Select Task</label>
              <select
                value={task}
                onChange={(event) => setTask(event.target.value)}
                required
              >
                <option value="">Choose a task</option>
                <option value="Design Login Page">Design Login Page</option>
                <option value="Create JWT Authentication">
                  Create JWT Authentication
                </option>
                <option value="Build Dashboard">Build Dashboard</option>
              </select>
            </div>

            <div className="upload-field">
              <label>Select File</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                onChange={(event) =>
                  setSelectedFile(event.target.files[0])
                }
                required
              />
            </div>

            <button type="submit" className="upload-button">
              Upload File
            </button>
          </div>

          {selectedFile && (
            <p className="selected-file">
              Selected: {selectedFile.name}
            </p>
          )}
        </form>

        <div className="files-list-panel">
          <h2>Uploaded Files</h2>

          <div className="files-list">
            {files.map((file) => (
              <div className="uploaded-file" key={file.id}>
                <div className="file-icon">FILE</div>

                <div className="file-information">
                  <h3>{file.name}</h3>
                  <p>
                    {file.task} · {file.size} · {file.uploadedDate}
                  </p>
                </div>

                <div className="file-actions">
                  <a
                    href={file.url}
                    download={file.name}
                    className="download-file-button"
                  >
                    Download
                  </a>

                  <button
                    className="delete-file-button"
                    onClick={() => handleDelete(file.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {files.length === 0 && (
              <div className="no-files">No files uploaded yet.</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FileUpload;
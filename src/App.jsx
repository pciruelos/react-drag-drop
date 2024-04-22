import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

function App() {
  // const [file, setFile] = useState();
  const onDrop = useCallback((acceptedFiles) => {
    //
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("upload_preset", "reactdrop");
    formData.append("api_key", "833748293453844");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/cirucloud/image/upload",
      { method: "POST", body: formData }
    );
    const data = await res.json();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
        <div {...getRootProps()} style={{border: "5px solid red", padding:"15px"}}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        {acceptedFiles[0] && (
        <img src={URL.createObjectURL(acceptedFiles[0])} style={{width: '300px', height: '300px'}}/>
        )}
        <button>Send</button>
      </form>
    </div>
  );
}

export default App;

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


function App() {
  //state
  const [file, setFile] = useState(null);
  // original images
  const [images, setImages] = useState([
    {
      original: 'https://picsum.photos/id/1010/1000/600/',
      thumbnail: 'https://picsum.photos/id/1010/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
  ]);
  //ondrop
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });
  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "reactdrop");
    formData.append("api_key", "833748293453844");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/cirucloud/image/upload",
      { method: "POST", body: formData }
    );
    const data = await res.json();

    // Add to images array
    setImages(prevImages => [...prevImages, {
      original: data.secure_url,
      thumbnail: data.secure_url,
    }]);
  };
  
  
  return (
    <div className="container">
      <ImageGallery items={images}/>
      <form onSubmit={handleSubmit} className="formControl">
        {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
        <div {...getRootProps()} style={{border: "5px solid red", padding:"15px"}}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        {file && (
          <img src={URL.createObjectURL(file)} style={{width: '300px', height: '300px'}}/>
        )}
        <button className="button" type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;

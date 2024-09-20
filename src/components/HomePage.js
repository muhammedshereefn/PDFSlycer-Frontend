import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { pdfjs } from 'react-pdf';
import PdfComp from './PdfComp';
import { FaBars, FaSignOutAlt, FaTrash } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function HomePage() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    getPdf();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/signin');
    }
}, [navigate]);

  const getPdf = async () => {
    const userId = localStorage.getItem('userId'); 

    const result = await axios.get(`http://localhost:5001/api/pdf/get-files/${userId}`);
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId'); 

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('userId', userId); 


    const result = await axios.post('http://localhost:5001/api/pdf/upload-files', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    });
    if (result.data.status === 'OK') {
      toast.success('Uploaded successfully!');
      getPdf();
    }
  };

  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:5001/files/${pdf}`);
  };

  const deletePdf = async (pdfId) => {
    try {
      await axios.delete(`http://localhost:5001/api/pdf/delete-file/${pdfId}`);
      getPdf();
      toast.success('Deleted successfully!');
    } catch (error) {
      toast.error('Error deleting PDF!');
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/signin'); // Redirect to sign-in page after logout
    }
  };

  return (
    <div style={{backgroundColor:"red"}}>
      <Toaster position="top-right" reverseOrder={false} />
  <nav className="navbar navbar-light" style={{ height: '50px', width: '100%' }}>
  <img 
      src="/signature.png" 
      alt="Logo"
      style={{ height: '80px', width: 'auto' }} 
    />
    <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
    <FaSignOutAlt 
            style={{ fontSize: '30px', color: 'black', cursor: 'pointer' }} 
            onClick={handleLogout} // Use the logout icon
          />
    <FaBars style={{ fontSize: '25px', color: 'red' }} />
        </div>
</nav>

    <div className="container">
      <div className="left-section">
        <form className="formStyle p-4 shadow-lg  bg-light" onSubmit={submitImage}>
  <h4 className="text-center fw-bold text-uppercase mb-4 text-danger">Upload Your PDF</h4>

  <div className="mb-3">
    <label htmlFor="title" className="form-label fw-bold">
      Title
    </label>
    <input
      type="text"
      className="form-control"
      id="title"
      placeholder="Enter PDF Title"
      required
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="fileUpload" className="form-label fw-bold">
      Choose PDF File
    </label>
    <input
      type="file"
      className="form-control"
      id="fileUpload"
      accept="application/pdf"
      required
      onChange={(e) => setFile(e.target.files[0])}
    />
  </div>

  <div className="d-grid gap-2">
    <button className="btn btn-danger btn-block fw-bold" type="submit" style={{borderRadius:"30px"}}>
      <i className="bi bi-upload"></i> SUBMIT
    </button>
  </div>
</form>


        <div className="uploaded">
          <h5 style={{color:"white"}}>UPLOADED PDFs</h5>
          <div className="output-div">
            {allImage == null
              ? ''
              : allImage.map((data) => {
                  return (
                    <div className="inner-div" key={data._id}>
                      <h6>Title: {data.title}</h6>
                      <button className="btn btn-dark" onClick={() => showPdf(data.pdf)} style={{ marginRight: '5px' }}>
                        Show PDF
                      </button>
                      <button className="btn btn-light" onClick={() => deletePdf(data._id)}>
                        <FaTrash /> 
                      </button>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>

      <div className="right-section">
        {pdfFile ? (
          <PdfComp pdfFile={pdfFile} />
        ) : (
          <div className="empty-message-container">
      <p>No PDF selected.</p>
      <p>Please select a PDF from the uploaded list to view and select.</p>
      <img
        src="/vecteezy_3d-cute-kid-character-confused-on-a-laptop_34618258.png" 
        alt="No PDF"
        style={{ width: '200px', height: 'auto', marginTop: '20px' }}
      />
    </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default HomePage;

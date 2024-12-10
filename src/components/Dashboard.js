import React, { useEffect, useState, useRef } from "react";
// import { LineChart, XAxis, YAxis, Line } from "recharts";
import { getAuth } from "firebase/auth";
import EditPopup from './EditPopup';
// import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getStorage,
} from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { app, storage } from "../firebase";
import { ReactComponent as LogoutIcon } from "../logout.svg"; // Import the logout SVG icon
import "../App.css"; // Ensure to include the CSS
import "../css/Dashboard.css"; // Ensure to include the CSS
import Loader from "./Loader";
import { Link } from "react-router";


function Dashboard({ candidates }) {
  const [candidatesData, setCandidatesData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [files, setFiles] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [selectedCandidate, setSelectedCandidate] = useState(null); // State to hold the selected candidate for editing
  const [isEditPopupOpen, setEditPopupOpen] = useState(false); // State to manage popup visibility

  useEffect(() => {
    setLoader(true);
    fetchCandidates();
    fetchFiles();
  }, []);

  const fetchCandidates = async () => {
    const querySnapshot = await getDocs(collection(db, "BDProfiles"));
    const candidatesData = querySnapshot.docs.map((doc) => doc.data());
    setCandidatesData(candidatesData);
    removeLoader();
  };

  // Upload file
  const uploadFile = async () => {
    setLoader(true);
    if (file) {
      const storageRef = ref(storage, `files/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      alert(url);

      // Save file metadata to Firestore
      await addDoc(collection(db, "files"), { name: file.name, url });
      setFile(null);
      fetchFiles();
      removeLoader();
    }
  };

  const updateCandidates = async (id, data) => {
    await updateDoc(doc(db, "BDProfiles", id), data);
    fetchCandidates();
  };

  const deleteCandidate = async (id) => {
    await deleteDoc(doc(db, "BDProfiles", id));
    fetchCandidates();
  };

  const createCandidates = async (data) => {
    try {
      await addDoc(collection(db, "BDProfiles"), data);
      fetchCandidates();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Fetch files
  const fetchFiles = async () => {
    const querySnapshot = await getDocs(collection(db, "files"));
    const filesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFiles(filesList);
  };

  // Fetch file by name
  const fetchFileByName = async (fileName) => {
    const q = query(collection(db, "files"), where("name", "==", fileName));
    const querySnapshot = await getDocs(q);
    const filesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return filesList; // Return the list of files matching the name
  };

  const removeLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  const [loader, setLoader] = useState(false);
  const logOut = async () => {
    await auth.signOut();
    window.location.href = "/";
    localStorage.clear();
  };

  const downloadFile = async (file) => {
    let fileUrl = file.url;
    setLoader(true);
    if (!fileUrl) {
      console.error("No file URL provided.");
      return;
    }
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name); // Provide a name for the file
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      removeLoader();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const downloadResumeByUrl = async (fileUrl) => {
    setLoader(true);
    if (!fileUrl) {
      console.error("No file URL provided.");
      return;
    }
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf"); // Provide a name for the file
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      removeLoader();
    } catch (error) {
      setLoader(false);
      console.error("Error downloading file:", error);
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const openEditPopup = (candidate) => {
    setSelectedCandidate(candidate); // Set the selected candidate
    setEditPopupOpen(true); // Open the popup
  };

  const handleEditSubmit = async (updatedData) => {
    await updateCandidates(selectedCandidate.id, updatedData); // Update the candidate data
    setEditPopupOpen(false); // Close the popup
    setSelectedCandidate(null); // Clear the selected candidate
  };

  return (
    <>
      {loader && <Loader isLoading={loader} />}
      {isEditPopupOpen && (
        <EditPopup 
          candidate={selectedCandidate} 
          onClose={() => setEditPopupOpen(false)} 
          onSubmit={handleEditSubmit} 
        />
      )}
      {/* <div>
        <input type="file" ref={fileRef} onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload File</button>
    </div> */}
      <div className="db-container">
        <div
          className="db-header-container"
          style={{
            backgroundColor: "#0071bd",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="flex justify-between items-center w-full">
            <h3 className="dashboard-title">Candidates List</h3>
            <LogoutIcon
              className="logout-icon float-right"
              onClick={logOut}
            />{" "}
            {/* Added logout icon */}
          </div>
          <div className="flex justify-between items-center flex-container-buttons">
            <button
              className={`filter-button ${
                filter === "all"
                  ? "bg-white text-[#0071bd]"
                  : "filter-button-active text-white"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-button ${
                filter === "offered"
                  ? "bg-white text-[#0071bd]"
                  : "filter-button-active text-white"
              }`}
              onClick={() => setFilter("offered")}
            >
              Offered
            </button>
            <button
              className={`filter-button ${
                filter === "payed"
                  ? "bg-white text-[#0071bd]"
                  : "filter-button-active text-white"
              }`}
              onClick={() => setFilter("payed")}
            >
              Payed
            </button>

            <button> <Link to="/registerForm" style={{textDecoration:"none"}} > Event Registrarion  </Link></button>

            <button> <Link to="/studentsData" style={{textDecoration:"none"}} >  Registered Students </Link> </button>
          </div>
        </div>


    
        <div className="card-container">
          {candidatesData
            .filter((candidate) => {
              if (filter === "all") return true;
              if (filter === "offered") return candidate.isOffered;
              if (filter === "payed") return candidate.isPayed;
              return false;
            })
            .map((candidate, index) => (
              <div key={index} className="candidate-card">
                <h3 className="card-title">{candidate?.fullName} &nbsp;&nbsp;&nbsp;
                <svg style={{float:'right'}} height={'24px'} width={'24px'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => openEditPopup(candidate)}>
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 21C12 20.4477 12.4477 20 13 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H13C12.4477 22 12 21.5523 12 21Z" fill="#0071bd"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.7736 8.09994C22.3834 6.48381 22.315 4.36152 21.113 3.06183C20.5268 2.4281 19.6926 2.0233 18.7477 2.00098C17.7993 1.97858 16.8167 2.34127 15.91 3.09985C15.8868 3.11925 15.8645 3.13969 15.8432 3.16111L2.87446 16.1816C2.31443 16.7438 2 17.5051 2 18.2987V19.9922C2 21.0937 2.89197 22 4.00383 22H5.68265C6.48037 22 7.24524 21.6823 7.80819 21.1171L20.7736 8.09994ZM17.2071 5.79295C16.8166 5.40243 16.1834 5.40243 15.7929 5.79295C15.4024 6.18348 15.4024 6.81664 15.7929 7.20717L16.7929 8.20717C17.1834 8.59769 17.8166 8.59769 18.2071 8.20717C18.5976 7.81664 18.5976 7.18348 18.2071 6.79295L17.2071 5.79295Z" fill="#0071bd"></path>
                  </g>
                </svg>
                </h3>
                <p style={{ color: "gray", fontSize: "0.9rem" }}>
                  <span className="technology-info">
                    {candidate.technology}
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <span className="exp-info">
                    <b>{candidate.experience}</b>
                  </span>&nbsp;&nbsp;&nbsp;
                  {candidate.isOffered && <span>
                    {candidate.isOffered && <svg viewBox="0 0 24 24" fill="none" height={'30px'} width={'30px'} stroke="green">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2 4.5C2 3.11929 3.11929 2 4.5 2H19.5C20.8807 2 22 3.11929 22 4.5V19.5C22 20.8807 20.8807 22 19.5 22H4.5C3.11929 22 2 20.8807 2 19.5V4.5ZM18.787 9.57537C19.1767 9.18401 19.1753 8.55084 18.784 8.16116L18.0753 7.45558C17.684 7.0659 17.0508 7.06726 16.6611 7.45863L10.8895 13.2551L7.56845 9.98027C7.1752 9.59249 6.54205 9.59692 6.15427 9.99018L5.45213 10.7022C5.06436 11.0955 5.06879 11.7286 5.46204 12.1164L10.2003 16.7888C10.5922 17.1752 11.2228 17.1723 11.6111 16.7823L18.787 9.57537Z" fill="green"></path>
                  </g>
                </svg>}</span>}
                </p>
                <p>
                  <br />
                  <span className="contact-info">
                    <svg
                      viewBox="0 0 24 24"
                      height={"24px"}
                      width={"24px"}
                      fill="none"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M15 4V5C15 6.88562 15 7.82843 15.5858 8.41421C16.1716 9 17.1144 9 19 9H20.5M20.5 9L18 7M20.5 9L18 11"
                          stroke="#0071bd"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M15.5562 14.5477L15.1007 15.0272C15.1007 15.0272 14.0181 16.167 11.0631 13.0559C8.10812 9.94484 9.1907 8.80507 9.1907 8.80507L9.47752 8.50311C10.1841 7.75924 10.2507 6.56497 9.63424 5.6931L8.37326 3.90961C7.61028 2.8305 6.13596 2.68795 5.26145 3.60864L3.69185 5.26114C3.25823 5.71766 2.96765 6.30945 3.00289 6.96594C3.09304 8.64546 3.81071 12.259 7.81536 16.4752C12.0621 20.9462 16.0468 21.1239 17.6763 20.9631C18.1917 20.9122 18.6399 20.6343 19.0011 20.254L20.4217 18.7584C21.3806 17.7489 21.1102 16.0182 19.8833 15.312L17.9728 14.2123C17.1672 13.7486 16.1858 13.8848 15.5562 14.5477Z"
                          fill="#0071bd"
                        ></path>{" "}
                      </g>
                    </svg>
                    <b>
                      <a href={`callto:+91${candidate.contact}`}>
                        {candidate.contact}
                      </a>
                    </b>
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <span className="selected-info">
                    {candidate.isOffered ? "Selected" : "No"}
                  </span>
                </p>
                <p className="resume-download" onClick={() => downloadResumeByUrl(candidate.resume)}>
                  <svg
                    height="24px"
                    width="24px"
                    version="1.1"
                    id="Layer_1"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        style={{ fill: "#E2E5E7" }}
                        d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z"
                      />
                      <path
                        style={{ fill: "#B0B7BD" }}
                        d="M384,128h96L352,0v96C352,113.6,366.4,128,384,128z"
                      />
                      <polygon
                        style={{ fill: "#CAD1D8" }}
                        points="480,224 384,128 480,128 "
                      />
                      <path
                        style={{ fill: "#F15642" }}
                        d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16 V416z"
                      />
                      <g>
                        <path
                          style={{ fill: "#FFFFFF" }}
                          d="M101.744,303.152c0-4.224,3.328-8.832,8.688-8.832h29.552c16.64,0,31.616,11.136,31.616,32.48 c0,20.224-14.976,31.488-31.616,31.488h-21.36v16.896c0,5.632-3.584,8.816-8.192,8.816c-4.224,0-8.688-3.184-8.688-8.816V303.152z M118.624,310.432v31.872h21.36c8.576,0,15.36-7.568,15.36-15.504c0-8.944-6.784-16.368-15.36-16.368H118.624z"
                        />
                        <path
                          style={{ fill: "#FFFFFF" }}
                          d="M196.656,384c-4.224,0-8.832-2.304-8.832-7.92v-72.672c0-4.592,4.608-7.936,8.832-7.936h29.296 c58.464,0,57.184,88.528,1.152,88.528H196.656z M204.72,311.088V368.4h21.232c34.544,0,36.08-57.312,0-57.312H204.72z"
                        />
                        <path
                          style={{ fill: "#FFFFFF" }}
                          d="M303.872,312.112v20.336h32.624c4.608,0,9.216,4.608,9.216,9.072c0,4.224-4.608,7.68-9.216,7.68 h-32.624v26.864c0,4.48-3.184,7.92-7.664,7.92c-5.632,0-9.072-3.44-9.072-7.92v-72.672c0-4.592,3.456-7.936,9.072-7.936h44.912 c5.632,0,8.96,3.344,8.96,7.936c0,4.096-3.328,8.704-8.96,8.704h-37.248V312.112z"
                        />
                      </g>
                      <path
                        style={{ fill: "#CAD1D8" }}
                        d="M400,432H96v16h304c8.8,0,16-7.2,16-16v-16C416,424.8,408.8,432,400,432z"
                      />
                    </g>
                  </svg>&nbsp;&nbsp;&nbsp;<span style={{textDecoration:'underline',cursor:'pointer'}}>{'Resume Download'}</span>
                </p>
                <p>
                    <svg height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <circle style={{ fill: "#324A5E" }} cx="256" cy="256" r="256"></circle>
                        <path style={{ fill: "#2B3B4E" }} d="M510.376,284.815L365.011,139.45l-108.285,21.583l-115.884,4.486l35.323,35.323l-37.376,19.373 l55.236,55.236l-12.438,12.441l93.077,125.285l79.367,79.367C438.294,457.581,499.834,378.914,510.376,284.815z"></path>
                        <path style={{ fill: "#FFD15D" }} d="M352.108,190.923h-41.041c-1.838-7.38-4.73-14.348-8.576-20.687h49.617 c9.997,0,18.101-8.104,18.101-18.101s-8.104-18.101-18.101-18.101H152.997c-9.997,0-18.101,8.104-18.101,18.101 s8.104,18.101,18.101,18.101h85.333c14.853,0,27.776,8.395,34.29,20.687H152.997c-9.997,0-18.101,8.104-18.101,18.101 c0,9.997,8.104,18.101,18.101,18.101H272.62c-6.515,12.291-19.437,20.687-34.29,20.687h-85.333c-7.321,0-13.921,4.411-16.724,11.173 c-2.801,6.765-1.253,14.55,3.924,19.727l142.222,142.222c3.536,3.534,8.166,5.301,12.8,5.301c4.632,0,9.264-1.767,12.8-5.301 c7.07-7.07,7.07-18.53,0-25.6L196.698,284.013h41.632c35.109,0,64.648-24.257,72.768-56.889h41.01 c9.997,0,18.101-8.104,18.101-18.101C370.209,199.027,362.105,190.923,352.108,190.923z"></path>
                        <g>
                          <path style={{ fill: "#F9B54C" }} d="M282.419,420.935c3.536,3.534,8.166,5.301,12.8,5.301c4.632,0,9.264-1.767,12.8-5.301 c7.07-7.07,7.07-18.53,0-25.6l-69.832-69.832v51.198L282.419,420.935z"></path>
                          <path style={{ fill: "#F9B54C" }} d="M352.108,190.923h-41.041c-1.838-7.38-4.73-14.348-8.576-20.687h49.617 c9.997,0,18.101-8.104,18.101-18.101s-8.104-18.101-18.101-18.101H238.187v36.202h0.143c14.853,0,27.776,8.395,34.29,20.687 h-34.433v36.202h34.433c-6.515,12.291-19.437,20.687-34.29,20.687h-0.143v36.202h0.143c35.109,0,64.648-24.257,72.768-56.889h41.01 c9.997,0,18.101-8.104,18.101-18.101C370.209,199.027,362.105,190.923,352.108,190.923z"></path>
                        </g>
                      </g>
                    </svg>&nbsp;&nbsp;<span className="payment-info">
                    {
                        candidate.isPayed ? 'Completed' : 'Not Completed'
                    }
                    </span>
                </p>
              </div>
            ))}
        </div>
      
      </div>
    </>
  );
}
export default Dashboard;

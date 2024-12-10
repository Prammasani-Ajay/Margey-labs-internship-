// import React, { useState, useEffect } from "react";
// import { fetchCandidates } from "../Services/firestoreService";  // Import the fetch function from firestoreService

// const CandidateManager = () => {
//   const [candidates, setCandidates] = useState([]);

//   useEffect(() => {
//     // Fetch candidates from Firestore when the component is mounted
//     const loadCandidates = async () => {
//       const data = await fetchCandidates();
//       setCandidates(data);
//     };
//     loadCandidates();
//   }, []);

//   return (
//     <div>
//       <h1>Candidate List</h1>
//       {/* Render the list of candidates */}
//       {candidates.length > 0 ? (
//         <ul>
//           {candidates.map((candidate) => (
//             <li key={candidate.id}>
//               <strong>Name:</strong> {candidate.studentsName} <br />
//               <strong>Email:</strong> {candidate.emailId} <br />
//               <strong>Gender:</strong> {candidate.gender} <br />
//               <strong>Mobile:</strong> {candidate.mobileNumber} <br />
//               <strong>Stream:</strong> {candidate.stream} <br />
//               <strong>Graduation Year:</strong> {candidate.yearOfPassedOut} <br />
//               <strong>Course:</strong> {candidate.course} <br />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No candidates found.</p>
//       )}
//     </div>
//   );
// };

// export default CandidateManager;

import React, { useState, useEffect } from 'react';
import { fetchCandidates } from "../Services/firestoreService"; // Import function to fetch candidates
import { AgGridReact } from 'ag-grid-react'; // AG-Grid React component
import 'ag-grid-community/styles/ag-grid.css'; // AG-Grid styles
import 'ag-grid-community/styles/ag-theme-alpine.css'; // AG-Grid theme styles

const CandidateManager = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const data = await fetchCandidates(); // Fetch candidates data from Firestore
        console.log("Fetched candidates:", data); // Log data to check if it is correct
        setCandidates(data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };
    loadCandidates();
  }, []);

  const columnDefs = [
    { headerName: "Name", field: "studentsName", sortable: true, filter: true },
    { headerName: "Email", field: "emailId", sortable: true, filter: true },
    { headerName: "Gender", field: "gender", sortable: true, filter: true },
    { headerName: "Mobile", field: "mobileNumber", sortable: true, filter: true },
    { headerName: "Stream", field: "stream", sortable: true, filter: true },
    { headerName: "Graduation Year", field: "yearOfPassedOut", sortable: true, filter: true },
    { headerName: "Course", field: "course", sortable: true, filter: true }
  ];


  const staticData = [
    {
      studentsName: "John Doe",
      emailId: "john.doe@example.com",
      gender: "Male",
      mobileNumber: "1234567890",
      stream: "Engineering",
      yearOfPassedOut: 2023,
      course: "Computer Science"
    }
  ];

  return (
    <div>
      <h1>Candidate List</h1>
      {/* AG-Grid Component */}


      {/* <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={candidates} // Data to display in the grid
          columnDefs={columnDefs} // Column definitions
          pagination={true} // Enable pagination
          paginationPageSize={10} // Rows per page
          domLayout='autoHeight' // Auto-adjust grid height
        />
      </div> */}


        {/* Bootstrap Table  */}

        
      <div style={{ maxHeight: '35rem', overflowY: 'auto' }}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">College</th>
              <th scope="col">Gender</th>
              <th scope="col">Year of Graduation</th>
              <th scope="col">Course</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through the data and create rows */}
            {candidates.map((candidate, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{candidate.studentsName}</td>
                <td>{candidate.collegeName}</td>
                <td>{candidate.gender}</td>
                <td>{candidate.yearOfPassedOut}</td>
                <td>{candidate.course || 'N/A'}</td>
                <td>{candidate.emailId || 'N/A'}</td>
                <td>{candidate.mobileNumber || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateManager;

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import XLSX for exporting to Excel
import { fetchCandidates } from "../Services/firestoreService";
import Dashboard from './Dashboard';

const CandidateManager = () => {
  const [candidates, setCandidates] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    college: '',
    gender: '',
    graduationYear: '',
    course: '',
    email: '',
    mobile: '',
  });

  const [filterVisibility, setFilterVisibility] = useState({
    name: false,
    college: false,
    gender: false,
    graduationYear: false,
    course: false,
    email: false,
    mobile: false,
  });

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const data = await fetchCandidates();
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };
    loadCandidates();
  }, []);

  const handleFilterChange = (e, column) => {
    const value = e.target.value.toLowerCase();
    setFilters(prev => ({ ...prev, [column]: value }));
  };

  const toggleFilterInput = (column) => {
    setFilterVisibility(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const filteredCandidates = candidates.filter(candidate => {
    return (
      candidate.studentsName.toLowerCase().includes(filters.name) &&
      candidate.collegeName.toLowerCase().includes(filters.college) &&
      candidate.gender.toLowerCase().includes(filters.gender) &&
      candidate.yearOfPassedOut.toString().includes(filters.graduationYear) &&
      (candidate.course ? candidate.course.toLowerCase().includes(filters.course) : true) &&
      (candidate.emailId ? candidate.emailId.toLowerCase().includes(filters.email) : true) &&
      (candidate.mobileNumber ? candidate.mobileNumber.includes(filters.mobile) : true)
    );
  });

  // Export table data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredCandidates.map((candidate, index) => ({
      'S.No': index + 1,
      'Name': candidate.studentsName,
      'College': candidate.collegeName,
      'Gender': candidate.gender,
      'Year of Graduation': candidate.yearOfPassedOut,
      'Course': candidate.course,
      'Email': candidate.emailId,
      'Mobile': candidate.mobileNumber,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidates');
    XLSX.writeFile(workbook, 'Candidates.xlsx');
  };

  return (
    <div>
      <Dashboard />
      <center><h3>Registered Candidates</h3></center>
      <div style={{ maxHeight: '35rem', overflowY: 'auto', padding: 5, width: '90%', margin: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <button className="btn btn-primary" onClick={exportToExcel}>Export to Excel</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              {['name', 'college', 'gender', 'graduationYear', 'course', 'email', 'mobile'].map((column, index) => (
                <th scope="col" key={index}>
                  <span style={{ color: 'black' }}>{column.charAt(0).toUpperCase() + column.slice(1)}</span>
                  <svg
                    onClick={() => toggleFilterInput(column)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    style={{ cursor: 'pointer', marginLeft: '25px' }}
                  >
                    <g id="SVGRepo_iconCarrier">
                      <path d="M0 3H16V1H0V3Z" fill="#0071bd"></path>
                      <path d="M2 7H14V5H2V7Z" fill="#0071bd"></path>
                      <path d="M4 11H12V9H4V11Z" fill="#0071bd"></path>
                      <path d="M10 15H6V13H10V15Z" fill="#0071bd"></path>
                    </g>
                  </svg>
                  {filterVisibility[column] && (
                    <input
                      type="text"
                      value={filters[column]}
                      onChange={(e) => handleFilterChange(e, column)}
                      placeholder={`Filter ${column}`}
                      className="form-control form-control-sm"
                      style={{ marginTop: '5px' }}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate, index) => (
              <tr key={candidate.id}>
                <td>{index + 1}</td>
                <td>{candidate.studentsName}</td>
                <td>{candidate.collegeName}</td>
                <td>{candidate.gender}</td>
                <td>{candidate.yearOfPassedOut}</td>
                <td>{candidate.course}</td>
                <td>{candidate.emailId}</td>
                <td>{candidate.mobileNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateManager;

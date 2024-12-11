import React, { useState, useEffect } from 'react';
import { fetchCandidates } from "../Services/firestoreService"; // Import function to fetch candidates
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

  // Track visibility of filter inputs
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
        const data = await fetchCandidates(); // Fetch candidates data from Firestore
        console.log("Fetched candidates:", data); // Log data to check if it is correct
        setCandidates(data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };
    loadCandidates();
  }, []);

  // Handle filter change
  const handleFilterChange = (e, column) => {
    const value = e.target.value.toLowerCase();
    setFilters(prev => ({ ...prev, [column]: value }));
  };

  // Toggle visibility of the input field for a column
  const toggleFilterInput = (column) => {
    setFilterVisibility(prev => ({ ...prev, [column]: !prev[column] }));
  };

  // Filter candidates based on the current filter state
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

  return (
    <div>
      <Dashboard />
      <center> <h3> Registered Candidates </h3> </center>
      <div style={{ maxHeight: '35rem', overflowY: 'auto', padding: 5 , width: '90%', margin: 'auto'}}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">
                <span style={{ color: 'black' }}>Name</span>
                <svg
                  onClick={() => toggleFilterInput('name')}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  style={{ cursor: 'pointer', marginLeft: '25px' }} // Increased margin for spacing
                >
                  <g id="SVGRepo_iconCarrier">
                    <path d="M0 3H16V1H0V3Z" fill="#0071bd"></path>
                    <path d="M2 7H14V5H2V7Z" fill="#0071bd"></path>
                    <path d="M4 11H12V9H4V11Z" fill="#0071bd"></path>
                    <path d="M10 15H6V13H10V15Z" fill="#0071bd"></path>
                  </g>
                </svg>
                {filterVisibility.name && (
                  <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => handleFilterChange(e, 'name')}
                    placeholder="Filter"
                    className="form-control form-control-sm"
                    style={{ marginTop: '5px' }}
                  />
                )}
              </th>
              <th scope="col">
                <span style={{ color: 'black' }}>College</span>
                <svg
                  onClick={() => toggleFilterInput('college')}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  style={{ cursor: 'pointer', marginLeft: '25px' }} // Increased margin for spacing
                >
                  <g id="SVGRepo_iconCarrier">
                    <path d="M0 3H16V1H0V3Z" fill="#0071bd"></path>
                    <path d="M2 7H14V5H2V7Z" fill="#0071bd"></path>
                    <path d="M4 11H12V9H4V11Z" fill="#0071bd"></path>
                    <path d="M10 15H6V13H10V15Z" fill="#0071bd"></path>
                  </g>
                </svg>
                {filterVisibility.college && (
                  <input
                    type="text"
                    value={filters.college}
                    onChange={(e) => handleFilterChange(e, 'college')}
                    placeholder="Filter"
                    className="form-control form-control-sm"
                    style={{ marginTop: '5px' }}
                  />
                )}
              </th>
              <th scope="col">
                <span style={{ color: 'black' }}>Gender</span>
                <svg
                  onClick={() => toggleFilterInput('gender')}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  style={{ cursor: 'pointer', marginLeft: '25px' }} // Increased margin for spacing
                >
                  <g id="SVGRepo_iconCarrier">
                    <path d="M0 3H16V1H0V3Z" fill="#0071bd"></path>
                    <path d="M2 7H14V5H2V7Z" fill="#0071bd"></path>
                    <path d="M4 11H12V9H4V11Z" fill="#0071bd"></path>
                    <path d="M10 15H6V13H10V15Z" fill="#0071bd"></path>
                  </g>
                </svg>
                {filterVisibility.gender && (
                  <input
                    type="text"
                    value={filters.gender}
                    onChange={(e) => handleFilterChange(e, 'gender')}
                    placeholder="Filter"
                    className="form-control form-control-sm"
                    style={{ marginTop: '5px' }}
                  />
                )}
              </th>
              <th scope="col">
                <span style={{ color: 'black' }}>Year of Graduation</span>
                <svg
                  onClick={() => toggleFilterInput('graduationYear')}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  style={{ cursor: 'pointer', marginLeft: '25px' }} // Increased margin for spacing
                >
                  <g id="SVGRepo_iconCarrier">
                    <path d="M0 3H16V1H0V3Z" fill="#0071bd"></path>
                    <path d="M2 7H14V5H2V7Z" fill="#0071bd"></path>
                    <path d="M4 11H12V9H4V11Z" fill="#0071bd"></path>
                    <path d="M10 15H6V13H10V15Z" fill="#0071bd"></path>
                  </g>
                </svg>
                {filterVisibility.graduationYear && (
                  <input
                    type="text"
                    value={filters.graduationYear}
                    onChange={(e) => handleFilterChange(e, 'graduationYear')}
                    placeholder="Filter"
                    className="form-control form-control-sm"
                    style={{ marginTop: '5px' }}
                  />
                )}
              </th>
              <th scope="col">
                <span style={{ color: 'black' }}>Course</span>
                <svg
                  onClick={() => toggleFilterInput('course')}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  style={{ cursor: 'pointer', marginLeft: '25px' }} // Increased margin for spacing
                >
                  <g id="SVGRepo_iconCarrier">
                    <path d="M0 3H16V1H0V3Z" fill="#0071bd"></path>
                    <path d="M2 7H14V5H2V7Z" fill="#0071bd"></path>
                    <path d="M4 11H12V9H4V11Z" fill="#0071bd"></path>
                    <path d="M10 15H6V13H10V15Z" fill="#0071bd"></path>
                  </g>
                </svg>
                {filterVisibility.course && (
                  <input
                    type="text"
                    value={filters.course}
                    onChange={(e) => handleFilterChange(e, 'course')}
                    placeholder="Filter"
                    className="form-control form-control-sm"
                    style={{ marginTop: '5px' }}
                  />
                )}
              </th>
              <th scope="col">
                <span style={{ color: 'black' }}>Email</span>
                <svg
                  onClick={() => toggleFilterInput('email')}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  style={{ cursor: 'pointer', marginLeft: '25px' }} // Increased margin for spacing
                >
                  <g id="SVGRepo_iconCarrier">
                    <path d="M0 3H16V1H0V3Z" fill="#0071bd"></path>
                    <path d="M2 7H14V5H2V7Z" fill="#0071bd"></path>
                    <path d="M4 11H12V9H4V11Z" fill="#0071bd"></path>
                    <path d="M10 15H6V13H10V15Z" fill="#0071bd"></path>
                  </g>
                </svg>
                {filterVisibility.email && (
                  <input
                    type="text"
                    value={filters.email}
                    onChange={(e) => handleFilterChange(e, 'email')}
                    placeholder="Filter"
                    className="form-control form-control-sm"
                    style={{ marginTop: '5px' }}
                  />
                )}
              </th>
              <th scope="col">
                <span style={{ color: 'black' }}>Mobile</span>
                <svg
                  onClick={() => toggleFilterInput('mobile')}
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  style={{ cursor: 'pointer', marginLeft: '25px', color: '#0071bd' }} // Increased margin for spacing
                >
                  <g id="SVGRepo_iconCarrier">
                    <path d="M0 3H16V1H0V3Z" fill="#0071bd"></path>
                    <path d="M2 7H14V5H2V7Z" fill="#0071bd"></path>
                    <path d="M4 11H12V9H4V11Z" fill="#0071bd"></path>
                    <path d="M10 15H6V13H10V15Z" fill="#0071bd"></path>
                  </g>
                </svg>
                {filterVisibility.mobile && (
                  <input
                    type="text"
                    value={filters.mobile}
                    onChange={(e) => handleFilterChange(e, 'mobile')}
                    placeholder="Filter"
                    className="form-control form-control-sm"
                    style={{ marginTop: '5px' }}
                  />
                )}
              </th>
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

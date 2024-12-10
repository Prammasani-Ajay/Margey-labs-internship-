import React from 'react';
// import IconComponent from './IconComponent'; // Assuming IconComponent is in a separate file


const IconComponent = () => (
    <svg className="icon" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#0071bd" strokeWidth="2" className="icon-outline"></path>
        <polyline points="22,6 12,13 2,6" stroke="#0071bd" strokeWidth="2" className="icon-outline"></polyline>
    </svg>
);

const CandidateCard = ({ candidate, index, toggleCandidate, selectedCandidateIndex }) => {
    return (
        <div className="candidate-card">
            <div className="card-header" onClick={() => toggleCandidate(candidate, index)}>
                <h3>{candidate.name} &nbsp; &nbsp; <span>{candidate.experience}+ years</span></h3>
                <svg className={`expand-icon ${candidate.expanded && index === selectedCandidateIndex ? 'expanded' : ''}`} height="20px" width="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" stroke="#0071bd"></path>
                </svg>
            </div>
            {candidate.expanded && (
                <div className="info-grid">
                    <div className="info-row">
                        <IconComponent />
                        <span><strong>{candidate.email}</strong></span>
                    </div>
                    <div className="info-row">
                        <svg className="icon timeslot-icon rotate-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{candidate.timeSlot}</span>
                    </div>
                    <div className="info-row">
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        </svg>
                        <span>{candidate.company}</span>
                    </div>
                    <div className="info-row">
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        <span>{candidate.experience} years</span>
                    </div>
                    <div className="info-row">
                        <svg className="icon shake-animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span><strong><a href={`tel:${candidate.mobile}`}>{candidate.mobile}</a></strong></span>
                    </div>
                    <div className="assigned-section">
                        <h4>Assigned to:</h4>
                        <div className="info-row">
                            <svg className="icon" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span>{candidate.assignedTo.name}</span>
                        </div>
                        <div className="info-row">
                            <svg className="icon" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <span>{candidate.assignedTo.email}</span>
                        </div>
                        <a href={`tel:${candidate.assignedTo.contact}`} className="contact-link">
                            <svg className="icon" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span><a href={`tel:${candidate.assignedTo.contact}`}>{candidate.assignedTo.contact}</a></span>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CandidateCard;

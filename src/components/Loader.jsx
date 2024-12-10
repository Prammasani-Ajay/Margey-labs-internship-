import React from 'react';
import '../css/Loader.css'; // Assuming you have a CSS file for styling

const Loader = ({ isLoading }) => {
    return (
        <>
            {isLoading && (
                <div className="loader-overlay">
                    <div className="loader-container">
                        <div className="spinner"></div>
                        <p className="loading-text">Loading...</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Loader;

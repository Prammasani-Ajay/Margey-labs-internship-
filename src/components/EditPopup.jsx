// ... existing code ...
import { useState } from 'react';
import '../css/EditPopup.css';

const EditPopup = ({ candidate, onClose, onSubmit }) => {
    const [formData, setFormData] = useState(candidate);
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
      <div className="edit-popup-overlay" onClick={onClose}>
        <div className="edit-popup" onClick={(e) => e.stopPropagation()}>
          <h2>Edit Candidate</h2>
          <form onSubmit={handleSubmit} className="edit-popup-form">
            <div className="form-group">
              <div className="form-row row">
                <div className="form-column col">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="form-column col">
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    placeholder="Email ID"
                    required
                  />
                </div>
              </div>
              <div className="form-row row">
                <div className="form-column col">
                  <input
                    type="text"
                    name="technology"
                    value={formData.technology}
                    onChange={handleChange}
                    placeholder="Technology"
                    required
                  />
                </div>
                <div className="form-column col">
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Experience"
                    required
                  />
                </div>
              </div>
              <div className="form-row row">
                <div className="form-column col">
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    placeholder="Years of Experience"
                    required
                  />
                </div>
                <div className="form-column col">
                  <input
                    type="file"
                    name="resume"
                    onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
                  />
                </div>
              </div>
            <div className="slider-container">  
                <input type="checkbox" id="toggle" class="slider-checkbox" />  
                <label for="toggle" class="slider-label">  
                    <span class="slider-circle"></span>  
                </label>  
            </div>
            </div>
            <div className="button-row">
              <button type="submit">Save</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default EditPopup; 
import React, { useState, useEffect } from 'react';

function PersonalDetails({ onUpdateDetails }) {
  const [details, setDetails] = useState({
    name: '',
    age: '',
    location: '',
    occupation: '',
    interests: '',
    customField1: { key: '', value: '' },
    customField2: { key: '', value: '' },
  });

  useEffect(() => {
    const savedDetails = localStorage.getItem('personalDetails');
    if (savedDetails) {
      setDetails(JSON.parse(savedDetails));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails(prevDetails => {
      const newDetails = { ...prevDetails, [name]: value };
      localStorage.setItem('personalDetails', JSON.stringify(newDetails));
      onUpdateDetails(newDetails);
      return newDetails;
    });
  };

  const handleCustomFieldChange = (fieldNumber, type, value) => {
    setDetails(prevDetails => {
      const newDetails = {
        ...prevDetails,
        [`customField${fieldNumber}`]: {
          ...prevDetails[`customField${fieldNumber}`],
          [type]: value
        }
      };
      localStorage.setItem('personalDetails', JSON.stringify(newDetails));
      onUpdateDetails(newDetails);
      return newDetails;
    });
  };

  return (
    <div className="personal-details">
      <h3>Give Your Model Details</h3>
      <input
        type="text"
        name="name"
        value={details.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="number"
        name="age"
        value={details.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <input
        type="text"
        name="location"
        value={details.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <input
        type="text"
        name="occupation"
        value={details.occupation}
        onChange={handleChange}
        placeholder="Occupation"
      />
      <textarea
        name="interests"
        value={details.interests}
        onChange={handleChange}
        placeholder="Interests (comma separated)"
      />
      <div className="custom-field">
        <input
          type="text"
          value={details.customField1.key}
          onChange={(e) => handleCustomFieldChange(1, 'key', e.target.value)}
          placeholder="Custom Field 1 Name"
        />
        <input
          type="text"
          value={details.customField1.value}
          onChange={(e) => handleCustomFieldChange(1, 'value', e.target.value)}
          placeholder="Custom Field 1 Value"
        />
      </div>
      <div className="custom-field">
        <input
          type="text"
          value={details.customField2.key}
          onChange={(e) => handleCustomFieldChange(2, 'key', e.target.value)}
          placeholder="Custom Field 2 Name"
        />
        <input
          type="text"
          value={details.customField2.value}
          onChange={(e) => handleCustomFieldChange(2, 'value', e.target.value)}
          placeholder="Custom Field 2 Value"
        />
      </div>
    </div>
  );
}

export default PersonalDetails;
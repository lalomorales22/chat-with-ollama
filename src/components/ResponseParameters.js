import React from 'react';

function ResponseParameters({ params, setParams }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  return (
    <div className="response-parameters">
      <h3>Response Parameters</h3>
      <div>
        <label>
          Temperature:
          <input
            type="range"
            name="temperature"
            min="0"
            max="1"
            step="0.1"
            value={params.temperature}
            onChange={handleChange}
          />
          {params.temperature}
        </label>
      </div>
      <div>
        <label>
          Top P:
          <input
            type="range"
            name="topP"
            min="0"
            max="1"
            step="0.1"
            value={params.topP}
            onChange={handleChange}
          />
          {params.topP}
        </label>
      </div>
    </div>
  );
}

export default ResponseParameters;
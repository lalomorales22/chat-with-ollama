import React from 'react';

const models = ["gemma2", "dolphin-llama3", "starcoder", "qwen2", "gemma", "phi3", "llama3", "mistral"];

function ModelSelector({ model, setModel }) {
  return (
    <div className="model-selector">
      <label htmlFor="model-select">Choose an AI model: </label>
      <select 
        id="model-select" 
        value={model} 
        onChange={(e) => setModel(e.target.value)}
      >
        {models.map(m => (
          <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
        ))}
      </select>
    </div>
  );
}

export default ModelSelector;
import React from 'react';

const models = ["phi3", "qwen2", "dolphin-llama3", "starcoder", "gemma", "llama3", "mistral"];

function ModelSelector({ model, setModel }) {
  return (
    <div className="model-selector">
      <h3>Select Model</h3>
      <select 
        value={model} 
        onChange={(e) => setModel(e.target.value)}
      >
        {models.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </div>
  );
}

export default ModelSelector;
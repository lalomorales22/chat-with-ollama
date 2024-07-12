import React from 'react';

const modelDetails = {
  phi3: { size: '3.8B parameters', speciality: 'General-purpose, efficient' },
  qwen2: { size: '14B parameters', speciality: 'Multilingual, knowledge-rich' },
  dolphinLlama3: { size: '70B parameters', speciality: 'Advanced general-purpose, deep reasoning' },
  starcoder: { size: '15B parameters', speciality: 'Code generation, programming' },
  gemma: { size: '6B parameters', speciality: 'Conversational AI, dialogue systems' },
  llama3: { size: '33B parameters', speciality: 'Large-scale data processing, natural language' },
  mistral: { size: '5.5B parameters', speciality: 'Multilingual text generation, translation' },
};

function ModelInfo({ model }) {
  const details = modelDetails[model] || { size: 'Unknown', speciality: 'General purpose' };

  return (
    <div className="model-info">
      <h3>Model: {model}</h3>
      <p>Size: {details.size}</p>
      <p>Speciality: {details.speciality}</p>
    </div>
  );
}

export default ModelInfo;

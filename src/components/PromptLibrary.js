import React from 'react';

const prompts = [
  "Explain quantum computing in simple terms.",
  "Write a short story about a robot learning to love.",
  "What are the main differences between React and Vue?",
  // Add more prompts
];

function PromptLibrary({ onPromptSelect }) {
  return (
    <div className="prompt-library">
      <h3>Prompt Library</h3>
      <ul>
        {prompts.map((prompt, index) => (
          <li key={index} onClick={() => onPromptSelect(prompt)}>
            {prompt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PromptLibrary;
import React from 'react';

function ContextWindow({ messages }) {
  const totalTokens = messages.reduce((acc, msg) => acc + estimateTokens(msg.content), 0);
  const maxTokens = 4096; // This would depend on the model

  return (
    <div className="context-window">
      <h3>Context Window</h3>
      <progress value={totalTokens} max={maxTokens}></progress>
      <p>{totalTokens} / {maxTokens} tokens used</p>
    </div>
  );
}

// This is a very rough estimate and should be replaced with a more accurate method
function estimateTokens(text) {
  return Math.ceil(text.split(' ').length * 1.3);
}

export default ContextWindow;
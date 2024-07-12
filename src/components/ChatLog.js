import React, { useEffect, useRef } from 'react';

function ChatLog({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chat-log">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.role}`}>
          <strong>{msg.role === 'user' ? 'You' : msg.role === 'assistant' ? 'AI' : 'Error'}:</strong>
          <p>{msg.content}</p>
          {msg.image && (
            <img 
              src={msg.image} 
              alt="Generated" 
              className="generated-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'path/to/fallback/image.png';
                console.error('Error loading image:', msg.image);
              }}
            />
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatLog;
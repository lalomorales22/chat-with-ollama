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
          <strong>{msg.role === 'user' ? 'You' : msg.role === 'assistant' ? 'AI' : 'Error'}:</strong> {msg.content}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatLog;
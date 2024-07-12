import React, { useState, useCallback } from 'react';
import ModelSelector from './components/ModelSelector';
import ChatLog from './components/ChatLog';
import MessageInput from './components/MessageInput';
import AudioRecorder from './components/AudioRecorder';
import { sendMessage } from './services/api';
import './App.css';

function App() {
  const [model, setModel] = useState('phi3');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (message) => {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);
    try {
      const assistantMessage = { role: 'assistant', content: '' };
      setMessages(prev => [...prev, assistantMessage]);

      const response = await sendMessage(model, message);
      
      setMessages(prev => prev.map(msg => 
        msg === assistantMessage ? { ...msg, content: response } : msg
      ));
    } catch (error) {
      setMessages(prev => [...prev, { role: 'error', content: error.message }]);
    }
    setIsLoading(false);
  }, [model]);

  const handleTranscription = useCallback((transcription) => {
    handleSendMessage(transcription);
  }, [handleSendMessage]);

  return (
    <div className="App">
      <ModelSelector model={model} setModel={setModel} />
      <ChatLog messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      <AudioRecorder onTranscription={handleTranscription} />
    </div>
  );
}

export default App;
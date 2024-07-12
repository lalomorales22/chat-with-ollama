import React, { useState, useCallback } from 'react';
import Hero from './components/Hero';
import ModelSelector from './components/ModelSelector';
import ModelInfo from './components/ModelInfo';
import ChatLog from './components/ChatLog';
import MessageInput from './components/MessageInput';
import AudioRecorder from './components/AudioRecorder';
import PromptLibrary from './components/PromptLibrary';
import ContextWindow from './components/ContextWindow';
import TaskList from './components/TaskList';
import ResponseParameters from './components/ResponseParameters';
import PersonalDetails from './components/PersonalDetails';
import { sendMessage } from './services/api';
import { generateImage } from './services/imageGenerationService';
import { extractTasks, replacePersonalDetails } from './utils/helpers';
import './App.css';

function App() {
  const [model, setModel] = useState('phi3');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [responseParams, setResponseParams] = useState({ temperature: 0.7, topP: 1 });
  const [personalDetails, setPersonalDetails] = useState({});

  const handleSendMessage = useCallback(async (message) => {
    const processedMessage = replacePersonalDetails(message, personalDetails);
    setMessages(prev => [...prev, { role: 'user', content: processedMessage }]);
    setIsLoading(true);
  
    try {
      if (processedMessage.startsWith('/image ')) {
        const prompt = processedMessage.slice(7);
        setMessages(prev => [...prev, { role: 'assistant', content: 'Generating image, please wait...' }]);
        const imageUrl = await generateImage(prompt);
        setMessages(prev => [...prev, { role: 'assistant', content: 'Generated image:', image: imageUrl }]);
      } else {
        const response = await sendMessage(model, processedMessage, responseParams, personalDetails);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        const newTasks = extractTasks(response);
        setTasks(prev => [...prev, ...newTasks]);
      }
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setMessages(prev => [...prev, { role: 'error', content: `Error: ${error.message}` }]);
    }
  
    setIsLoading(false);
  }, [model, responseParams, personalDetails]);

  const handlePromptSelect = useCallback((prompt) => {
    handleSendMessage(prompt);
  }, [handleSendMessage]);

  const handleUpdateDetails = (details) => {
    setPersonalDetails(details);
  };

  return (
    <div className="App">
      <Hero />
      <div className="main-container">
        <div className="sidebar left-sidebar">
          <ModelSelector model={model} setModel={setModel} />
          <ModelInfo model={model} />
          <PromptLibrary onPromptSelect={handlePromptSelect} />
          <PersonalDetails onUpdateDetails={handleUpdateDetails} />
        </div>
        <div className="main-content">
          <ChatLog messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          <AudioRecorder onTranscription={handleSendMessage} />
        </div>
        <div className="sidebar right-sidebar">
          <ContextWindow messages={messages} />
          <TaskList tasks={tasks} />
        </div>
      </div>
      <div className="bottom-bar">
        <ResponseParameters params={responseParams} setParams={setResponseParams} />
      </div>
    </div>
  );
}

export default App;
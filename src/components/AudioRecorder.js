import React, { useState, useRef, useEffect } from 'react';
import { startTranscription, stopTranscription } from '../services/transcriptionService';

function AudioRecorder({ onTranscription }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        stopTranscription(recognitionRef.current);
      }
    };
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      stopTranscription(recognitionRef.current);
      setIsRecording(false);
    } else {
      recognitionRef.current = startTranscription(
        (text) => setTranscript(text),
        () => setIsRecording(false)
      );
      setIsRecording(true);
    }
  };

  const handleSendTranscript = () => {
    if (transcript.trim()) {
      onTranscription(transcript);
      setTranscript('');
    }
  };

  return (
    <div className="audio-recorder">
      <button 
        className={`record-button ${isRecording ? 'recording' : ''}`} 
        onClick={toggleRecording}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {transcript && (
        <div className="transcript-container">
          <p className="transcript-text">{transcript}</p>
          <button className="send-transcript" onClick={handleSendTranscript}>
            Send Transcript
          </button>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
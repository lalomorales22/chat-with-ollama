import React, { useState, useRef, useEffect } from 'react';

function AudioRecorder({ onTranscription }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const mediaRecorder = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if the browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error("This browser doesn't support speech recognition.");
      return;
    }

    // Initialize SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (event) => {
        // In a real implementation, we might want to save this audio data
        console.log('Audio data available', event.data);
      };

      mediaRecorder.current.start();
      recognitionRef.current.start();
      setIsRecording(true);
      setTranscript('');
    } catch (error) {
      console.error("Error accessing the microphone", error);
      alert("Unable to access the microphone. Please check your browser settings.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTranscriptSubmit = () => {
    onTranscription(transcript);
    setTranscript('');
  };

  return (
    <div className="audio-recorder">
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {transcript && (
        <div>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Transcription will appear here. You can edit if needed."
          />
          <button onClick={handleTranscriptSubmit}>Send Transcription</button>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
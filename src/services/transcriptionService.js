export function startTranscription(onTranscriptionUpdate, onTranscriptionEnd) {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return null;
    }
  
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
  
    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
  
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
  
      onTranscriptionUpdate(finalTranscript || interimTranscript);
    };
  
    recognition.onend = () => {
      onTranscriptionEnd();
    };
  
    recognition.start();
  
    return recognition;
  }
  
  export function stopTranscription(recognition) {
    if (recognition) {
      recognition.stop();
    }
  }
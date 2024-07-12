const OLLAMA_URL = 'http://localhost:11434/api/generate';

export async function sendMessage(model, message) {
  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        prompt: message,
        stream: true
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = new TextDecoder().decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      
      for (const line of lines) {
        try {
          const data = JSON.parse(line);
          if (data.response) {
            fullResponse += data.response;
          }
        } catch (parseError) {
          console.error('Error parsing JSON chunk:', parseError);
        }
      }
    }

    return fullResponse;
  } catch (error) {
    console.error('Error:', error);
    if (error.message.includes('Failed to fetch')) {
      return 'Unable to connect to the Ollama server. Please ensure it is running and accessible.';
    }
    return `An error occurred: ${error.message}. Please check your Ollama server and selected model.`;
  }
}
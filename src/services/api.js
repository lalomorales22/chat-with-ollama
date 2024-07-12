export async function sendMessage(model, message, responseParams, personalDetails) {
  const OLLAMA_URL = 'http://localhost:11434/api/generate';
  
  // Construct a prompt that includes personal details
  const personalDetailsPrompt = Object.entries(personalDetails)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
  
  const fullPrompt = `User Details:\n${personalDetailsPrompt}\n\nUser: ${message}`;

  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        prompt: fullPrompt,
        stream: false,
        options: {
          temperature: responseParams.temperature,
          top_p: responseParams.topP,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
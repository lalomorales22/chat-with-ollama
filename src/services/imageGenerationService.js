const API_URL = 'https://modelslab.com/api/v6/realtime/text2img';
const API_KEY = ''; // Replace this with your actual API key

export async function generateImage(prompt, negativePrompt = '') {
  const requestBody = {
    key: API_KEY,
    prompt: prompt,
    negative_prompt: negativePrompt,
    width: "512",
    height: "512",
    safety_checker: false,
    seed: null,
    samples: 1,
    base64: false,
    webhook: null,
    track_id: null
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'success' && data.output && data.output.length > 0) {
      return data.output[0]; // Return the URL of the generated image
    } else {
      throw new Error('No image generated or unexpected API response');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}
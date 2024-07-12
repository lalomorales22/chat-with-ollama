import React, { useState } from 'react';

const API_URL = 'https://modelslab.com/api/v6/realtime/text2img';
const API_KEY = ''; // Replace with your actual API key

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    setIsLoading(true);
    setError('');
    setImageUrl('');

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
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      if (data.status === 'success' && data.output && data.output.length > 0) {
        setImageUrl(data.output[0]);
      } else {
        throw new Error('No image generated');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="image-generator">
      <h3>Image Generator</h3>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your image prompt"
      />
      <input
        type="text"
        value={negativePrompt}
        onChange={(e) => setNegativePrompt(e.target.value)}
        placeholder="Enter negative prompt (optional)"
      />
      <button onClick={generateImage} disabled={isLoading || !prompt}>
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && <p className="error">{error}</p>}
      {imageUrl && (
        <div className="generated-image">
          <img src={imageUrl} alt="Generated" />
        </div>
      )}
    </div>
  );
}

export default ImageGenerator;
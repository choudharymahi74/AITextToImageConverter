// Using multiple free AI image generation services as alternatives to OpenAI DALL-E
// Primary: Stable Diffusion via free APIs, Fallback: Picsum for demo purposes

export interface ImageGenerationOptions {
  prompt: string;
  style?: string;
  aspectRatio?: string;
  quality?: string;
}

// Free image generation using Pollinations API (Stable Diffusion based)
async function generateWithPollinations(options: ImageGenerationOptions): Promise<{ url: string }> {
  const { prompt, style = "realistic", aspectRatio = "square" } = options;
  
  // Enhance prompt based on style
  let enhancedPrompt = prompt;
  if (style === "digital-art") {
    enhancedPrompt = `Digital art style, ${prompt}, highly detailed, digital painting`;
  } else if (style === "oil-painting") {
    enhancedPrompt = `Oil painting style, ${prompt}, traditional art, painterly`;
  } else if (style === "anime") {
    enhancedPrompt = `Anime style, ${prompt}, manga art style, colorful`;
  } else if (style === "abstract") {
    enhancedPrompt = `Abstract art style, ${prompt}, modern art, artistic`;
  } else {
    enhancedPrompt = `Photorealistic, ${prompt}, high quality, detailed`;
  }

  // Map aspect ratios to dimensions
  let dimensions = "1024x1024";
  if (aspectRatio === "landscape") dimensions = "1792x1024";
  if (aspectRatio === "portrait") dimensions = "1024x1792";

  // Pollinations API endpoint (free Stable Diffusion service)
  const encodedPrompt = encodeURIComponent(enhancedPrompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${dimensions.split('x')[0]}&height=${dimensions.split('x')[1]}&nologo=true&enhance=true`;
  
  // Verify the image was generated successfully
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    if (response.ok) {
      return { url: imageUrl };
    }
    throw new Error('Failed to generate image');
  } catch (error) {
    throw new Error('Image generation service unavailable');
  }
}

// Alternative free service using Stable Diffusion
async function generateWithHuggingFace(options: ImageGenerationOptions): Promise<{ url: string }> {
  const { prompt, style = "realistic" } = options;
  
  let enhancedPrompt = prompt;
  if (style === "digital-art") {
    enhancedPrompt = `${prompt}, digital art, highly detailed`;
  } else if (style === "oil-painting") {
    enhancedPrompt = `${prompt}, oil painting, classical art`;
  } else if (style === "anime") {
    enhancedPrompt = `${prompt}, anime style, manga`;
  } else if (style === "abstract") {
    enhancedPrompt = `${prompt}, abstract art`;
  }

  try {
    // Using a free Hugging Face Stable Diffusion endpoint
    const response = await fetch("https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: enhancedPrompt,
        parameters: {
          negative_prompt: "blurry, low quality, distorted",
          num_inference_steps: 20,
          guidance_scale: 7.5,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const imageBlob = await response.blob();
    
    // Convert blob to base64 data URL for immediate use
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ url: reader.result as string });
      reader.onerror = reject;
      reader.readAsDataURL(imageBlob);
    });
  } catch (error) {
    throw new Error('Hugging Face API unavailable');
  }
}

// Demo fallback service for testing (uses placeholder images)
async function generateDemo(options: ImageGenerationOptions): Promise<{ url: string }> {
  const { aspectRatio = "square" } = options;
  
  // Map aspect ratios to dimensions
  let width = 1024, height = 1024;
  if (aspectRatio === "landscape") { width = 1792; height = 1024; }
  if (aspectRatio === "portrait") { width = 1024; height = 1792; }
  
  // Use Lorem Picsum for demo images with random seed
  const seed = Math.floor(Math.random() * 1000);
  const demoUrl = `https://picsum.photos/${width}/${height}?random=${seed}`;
  
  return { url: demoUrl };
}

export async function generateImage(options: ImageGenerationOptions): Promise<{ url: string }> {
  try {
    // Try Pollinations first (free Stable Diffusion)
    console.log('Attempting image generation with Pollinations API...');
    return await generateWithPollinations(options);
  } catch (error) {
    console.log('Pollinations failed, trying Hugging Face:', error);
    
    try {
      // Try Hugging Face as backup
      console.log('Attempting image generation with Hugging Face API...');
      return await generateWithHuggingFace(options);
    } catch (error2) {
      console.log('Hugging Face failed, using demo mode:', error2);
      
      // Use demo images as final fallback
      console.log('Using demo images as fallback...');
      return await generateDemo(options);
    }
  }
}
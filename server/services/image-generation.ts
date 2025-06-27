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
  let width = 1024, height = 1024;
  if (aspectRatio === "landscape") { width = 1792; height = 1024; }
  if (aspectRatio === "portrait") { width = 1024; height = 1792; }

  // Clean the prompt for URL encoding
  const cleanPrompt = enhancedPrompt.replace(/[^\w\s,-]/g, ' ').trim();
  const encodedPrompt = encodeURIComponent(cleanPrompt);
  
  // Create a simple, direct URL without too many parameters
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=1`;
  
  console.log('Pollinations URL:', imageUrl);
  
  // Test the URL with a simple fetch
  try {
    const testResponse = await fetch(imageUrl, { 
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AI-Image-Generator/1.0)'
      }
    });
    
    if (testResponse.ok && testResponse.headers.get('content-type')?.startsWith('image/')) {
      return { url: imageUrl };
    }
    throw new Error('Invalid image response');
  } catch (error) {
    console.error('Pollinations failed:', error);
    throw new Error('Pollinations service unavailable');
  }
}

// Alternative service using Picsum with text overlay for quick testing
async function generateWithPicsum(options: ImageGenerationOptions): Promise<{ url: string }> {
  const { aspectRatio = "square" } = options;
  
  // Map aspect ratios to dimensions
  let width = 800, height = 800;
  if (aspectRatio === "landscape") { width = 1200; height = 800; }
  if (aspectRatio === "portrait") { width = 800; height = 1200; }
  
  // Use Picsum for reliable placeholder images
  const seed = Math.floor(Math.random() * 1000);
  const imageUrl = `https://picsum.photos/${width}/${height}?random=${seed}`;
  
  console.log('Using Picsum fallback:', imageUrl);
  return { url: imageUrl };
}

// Alternative free service using a simpler image API
async function generateWithSimpleAPI(options: ImageGenerationOptions): Promise<{ url: string }> {
  const { prompt, style = "realistic", aspectRatio = "square" } = options;
  
  // Map aspect ratios to dimensions  
  let width = 512, height = 512;
  if (aspectRatio === "landscape") { width = 768; height = 512; }
  if (aspectRatio === "portrait") { width = 512; height = 768; }

  // Try a simple image generation API
  try {
    const response = await fetch(`https://api.limewire.com/api/image/generation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Version": "v1",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        aspect_ratio: aspectRatio,
        quality: "standard"
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data[0] && data.data[0].asset_url) {
        return { url: data.data[0].asset_url };
      }
    }
    throw new Error('LimeWire API failed');
  } catch (error) {
    console.error('LimeWire API error:', error);
    throw new Error('Alternative API unavailable');
  }
}

// Improved Pollinations with different approach
async function generateWithPollinationsSimple(options: ImageGenerationOptions): Promise<{ url: string }> {
  const { prompt, aspectRatio = "square" } = options;
  
  // Create a very simple, clean URL
  const cleanPrompt = prompt.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const words = cleanPrompt.split(/\s+/).slice(0, 10).join('-'); // Max 10 words
  
  // Map aspect ratios to dimensions
  let width = 512, height = 512;
  if (aspectRatio === "landscape") { width = 768; height = 512; }
  if (aspectRatio === "portrait") { width = 512; height = 768; }
  
  // Simple Pollinations URL
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(words)}?width=${width}&height=${height}`;
  
  console.log('Simple Pollinations URL:', imageUrl);
  return { url: imageUrl };
}

export async function generateImage(options: ImageGenerationOptions): Promise<{ url: string }> {
  try {
    // Try simple Pollinations approach first
    console.log('Attempting simple Pollinations generation...');
    return await generateWithPollinationsSimple(options);
  } catch (error) {
    console.log('Simple Pollinations failed, trying full version:', error);
    
    try {
      // Try full Pollinations as backup
      console.log('Attempting full Pollinations API...');
      return await generateWithPollinations(options);
    } catch (error2) {
      console.log('Both Pollinations approaches failed, using Picsum:', error2);
      
      // Use Picsum as reliable fallback
      console.log('Using Picsum for reliable image display...');
      return await generateWithPicsum(options);
    }
  }
}
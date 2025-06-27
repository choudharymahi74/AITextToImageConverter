import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple image generation for Vercel deployment
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { prompt, style, aspectRatio, quality } = req.body;
    
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    if (prompt.length > 500) {
      return res.status(400).json({ message: "Prompt must be 500 characters or less" });
    }

    // Generate image using Pollinations API
    const cleanPrompt = prompt.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    const words = cleanPrompt.split(/\s+/).slice(0, 10).join('-');
    
    let width = 512, height = 512;
    if (aspectRatio === "landscape") { width = 768; height = 512; }
    if (aspectRatio === "portrait") { width = 512; height = 768; }
    
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(words)}?width=${width}&height=${height}`;

    // Create response matching our schema
    const result = {
      id: Date.now(), // Simple ID for demo
      prompt: prompt.trim(),
      imageUrl: imageUrl,
      style: style || "realistic",
      aspectRatio: aspectRatio || "square",
      quality: quality || "standard",
      createdAt: new Date().toISOString()
    };

    res.json(result);
  } catch (error: any) {
    console.error("Image generation error:", error);
    res.status(500).json({ 
      message: error.message || "Failed to generate image. Please try again." 
    });
  }
}
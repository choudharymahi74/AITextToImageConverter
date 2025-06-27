import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertImageSchema } from "@shared/schema";
import { generateImage } from "./services/image-generation";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add CORS headers for all API routes
  app.use("/api/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

  // Image proxy endpoint to handle CORS issues
  app.get("/api/images/proxy", async (req, res) => {
    try {
      const imageUrl = req.query.url as string;
      if (!imageUrl) {
        return res.status(400).json({ message: "Missing image URL" });
      }

      const response = await fetch(imageUrl);
      if (!response.ok) {
        return res.status(404).json({ message: "Image not found" });
      }

      const contentType = response.headers.get('content-type');
      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } catch (error) {
      console.error("Image proxy error:", error);
      res.status(500).json({ message: "Failed to proxy image" });
    }
  });

  // Generate image endpoint
  app.post("/api/images/generate", async (req, res) => {
    try {
      const { prompt, style, aspectRatio, quality } = req.body;
      
      if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
        return res.status(400).json({ message: "Prompt is required" });
      }

      if (prompt.length > 500) {
        return res.status(400).json({ message: "Prompt must be 500 characters or less" });
      }

      // Generate image using OpenAI
      const result = await generateImage({
        prompt: prompt.trim(),
        style: style || "realistic",
        aspectRatio: aspectRatio || "square", 
        quality: quality || "standard"
      });

      // Save to storage
      const imageData = {
        prompt: prompt.trim(),
        imageUrl: result.url,
        style: style || "realistic",
        aspectRatio: aspectRatio || "square",
        quality: quality || "standard"
      };

      const validatedData = insertImageSchema.parse(imageData);
      const savedImage = await storage.createImage(validatedData);

      res.json(savedImage);
    } catch (error: any) {
      console.error("Image generation error:", error);
      res.status(500).json({ 
        message: error.message || "Failed to generate image. Please try again." 
      });
    }
  });

  // Get all generated images
  app.get("/api/images", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const images = await storage.getImages(limit);
      res.json(images);
    } catch (error: any) {
      console.error("Error fetching images:", error);
      res.status(500).json({ message: "Failed to fetch images" });
    }
  });

  // Get single image
  app.get("/api/images/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid image ID" });
      }

      const image = await storage.getImageById(id);
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }

      res.json(image);
    } catch (error: any) {
      console.error("Error fetching image:", error);
      res.status(500).json({ message: "Failed to fetch image" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

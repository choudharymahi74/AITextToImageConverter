# AI Image Generator

A free text-to-image converter web application built with React and Node.js, using free AI image generation services.

## Features

- 🎨 Generate images from text descriptions
- 🆓 Uses free AI services (Pollinations API)
- ⚡ Fast and responsive design
- 📱 Mobile-friendly interface
- 🔄 Multiple art styles (realistic, digital art, anime, etc.)
- 📐 Different aspect ratios (square, landscape, portrait)
- 💾 Image gallery with download/share options

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **UI Components**: Shadcn/ui (Radix UI)
- **Image Generation**: Pollinations API (free Stable Diffusion)

## Deployment on Vercel

### Quick Deploy

1. Fork or clone this repository
2. Connect your GitHub repository to Vercel
3. Deploy with these settings:
   - **Build Command**: `vite build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

### Manual Deployment Steps

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Environment Variables

No environment variables are required for the basic version since it uses free services without API keys.

### Project Structure for Vercel

```
├── api/                    # Vercel serverless functions
│   ├── generate.ts        # Image generation endpoint
│   └── images.ts          # Images listing endpoint
├── client/                # React frontend
├── server/                # Original Express server (for local dev)
├── shared/                # Shared types and schemas
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies and scripts
```

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**: Navigate to `http://localhost:5000`

## How It Works

1. **Text Input**: Users enter a description of the image they want
2. **Style Selection**: Choose from different art styles and aspect ratios
3. **AI Generation**: Uses Pollinations API (free Stable Diffusion service)
4. **Display**: Generated images are shown in a responsive gallery
5. **Actions**: Users can download, share, or view images in full size

## Free Services Used

- **Pollinations.ai**: Free Stable Diffusion API
- **Vercel**: Free hosting and serverless functions
- **No API keys required**: Works out of the box

## Limitations

- Images are generated using free services, so quality may vary
- No persistent storage (images reset on server restart)
- Rate limits may apply from the free image generation service

## License

MIT License - feel free to use this project for personal or commercial purposes.
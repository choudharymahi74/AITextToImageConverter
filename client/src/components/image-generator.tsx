import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Lightbulb, Wand2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const promptSuggestions = [
  "A cyberpunk cityscape at night with neon lights reflecting on wet streets",
  "A majestic dragon flying over ancient mountain peaks during golden hour",
  "An underwater scene with colorful coral reefs and tropical fish",
  "A serene landscape with mountains, a crystal clear lake, and a sunset sky",
  "A futuristic space station orbiting a distant planet",
  "An enchanted forest with glowing mushrooms and magical creatures"
];

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [aspectRatio, setAspectRatio] = useState("square");
  const [quality, setQuality] = useState("standard");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const generateMutation = useMutation({
    mutationFn: async (data: { prompt: string; style: string; aspectRatio: string; quality: string }) => {
      const response = await apiRequest("POST", "/api/images/generate", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your image has been generated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
      setPrompt("");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for your image.",
        variant: "destructive",
      });
      return;
    }

    if (prompt.length > 500) {
      toast({
        title: "Error",
        description: "Prompt must be 500 characters or less.",
        variant: "destructive",
      });
      return;
    }

    generateMutation.mutate({ prompt: prompt.trim(), style, aspectRatio, quality });
  };

  const fillPrompt = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <>
      {/* Text Input Section */}
      <Card className="rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
        <CardContent className="p-0">
          <div className="mb-6">
            <Label htmlFor="prompt" className="block text-lg font-semibold text-slate-900 mb-3">
              Describe your image
            </Label>
            <div className="relative">
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A serene landscape with mountains, a crystal clear lake, and a sunset sky filled with vibrant colors..."
                className="h-32 resize-none text-base"
                maxLength={500}
              />
              <div className="absolute bottom-4 right-4 text-sm text-slate-400">
                {prompt.length}/500
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2">Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realistic">Realistic</SelectItem>
                  <SelectItem value="digital-art">Digital Art</SelectItem>
                  <SelectItem value="oil-painting">Oil Painting</SelectItem>
                  <SelectItem value="anime">Anime</SelectItem>
                  <SelectItem value="abstract">Abstract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2">Aspect Ratio</Label>
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">Square (1:1)</SelectItem>
                  <SelectItem value="landscape">Landscape (16:9)</SelectItem>
                  <SelectItem value="portrait">Portrait (9:16)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2">Quality</Label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="ultra-hd">Ultra HD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <Button 
              onClick={handleGenerate}
              disabled={generateMutation.isPending}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {generateMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Generate Image
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {generateMutation.isPending && (
        <Card className="rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
          <CardContent className="p-0">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-4">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Creating your masterpiece...</h3>
              <p className="text-slate-600 mb-6">This usually takes 10-30 seconds</p>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000 animate-pulse" style={{width: "45%"}}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prompt Suggestions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Try these prompts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {promptSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => fillPrompt(suggestion)}
              className="text-left p-4 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors group"
            >
              <div className="flex items-start space-x-3">
                <Lightbulb className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <span className="text-sm text-slate-700 group-hover:text-slate-900">
                  {suggestion}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

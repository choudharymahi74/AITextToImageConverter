import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Grid3X3, List, Download, Share, Expand, Heart, MoreHorizontal, Image as ImageIcon } from "lucide-react";
import { formatTimeAgo, downloadImage } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import ImageModal from "./image-modal";
import type { GeneratedImage } from "@shared/schema";

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const { toast } = useToast();

  const { data: images = [], isLoading } = useQuery<GeneratedImage[]>({
    queryKey: ["/api/images"],
  });

  const handleDownload = (image: GeneratedImage) => {
    try {
      downloadImage(image.imageUrl, `generated-image-${image.id}.jpg`);
      toast({
        title: "Download started",
        description: "Your image is being downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Unable to download the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (image: GeneratedImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AI Generated Image",
          text: image.prompt,
          url: image.imageUrl,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(image.imageUrl);
        toast({
          title: "Link copied",
          description: "Image URL copied to clipboard.",
        });
      } catch (error) {
        toast({
          title: "Share failed",
          description: "Unable to share the image.",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Your Creations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="aspect-square bg-slate-200 animate-pulse"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-slate-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-slate-200 rounded animate-pulse w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Your Creations</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900">
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No images yet</h3>
            <p className="text-slate-600">Start by describing your image above and hit generate!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <Card key={image.id} className="group relative rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={image.imageUrl}
                    alt={`AI generated: ${image.prompt}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => setSelectedImage(image)}
                        className="bg-white text-slate-900 shadow-lg hover:bg-slate-100"
                      >
                        <Expand className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => handleDownload(image)}
                        className="bg-white text-slate-900 shadow-lg hover:bg-slate-100"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => handleShare(image)}
                        className="bg-white text-slate-900 shadow-lg hover:bg-slate-100"
                      >
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                    {image.prompt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {formatTimeAgo(new Date(image.createdAt))}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-red-500">
                        <Heart className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-slate-600">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ImageModal 
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onDownload={handleDownload}
        onShare={handleShare}
      />
    </>
  );
}

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Download, Share } from "lucide-react";
import type { GeneratedImage } from "@shared/schema";

interface ImageModalProps {
  image: GeneratedImage | null;
  onClose: () => void;
  onDownload: (image: GeneratedImage) => void;
  onShare: (image: GeneratedImage) => void;
}

export default function ImageModal({ image, onClose, onDownload, onShare }: ImageModalProps) {
  if (!image) return null;

  return (
    <Dialog open={!!image} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-transparent border-none">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-slate-300 h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
          <img 
            src={image.imageUrl}
            alt={`AI generated: ${image.prompt}`}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 rounded-lg p-4 text-white">
            <p className="text-sm mb-2">{image.prompt}</p>
            <div className="flex space-x-2">
              <Button 
                onClick={() => onDownload(image)}
                size="sm"
                className="bg-white text-black hover:bg-slate-100"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button 
                onClick={() => onShare(image)}
                size="sm"
                className="bg-white text-black hover:bg-slate-100"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

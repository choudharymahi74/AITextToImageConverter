import { Zap, Palette, Download } from "lucide-react";

export default function Features() {
  return (
    <div className="max-w-6xl mx-auto mt-20">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Why Choose ArtGenAI?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Lightning Fast</h3>
          <p className="text-slate-600">Generate stunning images in seconds with our optimized AI models</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Palette className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Multiple Styles</h3>
          <p className="text-slate-600">Choose from various artistic styles to match your vision</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
            <Download className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">High Quality</h3>
          <p className="text-slate-600">Download your creations in high resolution for any use</p>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
        Turn Your Words Into{" "}
        <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Stunning Art
        </span>
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Create beautiful, unique images from simple text descriptions using free AI technology. 
        Your imagination is the only limit.
      </p>
      <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
        <span className="px-3 py-1 bg-muted rounded-full">✨ Free to use</span>
        <span className="px-3 py-1 bg-muted rounded-full">🎨 Multiple styles</span>
        <span className="px-3 py-1 bg-muted rounded-full">⚡ Fast generation</span>
      </div>
    </div>
  );
}

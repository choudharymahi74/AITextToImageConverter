import Header from "@/components/header";
import Hero from "@/components/hero";
import ImageGenerator from "@/components/image-generator";
import ImageGallery from "@/components/image-gallery";
import Features from "@/components/features";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero />
        <div className="max-w-4xl mx-auto">
          <ImageGenerator />
          <ImageGallery />
        </div>
        <Features />
      </main>
      <Footer />
    </div>
  );
}

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.5 2c1.38 0 2.5 1.12 2.5 2.5 0 .74-.37 1.39-.94 1.78l1.66 10.94c.09.66-.53 1.28-1.22 1.28-.14 0-.28-.02-.42-.06L9.5 17l-5.58 1.44c-.14.04-.28.06-.42.06-.69 0-1.31-.62-1.22-1.28L4.94 6.28C4.37 5.89 4 5.24 4 4.5 4 3.12 5.12 2 6.5 2s2.5 1.12 2.5 2.5c0 .74-.37 1.39-.94 1.78L9.5 8.72l1.44-2.44C10.37 5.89 10 5.24 10 4.5c0-1.38 1.12-2.5 2.5-2.5z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">ArtGenAI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-muted-foreground hover:text-foreground font-medium transition-colors">Gallery</a>
            <a href="#" className="text-muted-foreground hover:text-foreground font-medium transition-colors">Pricing</a>
            <a href="#" className="text-muted-foreground hover:text-foreground font-medium transition-colors">Help</a>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Sign In
            </Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

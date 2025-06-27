export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.5 2c1.38 0 2.5 1.12 2.5 2.5 0 .74-.37 1.39-.94 1.78l1.66 10.94c.09.66-.53 1.28-1.22 1.28-.14 0-.28-.02-.42-.06L9.5 17l-5.58 1.44c-.14.04-.28.06-.42.06-.69 0-1.31-.62-1.22-1.28L4.94 6.28C4.37 5.89 4 5.24 4 4.5 4 3.12 5.12 2 6.5 2s2.5 1.12 2.5 2.5c0 .74-.37 1.39-.94 1.78L9.5 8.72l1.44-2.44C10.37 5.89 10 5.24 10 4.5c0-1.38 1.12-2.5 2.5-2.5z"/>
                </svg>
              </div>
              <span className="text-xl font-bold">ArtGenAI</span>
            </div>
            <p className="text-slate-400">Transform your imagination into reality with AI-powered image generation.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 ArtGenAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

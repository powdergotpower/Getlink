import { Link2 } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-glow">
              <Link2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                GetLink
              </h1>
              <p className="text-xs text-muted-foreground">Share files instantly</p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <p className="text-sm text-muted-foreground">
              Upload • Generate • Share
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
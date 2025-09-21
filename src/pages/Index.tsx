import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import Features from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Share Files Instantly
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload any file and get a universal web link to share or download. 
            Perfect for quick file sharing across devices and platforms.
          </p>
        </div>

        <div className="mb-16">
          <FileUpload />
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Why Choose GetLink?</h3>
          <Features />
        </div>

        <footer className="text-center pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Built with modern web technologies for fast, reliable file sharing
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;

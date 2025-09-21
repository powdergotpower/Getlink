import { Card } from "@/components/ui/card";
import { Upload, Link, Smartphone, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Upload,
      title: "Universal Upload",
      description: "Support for all file types - images, videos, documents, audio, and more"
    },
    {
      icon: Link,
      title: "Instant Links",
      description: "Get shareable URLs immediately after upload for easy distribution"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Perfect experience on mobile devices with touch-friendly interface"
    },
    {
      icon: Shield,
      title: "Secure Sharing",
      description: "Your files are hosted securely with unique, hard-to-guess URLs"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
      {features.map((feature, index) => (
        <Card 
          key={index}
          className="p-6 bg-card/50 backdrop-blur-sm border shadow-card hover:shadow-glow transition-all duration-300 group"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-sm group-hover:shadow-glow transition-shadow duration-300">
              <feature.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Features;
import { Button } from "@/components/ui/button";
import { Download, Share2, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface ResultDisplayProps {
  generatedImage: string | null;
  isLoading: boolean;
}

const ResultDisplay = ({ generatedImage, isLoading }: ResultDisplayProps) => {
  const handleDownload = () => {
    if (!generatedImage) return;
    
    // Create download link
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `eticaret-urun-gorseli-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Görsel indirildi!");
  };

  const handleShare = async () => {
    if (!generatedImage) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'E-Ticaret Ürün Görseli',
          text: 'AI ile oluşturduğum ürün görseli',
          url: generatedImage,
        });
      } catch (error) {
        console.log('Paylaşım iptal edildi');
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(generatedImage);
      toast.success("Görsel linki panoya kopyalandı!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center animate-pulse">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="absolute -inset-2 bg-gradient-primary rounded-2xl blur-xl opacity-30 animate-ping" />
        </div>
        
        <div className="text-center space-y-2">
          <h4 className="text-lg font-semibold">AI Sihirli Dokunuşunu Yapıyor</h4>
          <p className="text-muted-foreground">Tasarımınız oluşturuluyor...</p>
          
          <div className="flex items-center justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!generatedImage) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6">
        <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-muted-foreground" />
        </div>
        
        <div className="text-center space-y-2">
          <h4 className="text-lg font-semibold">Tasarımınız Burada Görünecek</h4>
          <p className="text-muted-foreground">
            Ürün görselinizi yükleyin ve talimat verin
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          <div className="h-24 bg-muted rounded-lg animate-pulse" />
          <div className="h-24 bg-muted rounded-lg animate-pulse delay-100" />
          <div className="h-24 bg-muted rounded-lg animate-pulse delay-200" />
          <div className="h-24 bg-muted rounded-lg animate-pulse delay-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Generated Image */}
      <div className="relative group">
        <img
          src={generatedImage}
          alt="Oluşturulan tasarım"
          className="w-full h-96 object-cover rounded-xl shadow-elegant"
        />
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleDownload}
              className="bg-background/90 hover:bg-background"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleShare}
              className="bg-background/90 hover:bg-background"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button 
          onClick={handleDownload}
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          <Download className="mr-2 h-4 w-4" />
          İndir
        </Button>
        <Button 
          variant="outline"
          onClick={handleShare}
          className="border-primary/30 hover:border-primary/50 hover:bg-primary/5"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Paylaş
        </Button>
      </div>

      {/* Image Info */}
      <div className="p-4 bg-muted/50 rounded-lg border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Format:</span>
          <span className="font-medium">JPG • 1024x1024</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-muted-foreground">Model:</span>
          <span className="font-medium">Gemini 2.5 Flash</span>
        </div>
      </div>

      {/* Regenerate Button */}
      <Button 
        variant="outline"
        className="w-full border-dashed hover:bg-primary/5"
        onClick={() => window.location.reload()}
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Yeniden Oluştur
      </Button>
    </div>
  );
};

export default ResultDisplay;
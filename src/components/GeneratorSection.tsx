import { useState } from "react";
import { Card } from "@/components/ui/card";
import ImageUpload from "./ImageUpload";
import PromptInput from "./PromptInput";
import ResultDisplay from "./ResultDisplay";
import { toast } from "sonner";

const GeneratorSection = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (uploadedImages.length === 0) {
      toast.error("Lütfen en az bir ürün görseli yükleyin");
      return;
    }
    
    if (!prompt.trim()) {
      toast.error("Lütfen tasarım talimatınızı yazın");
      return;
    }

    setIsGenerating(true);
    toast.info("Tasarım oluşturuluyor... Lütfen bekleyin.");

    try {
      // Simulated API call - replace with actual Gemini 2.5 Flash integration
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated image URL - replace with actual API response
      setGeneratedImage("https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=800&fit=crop&crop=center");
      
      toast.success("🎉 Tasarımınız hazır!");
    } catch (error) {
      console.error("Generation failed:", error);
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="generator" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Tasarımınızı Oluşturun
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ürün görselinizi yükleyin, istediğiniz tasarımı açıklayın ve AI'ın sihirli dokunuşunu izleyin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-8">
            <Card className="p-6 bg-gradient-card border-primary/20 backdrop-blur-sm shadow-card">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                  <span className="text-primary-foreground font-bold">1</span>
                </div>
                Ürün Görsellerini Yükle
              </h3>
              <ImageUpload 
                onImagesChange={setUploadedImages}
                maxImages={2}
              />
            </Card>

            <Card className="p-6 bg-gradient-card border-primary/20 backdrop-blur-sm shadow-card">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                  <span className="text-primary-foreground font-bold">2</span>
                </div>
                Tasarım Talimatı Verin
              </h3>
              <PromptInput
                prompt={prompt}
                onPromptChange={setPrompt}
                onGenerate={handleGenerate}
                isLoading={isGenerating}
              />
            </Card>
          </div>

          {/* Results Section */}
          <div>
            <Card className="p-6 bg-gradient-card border-primary/20 backdrop-blur-sm shadow-card h-full">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                  <span className="text-primary-foreground font-bold">3</span>
                </div>
                Sonuç
              </h3>
              <ResultDisplay
                generatedImage={generatedImage}
                isLoading={isGenerating}
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneratorSection;
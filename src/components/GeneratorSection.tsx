import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import ImageUpload from "./ImageUpload";
import PromptInput from "./PromptInput";
import ResultDisplay from "./ResultDisplay";
import ApiKeyInput from "./ApiKeyInput";
import AIImageService from "@/services/aiImageService";
import { toast } from "sonner";

const GeneratorSection = () => {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [modelImages, setModelImages] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleGenerate = async () => {
    if (productImages.length === 0) {
      toast.error("Lütfen ürün görseli yükleyin");
      return;
    }

    if (modelImages.length === 0) {
      toast.error("Lütfen model görseli yükleyin");
      return;
    }
    
    if (!prompt.trim()) {
      toast.error("Lütfen birleştirme talimatınızı yazın");
      return;
    }

    setIsGenerating(true);
    toast.info("AI görselleri birleştiriyor... Bu akıllı algoritmalar 15-30 saniye sürebilir.");

    try {
      const aiImageService = new AIImageService();
      const result = await aiImageService.mergeImages({
        productImage: productImages[0],
        modelImage: modelImages[0],
        prompt
      });
      
      setGeneratedImage(result);
      toast.success("🎉 Görseller AI ile profesyonel şekilde birleştirildi!");
    } catch (error) {
      console.error("AI merge failed:", error);
      toast.error("AI birleştirme başarısız oldu. Lütfen tekrar deneyin.");
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
              Görselleri Birleştirin
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ürün ve model görsellerini yükleyin, birleştirme talimatı verin ve AI'ın sihirli birleştirmesini izleyin.
          </p>
        </div>

        {/* API Key Section */}
        <div className="mb-8">
          <ApiKeyInput 
            onApiKeySet={setApiKey} 
            storedApiKey={apiKey}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-card border-primary/20 backdrop-blur-sm shadow-card">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                  <span className="text-primary-foreground font-bold">1</span>
                </div>
                Ürün Görseli
              </h3>
              <ImageUpload 
                onImagesChange={setProductImages}
                maxImages={1}
                uploadType="product"
                title="Ürün Görselinizi Yükleyin"
                description="Birleştirilecek ürünün görselini seçin"
              />
            </Card>

            <Card className="p-6 bg-gradient-card border-primary/20 backdrop-blur-sm shadow-card">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                  <span className="text-primary-foreground font-bold">2</span>
                </div>
                Model Görseli
              </h3>
              <ImageUpload 
                onImagesChange={setModelImages}
                maxImages={1}
                uploadType="model"
                title="Model/Kişi Görseli Yükleyin"
                description="Ürünün yerleştirileceği model görselini seçin"
              />
            </Card>

            <Card className="p-6 bg-gradient-card border-primary/20 backdrop-blur-sm shadow-card">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                  <span className="text-primary-foreground font-bold">3</span>
                </div>
                Birleştirme Talimatı
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
                  <span className="text-primary-foreground font-bold">4</span>
                </div>
                Birleştirilmiş Görsel
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
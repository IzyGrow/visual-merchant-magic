import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Zap, Target, Palette } from "lucide-react";

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isLoading?: boolean;
}

const PromptInput = ({ prompt, onPromptChange, onGenerate, isLoading }: PromptInputProps) => {
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  const promptTemplates = [
    {
      id: 'modern',
      icon: Zap,
      title: 'Modern & Minimal',
      description: 'Temiz, modern tasarım',
      prompt: 'Modern ve minimal tasarım, temiz arka plan, profesyonel e-ticaret görseli, Trendyol tarzı, yüksek kalite'
    },
    {
      id: 'vibrant',
      icon: Palette,
      title: 'Renkli & Canlı',
      description: 'Dikkat çekici renkler',
      prompt: 'Canlı renkler, gradient arka plan, dinamik kompozisyon, e-ticaret banner, modern tasarım, satış odaklı'
    },
    {
      id: 'premium',
      icon: Sparkles,
      title: 'Premium & Lüks',
      description: 'Lüks görünüm',
      prompt: 'Premium lüks tasarım, altın detaylar, zarif arka plan, yüksek kalite ürün sunumu, Hepsiburada tarzı'
    },
    {
      id: 'sale',
      icon: Target,
      title: 'İndirim & Kampanya',
      description: 'Kampanya görseli',
      prompt: 'İndirim etiketi, kampanya banner, dikkat çekici yazılar, satış odaklı tasarım, e-ticaret promosyonu'
    }
  ];

  const useTemplate = (template: typeof promptTemplates[0]) => {
    setActiveTemplate(template.id);
    onPromptChange(template.prompt);
    setTimeout(() => setActiveTemplate(null), 200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Tasarım Talimatınız</h3>
        
        {/* Prompt Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {promptTemplates.map((template) => (
            <Button
              key={template.id}
              variant="outline"
              className={`
                h-auto p-4 justify-start text-left transition-all duration-200
                hover:bg-primary/5 hover:border-primary/30 hover:shadow-elegant
                ${activeTemplate === template.id ? 'scale-95 bg-primary/10' : ''}
              `}
              onClick={() => useTemplate(template)}
            >
              <template.icon className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium">{template.title}</div>
                <div className="text-sm text-muted-foreground">{template.description}</div>
              </div>
            </Button>
          ))}
        </div>
        
        {/* Custom Prompt Input */}
        <div className="relative">
          <Textarea
            placeholder="Ürününüz için nasıl bir tasarım istiyorsunuz? Detaylı açıklayın... (örn: 'Beyaz arka plan üzerinde profesyonel ürün fotoğrafı, gölgeli zemin, modern tipografi ile ürün adı')"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            className="min-h-[120px] resize-none border-2 focus:border-primary/50 bg-card/50 backdrop-blur-sm"
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {prompt.length}/500
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-medium mb-2 flex items-center">
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            İpuçları
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Ürün pozisyonunu belirtin (merkez, sağ, sol)</li>
            <li>• Arka plan tercihini ekleyin (beyaz, gradient, renkli)</li>
            <li>• Metin/etiket istiyorsanız belirtin</li>
            <li>• Platform stilini söyleyin (Trendyol, Hepsiburada)</li>
          </ul>
        </div>
      </div>
      
      <Button 
        onClick={onGenerate}
        disabled={!prompt.trim() || isLoading}
        size="lg"
        className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 h-14 text-lg"
      >
        {isLoading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Tasarım Oluşturuluyor...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            AI ile Tasarımı Oluştur
          </>
        )}
      </Button>
    </div>
  );
};

export default PromptInput;
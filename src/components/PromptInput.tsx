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
      id: 'natural',
      icon: Zap,
      title: 'Doğal Yerleştirme',
      description: 'Gerçekçi ve doğal',
      prompt: 'Ürünü modelin üzerine doğal ve gerçekçi bir şekilde yerleştir, ışık uyumu, gölge detayları, profesyonel fotoğraf kalitesi'
    },
    {
      id: 'lifestyle',
      icon: Palette,
      title: 'Yaşam Tarzı',
      description: 'Günlük kullanım odaklı',
      prompt: 'Ürünü günlük yaşam senaryosunda göster, doğal pozlar, yaşam tarzı fotoğrafçılığı, e-ticaret için optimize'
    },
    {
      id: 'studio',
      icon: Sparkles,
      title: 'Stüdyo Kalitesi',
      description: 'Profesyonel stüdyo',
      prompt: 'Stüdyo kalitesinde profesyonel yerleştirme, mükemmel ışıklandırma, temiz arka plan, ürün odaklı kompozisyon'
    },
    {
      id: 'dynamic',
      icon: Target,
      title: 'Dinamik Aksiyon',
      description: 'Hareket ve enerji',
      prompt: 'Ürünü aktif kullanım anında göster, hareket duygusu, dinamik açılar, enerji dolu kompozisyon'
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
            placeholder="Ürünün model üzerine nasıl yerleştirilmesini istiyorsunuz? (örn: 'Ayakkabıyı modelin ayağına doğal şekilde yerleştir, ışık uyumu olsun, profesyonel fotoğraf kalitesinde')"
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
            <li>• Ürünün modele yerleştirilme şeklini açıklayın</li>
            <li>• Işık ve gölge tercihlerini belirtin</li>
            <li>• Pozisyon detaylarını verin (doğal, merkezi, vb.)</li>
            <li>• Genel atmosferi tanımlayın (profesyonel, casual, vb.)</li>
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
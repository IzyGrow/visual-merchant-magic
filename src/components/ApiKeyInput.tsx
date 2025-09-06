import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Key, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  storedApiKey: string | null;
}

const ApiKeyInput = ({ onApiKeySet, storedApiKey }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Lütfen API anahtarınızı girin");
      return;
    }

    if (!apiKey.startsWith('AIza')) {
      toast.error("Geçersiz Gemini API anahtarı formatı");
      return;
    }

    localStorage.setItem('gemini_api_key', apiKey);
    onApiKeySet(apiKey);
    setApiKey("");
    toast.success("API anahtarı kaydedildi!");
  };

  const handleRemove = () => {
    localStorage.removeItem('gemini_api_key');
    onApiKeySet("");
    toast.success("API anahtarı kaldırıldı");
  };

  if (storedApiKey) {
    return (
      <Card className="p-6 bg-ecommerce-success/10 border-ecommerce-success/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-ecommerce-success/20 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-ecommerce-success" />
            </div>
            <div>
              <h3 className="font-medium text-ecommerce-success">API Anahtarı Aktif</h3>
              <p className="text-sm text-muted-foreground">
                {storedApiKey.substring(0, 8)}...{storedApiKey.slice(-4)}
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRemove}
            className="border-ecommerce-success/30 hover:bg-ecommerce-success/5"
          >
            Kaldır
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-primary/5 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Key className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium mb-2">Gemini API Anahtarı Gerekli</h3>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 mb-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-orange-700 dark:text-orange-300 mb-1">
                    <strong>Güvenlik Uyarısı:</strong> API anahtarınız tarayıcıda localStorage'da saklanacak.
                  </p>
                  <p className="text-orange-600 dark:text-orange-400">
                    Üretim ortamında Supabase kullanmanızı öneririz.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="relative">
                <Input
                  type={showKey ? "text" : "password"}
                  placeholder="Gemini API anahtarınızı girin (AIza...)"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              
              <Button 
                onClick={handleSave}
                className="w-full bg-gradient-primary"
                disabled={!apiKey.trim()}
              >
                API Anahtarını Kaydet
              </Button>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p>API anahtarı almak için:</p>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li><a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ai.google.dev</a> adresine gidin</li>
                <li>"Get API key" butonuna tıklayın</li>
                <li>Gemini API anahtarınızı alın</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ApiKeyInput;
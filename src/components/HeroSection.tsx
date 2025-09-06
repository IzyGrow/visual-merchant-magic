import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-ecommerce-orange/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-ecommerce-blue/10 rounded-full blur-2xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/20 rounded-full blur-lg animate-bounce" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="inline-block mb-6 px-4 py-2 bg-gradient-card rounded-full border border-primary/20 backdrop-blur-sm">
          <span className="text-sm font-medium bg-gradient-primary bg-clip-text text-transparent">
            🚀 AI Destekli Ürün Tasarımı
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            AI Görsel
          </span>
          <br />
          <span className="text-foreground">
            Birleştirici
          </span>
          <br />
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            E-Ticaret İçin
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Gemini 2.5 Flash AI ile ürünlerinizi modeller üzerine yerleştirin. 
          Ayakkabıyı ayağa, gözlüğü yüze, saati ele - profesyonel e-ticaret görselleri saniyeler içinde.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={scrollToGenerator}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-4 h-auto"
          >
            Hemen Başla
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-lg px-8 py-4 h-auto backdrop-blur-sm"
          >
            Örnekleri Gör
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gradient-card p-6 rounded-2xl border border-primary/20 backdrop-blur-sm">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">10k+</div>
            <div className="text-sm text-muted-foreground">Üretilen Görsel</div>
          </div>
          <div className="bg-gradient-card p-6 rounded-2xl border border-primary/20 backdrop-blur-sm">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">5sn</div>
            <div className="text-sm text-muted-foreground">Ortalama Üretim</div>
          </div>
          <div className="bg-gradient-card p-6 rounded-2xl border border-primary/20 backdrop-blur-sm">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">99%</div>
            <div className="text-sm text-muted-foreground">Memnuniyet Oranı</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
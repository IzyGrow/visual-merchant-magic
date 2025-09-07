import GeminiService from './geminiService';
import { ErrorHandler } from './errorHandler';
import { PromptEnhancer } from './promptEnhancer';

interface ImageMergeRequest {
  productImage: File;
  modelImage: File;
  prompt: string;
}

export class AIImageService {
  private geminiService: GeminiService | null = null;
  
  constructor(apiKey?: string) {
    if (apiKey) {
      this.geminiService = new GeminiService(apiKey);
    }
  }

  setApiKey(apiKey: string) {
    this.geminiService = new GeminiService(apiKey);
  }

  async mergeImages({ productImage, modelImage, prompt }: ImageMergeRequest): Promise<string> {
    try {
      console.log('Starting AI image merge...');
      
      // Enhance the prompt for better AI understanding
      const enhancedPrompt = PromptEnhancer.enhancePrompt(prompt);
      console.log('Enhanced prompt:', enhancedPrompt);
      
      // Check if we have Gemini API available
      if (this.geminiService) {
        console.log('Using Gemini AI for enhanced image merging...');
        return await this.geminiService.generateMergedImage({
          productImage,
          modelImage,
          prompt: enhancedPrompt
        });
      } else {
        console.log('Gemini API not available, using fallback composite method...');
        return await this.createFallbackComposite(productImage, modelImage, prompt);
      }
      
    } catch (error) {
      ErrorHandler.logError(error, 'AIImageService.mergeImages');
      
      // If Gemini fails, try fallback method
      if (this.geminiService) {
        console.log('Gemini failed, trying fallback method...');
        try {
          return await this.createFallbackComposite(productImage, modelImage, prompt);
        } catch (fallbackError) {
          ErrorHandler.logError(fallbackError, 'AIImageService.fallback');
          throw new Error(ErrorHandler.handleAIError(fallbackError));
        }
      } else {
        throw new Error(ErrorHandler.handleAIError(error));
      }
    }
  }

  private async createFallbackComposite(
    productImage: File, 
    modelImage: File, 
    prompt: string
  ): Promise<string> {
    console.log('Creating fallback composite...');
    
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Canvas not supported');
      }
      
    // Set high resolution
      canvas.width = 1024;
      canvas.height = 1024;
      
      // Load both images
      const [modelImg, productImg] = await Promise.all([
      this.loadImage(URL.createObjectURL(modelImage)),
      this.loadImage(URL.createObjectURL(productImage))
      ]);
      
      // Draw model image as background
      ctx.drawImage(modelImg, 0, 0, canvas.width, canvas.height);
      
    // Get positioning based on enhanced prompt analysis
    const positioning = PromptEnhancer.getPositioningHints(prompt);
    
    // Create realistic shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = positioning.shadowOffset.x;
    ctx.shadowOffsetY = positioning.shadowOffset.y;
    
    // Apply blend mode for realistic integration
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = 0.9;
    
    // Draw product with calculated positioning
    ctx.drawImage(
      productImg, 
      positioning.x, 
      positioning.y, 
      positioning.width, 
      positioning.height
    );
    
    ctx.restore();

    // Add subtle lighting effects
    this.addLightingEffects(ctx, positioning);
      
      // Convert to blob URL
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const mergedUrl = URL.createObjectURL(blob);
          console.log('Fallback composite created successfully');
            resolve(mergedUrl);
          } else {
          reject(new Error('Failed to create fallback composite'));
          }
        }, 'image/jpeg', 0.95);
      });
  }


  private addLightingEffects(ctx: CanvasRenderingContext2D, positioning: any): void {
    // Add subtle lighting overlay
    const gradient = ctx.createRadialGradient(
      positioning.x + positioning.width / 2,
      positioning.y + positioning.height / 2,
      0,
      positioning.x + positioning.width / 2,
      positioning.y + positioning.height / 2,
      positioning.width
    );
    
    gradient.addColorStop(0, 'rgba(255,255,255,0.1)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  
  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
      img.crossOrigin = 'anonymous';
    });
  }
}

export default AIImageService;

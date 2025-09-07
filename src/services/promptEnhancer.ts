export class PromptEnhancer {
  private static readonly POSITION_KEYWORDS = {
    'ayak': ['ayak', 'foot', 'feet', 'ayakkabı', 'shoe', 'shoes', 'bot', 'sandalet'],
    'kulak': ['kulak', 'ear', 'ears', 'kulaklık', 'headphone', 'earphone', 'işitme'],
    'el': ['el', 'hand', 'hands', 'saat', 'watch', 'bilezik', 'bracelet', 'yüzük', 'ring'],
    'baş': ['baş', 'head', 'şapka', 'hat', 'gözlük', 'glasses', 'maske', 'mask'],
    'vücut': ['vücut', 'body', 'göğüs', 'chest', 'karın', 'stomach', 'sırt', 'back'],
    'boyun': ['boyun', 'neck', 'kolye', 'necklace', 'fular', 'scarf']
  };

  private static readonly STYLE_KEYWORDS = {
    'profesyonel': ['profesyonel', 'professional', 'iş', 'business', 'formal'],
    'casual': ['casual', 'günlük', 'rahat', 'relaxed', 'informal'],
    'spor': ['spor', 'sport', 'fitness', 'egzersiz', 'workout'],
    'elegant': ['elegant', 'şık', 'zarif', 'sophisticated', 'classy']
  };

  static enhancePrompt(userPrompt: string, productType?: string): string {
    const lowerPrompt = userPrompt.toLowerCase();
    
    // Detect position from prompt
    const detectedPosition = this.detectPosition(lowerPrompt);
    
    // Detect style from prompt
    const detectedStyle = this.detectStyle(lowerPrompt);
    
    // Create enhanced prompt
    let enhancedPrompt = `Create a professional e-commerce product placement image. `;
    
    if (detectedPosition) {
      enhancedPrompt += `Place the product on the model's ${detectedPosition}. `;
    }
    
    if (detectedStyle) {
      enhancedPrompt += `The style should be ${detectedStyle}. `;
    }
    
    enhancedPrompt += `User's specific instruction: "${userPrompt}". `;
    
    // Add technical requirements
    enhancedPrompt += `
    Technical requirements:
    - Ensure realistic lighting and shadows
    - Maintain proper proportions and perspective
    - Create seamless integration between product and model
    - Use high-quality, professional composition
    - Make it suitable for e-commerce product display
    - Ensure the product looks natural and appealing on the model
    `;
    
    return enhancedPrompt.trim();
  }
  
  private static detectPosition(prompt: string): string | null {
    for (const [position, keywords] of Object.entries(this.POSITION_KEYWORDS)) {
      if (keywords.some(keyword => prompt.includes(keyword))) {
        return position;
      }
    }
    return null;
  }
  
  private static detectStyle(prompt: string): string | null {
    for (const [style, keywords] of Object.entries(this.STYLE_KEYWORDS)) {
      if (keywords.some(keyword => prompt.includes(keyword))) {
        return style;
      }
    }
    return null;
  }
  
  static getPositioningHints(prompt: string): {
    x: number;
    y: number;
    width: number;
    height: number;
    shadowOffset: { x: number; y: number };
  } {
    const lowerPrompt = prompt.toLowerCase();
    
    // Enhanced positioning logic
    if (this.POSITION_KEYWORDS.ayak.some(keyword => lowerPrompt.includes(keyword))) {
      return {
        x: 200,
        y: 700,
        width: 600,
        height: 250,
        shadowOffset: { x: 8, y: 12 }
      };
    } else if (this.POSITION_KEYWORDS.kulak.some(keyword => lowerPrompt.includes(keyword))) {
      return {
        x: 600,
        y: 200,
        width: 300,
        height: 200,
        shadowOffset: { x: 5, y: 8 }
      };
    } else if (this.POSITION_KEYWORDS.el.some(keyword => lowerPrompt.includes(keyword))) {
      return {
        x: 300,
        y: 600,
        width: 400,
        height: 300,
        shadowOffset: { x: 6, y: 10 }
      };
    } else if (this.POSITION_KEYWORDS.baş.some(keyword => lowerPrompt.includes(keyword))) {
      return {
        x: 350,
        y: 100,
        width: 300,
        height: 250,
        shadowOffset: { x: 4, y: 6 }
      };
    } else if (this.POSITION_KEYWORDS.vücut.some(keyword => lowerPrompt.includes(keyword))) {
      return {
        x: 250,
        y: 300,
        width: 500,
        height: 400,
        shadowOffset: { x: 7, y: 10 }
      };
    } else if (this.POSITION_KEYWORDS.boyun.some(keyword => lowerPrompt.includes(keyword))) {
      return {
        x: 400,
        y: 250,
        width: 200,
        height: 150,
        shadowOffset: { x: 3, y: 5 }
      };
    } else {
      // Default central positioning
      return {
        x: 300,
        y: 300,
        width: 400,
        height: 400,
        shadowOffset: { x: 5, y: 8 }
      };
    }
  }
}

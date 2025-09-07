interface ImageMergeRequest {
  productImage: File;
  modelImage: File;
  prompt: string;
}

class ImageEditingService {
  
  private async saveFileTemporarily(file: File, name: string): Promise<string> {
    // Convert file to blob URL for temporary use
    return URL.createObjectURL(file);
  }

  async mergeImages({ productImage, modelImage, prompt }: ImageMergeRequest): Promise<string> {
    try {
      // Save images temporarily
      const productPath = await this.saveFileTemporarily(productImage, 'product');
      const modelPath = await this.saveFileTemporarily(modelImage, 'model');
      
      // Create a merged preview by showing the product image
      // In a real implementation, this would use proper AI image merging
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Canvas context not available');
      }

      // Set canvas size
      canvas.width = 512;
      canvas.height = 512;

      // Load and draw the model image first (background)
      const modelImg = new Image();
      const productImg = new Image();
      
      return new Promise((resolve, reject) => {
        let imagesLoaded = 0;
        const checkComplete = () => {
          if (imagesLoaded === 2) {
            // Draw model image as background
            ctx.drawImage(modelImg, 0, 0, canvas.width, canvas.height);
            
            // Draw product image on top (smaller, positioned)
            const productSize = Math.min(canvas.width, canvas.height) * 0.4;
            const x = (canvas.width - productSize) / 2;
            const y = canvas.height - productSize - 20;
            
            ctx.drawImage(productImg, x, y, productSize, productSize);
            
            // Convert to blob URL
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(URL.createObjectURL(blob));
              } else {
                reject(new Error('Failed to create merged image'));
              }
            }, 'image/jpeg', 0.9);
          }
        };

        modelImg.onload = () => {
          imagesLoaded++;
          checkComplete();
        };
        
        productImg.onload = () => {
          imagesLoaded++;
          checkComplete();
        };
        
        modelImg.onerror = () => reject(new Error('Failed to load model image'));
        productImg.onerror = () => reject(new Error('Failed to load product image'));
        
        modelImg.src = modelPath;
        productImg.src = productPath;
      });

    } catch (error) {
      console.error('Image merging error:', error);
      throw new Error('Görsel birleştirme sırasında hata oluştu');
    }
  }
}

export default ImageEditingService;
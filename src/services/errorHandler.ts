export class ErrorHandler {
  static handleAIError(error: any): string {
    console.error('AI Error:', error);
    
    // Check for specific error types
    if (error.message?.includes('API key')) {
      return 'API anahtarı geçersiz veya eksik. Lütfen Gemini API anahtarınızı kontrol edin.';
    }
    
    if (error.message?.includes('quota') || error.message?.includes('limit')) {
      return 'API kullanım limitiniz aşıldı. Lütfen daha sonra tekrar deneyin.';
    }
    
    if (error.message?.includes('network') || error.message?.includes('fetch')) {
      return 'Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin.';
    }
    
    if (error.message?.includes('timeout')) {
      return 'İşlem zaman aşımına uğradı. Lütfen tekrar deneyin.';
    }
    
    if (error.message?.includes('image') || error.message?.includes('format')) {
      return 'Görsel formatı desteklenmiyor. Lütfen JPG, PNG veya WebP formatında görsel yükleyin.';
    }
    
    if (error.message?.includes('size')) {
      return 'Görsel boyutu çok büyük. Lütfen 10MB\'dan küçük görseller yükleyin.';
    }
    
    // Default error message
    return 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.';
  }
  
  static logError(error: any, context: string) {
    console.error(`[${context}] Error:`, {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
  
  static isRetryableError(error: any): boolean {
    const retryableErrors = [
      'network',
      'timeout',
      'quota',
      'rate limit',
      'server error',
      '5xx'
    ];
    
    const errorMessage = error.message?.toLowerCase() || '';
    return retryableErrors.some(retryableError => 
      errorMessage.includes(retryableError)
    );
  }
}

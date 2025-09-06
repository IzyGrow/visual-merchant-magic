import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
}

const ImageUpload = ({ onImagesChange, maxImages = 2 }: ImageUploadProps) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, []);

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast.error("Lütfen geçerli görsel dosyaları seçin");
      return;
    }

    const remainingSlots = maxImages - uploadedImages.length;
    const filesToAdd = imageFiles.slice(0, remainingSlots);
    
    if (filesToAdd.length < imageFiles.length) {
      toast.error(`En fazla ${maxImages} görsel yükleyebilirsiniz`);
    }

    const newImages = [...uploadedImages, ...filesToAdd];
    setUploadedImages(newImages);
    onImagesChange(newImages);
    
    if (filesToAdd.length > 0) {
      toast.success(`${filesToAdd.length} görsel başarıyla yüklendi`);
    }
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    onImagesChange(newImages);
    toast.success("Görsel kaldırıldı");
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300
          ${dragActive 
            ? 'border-primary bg-primary/5 scale-105' 
            : 'border-border hover:border-primary/50 hover:bg-primary/5'
          }
          ${uploadedImages.length >= maxImages ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploadedImages.length >= maxImages}
        />
        
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Ürün Görsellerini Yükleyin
          </h3>
          <p className="text-muted-foreground mb-4">
            Sürükle bırak veya tıklayarak seç • En fazla {maxImages} görsel
          </p>
          <Button variant="secondary" size="lg" className="pointer-events-none">
            <ImageIcon className="mr-2 h-4 w-4" />
            Görsel Seç
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            JPG, PNG, WebP • Max 10MB
          </p>
        </div>
      </div>

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {uploadedImages.map((file, index) => (
            <div 
              key={index}
              className="relative group bg-card rounded-xl border overflow-hidden shadow-card"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-medium truncate">{file.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(1)}MB
                </p>
              </div>
              
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
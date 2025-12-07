import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Upload, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import CameraCapture from "@/components/CameraCapture";
import ImagePreview from "@/components/ImagePreview";

const Identify = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCamera = () => {
    setShowCamera(true);
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCapturedImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setShowCamera(false);
  };

  const handleIdentify = async () => {
    if (!capturedImage) return;
    
    setIsProcessing(true);
    
    try {
      const { identifyPlant } = await import("@/utils/tfliteModel");
      const results = await identifyPlant(capturedImage);
      
      setIsProcessing(false);
      
      // Navigate to results page
      navigate("/results", {
        state: { results, imageData: capturedImage },
      });
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Identification Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleClose = () => {
    setCapturedImage(null);
    setShowCamera(false);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <AnimatePresence>
        {showCamera && (
          <CameraCapture onCapture={handleCapture} onClose={handleClose} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {capturedImage && (
          <ImagePreview
            imageData={capturedImage}
            onIdentify={handleIdentify}
            onRetake={handleRetake}
            onClose={handleClose}
            isProcessing={isProcessing}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen p-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-4 mb-8"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Identify Plant</h1>
          <p className="text-sm text-muted-foreground">
            Choose how to capture
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="space-y-6 max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center py-12"
        >
          <div className="h-32 w-32 mx-auto rounded-full bg-botanical-gradient flex items-center justify-center mb-6 shadow-leaf">
            <Camera className="h-16 w-16 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Ready to Identify</h2>
          <p className="text-muted-foreground text-sm">
            Use your camera or upload an existing photo to identify medicinal plants instantly
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <Button
            onClick={handleCamera}
            className="w-full h-20 text-lg font-semibold bg-botanical-gradient hover:opacity-90 transition-opacity shadow-leaf"
          >
            <Camera className="mr-3 h-7 w-7" />
            Take Photo
          </Button>

          <Button
            onClick={handleUpload}
            variant="outline"
            className="w-full h-20 text-lg font-semibold border-2 border-primary hover:bg-accent"
          >
            <Upload className="mr-3 h-7 w-7" />
            Upload from Gallery
          </Button>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-accent/50 rounded-2xl p-6 border border-border/50"
        >
          <h3 className="font-semibold mb-3 text-foreground">Tips for Best Results</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Capture clear, well-lit images of leaves and flowers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Get close to the plant for better detail</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Avoid blurry or dark photos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Include unique features like flower patterns</span>
            </li>
          </ul>
        </motion.div>
      </div>
      </div>
    </>
  );
};

export default Identify;

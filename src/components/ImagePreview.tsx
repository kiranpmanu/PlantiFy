import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Sparkles, RotateCcw } from "lucide-react";

interface ImagePreviewProps {
  imageData: string;
  onIdentify: () => void;
  onRetake: () => void;
  onClose: () => void;
  isProcessing?: boolean;
}

const ImagePreview = ({
  imageData,
  onIdentify,
  onRetake,
  onClose,
  isProcessing = false,
}: ImagePreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-background"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <h2 className="text-lg font-semibold">Preview</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Image */}
      <div className="p-6 max-w-lg mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative rounded-3xl overflow-hidden shadow-leaf mb-6"
        >
          <img
            src={imageData}
            alt="Plant capture"
            className="w-full h-auto max-h-[60vh] object-contain bg-muted"
          />
        </motion.div>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            onClick={onIdentify}
            disabled={isProcessing}
            className="w-full h-16 text-lg font-semibold bg-botanical-gradient hover:opacity-90 transition-opacity shadow-leaf"
          >
            {isProcessing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-3"
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>
                Identifying...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-6 w-6" />
                Identify Plant
              </>
            )}
          </Button>

          <Button
            onClick={onRetake}
            variant="outline"
            className="w-full h-14 text-base font-medium border-2"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Retake Photo
          </Button>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-accent/50 rounded-2xl p-5 border border-border/50">
          <p className="text-sm text-muted-foreground text-center">
            Make sure the plant is clearly visible with good lighting for best results
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ImagePreview;

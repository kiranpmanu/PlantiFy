import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Camera } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Camera as CapCamera, CameraResultType, CameraSource } from "@capacitor/camera";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

const CameraCapture = ({ onCapture, onClose }: CameraCaptureProps) => {

  const takePhoto = async () => {
    try {
      // 🔥 Request Android Permission
      await CapCamera.requestPermissions({
        permissions: ["camera"],
      });

      // 🔥 Open the native Android camera
      const photo = await CapCamera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,   // Base64
        source: CameraSource.Camera,
        saveToGallery: false,
      });

      if (photo?.dataUrl) {
        onCapture(photo.dataUrl);
      } else {
        onClose();
      }
    } catch (error) {
      console.error("Camera error:", error);
      onClose();
    }
  };

  // Automatically open the native camera when component appears
  useEffect(() => {
    takePhoto();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      >
        <div className="text-center text-white p-6">
          <p className="mb-4">Opening camera...</p>
          <Button
            onClick={onClose}
            variant="outline"
            className="rounded-full px-6"
          >
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CameraCapture;

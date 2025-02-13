"use client";
import { X } from "lucide-react";
import { IMAGE_SIZES } from "../types/types";
import { downloadImage } from "../lib/api";

interface DownloadModalProps {
  selectedImage: number | null;
  setShowModal: (show: boolean) => void;
}

export default function DownloadModal({
  selectedImage,
  setShowModal,
}: DownloadModalProps) {
  if (selectedImage === null) return null;

  const handleDownload = (size: string) => {
    downloadImage(selectedImage, size);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Select Download Size</h3>
          <button
            onClick={() => setShowModal(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-2">
          {IMAGE_SIZES.map((size) => (
            <button
              key={size.key}
              onClick={() => handleDownload(size.key)}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

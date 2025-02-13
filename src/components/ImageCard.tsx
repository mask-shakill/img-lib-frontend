import Image from "next/image";
import { Download } from "lucide-react";
import { Image as ImageType } from "../types/types";

interface ImageCardProps {
  image: ImageType;
  setSelectedImage: (id: number | null) => void;
  setShowModal: (show: boolean) => void;
}

export default function ImageCard({
  image,
  setSelectedImage,
  setShowModal,
}: ImageCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3]">
        <Image
          src={image.src.medium}
          alt={image.alt}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 font-medium truncate mb-1">
              {image.alt || "Untitled"}
            </p>
            <p className="text-xs text-gray-500">By {image.photographer}</p>
          </div>
          <button
            onClick={() => {
              setSelectedImage(image.id);
              setShowModal(true);
            }}
            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-1"
            aria-label="Download options"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

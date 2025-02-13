import ImageCard from "./ImageCard";
import { Image as ImageType } from "../types/types";

interface ImageGridProps {
  images: ImageType[];
  setSelectedImage: (id: number | null) => void;
  setShowModal: (show: boolean) => void;
}

export default function ImageGrid({
  images,
  setSelectedImage,
  setShowModal,
}: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          setSelectedImage={setSelectedImage}
          setShowModal={setShowModal}
        />
      ))}
    </div>
  );
}

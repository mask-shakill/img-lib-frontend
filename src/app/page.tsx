"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import ImageGrid from "../components/ImageGrid";
import DownloadModal from "../components/DownloadModal";
import { fetchImages } from "../lib/api";
import { Image as ImageType } from "../types/types";

export default function Home() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchImages("nature", true);
        setImages(data.photos || []);
      } catch {
        setError("Error loading images.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold mb-6 text-pink-700">Free Image</h1>
        </Link>

        <SearchBar
          query={query}
          setQuery={setQuery}
          searchImages={() => fetchImages(query, false)}
          loading={loading}
        />

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <ImageGrid
          images={images}
          setSelectedImage={setSelectedImage}
          setShowModal={setShowModal}
        />

        {showModal && (
          <DownloadModal
            selectedImage={selectedImage}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </div>
  );
}

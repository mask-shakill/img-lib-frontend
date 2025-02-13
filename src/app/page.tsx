// page.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, Download, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ImageSize {
  key: string;
  label: string;
}

interface ImageSource {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

interface Image {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: ImageSource;
  liked: boolean;
  alt: string;
}

const IMAGE_SIZES: ImageSize[] = [
  { key: "original", label: "Original Size" },
  { key: "large2x", label: "Large 2x" },
  { key: "large", label: "Large" },
  { key: "medium", label: "Medium" },
  { key: "small", label: "Small" },
  { key: "portrait", label: "Portrait" },
  { key: "landscape", label: "Landscape" },
  { key: "tiny", label: "Tiny" },
];

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Load initial images
  useEffect(() => {
    const loadInitialImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://img-lib-backend.vercel.app/search",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: "nature", is_first_load: true }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.detail || "Failed to fetch images");
        }
        setImages(data.photos || []);
      } catch (err) {
        setError("Error loading initial images.");
        console.error("Initial load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialImages();
  }, []);

  const searchImages = async () => {
    if (!query) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://img-lib-backend.vercel.app/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, is_first_load: false }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Failed to fetch images");
      }
      setImages(data.photos || []);
    } catch (err) {
      setError("Error fetching images. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchImages();
    }
  };

  const handleDownload = (size: string) => {
    if (selectedImage !== null) {
      window.open(
        `https://img-lib-backend.vercel.app/download/${selectedImage}?size=${size}`,
        "_blank"
      );
      setShowModal(false);
      setSelectedImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold mb-6 text-pink-700">Free Image</h1>
        </Link>

        <div className="flex gap-2 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for images..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <button
            onClick={searchImages}
            disabled={loading}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={image.src.medium}
                  alt={image.alt}
                  width={500} // Set the width
                  height={500} // Set the height
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium truncate mb-1">
                      {image.alt || "Untitled"}
                    </p>
                    <p className="text-xs text-gray-500">
                      By {image.photographer}
                    </p>
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
          ))}
        </div>

        {!loading && images.length === 0 && (
          <div className="text-center text-gray-500 mt-8 p-8 bg-white rounded-lg">
            {query ? "No images found" : "Loading images..."}
          </div>
        )}

        {/* Download Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-full m-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Select Download Size</h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedImage(null);
                  }}
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
        )}
      </div>
    </div>
  );
}

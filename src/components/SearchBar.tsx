"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  searchImages: () => void;
  loading: boolean;
}

export default function SearchBar({
  query,
  setQuery,
  searchImages,
  loading,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchImages();
    }
  };

  return (
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
  );
}

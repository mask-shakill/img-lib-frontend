export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://img-lib-backend.vercel.app";

export async function fetchImages(query: string, isFirstLoad: boolean) {
  const response = await fetch(`${API_BASE_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, is_first_load: isFirstLoad }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }

  return response.json();
}

export function downloadImage(imageId: number, size: string) {
  window.open(`${API_BASE_URL}/download/${imageId}?size=${size}`, "_blank");
}

export interface ImageSize {
  key: string;
  label: string;
}

export interface ImageSource {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface Image {
  id: number;
  src: ImageSource;
  alt: string;
  photographer: string;
}

export const IMAGE_SIZES: ImageSize[] = [
  { key: "original", label: "Original Size" },
  { key: "large2x", label: "Large 2x" },
  { key: "large", label: "Large" },
  { key: "medium", label: "Medium" },
  { key: "small", label: "Small" },
  { key: "portrait", label: "Portrait" },
  { key: "landscape", label: "Landscape" },
  { key: "tiny", label: "Tiny" },
];

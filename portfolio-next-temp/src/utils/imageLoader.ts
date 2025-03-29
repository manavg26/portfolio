import { ImageLoaderProps } from 'next/image';

export const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  return `${src}?w=${width}&q=${quality || 75}`;
}

// Function to get full image path
export const getImagePath = (path: string): string => {
  // If it's already a full URL, return it as is
  if (path.startsWith('http')) {
    return path;
  }

  // Otherwise, construct path from root
  return path.startsWith('/') ? path : `/${path}`;
}

// Image sizes for optimization
export const imageSizes = {
  thumbnail: { width: 400, height: 300 }, // For small thumbnails
  card: { width: 800, height: 600 },      // For project cards
  hero: { width: 1200, height: 800 },     // For hero/banner sections
  profile: { width: 500, height: 500 },   // For profile pictures
  icon: { width: 64, height: 64 }         // For icons and logos
};

// Blur data URLs for image placeholders
export const blurDataURLs = {
  project: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAA00lEQVR4AQ3BS0oDQRSA0W/uf92u+AAxGzcuQkHEJ+JCdCNu3LsTQXARIYIbiYgIGkENZpLpnqlf0gMcnEa9PGkODvcacbYjLVrG+Yx4cYpkQZKUdHxEKjPG/Yq8zWRj0P0rYXXHePqOJoJzDiwwHyHrB+aHLSlF1KoIFEp3x/S6ZTFvCDcfDOOWEiqjf+Dz8c519UZdPaOlRRUkOtwdV7VRbpektoVqoaogVcL0gngzoXTbZKVnUgck33KdfaUkQdVQldVwn/lRZHlU3J7I/9wAYgs8YwWoIqIAAAAASUVORK5CYII=',
  profile: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAApElEQVR4AW3BQUrDQBiF0e+fP5MZSqFLceV2XHoRV25EcOsVXHgPEQpCaWaamcSFUHzHkS6vTaM/v5TScFhvkQhQRNB3+6R+eTSN+v1O3O9SlC9g0tSo3x4IIegExVGbBzkIpRRYQlEKOGqz3jxwSglTzXX3S0rKfXm6EFwldffJtg0c2cDIkCNMCMEsI3nK5Jh0ZDCDUXBm8Wfm+Pvl89WHnf8DKutMJ+k9QhkAAAAASUVORK5CYII=',
  background: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAlElEQVR4AW3BwUrEQBBA0Tddk0xm0YFdhLnK3v8rFhFhYHeZSTLJuAj7jke6uTc9+fFYTbFSwkIpxqwzZXfXtLrzS/fDiXJ3f/X8+PBy8qoqj7GRu3Z67oomMkXNWlUt5cbBwfmjY4ihjZKm0Q5KRwhR+pjIbdXEOTJwdK+z3ZrWx6KaKoHQEkUZpwFHGPkPC+e9I/UNSR4Tz/JwYtEAAAAASUVORK5CYII='
};

// Placeholder images for when actual images are not available
export const placeholderImages = {
  project: '/images/placeholder-project.jpg',
  profile: '/images/placeholder-profile.jpg',
  background: '/images/placeholder-background.jpg',
  logo: '/images/placeholder-logo.png',
  generic: '/images/placeholder.jpg'
};

// Function to determine which placeholder to use based on image type
export const getPlaceholder = (type: keyof typeof placeholderImages = 'generic'): { 
  src: string, 
  blurDataURL: string 
} => {
  const placeholderType = type in placeholderImages ? type : 'generic';
  return {
    src: placeholderImages[placeholderType],
    blurDataURL: type === 'project' 
      ? blurDataURLs.project 
      : type === 'profile' 
        ? blurDataURLs.profile 
        : blurDataURLs.background
  };
};

// Enhanced function to handle missing images with proper fallbacks
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>,
  type: keyof typeof placeholderImages = 'generic'
): void => {
  const target = event.target as HTMLImageElement;
  const placeholder = getPlaceholder(type);
  
  // First try to determine image type from className or data attributes
  if (target.classList.contains('project-image')) {
    target.src = placeholderImages.project;
  } else if (target.classList.contains('profile-image')) {
    target.src = placeholderImages.profile;
  } else if (target.classList.contains('logo-image')) {
    target.src = placeholderImages.logo;
  } else {
    // Use the provided type or default to generic
    target.src = placeholder.src;
  }
  
  // Add a class to indicate fallback is being used
  target.classList.add('image-fallback');
  
  // Log error for debugging in development
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Image failed to load and was replaced with a placeholder. Original src: ${target.dataset.originalSrc || 'unknown'}`);
  }
}; 
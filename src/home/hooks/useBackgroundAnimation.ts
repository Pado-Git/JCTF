import { useState, useEffect } from 'react';

interface UseBackgroundAnimationProps {
  images: string[];
  interval?: number; // ms
}

export function useBackgroundAnimation({ 
  images, 
  interval = 400 
}: UseBackgroundAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        setCurrentImage(images[nextIndex]);
        return nextIndex;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return {
    currentImage,
    currentIndex,
    totalImages: images.length
  };
}

import { useBackgroundAnimation } from '@/+shared/hooks/useBackgroundAnimation';

interface AnimatedBackgroundProps {
  images: string[];
  interval?: number;
  className?: string;
  alt?: string;
  opacity?: number;
}

export function AnimatedBackground({
  images,
  interval = 400,
  className = "w-full h-full object-cover",
  alt = "Animated Background",
  opacity = 1
}: AnimatedBackgroundProps) {
  const { currentImage } = useBackgroundAnimation({ images, interval });

  return (
    <img 
      src={currentImage} 
      alt={alt} 
      className={className}
      style={{ opacity }}
    />
  );
}

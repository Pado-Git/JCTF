import { useMatrixRain } from './index.hooks';

interface MatrixRainProps {
  className?: string;
}

export function MatrixRain({ className = '' }: MatrixRainProps) {
  const { chars } = useMatrixRain();
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="flex justify-between h-full">
        {chars.map((char, i) => (
          <div
            key={i}
            className="text-primary/20 text-sm font-mono animate-pulse"
            style={{
              animationDelay: `${Math.random() * 2}s`,
              transform: `translateY(${Math.random() * 100}vh)`
            }}
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  );
}


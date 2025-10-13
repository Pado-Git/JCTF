import { useState, useEffect } from 'react';

export function useMatrixRain() {
  const [chars, setChars] = useState<string[]>([]);
  
  useEffect(() => {
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = [];
    
    for (let i = 0; i < 100; i++) {
      charArray.push(characters[Math.floor(Math.random() * characters.length)]);
    }
    
    setChars(charArray);
    
    const interval = setInterval(() => {
      setChars(prev => 
        prev.map(() => characters[Math.floor(Math.random() * characters.length)])
      );
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  return { chars };
}


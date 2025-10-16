/**
 * 이름에서 이니셜을 추출하는 유틸 함수
 * @param name - 추출할 이름
 * @returns 2글자 이니셜 (대문자)
 * 
 * @example
 * getInitials("Cyber Ninja")    // "CN"
 * getInitials("CyberNinja")    // "CN" 
 * getInitials("cyberninja")     // "CY"
 * getInitials("Team Alpha")    // "TA"
 * getInitials("TeamAlpha")      // "TA"
 * getInitials("team")           // "TE"
 */
export const getInitials = (name: string): string => {
  if (!name) return '??';
  
  // 공백으로 분리 (예: "Cyber Ninja" → ["Cyber", "Ninja"])
  const words = name.trim().split(/\s+/);
  
  if (words.length >= 2) {
    // 2단어 이상: 각 단어의 첫 글자 (예: "Cyber Ninja" → "CN")
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  
  // 1단어: 대문자 찾기 (예: "CyberNinja" → "CN")
  const capitals = name.match(/[A-Z]/g);
  if (capitals && capitals.length >= 2) {
    return (capitals[0] + capitals[1]).toUpperCase();
  }
  
  // 대문자 없으면 첫 2글자 (예: "cyberninja" → "CY")
  return name.slice(0, 2).toUpperCase();
};

import { useState, useCallback } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState<'tamil' | 'english'>('english'); 

  const switchLanguage = useCallback(() => {
    setLanguage((prevLanguage) => {
      const newLanguage = prevLanguage === 'tamil' ? 'english' : 'tamil';
      console.log("Language switched to:", newLanguage); 
      return newLanguage;
    });
  }, []);

  return {
    language,
    switchLanguage,
  };
};

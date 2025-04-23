import React, { createContext, useContext, useState } from 'react';

type LanguageType = 'english' | 'tamil';

interface LanguageContextType {
  language: LanguageType;
  switchLanguage: () => void;
  translations: (key: keyof typeof enDictionary) => string;
}

// Define English dictionary
const enDictionary = {
  hello: "Hello",
  search: "Search",
  explore: "Explore",
  categories: "Categories",
  seeAll: "See all",
  temple: "Temple",
  beach: "Beach",
  hillStation: "Hill Station",
  heritageSite: "Heritage Site",
  waterfall: "Waterfall",
  lake: "Lake",
  church: "Church",
  fort: "Fort",
  sanctuary: "Sanctuary",
};

// Define Tamil dictionary
const taDictionary = {
  hello: "வணக்கம்",
  search: "தேடு",
  explore: "ஆராய்க",
  categories: "பிரிவுகள்",
  seeAll: "அனைத்தையும் பாருங்கள்",
  temple: "கோவில்",
  beach: "கடற்கரை",
  hillStation: "மலை நிலப்பரப்பு",
  heritageSite: "பாரம்பரிய தளம்",
  waterfall: "ஜலபரப்பு",
  lake: "ஏரி",
  church: "தேவாலயம்",
  fort: "கோட்டை",
  sanctuary: "விலங்குப் பாதுகாப்பகம்",
};

// Now define a dictionary type properly
const dictionary = {
  english: enDictionary,
  tamil: taDictionary,
};

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<LanguageType>('english'); // default English

  const switchLanguage = () => {
    setLanguage((prev) => (prev === 'english' ? 'tamil' : 'english'));
  };

  const translations = (key: keyof typeof enDictionary) => {
    return dictionary[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

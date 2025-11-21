import React, { useEffect, useState } from 'react';
import { CHAPTERS, LANGUAGES } from '../constants';

interface ControlsProps {
  selectedChapter: number;
  selectedVerse: number;
  selectedLanguage: string;
  onChapterChange: (ch: number) => void;
  onVerseChange: (v: number) => void;
  onLanguageChange: (lang: string) => void;
  onExplain: () => void;
  isLoading: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  selectedChapter,
  selectedVerse,
  selectedLanguage,
  onChapterChange,
  onVerseChange,
  onLanguageChange,
  onExplain,
  isLoading
}) => {
  const [maxVerses, setMaxVerses] = useState(47);

  useEffect(() => {
    const chapterData = CHAPTERS.find(c => c.number === selectedChapter);
    if (chapterData) {
      setMaxVerses(chapterData.verses);
      // If current verse selection is out of bounds for new chapter, reset to 1
      if (selectedVerse > chapterData.verses) {
        onVerseChange(1);
      }
    }
  }, [selectedChapter, selectedVerse, onVerseChange]);

  const verseOptions = Array.from({ length: maxVerses }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100 sticky top-4 z-50 opacity-95 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
        
        {/* Chapter Select */}
        <div className="w-full md:w-[35%]">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            Chapter
          </label>
          <select
            value={selectedChapter}
            onChange={(e) => onChapterChange(Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5 outline-none transition-all"
          >
            {CHAPTERS.map((ch) => (
              <option key={ch.number} value={ch.number}>
                {ch.number}. {ch.name}
              </option>
            ))}
          </select>
        </div>

        {/* Verse Select */}
        <div className="w-full md:w-[15%]">
           <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            Verse
          </label>
          <select
            value={selectedVerse}
            onChange={(e) => onVerseChange(Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5 outline-none transition-all"
          >
            {verseOptions.map((v) => (
              <option key={v} value={v}>
                Verse {v}
              </option>
            ))}
          </select>
        </div>

        {/* Language Select */}
        <div className="w-full md:w-[25%]">
           <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            Language
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5 outline-none transition-all"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Action Button */}
        <div className="w-full md:w-[25%]">
          <button
            onClick={onExplain}
            disabled={isLoading}
            className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 transform hover:-translate-y-0.5 shadow-md
              ${isLoading 
                ? 'bg-orange-300 cursor-not-allowed' 
                : 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/30'
              }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                 <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                 <span>Translating...</span>
              </div>
            ) : (
              "Explain"
            )}
          </button>
        </div>
      </div>
      
      {/* Helper Text */}
      <div className="mt-2 text-center md:text-left">
         <span className="text-xs text-gray-400">
           {CHAPTERS.find(c => c.number === selectedChapter)?.translation}
         </span>
      </div>
    </div>
  );
};

export default Controls;
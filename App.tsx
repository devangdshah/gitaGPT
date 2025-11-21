
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import SlokaDisplay from './components/SlokaDisplay';
import WhatsAppSubscribe from './components/WhatsAppSubscribe';
import { SlokaResponse, LoadingState } from './types';
import { fetchSlokaExplanation } from './services/geminiService';
import { CHAPTERS } from './constants';

const App: React.FC = () => {
  const [chapter, setChapter] = useState<number>(2); 
  const [verse, setVerse] = useState<number>(47);   
  const [language, setLanguage] = useState<string>("English");
  
  const [data, setData] = useState<SlokaResponse | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getExplanation = useCallback(async (ch: number, v: number, lang: string) => {
    setStatus(LoadingState.LOADING);
    setErrorMessage("");
    setData(null);

    try {
      const result = await fetchSlokaExplanation(ch, v, lang);
      setData(result);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
      setErrorMessage("Unable to fetch the wisdom at this moment. Please verify your connection or try again.");
    }
  }, []);

  // Initial Random Load
  useEffect(() => {
    const randomChapterIndex = Math.floor(Math.random() * CHAPTERS.length);
    const selectedChapterInfo = CHAPTERS[randomChapterIndex];
    const randomVerse = Math.floor(Math.random() * selectedChapterInfo.verses) + 1;

    setChapter(selectedChapterInfo.number);
    setVerse(randomVerse);
    
    // Load initial random verse in English
    getExplanation(selectedChapterInfo.number, randomVerse, "English");
  }, [getExplanation]);

  const handleExplain = () => {
    getExplanation(chapter, verse, language);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-gray-900 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 md:px-8 flex-grow pb-12">
        
        <Controls 
          selectedChapter={chapter}
          selectedVerse={verse}
          selectedLanguage={language}
          onChapterChange={setChapter}
          onVerseChange={setVerse}
          onLanguageChange={setLanguage}
          onExplain={handleExplain}
          isLoading={status === LoadingState.LOADING}
        />

        {status === LoadingState.IDLE && !data && (
          <div className="text-center py-20 opacity-60 animate-pulse">
            <div className="text-6xl mb-4">🕉️</div>
            <h2 className="text-xl font-medium text-gray-600 serif-font">
              Select a verse to reveal its timeless wisdom.
            </h2>
          </div>
        )}

        {status === LoadingState.ERROR && (
           <div className="max-w-2xl mx-auto bg-red-50 border border-red-100 text-red-700 p-6 rounded-xl text-center shadow-sm">
             <p className="font-semibold">Apologies, seeker.</p>
             <p>{errorMessage}</p>
           </div>
        )}

        {status === LoadingState.LOADING && (
           <div className="max-w-4xl mx-auto py-12">
             {/* Skeleton Loader */}
             <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 h-64 w-full animate-pulse flex flex-col justify-center items-center space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-48 bg-gray-100 rounded-2xl animate-pulse"></div>
                <div className="h-48 bg-gray-100 rounded-2xl animate-pulse"></div>
             </div>
             <div className="text-center mt-8 space-y-2">
               <p className="text-orange-500 font-medium animate-bounce">
                 Consulting the ancient texts...
               </p>
               <p className="text-sm text-orange-400">
                 Translating wisdom into your language.
               </p>
             </div>
           </div>
        )}

        {status === LoadingState.SUCCESS && data && (
          <SlokaDisplay data={data} chapter={chapter} verse={verse} />
        )}

      </main>

      {/* My Story Section */}
      <section className="w-full bg-white border-t border-orange-100 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-paper.png')] opacity-30"></div>
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 serif-font mb-8">The Journey Behind Gita Modern</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
            <p>
              Books have always been my refuge. From the bustling strategies of modern business to the quiet introspection of philosophy, my library grew as I sought answers on how to navigate this complex life.
            </p>
            <p>
              Yet, in my reading, a profound realization struck me. The most powerful ideas—whether about leadership, mental resilience, or finding purpose—weren't new. They were echoes. Time and again, the wisdom I found in bestsellers and biographies pointed, directly or subtly, back to a single, ancient source: the <strong className="text-orange-700 font-medium">Bhagavad Gita</strong>. It was as if every great thinker had drunk from the same river.
            </p>
            <p>
              I realized I didn't just want to read about it; I wanted to live it. I wanted a way to bridge that 5,000-year-old wisdom with the emails, deadlines, and decisions of my 21st-century life. I built this app to be that bridge—a simple tool to access timeless clarity in the midst of modern chaos.
            </p>
            <div className="pt-6">
              <p className="font-medium text-orange-600 text-xl serif-font italic mb-3">
                "I hope you enjoy using it as much as I do." 
              </p>
              <p className="text-gray-500 font-semibold tracking-wider uppercase text-sm">
                — Devang Shah
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* WhatsApp Subscription Section */}
      <WhatsAppSubscribe />

      {/* Simple Footer */}
      <footer className="bg-gray-50 text-center text-gray-400 text-xs py-8 border-t border-gray-100">
        <p>© {new Date().getFullYear()} Gita Modern Wisdom.</p>
      </footer>
    </div>
  );
};

export default App;

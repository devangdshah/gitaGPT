import React, { useState, useEffect, useRef } from 'react';
import { SlokaResponse } from '../types';
// @ts-ignore
import html2canvas from 'html2canvas';

interface SlokaDisplayProps {
  data: SlokaResponse;
  chapter: number;
  verse: number;
}

const SlokaDisplay: React.FC<SlokaDisplayProps> = ({ data, chapter, verse }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  // Stop speech if the component unmounts or data changes (user selects new verse)
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    };
  }, [data]);

  const handlePlay = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(data.sanskrit);
    // 'hi-IN' handles Devanagari script pronunciation well
    utterance.lang = 'hi-IN'; 
    utterance.rate = 0.8; // Slightly slower for clarity
    utterance.pitch = 0.9; // Slightly deeper for gravitas

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleShare = async () => {
    if (!captureRef.current) return;
    
    setIsSharing(true);

    try {
      // Wait a moment for UI to settle if needed
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#fdfbf7', // Match body background
        scale: 2, // Higher quality
        useCORS: true, // Attempt to handle cross-origin images like textures
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsSharing(false);
          return;
        }

        const fileName = `gita-modern-ch${chapter}-v${verse}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        // Check if Web Share API is supported (mostly mobile)
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: 'Gita Modern Wisdom',
              text: `Bhagavad Gita Chapter ${chapter}, Verse ${verse}: ${data.keyTakeaway}`
            });
          } catch (error) {
            // User likely cancelled share, ignore
            console.log('Share cancelled or failed', error);
          }
        } else {
          // Fallback: Download the image
          const link = document.createElement('a');
          link.download = fileName;
          link.href = canvas.toDataURL('image/png');
          link.click();
        }
        
        setIsSharing(false);
      }, 'image/png');

    } catch (error) {
      console.error("Error generating screenshot:", error);
      setIsSharing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in space-y-6 pb-20">

      {/* Capture Area Wrapper */}
      <div ref={captureRef} className="space-y-6 p-4 bg-[#fdfbf7] rounded-xl">
        
        {/* Key Takeaway - Now at the top */}
        <div className="bg-orange-600 rounded-2xl shadow-lg p-8 text-white text-center relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h3 className="text-orange-200 uppercase text-xs font-bold tracking-widest mb-3 relative z-10">Key Takeaway</h3>
          <p className="text-2xl md:text-3xl font-bold serif-font relative z-10 leading-tight text-balance">
            "{data.keyTakeaway}"
          </p>
        </div>
        
        {/* Original Verse Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
          <div className="bg-orange-50 px-6 py-4 border-b border-orange-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-orange-800 font-semibold uppercase tracking-wider text-sm">Original Verse</span>
              <button 
                onClick={handlePlay}
                data-html2canvas-ignore="true" // Don't include the play button in screenshot
                className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-200 hover:bg-orange-300 text-orange-800 transition-all focus:outline-none focus:ring-2 focus:ring-orange-400"
                title={isSpeaking ? "Stop Reading" : "Read Sanskrit Verse"}
                aria-label={isSpeaking ? "Stop Reading" : "Read Sanskrit Verse"}
              >
                {isSpeaking ? (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                    <rect x="6" y="4" width="8" height="12" rx="1" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 pl-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            <span className="bg-orange-200 text-orange-900 text-xs font-bold px-3 py-1 rounded-full">
               Ch {chapter} : V {verse}
            </span>
          </div>
          <div className="p-8 text-center">
            <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed serif-font font-medium mb-6 text-balance">
              {data.sanskrit}
            </p>
            <p className="text-gray-500 italic text-lg font-light mb-6">
              "{data.transliteration}"
            </p>
            <div className="w-16 h-1 bg-orange-300 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-700 font-medium text-lg">
              {data.translation}
            </p>
          </div>
        </div>

        {/* Branding footer for screenshot only */}
        <div className="text-center pt-2 opacity-60">
          <p className="text-xs text-orange-800 font-medium tracking-widest uppercase">Gita Modern Wisdom</p>
        </div>

      </div>

      {/* Share Button Area */}
      <div className="flex justify-center md:justify-end -mt-4 px-4">
        <button 
          onClick={handleShare}
          disabled={isSharing}
          className="flex items-center gap-2 text-sm font-medium text-orange-700 bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
        >
          {isSharing ? (
             <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
          {isSharing ? "Creating Card..." : "Share Wisdom Card"}
        </button>
      </div>


      {/* Modern Context Section - Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Modern Context */}
        <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-2xl shadow-lg p-6 border border-orange-100 h-full">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🏙️</span> Modern Context
          </h3>
          <p className="text-gray-700 leading-7 text-justify">
            {data.modernContext}
          </p>
        </div>

        {/* Right Column: Actionable Advice */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 h-full">
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">🌱</span> Practical Application
          </h3>
          <p className="text-gray-700 leading-7">
            {data.practicalApplication}
          </p>
        </div>

      </div>
    </div>
  );
};

export default SlokaDisplay;
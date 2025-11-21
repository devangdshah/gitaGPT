import React, { useState } from 'react';

const WhatsAppSubscribe: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length > 5) {
      // In a real full-stack app, this would send the number to your backend/database
      setIsSubmitted(true);
    }
  };

  return (
    <section className="w-full bg-[#25D366]/10 border-t border-green-100 py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Visual & Copy */}
          <div className="bg-[#128C7E] p-8 md:p-12 text-white md:w-1/2 flex flex-col justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
            
            <div className="relative z-10">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.926 1.213 3.124c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold serif-font mb-4">Daily Wisdom on WhatsApp</h2>
              <p className="text-green-100 text-lg leading-relaxed mb-6">
                Start your day with clarity. Get one hand-picked verse, its modern meaning, and a practical tip delivered straight to your phone.
              </p>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-green-200">
                <span>✨ No Spam</span>
                <span>•</span>
                <span>🔒 100% Private</span>
                <span>•</span>
                <span>🔇 No Chat Noise</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
            
            {!isSubmitted ? (
              <>
                <div className="mb-8">
                  <h3 className="text-gray-800 font-bold text-lg mb-2">Choose Your Preference</h3>
                  <p className="text-gray-500 text-sm">We respect your digital peace.</p>
                </div>

                <div className="space-y-6">
                  {/* Option 1: Channel (Easiest) */}
                  <a 
                    href="https://whatsapp.com/channel/0029VbBNZ3vLdQedYdVbda2C" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 border border-green-200 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-green-500 text-white p-2 rounded-lg">
                        {/* Broadcast Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 group-hover:text-green-800">Follow on WhatsApp Channels</p>
                        <p className="text-xs text-gray-500">Found in 'Updates' tab. Your number is hidden.</p>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">Or receive a direct message</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>

                  {/* Option 2: Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Phone Number (WhatsApp)
                      </label>
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:ring-green-500 focus:border-green-500 block p-3 outline-none transition-all"
                        required
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-[#128C7E] hover:bg-[#075E54] text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Subscribe via DM
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">You're on the list!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for subscribing. You will start receiving your daily wisdom shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-green-600 font-medium text-sm hover:underline"
                >
                  Register another number
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppSubscribe;
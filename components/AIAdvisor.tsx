import React, { useState, useRef, useEffect } from 'react';
import { Tractor, X, Send, Loader2, Sparkles, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { getMachineryAdvice } from '../services/aiService';
import { trackAIChat } from '../services/analytics';
import { useData } from '../store/DataContext';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// Simple HTML escape function for safety
const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const AIAdvisor: React.FC = () => {
  const { products, settings } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Rate limiting: max 1 request per 3 seconds
    const now = Date.now();
    if (now - lastRequestTime < 3000) {
      return;
    }
    setLastRequestTime(now);

    if (messageCount >= 20) {
      const limitMessage: Message = {
        role: 'model',
        parts: [{ text: `You've reached the conversation limit for this session. Please chat with our team directly on [WhatsApp](${settings.whatsapp}) to continue!` }],
      };
      setMessages(prev => [...prev, limitMessage]);
      return;
    }

    setMessageCount(prev => prev + 1);

    // Limit input length to prevent prompt injection abuse
    const sanitizedInput = escapeHtml(trimmedInput.slice(0, 500));

    const userMessage: Message = {
      role: 'user',
      parts: [{ text: sanitizedInput }],
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // We pass the current message history to maintain context
      const responseText = await getMachineryAdvice(sanitizedInput, products, settings, messages);
      const assistantMessage: Message = {
        role: 'model',
        parts: [{ text: responseText }], // Do not escape HTML here, ReactMarkdown handles it
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Advisor Error:', error);
      const errorMessage: Message = {
        role: 'model',
        parts: [{ text: `Pole sana (Sorry), I'm having trouble connecting right now. Please try again or chat with our team on [WhatsApp](${settings.whatsapp})!` }],
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 left-0 w-[350px] md:w-[400px] bg-white rounded-2xl shadow-2xl border border-harvest-green/20 overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-harvest-brown p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="bg-harvest-green p-2 rounded-lg text-white">
                  <Tractor size={20} />
                </div>
                <div>
                  <h3 className="font-black text-xs uppercase tracking-widest leading-none">Mkulima</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-2 h-2 bg-harvest-gold rounded-full animate-pulse" />
                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-tighter">Wise Farmer & Guide</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-4 space-y-4 bg-harvest-cream/30 scroll-smooth"
            >
              {messages.length === 0 && (
                <div className="text-center py-10 px-6">
                  <div className="bg-harvest-green/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-harvest-green">
                    <Tractor size={24} />
                  </div>
                  <h4 className="font-black text-harvest-brown mb-2 text-xl uppercase tracking-tight">Sema Mkulima!</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    Hello! I'm Mkulima, your guide from Nakuru. Having worked the shamba for years, I know these machines inside out. How can I help you choose the right one today?
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    {["What machine do I need for a milling business?", "Best equipment under KSh 100,000?", "Do you deliver to my county?", "How does pay-on-delivery work?"].map((q) => (
                      <button 
                        key={q}
                        onClick={() => setInput(q)}
                        className="text-[10px] bg-white border border-gray-200 hover:border-harvest-green hover:text-harvest-green px-4 py-2 rounded-xl transition-all shadow-sm font-bold uppercase tracking-widest text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((m, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-indigo-600' : 'bg-harvest-brown text-harvest-gold'} shadow-lg`}>
                      {m.role === 'user' ? <User size={16} /> : <Tractor size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed font-medium overflow-hidden ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'}`}>
                      {m.role === 'user' ? (
                        m.parts[0].text
                      ) : (
                        <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-a:text-harvest-green prose-a:font-bold prose-a:underline hover:prose-a:text-green-700 prose-strong:text-harvest-brown prose-ul:list-disc prose-ul:pl-4 prose-li:my-1">
                          <ReactMarkdown>
                            {m.parts[0].text}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm">
                    <Loader2 size={18} className="animate-spin text-harvest-green" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tupa swali, mkulima... (Ask Mkulima)"
                  className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-harvest-green font-medium"
                />
                <button 
                  disabled={isLoading || !input.trim()}
                  className="bg-harvest-green text-white p-3 rounded-xl hover:bg-green-700 disabled:opacity-50 transition-all shadow-xl active:scale-95"
                >
                  <Send size={20} />
                </button>
              </form>
              <p className="text-[10px] text-gray-400 mt-3 text-center uppercase font-black tracking-widest opacity-60">
                Harvest Farm Machineries • Nakuru
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { if (!isOpen) trackAIChat('open'); setIsOpen(!isOpen); }}
        className="bg-harvest-brown text-harvest-gold w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center relative hover:bg-harvest-brown/90 transition-all border border-white/10"
      >
        {isOpen ? <X size={28} /> : <Tractor size={32} />}
        {!isOpen && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-harvest-green text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white uppercase"
          >
            ASK
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};

export default AIAdvisor;

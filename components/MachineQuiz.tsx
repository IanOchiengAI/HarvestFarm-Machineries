import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, MessageCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../store/DataContext';
import { Product } from '../types';
import { buildWhatsAppUrl, trackQuiz } from '../services/analytics';

interface QuizAnswer {
  crop?: string;
  scale?: string;
  budget?: string;
  power?: string;
}

const questions = [
  {
    id: 'crop',
    title: 'What will you process?',
    subtitle: 'Select your primary use case',
    options: [
      { value: 'maize', label: 'Maize / Cereals', emoji: '🌽' },
      { value: 'coffee', label: 'Coffee / Rice', emoji: '☕' },
      { value: 'feed', label: 'Animal Feed / Silage', emoji: '🐄' },
      { value: 'flour', label: 'Flour Milling', emoji: '🍞' },
    ],
  },
  {
    id: 'scale',
    title: 'What scale is your operation?',
    subtitle: 'This helps us recommend the right capacity',
    options: [
      { value: 'small', label: 'Small Farm (personal use)', emoji: '🌱' },
      { value: 'medium', label: 'Medium (serve neighbours)', emoji: '🏘️' },
      { value: 'commercial', label: 'Commercial Business', emoji: '🏭' },
    ],
  },
  {
    id: 'budget',
    title: "What's your budget range?",
    subtitle: 'All prices in Kenya Shillings',
    options: [
      { value: 'under50', label: 'Under KSh 50,000', emoji: '💰' },
      { value: '50to100', label: 'KSh 50,000 — 100,000', emoji: '💰💰' },
      { value: 'over100', label: 'Over KSh 100,000', emoji: '💰💰💰' },
    ],
  },
  {
    id: 'power',
    title: 'Power source preference?',
    subtitle: 'Choose based on your location',
    options: [
      { value: 'electric', label: 'Electric (3-phase)', emoji: '⚡' },
      { value: 'diesel', label: 'Diesel / Petrol', emoji: '⛽' },
      { value: 'either', label: 'Either works', emoji: '🔄' },
    ],
  },
];

function getRecommendations(answers: QuizAnswer, products: Product[]) {
  let results = [...products];

  if (answers.crop === 'maize') results = results.filter(p => p.category === 'Posho Mills' || p.category === 'Maize Shellers');
  else if (answers.crop === 'coffee') results = results.filter(p => p.category === 'Hullers');
  else if (answers.crop === 'feed') results = results.filter(p => p.category === 'Chopper Mills');
  else if (answers.crop === 'flour') results = results.filter(p => p.category === 'Posho Mills' || p.category === 'Roller Mills');

  if (answers.budget === 'under50') results = results.filter(p => p.price < 50000);
  else if (answers.budget === '50to100') results = results.filter(p => p.price >= 50000 && p.price <= 100000);
  else if (answers.budget === 'over100') results = results.filter(p => p.price > 100000);

  // If filters are too restrictive, show closest matches
  if (results.length === 0) {
    results = [...products].sort((a, b) => a.price - b.price).slice(0, 2);
  }

  return results.slice(0, 3);
}

interface MachineQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const MachineQuiz: React.FC<MachineQuizProps> = ({ isOpen, onClose }) => {
  const { products, settings } = useData();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      trackQuiz('completed', undefined, newAnswers.budget);
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const handleBack = () => {
    if (showResults) { setShowResults(false); return; }
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const recommendations = showResults ? getRecommendations(answers, products) : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{scale:0.9,y:20}} animate={{scale:1,y:0}} exit={{scale:0.9,y:20}} className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-harvest-brown p-6 text-white relative">
              <button onClick={onClose} className="absolute top-4 right-4 hover:bg-white/10 p-1.5 rounded-full"><X size={20}/></button>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-harvest-gold/20 p-2 rounded-xl"><Sparkles size={20} className="text-harvest-gold"/></div>
                <h2 className="font-black text-lg uppercase tracking-tight">Machine Finder</h2>
              </div>
              <p className="text-sm text-gray-300 font-medium">Answer {questions.length} quick questions to find your perfect machine</p>
              {/* Progress */}
              {!showResults && (
                <div className="mt-4 flex gap-1.5">
                  {questions.map((_,i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-harvest-gold' : 'bg-white/20'}`}/>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <AnimatePresence mode="wait">
                {!showResults ? (
                  <motion.div key={step} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:0.2}}>
                    <h3 className="text-xl font-black text-harvest-brown mb-1">{questions[step].title}</h3>
                    <p className="text-sm text-gray-400 font-medium mb-6">{questions[step].subtitle}</p>
                    <div className="space-y-3">
                      {questions[step].options.map(opt => (
                        <button key={opt.value} onClick={() => handleSelect(questions[step].id, opt.value)}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 group hover:border-harvest-green hover:bg-harvest-green/5 ${
                            answers[questions[step].id as keyof QuizAnswer] === opt.value
                              ? 'border-harvest-green bg-harvest-green/10'
                              : 'border-gray-100'
                          }`}>
                          <span className="text-2xl">{opt.emoji}</span>
                          <span className="font-bold text-gray-800 group-hover:text-harvest-green">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="results" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
                    <div className="text-center mb-6">
                      <span className="text-3xl mb-2 block">🎉</span>
                      <h3 className="text-xl font-black text-harvest-brown">We Recommend</h3>
                      <p className="text-sm text-gray-400 font-medium">Based on your needs, these machines are perfect for you</p>
                    </div>
                    <div className="space-y-4">
                      {recommendations.map(p => (
                        <div key={p.id} className="border border-gray-100 rounded-2xl p-4 flex gap-4 items-center">
                          <img src={p.image} alt={p.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                            onError={e=>{e.currentTarget.src=`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="100%" height="100%" fill="%23F5DEB3"/></svg>`;}}/>
                          <div className="flex-grow min-w-0">
                            <h4 className="font-black text-sm text-gray-900 truncate">{p.name}</h4>
                            <p className="text-harvest-green font-bold text-lg">KSh {p.price.toLocaleString('en-KE')}</p>
                            <a href={buildWhatsAppUrl(settings.whatsapp, p)} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-1.5 mt-2 bg-[#25D366] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-green-600 transition-colors">
                              <MessageCircle size={14} fill="white"/>Order on WhatsApp
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
              <button onClick={handleBack} disabled={step===0 && !showResults}
                className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-harvest-brown disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowLeft size={16}/>Back
              </button>
              {showResults && (
                <button onClick={handleReset} className="text-sm font-bold text-harvest-green hover:underline">Start Over</button>
              )}
              {!showResults && (
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                  {step+1} of {questions.length}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MachineQuiz;

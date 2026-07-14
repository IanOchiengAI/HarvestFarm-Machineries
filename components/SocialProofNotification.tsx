import React, { useState, useEffect } from 'react';
import { MessageCircle, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../store/DataContext';

const NAMES = ['John','Mary','Peter','Grace','Samuel','Jane','David','Faith','James','Anne','Joseph','Lucy'];
const COUNTIES = ['Kericho','Nakuru','Eldoret','Kisumu','Nyeri','Nyandarua','Meru','Kiambu','Trans Nzoia','Uasin Gishu','Nairobi','Thika'];

const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];

function makeNote(products: any[]) {
  if (products.length === 0) return null;
  const n = pick(NAMES), c = pick(COUNTIES), p = pick(products);
  return { text: `${n} from ${c} just inquired about the ${p.name}`, time: `${Math.floor(Math.random()*15)+1} min ago` };
}

const SocialProofNotification: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
  const { products } = useData();
  const [note, setNote] = useState<ReturnType<typeof makeNote>|null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!enabled || products.length === 0) return;
    const t = setTimeout(() => { setNote(makeNote(products)); setShow(true); }, 15000);
    return () => clearTimeout(t);
  }, [enabled, products]);

  useEffect(() => {
    if (!show || !note || products.length === 0) return;
    const hide = setTimeout(() => setShow(false), 5000);
    const next = setTimeout(() => { setNote(makeNote(products)); setShow(true); }, 35000);
    return () => { clearTimeout(hide); clearTimeout(next); };
  }, [note, show, products]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {show && note && (
        <motion.div initial={{opacity:0,x:-100}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-100}} transition={{type:'spring',damping:20}} className="fixed bottom-24 left-6 z-[45] max-w-xs hidden md:block">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-start gap-3 relative">
            <button onClick={()=>setShow(false)} className="absolute top-2 right-2 text-gray-300 hover:text-gray-500"><X size={14}/></button>
            <div className="bg-[#25D366]/10 p-2 rounded-xl flex-shrink-0"><MessageCircle size={18} className="text-[#25D366]"/></div>
            <div className="pr-4">
              <p className="text-sm font-bold text-gray-800 leading-snug">{note.text}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <MapPin size={12} className="text-harvest-orange"/>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{note.time}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofNotification;

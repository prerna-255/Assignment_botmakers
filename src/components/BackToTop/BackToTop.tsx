import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const BackToTop = memo(() => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 450);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 16 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          exit={{    opacity: 0, scale: 0.5, y: 16 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#e53935] to-[#b71c1c] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(229,57,53,0.35)] hover:shadow-[0_0_24px_rgba(229,57,53,0.6)] transition-shadow"
          whileHover={{ scale: 1.12 }}
          whileTap={{  scale: 0.90 }}
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
});

BackToTop.displayName = 'BackToTop';
export default BackToTop;

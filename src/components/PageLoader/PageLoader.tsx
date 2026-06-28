import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

const PageLoader = memo(({ loading }: { loading: boolean }) => (
  <AnimatePresence>
    {loading && (
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.55 } }}
        className="fixed inset-0 z-[99999] bg-[#0a0a0f] flex flex-col items-center justify-center gap-8"
        role="status"
        aria-label="Loading BotLeague"
      >
        {/* Logo bounce in */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="flex items-center gap-3"
        >
          <motion.div
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e53935] to-[#b71c1c] flex items-center justify-center"
            animate={{ rotate: [0, 12, -12, 0] }}
            transition={{ repeat: 2, duration: 0.55, delay: 0.35 }}
          >
            <Zap className="w-7 h-7 text-white" aria-hidden />
          </motion.div>
          <div>
            <p className="text-2xl font-black text-white tracking-tight">
              <span className="text-[#e53935]">BOT</span>LEAGUE
            </p>
            <p className="text-[10px] text-[#a0a0b0] uppercase tracking-widest">India's Robotics Arena</p>
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="w-52 h-[3px] bg-white/8 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#e53935] to-[#ff6f60] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
          />
        </div>

        <p className="text-[#606070] text-[10px] uppercase tracking-[0.22em]">Initialising arena…</p>
      </motion.div>
    )}
  </AnimatePresence>
));

PageLoader.displayName = 'PageLoader';
export default PageLoader;

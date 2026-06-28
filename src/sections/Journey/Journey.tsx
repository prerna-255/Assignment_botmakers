import { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { journeySteps } from '../../data/journey';
import { stagger, fadeUp, vp } from '../../utils/animations';

const JourneyCard = memo(({ step: s, index: i, last }: { step: typeof journeySteps[0]; index: number; last: boolean }) => (
  <motion.div
    variants={fadeUp}
    className="relative flex flex-col items-center text-center group"
    tabIndex={0}
    role="listitem"
    aria-label={s.title}
  >
    {/* Connector */}
    {!last && (
      <span
        className="hidden lg:block absolute top-10 left-1/2 w-full h-px bg-gradient-to-r from-[#e53935]/30 to-[#e53935]/5"
        style={{ transform: 'translateX(50%)' }}
        aria-hidden
      />
    )}

    {/* Circle icon */}
    <motion.div
      className="relative z-10 w-20 h-20 rounded-full border-2 border-[#e53935]/35 bg-[#111118] flex items-center justify-center mb-4 cursor-default"
      whileHover={{ scale: 1.18, rotate: 6, borderColor: '#e53935', boxShadow: '0 0 28px rgba(229,57,53,0.45)' }}
      animate={{ boxShadow: ['0 0 8px rgba(229,57,53,0.15)', '0 0 22px rgba(229,57,53,0.38)', '0 0 8px rgba(229,57,53,0.15)'] }}
      transition={{ repeat: Infinity, duration: 3, delay: i * 0.55 }}
    >
      <span className="text-3xl" aria-hidden>{s.emoji}</span>
      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#e53935] text-white text-[10px] font-black flex items-center justify-center">
        {i + 1}
      </span>
    </motion.div>

    <p className="text-[#e53935] text-[10px] font-bold uppercase tracking-widest mb-1">{s.step}</p>
    <h3 className="text-white font-bold text-sm mb-2 group-hover:text-[#e53935] transition-colors">{s.title}</h3>
    <p className="text-[#a0a0b0] text-xs leading-relaxed max-w-[170px]">{s.description}</p>
  </motion.div>
));
JourneyCard.displayName = 'JourneyCard';

const Journey = memo(() => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineW = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '100%']);

  return (
    <section
      id="journey"
      ref={ref}
      className="section-pad bg-gradient-to-b from-[#0a0a0f] to-[#0d0d15] relative overflow-hidden"
      aria-labelledby="journey-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={vp} variants={stagger()}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-[#e53935] text-xs font-bold uppercase tracking-widest mb-2">Our Journey</motion.p>
          <motion.h2 variants={fadeUp} id="journey-heading" className="text-3xl sm:text-4xl font-black text-white mb-3">
            YOUR PATH TO THE LEAGUE
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#a0a0b0] max-w-lg mx-auto">
            Four steps from sign-up to national champion.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Animated fill line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-white/6 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-[#e53935] to-[#ff6f60]" style={{ width: lineW }} />
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={vp} variants={stagger(0.13, 0.1)}
            className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-5"
            role="list"
          >
            {journeySteps.map((s, i) => (
              <JourneyCard key={s.id} step={s} index={i} last={i === journeySteps.length - 1} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Journey.displayName = 'Journey';
export default Journey;

import { memo } from 'react';
import { motion } from 'framer-motion';
import { sponsors } from '../../data/sponsors';
import type { Sponsor } from '../../types';
import { stagger, fadeUp, vp } from '../../utils/animations';

const TIER_STYLE: Record<Sponsor['tier'], string> = {
  platinum: 'text-white/80   bg-white/6   group-hover:text-white',
  gold:     'text-yellow-400/60 bg-yellow-400/6 group-hover:text-yellow-400',
  silver:   'text-slate-400/60  bg-slate-400/5  group-hover:text-slate-300',
};

const SponsorCard = memo(({ s }: { s: Sponsor }) => (
  <motion.div
    variants={fadeUp}
    className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl glass-light border border-white/5 hover:border-[#e53935]/25 transition-all duration-300 cursor-pointer"
    whileHover={{ scale: 1.08, y: -5, boxShadow: '0 0 28px rgba(229,57,53,0.18)' }}
    tabIndex={0}
    aria-label={`${s.name} – ${s.tier} sponsor`}
  >
    {/* Logo placeholder */}
    <div className="w-16 h-16 rounded-xl bg-white/4 group-hover:bg-[#e53935]/10 flex items-center justify-center transition-colors duration-300">
      <span className="text-xl font-black text-[#505060] group-hover:text-[#e53935] transition-colors duration-300 tracking-tight">
        {s.abbr}
      </span>
    </div>

    <p className="text-sm font-semibold text-[#505060] group-hover:text-white transition-colors duration-300">{s.name}</p>

    <span className={`text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full transition-colors duration-300 ${TIER_STYLE[s.tier]}`}>
      {s.tier}
    </span>

    {/* Glow overlay */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e53935]/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
  </motion.div>
));
SponsorCard.displayName = 'SponsorCard';

const Sponsors = memo(() => (
  <section id="sponsors" className="section-pad bg-gradient-to-b from-[#0d0d15] to-[#0a0a0f] relative overflow-hidden" aria-labelledby="sponsors-heading">
    <div className="max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger()} className="text-center mb-12">
        <motion.p variants={fadeUp} className="text-[#e53935] text-xs font-bold uppercase tracking-widest mb-2">Our Partners</motion.p>
        <motion.h2 variants={fadeUp} id="sponsors-heading" className="text-3xl sm:text-4xl font-black text-white mb-3">SPONSORS</motion.h2>
        <motion.p variants={fadeUp} className="text-[#a0a0b0] max-w-lg mx-auto">
          Proudly supported by India's leading technology and engineering companies.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="visible" viewport={vp} variants={stagger(0.08)}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {sponsors.map(s => <SponsorCard key={s.id} s={s} />)}
      </motion.div>

      {/* Become a sponsor */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <p className="text-[#a0a0b0] text-sm mb-4">Interested in sponsoring BotLeague?</p>
        <motion.button
          className="px-6 py-2.5 border border-[#e53935]/40 text-[#e53935] text-sm font-bold rounded-xl hover:bg-[#e53935]/10 hover:border-[#e53935] transition-all"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Become a sponsor"
        >
          Become a Sponsor →
        </motion.button>
      </motion.div>
    </div>
  </section>
));

Sponsors.displayName = 'Sponsors';
export default Sponsors;

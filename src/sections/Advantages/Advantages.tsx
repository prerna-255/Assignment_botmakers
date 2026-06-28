import { memo } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, Zap } from 'lucide-react';
import { stagger, fadeUp, fadeLeft, fadeRight, vp } from '../../utils/animations';
import { useInView, useCounter } from '../../hooks/useAnimations';

const ADVANTAGES = [
  { Icon: Award,      color: '#e53935', title: 'NATIONAL RECOGNITION', desc: 'Compete and earn verified national ranking with certified achievement badges.' },
  { Icon: Users,      color: '#2196f3', title: 'FAIR JUDGING',        desc: 'Structured tiers ensure fair competition among teams of similar experience.'   },
  { Icon: TrendingUp, color: '#4caf50', title: 'CAREER OPS',           desc: 'Mentorship, workshops, and guidance from industry professionals and alumni.'   },
  { Icon: Zap,        color: '#ff9800', title: 'HIGH-ENERGY ECO',       desc: 'Be part of a vibrant, passionate community pushing the limits of robotics.'    },
];

const LEADERBOARD = [
  { rank: 1, team: 'Iron Wolves',    score: 2840, emoji: '🐺' },
  { rank: 2, team: 'Circuit Kings',  score: 2710, emoji: '👑' },
  { rank: 3, team: 'Nano Ninjas',    score: 2650, emoji: '🥷' },
  { rank: 4, team: 'Steel Surge',    score: 2580, emoji: '⚡' },
  { rank: 5, team: 'Robo Storm',     score: 2430, emoji: '🌪️' },
];

const STATS = [
  { value: 500,   suffix: '+',  label: 'Events'       },
  { value: 250,   suffix: '+',  label: 'Universities' },
  { value: 50000, suffix: '+',  label: 'Participants' },
  { value: 98,    suffix: '%',  label: 'Satisfaction' },
];

const Counter = memo(({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { ref, inView } = useInView(0.5);
  const count = useCounter(value, 2000, inView);
  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl font-black text-white counter-value">{count.toLocaleString()}{suffix}</p>
      <p className="text-xs text-[#a0a0b0] uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
});
Counter.displayName = 'Counter';

const Advantages = memo(() => (
  <section id="advantages" className="section-pad bg-gradient-to-b from-[#0a0a0f] to-[#0d0d15] relative overflow-hidden" aria-labelledby="adv-heading">
    <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#e53935]/5 rounded-full blur-3xl pointer-events-none" aria-hidden />

    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger()} className="text-center mb-14">
        <motion.p variants={fadeUp} className="text-[#e53935] text-xs font-bold uppercase tracking-widest mb-2">Why Register?</motion.p>
        <motion.h2 variants={fadeUp} id="adv-heading" className="text-3xl sm:text-4xl font-black text-white mb-3">
          THE LEAGUE ADVANTAGE
        </motion.h2>
      </motion.div>

      {/* Two columns */}
      <div className="grid lg:grid-cols-2 gap-14 items-start mb-16">
        {/* Advantages list */}
        <motion.ul
          initial="hidden" whileInView="visible" viewport={vp} variants={stagger(0.1)}
          className="space-y-4"
          role="list"
        >
          {ADVANTAGES.map(({ Icon, color, title, desc }) => (
            <motion.li
              key={title}
              variants={fadeLeft}
              className="group flex items-start gap-4 p-4 rounded-xl glass-light hover:border-[#e53935]/18 transition-all duration-300"
              whileHover={{ x: 6 }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${color}18` }}
                whileHover={{ rotate: 12, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 280 }}
              >
                <Icon className="w-5 h-5" style={{ color }} aria-hidden />
              </motion.div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-[#e53935] transition-colors">{title}</h3>
                <p className="text-[#a0a0b0] text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Leaderboard */}
        <motion.aside
          initial="hidden" whileInView="visible" viewport={vp} variants={fadeRight}
          className="card rounded-2xl p-6 border border-[#e53935]/8"
          aria-label="Live leaderboard"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold text-lg">🏆 Leaderboard</h3>
            <span className="text-[10px] font-bold text-[#e53935] uppercase tracking-wider px-2 py-1 bg-[#e53935]/10 rounded-full">Live</span>
          </div>
          <ul className="space-y-3" role="list">
            {LEADERBOARD.map((entry, i) => (
              <motion.li
                key={entry.rank}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={vp}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                  i === 0 ? 'bg-[#e53935]/8 border border-[#e53935]/18' : 'bg-white/3 hover:bg-white/6'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                    i === 0 ? 'bg-yellow-500 text-black'
                    : i === 1 ? 'bg-slate-400 text-black'
                    : i === 2 ? 'bg-orange-600 text-white'
                    : 'bg-white/8 text-white/45'
                  }`}>{entry.rank}</span>
                  <span className="text-base" aria-hidden>{entry.emoji}</span>
                  <span className="text-white text-sm font-medium">{entry.team}</span>
                </div>
                <span className={`text-sm font-bold ${i === 0 ? 'text-[#e53935]' : 'text-[#a0a0b0]'}`}>
                  {entry.score.toLocaleString()}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.aside>
      </div>

      {/* Stats counters */}
      <motion.div
        initial="hidden" whileInView="visible" viewport={vp} variants={stagger(0.12)}
        className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-white/6"
      >
        {STATS.map(s => <Counter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />)}
      </motion.div>
    </div>
  </section>
));

Advantages.displayName = 'Advantages';
export default Advantages;

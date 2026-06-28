import { memo } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Clock, Trophy } from 'lucide-react';
import { competitions, pastResults } from '../../data/competitions';
import { fadeUp, stagger, vp } from '../../utils/animations';
import Button from '../../components/Button/Button';

/* ── Status badge ─────────────────────────────────────────────────────────── */
const StatusBadge = memo(({ status }: { status: 'live' | 'upcoming' | 'past' }) => {
  const cfg = {
    live:     { label: 'Live Now',  bg: 'bg-[#e53935]',   icon: <Wifi  className="w-3 h-3" aria-hidden />, pulse: true  },
    upcoming: { label: 'Upcoming', bg: 'bg-blue-600/80',  icon: <Clock className="w-3 h-3" aria-hidden />, pulse: false },
    past:     { label: 'Ended',    bg: 'bg-white/10',     icon: null,                                       pulse: false },
  }[status];

  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wide ${cfg.bg}`}
      animate={cfg.pulse ? { scale: [1, 1.05, 1] } : {}}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <span className={`w-1.5 h-1.5 rounded-full bg-white ${cfg.pulse ? 'animate-pulse' : ''}`} />
      {cfg.icon}
      {cfg.label}
    </motion.span>
  );
});
StatusBadge.displayName = 'StatusBadge';

/* ── Bracket Chart for Live Now ───────────────────────────────────────────── */
const BracketChart = memo(() => (
  <div className="relative flex items-center justify-between w-full h-[240px] px-2 py-4 bg-white/2 border border-white/5 rounded-2xl overflow-hidden">
    <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />
    
    {/* Column 1: Quarter Finals (4 Teams) */}
    <div className="flex flex-col justify-between h-full z-10">
      {['Team Alpha', 'Robo Warriors', 'Circuit Kings', 'Iron Giants'].map((team, idx) => (
        <div key={idx} className="w-[85px] sm:w-[95px] h-[34px] px-2 bg-[#111118] border border-white/10 rounded flex items-center justify-between hover:border-[#e53935]/40 transition-colors cursor-default group/team">
          <span className="text-[10px] font-semibold text-white/70 truncate group-hover/team:text-white">{team}</span>
          <span className="text-[9px] font-bold text-[#e53935]">{idx % 2 === 0 ? 'W' : 'L'}</span>
        </div>
      ))}
    </div>

    {/* SVG Connector Lines */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/10 fill-none stroke-[1.5]">
      {/* Upper bracket */}
      <path d="M 95 40 h 15 v 45 h 15" />
      <path d="M 95 90 h 15 v -5 h 15" />
      
      {/* Lower bracket */}
      <path d="M 95 150 h 15 v 15 h 15" />
      <path d="M 95 200 h 15 v -35 h 15" />

      {/* Semis to Finals */}
      <path d="M 220 62 h 20 v 50 h 20" stroke="rgba(229,57,53,0.5)" />
      <path d="M 220 178 h 20 v -66 h 20" stroke="rgba(229,57,53,0.2)" />
    </svg>

    {/* Column 2: Semi Finals (2 Teams) */}
    <div className="flex flex-col justify-around h-full z-10 pl-6 sm:pl-8">
      {['Robo Warriors', 'Iron Giants'].map((team, idx) => (
        <div key={idx} className="w-[85px] sm:w-[95px] h-[34px] px-2 bg-[#111118] border border-white/10 rounded flex items-center justify-between hover:border-[#e53935]/40 transition-colors cursor-default group/team">
          <span className="text-[10px] font-semibold text-white/70 truncate group-hover/team:text-white">{team}</span>
          <span className="text-[9px] font-bold text-[#e53935]">{idx === 0 ? 'W' : 'L'}</span>
        </div>
      ))}
    </div>

    {/* Column 3: Finals Winner (1 Team) */}
    <div className="flex flex-col justify-center h-full z-10 pl-8 sm:pl-12">
      <motion.div
        animate={{ boxShadow: ['0 0 8px rgba(229,57,53,0.2)', '0 0 20px rgba(229,57,53,0.5)', '0 0 8px rgba(229,57,53,0.2)'] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="w-[90px] sm:w-[100px] h-[40px] px-2 bg-[#e53935]/15 border border-[#e53935]/50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[#e53935]/25 transition-colors"
      >
        <span className="text-[8px] font-bold text-[#e53935] uppercase tracking-widest">Winner</span>
        <span className="text-[10px] font-black text-white truncate">Robo Warriors</span>
      </motion.div>
    </div>
  </div>
));
BracketChart.displayName = 'BracketChart';

/* ── Section ──────────────────────────────────────────────────────────────── */
const Competitions = memo(() => (
  <section id="competitions" className="section-pad bg-[#0a0a0f] relative overflow-hidden" aria-labelledby="comp-heading">
    <div className="absolute top-0 right-0 w-80 h-80 bg-[#e53935]/5 rounded-full blur-3xl pointer-events-none" aria-hidden />

    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger()} className="mb-14">
        <motion.p variants={fadeUp} className="text-[#e53935] text-xs font-bold uppercase tracking-widest mb-2">Events</motion.p>
        <motion.h2 variants={fadeUp} id="comp-heading" className="text-3xl sm:text-4xl font-black text-white mb-3">
          COMPETITIONS &amp; EVENTS
        </motion.h2>
      </motion.div>

      {/* Three Columns Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={stagger(0.12)}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        
        {/* 1. LIVE NOW Column */}
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e53935] animate-pulse" />
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">LIVE NOW</h3>
          </div>
          
          <div className="card p-5 relative overflow-hidden flex flex-col gap-4 bg-gradient-to-b from-[#111118] to-[#0a0a0f]">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-bold text-base">Bengaluru Regionals</h4>
              <StatusBadge status="live" />
            </div>
            <BracketChart />
          </div>
        </motion.div>

        {/* 2. UPCOMING Column */}
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">UPCOMING</h3>
          </div>

          <div className="flex flex-col gap-4">
            {competitions.filter(c => c.status === 'upcoming').map(c => (
              <div key={c.id} className="card p-5 relative overflow-hidden flex flex-col gap-3 hover:border-white/12 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-white font-bold text-base">{c.name}</h4>
                    <p className="text-xs text-[#a0a0b0] mt-1">{c.location}</p>
                  </div>
                  <span className="text-xs font-bold text-[#e53935] bg-[#e53935]/10 px-2 py-1 rounded">
                    {c.date}
                  </span>
                </div>
                <p className="text-xs text-[#606070] font-semibold">{c.prize}</p>
                
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'register' } }))}
                >
                  REGISTER
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3. PAST RESULTS Column */}
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-2">
            <Trophy className="w-4 h-4 text-[#e53935]" aria-hidden />
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">PAST RESULTS</h3>
          </div>

          <div className="card p-5">
            <ul className="space-y-3" role="list">
              {pastResults.map((r, i) => (
                <li key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-white/6 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/10 text-white/70 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-white text-sm font-semibold">{r.team}</span>
                  </div>
                  <span className="text-[#e53935] text-xs font-bold bg-[#e53935]/10 px-3 py-1 rounded-full">
                    {r.score}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

      </motion.div>
    </div>
  </section>
));

Competitions.displayName = 'Competitions';
export default Competitions;

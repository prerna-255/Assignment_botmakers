import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { stagger, fadeUp, vp } from '../../utils/animations';
import type { Discipline } from '../../types';

// Import images
import roboRaceImg from '../../assets/robo-race.jpg';
import lineFollowerImg from '../../assets/line-follower.jpg';
import rcRacingImg from '../../assets/rc-racing.jpg';
import droneFlyingImg from '../../assets/drone-flying.jpg';
import roboHockeyImg from '../../assets/robo-hockey.jpg';
import roboWarImg from '../../assets/robo-war.jpg';

const DISCIPLINES: Discipline[] = [
  { id: 'd1', title: 'Robo Race',                         description: 'High-speed autonomous robots navigate precision tracks.',         emoji: '🏎️',  accentColor: '#e53935', image: roboRaceImg },
  { id: 'd2', title: 'Line Follower',                     description: 'Autonomous robots navigate complex custom track layouts.',        emoji: '🤖',  accentColor: '#9c27b0', image: lineFollowerImg },
  { id: 'd3', title: 'RC Racing',                         description: 'Remote-controlled vehicles compete in precision speed runs.',     emoji: '🎮',  accentColor: '#2196f3', image: rcRacingImg },
  { id: 'd4', title: 'FPV Drone Flying & Obstacle Play',  description: 'First-person view drone pilots maneuver custom sky paths.',      emoji: '🚁',  accentColor: '#ff9800', image: droneFlyingImg },
  { id: 'd5', title: 'Robo Hockey',                       description: 'Teams of custom hockey bots score goals in dynamic arenas.',      emoji: '🏒',  accentColor: '#4caf50', image: roboHockeyImg },
  { id: 'd6', title: 'Robo War',                          description: 'Full-combat metal chassis robots fight to the end.',             emoji: '⚔️',  accentColor: '#00bcd4', image: roboWarImg },
];

const DisciplineCard = memo(({ d, i }: { d: Discipline; i: number }) => (
  <motion.article
    variants={fadeUp}
    onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'details', data: { ...d, tag: 'Discipline' } } }))}
    className="group relative rounded-2xl overflow-hidden cursor-pointer bg-black/40 border border-white/5"
    style={{ aspectRatio: '4/3' }}
    whileHover={{ scale: 1.03, zIndex: 10 }}
    tabIndex={0}
    aria-label={`${d.title} discipline`}
  >
    {/* Background Image with zoom */}
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={d.image}
        alt={d.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>

    {/* Dark overlay fade */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-[#0a0a0f]/10 group-hover:via-[#0a0a0f]/75 transition-all duration-300" />

    {/* Floating emoji */}
    <motion.div
      className="absolute top-4 right-4 text-3xl z-10"
      animate={{ rotate: [0, 6, -6, 0] }}
      transition={{ repeat: Infinity, duration: 4.5, delay: i * 0.28 }}
      aria-hidden
    >
      {d.emoji}
    </motion.div>

    {/* Content slides up on hover */}
    <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
      <h3 className="text-white font-bold text-base mb-0 group-hover:mb-1 transition-all">{d.title}</h3>

      <motion.div
        className="overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        whileHover={{ height: 'auto', opacity: 1 }}
        transition={{ duration: 0.28 }}
      >
        <p className="text-[#a0a0b0] text-xs leading-relaxed mt-1.5 mb-2.5">{d.description}</p>
        <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: d.accentColor }}>
          Learn More
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden />
          </motion.span>
        </span>
      </motion.div>
    </div>

    {/* Border glow */}
    <div
      className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ borderColor: `${d.accentColor}50`, boxShadow: `0 0 22px ${d.accentColor}22` }}
    />
  </motion.article>
));
DisciplineCard.displayName = 'DisciplineCard';

const Disciplines = memo(() => (
  <section id="disciplines" className="section-pad bg-[#0a0a0f] relative overflow-hidden" aria-labelledby="disc-heading">
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#9c27b0]/5 rounded-full blur-3xl pointer-events-none" aria-hidden />

    <div className="max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger()} className="mb-12">
        <motion.p variants={fadeUp} className="text-[#e53935] text-xs font-bold uppercase tracking-widest mb-2">Event Types</motion.p>
        <motion.h2 variants={fadeUp} id="disc-heading" className="text-3xl sm:text-4xl font-black text-white mb-3">
          COMPETITION DISCIPLINES
        </motion.h2>
        <motion.p variants={fadeUp} className="text-[#a0a0b0] max-w-xl">
          Six unique disciplines testing different aspects of robotics engineering, programming, and strategy.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="visible" viewport={vp} variants={stagger(0.07)}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {DISCIPLINES.map((d, i) => <DisciplineCard key={d.id} d={d} i={i} />)}
      </motion.div>
    </div>
  </section>
));

Disciplines.displayName = 'Disciplines';
export default Disciplines;

import { memo, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { useMousePosition } from '../../hooks/useAnimations';
import Button from '../../components/Button/Button';

// Pre-generate stable particle data
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id:       i,
  left:     `${(i * 37 + 11) % 100}%`,
  top:      `${(i * 53 + 7)  % 100}%`,
  size:     (i % 3) + 1.5,
  dur:      6 + (i % 5),
  delay:    i * 0.32,
}));

const STATS = [
  { value: '500+',  label: 'Events'       },
  { value: '250+',  label: 'Universities' },
  { value: '50K+',  label: 'Participants' },
];

const Hero = memo(() => {
  const sectionRef  = useRef<HTMLElement>(null);
  const { x, y }   = useMousePosition();
  const { scrollYProgress } = useScroll({ target: sectionRef });

  const bgScale  = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 0.8], [0, -80]);
  const opacity  = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const [winW, setWinW] = useState(1440);
  const [winH, setWinH] = useState(900);

  useEffect(() => {
    const onResize = () => { setWinW(window.innerWidth); setWinH(window.innerHeight); };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const pX = ((x / winW) - 0.5) * 22;
  const pY = ((y / winH) - 0.5) * 22;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero – India's Ultimate Robotics Arena"
    >
      {/* ── Parallax background ──────────────────────────────────────── */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: bgScale }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#12060a] to-[#0a0a14]" />

        {/* Robot silhouette illustration */}
        <motion.div
          className="absolute inset-0 flex items-center justify-end"
          style={{ x: pX, y: pY }}
          transition={{ type: 'spring', stiffness: 80, damping: 28 }}
        >
          <svg
            viewBox="0 0 540 540"
            className="w-full max-w-xl h-full opacity-20"
            aria-label="Robot silhouette"
            role="img"
          >
            {/* Head */}
            <rect x="175" y="95"  width="150" height="115" rx="16" fill="#e53935" opacity="0.5" />
            {/* Eyes */}
            <circle cx="215" cy="148" r="20" fill="#ff6f60" opacity="0.9" />
            <circle cx="285" cy="148" r="20" fill="#ff6f60" opacity="0.9" />
            <circle cx="215" cy="148" r="10" fill="white" />
            <circle cx="285" cy="148" r="10" fill="white" />
            <circle cx="220" cy="143" r="4"  fill="#0a0a0f" />
            <circle cx="290" cy="143" r="4"  fill="#0a0a0f" />
            {/* Antenna */}
            <line x1="250" y1="95" x2="250" y2="58" stroke="#e53935" strokeWidth="3" />
            <circle cx="250" cy="50" r="10" fill="#e53935" />
            <motion.circle cx="250" cy="50" r="18" fill="none" stroke="#e53935" strokeWidth="1.5"
              animate={{ r: [18, 28, 18], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }} />
            {/* Body */}
            <rect x="160" y="230" width="180" height="145" rx="14" fill="#e53935" opacity="0.35" />
            <rect x="182" y="248" width="136" height="80" rx="10" fill="#0a0a0f" opacity="0.5" />
            <circle cx="215" cy="270" r="7" fill="#e53935" />
            <circle cx="250" cy="270" r="7" fill="#2196f3" />
            <circle cx="285" cy="270" r="7" fill="#4caf50" />
            {/* Arms */}
            <rect x="95"  y="238" width="65" height="36" rx="10" fill="#e53935" opacity="0.28" />
            <rect x="340" y="238" width="65" height="36" rx="10" fill="#e53935" opacity="0.28" />
            {/* Legs */}
            <rect x="190" y="390" width="46" height="72" rx="10" fill="#e53935" opacity="0.25" />
            <rect x="264" y="390" width="46" height="72" rx="10" fill="#e53935" opacity="0.25" />
            {/* Grid */}
            <g stroke="#e53935" strokeWidth="0.4" opacity="0.06">
              {Array.from({ length: 22 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i*25} x2="540" y2={i*25} />)}
              {Array.from({ length: 22 }).map((_, i) => <line key={`v${i}`} x1={i*25} y1="0" x2={i*25} y2="540" />)}
            </g>
          </svg>
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r  from-[#0a0a0f]  via-[#0a0a0f]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t  from-[#0a0a0f]  via-transparent to-transparent" />
      </motion.div>

      {/* ── Floating particles ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-1 pointer-events-none" aria-hidden>
        {PARTICLES.map(p => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-[#e53935]"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ y: [0, -28, 0], x: [0, 14, 0], opacity: [0.25, 0.75, 0.25], scale: [1, 1.4, 1] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20"
        style={{ y: contentY, opacity }}
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 0.18 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e53935]/30 bg-[#e53935]/8 text-[#e53935] text-xs font-bold uppercase tracking-widest mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#e53935] animate-pulse" />
            India's Premier Robotics League
          </motion.div>

          {/* Headline – three lines animate in separately */}
          {['INDIA\'S ULTIMATE', 'ROBOTICS', 'ARENA'].map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                initial={{ y: 110, opacity: 0 }}
                animate={{ y: 0,   opacity: 1  }}
                transition={{ delay: 0.32 + i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`font-black leading-[1.04] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] ${
                  i === 1
                    ? 'bg-gradient-to-r from-[#ff6f60] to-[#e53935] bg-clip-text text-transparent'
                    : 'text-white'
                }`}
              >
                {word}
              </motion.h1>
            </div>
          ))}

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 0.72, duration: 0.6 }}
            className="mt-6 text-base sm:text-lg text-[#a0a0b0] max-w-xl leading-relaxed"
          >
            Structured events · Digital identity · National ranking · Career pathway.
            The platform that connects robotics teams across India.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 0.88, duration: 0.5 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('competitions')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Now
            </Button>

            <motion.button
              onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'video' } }))}
              className="flex items-center gap-3 text-white font-semibold group"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Watch intro video"
            >
              <span className="w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover:border-[#e53935]/50 group-hover:bg-[#e53935]/10 transition-all">
                <Play className="w-4 h-4 ml-0.5" aria-hidden />
              </span>
              <span className="text-sm group-hover:text-[#e53935] transition-colors">Watch Intro</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap gap-10 mt-14 pt-8 border-t border-white/8"
          >
            {STATS.map(s => (
              <div key={s.label}>
                <p className="text-3xl font-black text-white">{s.value}</p>
                <p className="text-xs text-[#a0a0b0] uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
          <ChevronDown className="w-5 h-5 text-[#a0a0b0]" />
        </motion.div>
        <span className="text-[10px] text-[#505060] uppercase tracking-[0.2em]">Scroll</span>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;

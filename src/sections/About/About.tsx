import { memo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Globe, Award, TrendingUp } from 'lucide-react';
import { stagger, fadeUp, fadeLeft, fadeRight, scaleIn, vp } from '../../utils/animations';

const FEATURES = [
  { Icon: CheckCircle, title: 'Structured Events',  desc: 'Professionally organised with standardised rules and certified judging.' },
  { Icon: Globe,       title: 'Digital Identity',   desc: 'Earn a verifiable profile showcasing your achievements and rankings.'   },
  { Icon: Award,       title: 'National Ranking',   desc: 'Climb the national leaderboard and gain peer recognition.'              },
  { Icon: TrendingUp,  title: 'Career Pathway',     desc: 'Connect with top universities and companies via your performance record.'},
];

const About = memo(() => (
  <section id="about" className="section-pad bg-[#0a0a0f] relative overflow-hidden" aria-labelledby="about-heading">
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#e53935]/5 rounded-full blur-3xl pointer-events-none" aria-hidden />

    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* ── Left: text ───────────────────────────────────────────── */}
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger()}>
          <motion.p variants={fadeUp} className="text-[#e53935] text-xs font-bold uppercase tracking-widest mb-3">What is BotLeague?</motion.p>
          <motion.h2 variants={fadeLeft} id="about-heading" className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight">
            WHAT IS{' '}
            <span className="bg-gradient-to-r from-[#ff6f60] to-[#e53935] bg-clip-text text-transparent">BOTLEAGUE?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#a0a0b0] mb-8 leading-relaxed">
            BotLeague is India's premier structured robotics competition ecosystem connecting schools,
            colleges, and professionals through fair, standardised, and nationally recognised events.
            We provide the platform, tools, and community for roboticists to grow and excel.
          </motion.p>

          <motion.div variants={stagger(0.08)} className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map(({ Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={scaleIn}
                className="group glass-light rounded-xl p-4 hover:border-[#e53935]/25 hover:shadow-[0_0_18px_rgba(229,57,53,0.08)] transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="w-9 h-9 rounded-lg bg-[#e53935]/10 flex items-center justify-center mb-3"
                  whileHover={{ rotate: 10, scale: 1.12 }}
                  transition={{ type: 'spring', stiffness: 280 }}
                >
                  <Icon className="w-4 h-4 text-[#e53935]" aria-hidden />
                </motion.div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-[#e53935] transition-colors">{title}</h3>
                <p className="text-[#606070] text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: illustration ───────────────────────────────────── */}
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeRight} className="relative">
          <div className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto border border-white/5 bg-gradient-to-br from-[#111118] to-[#0a0a0f]">
            {/* Robot SVG */}
            <svg viewBox="0 0 400 400" className="w-3/4 h-3/4 mx-auto mt-8" aria-label="BotLeague robot mascot" role="img">
              <rect x="130" y="80"  width="140" height="105" rx="14" fill="#1a1a24" stroke="#e53935" strokeWidth="1.8" />
              <circle cx="163" cy="128" r="18" fill="#e53935" opacity="0.9" />
              <circle cx="237" cy="128" r="18" fill="#e53935" opacity="0.9" />
              <circle cx="163" cy="128" r="9"  fill="#ff6f60" />
              <circle cx="237" cy="128" r="9"  fill="#ff6f60" />
              <circle cx="167" cy="124" r="4"  fill="white" />
              <circle cx="241" cy="124" r="4"  fill="white" />
              <rect x="155" y="162" width="90" height="8" rx="4" fill="#e53935" opacity="0.6" />
              <line x1="200" y1="80" x2="200" y2="52" stroke="#e53935" strokeWidth="2" />
              <circle cx="200" cy="44" r="8" fill="#e53935" />
              <motion.circle cx="200" cy="44" r="16" fill="none" stroke="#e53935" strokeWidth="1"
                animate={{ r: [16, 26, 16], opacity: [0.45, 0, 0.45] }}
                transition={{ repeat: Infinity, duration: 2.2 }} />
              <rect x="118" y="200" width="164" height="132" rx="12" fill="#1a1a24" stroke="#e53935" strokeWidth="1.2" strokeOpacity="0.4" />
              <rect x="140" y="218" width="120" height="72" rx="8" fill="#0a0a0f" stroke="#e53935" strokeWidth="0.8" strokeOpacity="0.25" />
              <circle cx="163" cy="238" r="5" fill="#e53935" />
              <circle cx="183" cy="238" r="5" fill="#2196f3" />
              <circle cx="203" cy="238" r="5" fill="#4caf50" />
              <motion.rect x="150" y="252" width="100" height="4" rx="2" fill="#e53935" opacity="0.3"
                animate={{ width: [60, 100, 60] }} transition={{ repeat: Infinity, duration: 2.5 }} />
              <rect x="64"  y="207" width="54"  height="30" rx="8" fill="#1a1a24" stroke="#e53935" strokeWidth="1" strokeOpacity="0.35" />
              <rect x="282" y="207" width="54"  height="30" rx="8" fill="#1a1a24" stroke="#e53935" strokeWidth="1" strokeOpacity="0.35" />
              <rect x="146" y="342" width="42"  height="54" rx="8" fill="#1a1a24" stroke="#e53935" strokeWidth="1" strokeOpacity="0.3" />
              <rect x="212" y="342" width="42"  height="54" rx="8" fill="#1a1a24" stroke="#e53935" strokeWidth="1" strokeOpacity="0.3" />
            </svg>

            {/* Floating chips */}
            <motion.div
              className="absolute top-5 right-5 glass rounded-xl px-3 py-2 text-center"
              animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 3 }}
            >
              <p className="text-lg font-black text-white">50K+</p>
              <p className="text-[10px] text-[#a0a0b0]">Participants</p>
            </motion.div>
            <motion.div
              className="absolute bottom-5 left-5 glass rounded-xl px-3 py-2 text-center"
              animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
            >
              <p className="text-lg font-black text-[#e53935]">#1</p>
              <p className="text-[10px] text-[#a0a0b0]">Robotics Platform</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
));

About.displayName = 'About';
export default About;

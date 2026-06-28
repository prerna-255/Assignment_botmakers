import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { stagger, fadeUp, scaleIn, vp } from '../../utils/animations';
import Input from '../../components/Input/Input';
import type { JoinCard as JoinCardType } from '../../types';

const JOIN_CARDS: JoinCardType[] = [
  {
    id: 'judge',
    badge: 'Judge',
    title: 'BECOME A JUDGE',
    subtitle: 'Apply to be a certified tournament judge.',
    accentColor: '#e53935',
    fields: [
      { id: 'judge-name',  label: 'Name',     placeholder: 'Name',     type: 'text'  },
      { id: 'judge-loc',   label: 'Location', placeholder: 'Location', type: 'text'  },
      { id: 'judge-email', label: 'Email',    placeholder: 'Email',    type: 'email' },
    ],
  },
  {
    id: 'volunteer',
    badge: 'Volunteer',
    title: 'VOLUNTEER',
    subtitle: 'Help organise events and grow the community.',
    accentColor: '#2196f3',
    fields: [
      { id: 'vol-name',  label: 'Name',  placeholder: 'Name',  type: 'text'  },
      { id: 'vol-skill', label: 'Skill', placeholder: 'Skill', type: 'text'  },
      { id: 'vol-email', label: 'Email', placeholder: 'Email', type: 'email' },
    ],
  },
  {
    id: 'community',
    badge: 'Community',
    title: 'COMMUNITY MEMBER',
    subtitle: 'Stay updated with events, news, and opportunities.',
    accentColor: '#4caf50',
    fields: [
      { id: 'com-name',  label: 'Name',     placeholder: 'Name',     type: 'text'  },
      { id: 'com-loc',   label: 'Location', placeholder: 'Location', type: 'text'  },
      { id: 'com-email', label: 'Email',    placeholder: 'Email',    type: 'email' },
    ],
  },
];

const JoinCardItem = memo(({ card }: { card: JoinCardType }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.div
      variants={scaleIn}
      className="group card relative rounded-2xl p-6 flex flex-col hover:border-white/10 transition-all duration-300"
      whileHover={{ y: -8, boxShadow: `0 22px 44px ${card.accentColor}1a` }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-b-full opacity-70"
        style={{ background: `linear-gradient(90deg, ${card.accentColor}, transparent)` }}
      />

      {/* Header */}
      <div className="mb-5">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3"
          style={{ background: `${card.accentColor}16`, color: card.accentColor }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: card.accentColor }} />
          {card.badge}
        </span>
        <h3 className="text-white font-bold text-lg mb-1">{card.title}</h3>
        <p className="text-[#a0a0b0] text-sm">{card.subtitle}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1" noValidate>
        {card.fields.map(f => (
          <Input key={f.id} id={f.id} label={f.label} placeholder={f.placeholder} type={f.type} required />
        ))}

        <div className="mt-2">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full py-3 rounded-xl text-center text-sm font-semibold text-white"
              style={{ background: `${card.accentColor}28`, border: `1px solid ${card.accentColor}50` }}
            >
              ✅ Successfully registered!
            </motion.div>
          ) : (
            <motion.button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
              style={{ background: `linear-gradient(135deg, ${card.accentColor}, ${card.accentColor}bb)` }}
              whileHover={{ scale: 1.025, boxShadow: `0 0 22px ${card.accentColor}50` }}
              whileTap={{ scale: 0.97 }}
            >
              SIGN UP
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
});
JoinCardItem.displayName = 'JoinCardItem';

const Join = memo(() => (
  <section id="join" className="section-pad bg-[#0a0a0f] relative overflow-hidden" aria-labelledby="join-heading">
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <div className="absolute top-1/4 left-0 w-56 h-56 bg-[#e53935]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-56 h-56 bg-[#2196f3]/5 rounded-full blur-3xl" />
    </div>

    <div className="max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger()} className="text-center mb-12">
        <motion.p variants={fadeUp} className="text-[#e53935] text-xs font-bold uppercase tracking-widest mb-2">Get Started</motion.p>
        <motion.h2 variants={fadeUp} id="join-heading" className="text-3xl sm:text-4xl font-black text-white mb-3">
          JOIN THE ECOSYSTEM
        </motion.h2>
        <motion.p variants={fadeUp} className="text-[#a0a0b0] max-w-lg mx-auto">
          Whether you're a competitor, volunteer, or enthusiast — there's a place for you in BotLeague.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="visible" viewport={vp} variants={stagger(0.1)}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {JOIN_CARDS.map(c => <JoinCardItem key={c.id} card={c} />)}
      </motion.div>
    </div>
  </section>
));

Join.displayName = 'Join';
export default Join;

import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '../../data/categories';
import type { Category } from '../../types';
import { stagger, fadeUp, vp } from '../../utils/animations';

const CategoryCard = memo(({ cat, i }: { cat: Category; i: number }) => (
  <motion.article
    variants={fadeUp}
    onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'details', data: { ...cat, tag: 'Category' } } }))}
    className="group relative card rounded-2xl p-6 cursor-pointer overflow-hidden"
    whileHover={{ y: -8, scale: 1.025, boxShadow: `0 20px 40px ${cat.accentColor}22` }}
    tabIndex={0}
    aria-label={`${cat.title} category`}
  >
    {/* Animated gradient overlay */}
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ background: `linear-gradient(135deg, ${cat.accentColor}12, transparent)` }}
    />
    {/* Animated border */}
    <div
      className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ borderColor: `${cat.accentColor}45` }}
    />

    {/* Icon */}
    <motion.div
      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-2xl"
      style={{ background: `${cat.accentColor}18` }}
      whileHover={{ rotate: -8, scale: 1.18 }}
      transition={{ type: 'spring', stiffness: 300 }}
      aria-hidden
    >
      {cat.emoji}
    </motion.div>

    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#e53935] transition-colors">{cat.title}</h3>
    <p className="text-[#a0a0b0] text-sm leading-relaxed mb-4">{cat.description}</p>

    <div className="flex items-center justify-between">
      <span className="text-xs text-[#505060]">{cat.participants}+ teams</span>
      <motion.span
        className="flex items-center gap-1 text-xs font-semibold"
        style={{ color: cat.accentColor }}
        whileHover={{ x: 4 }}
      >
        Learn More <ArrowRight className="w-3 h-3" aria-hidden />
      </motion.span>
    </div>

    {/* Bottom accent bar */}
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
      style={{ background: `linear-gradient(90deg, ${cat.accentColor}, transparent)` }}
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ delay: i * 0.12, duration: 0.55 }}
      viewport={vp}
    />
  </motion.article>
));
CategoryCard.displayName = 'CategoryCard';

const Categories = memo(() => (
  <section id="categories" className="section-pad bg-gradient-to-b from-[#0d0d15] to-[#0a0a0f] relative overflow-hidden" aria-labelledby="cat-heading">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
      <div className="w-[600px] h-[600px] rounded-full bg-[#e53935]/3 blur-3xl" />
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger()} className="text-center mb-12">
        <motion.p variants={fadeUp} className="text-[#e53935] text-xs font-bold uppercase tracking-widest mb-2">Competition Types</motion.p>
        <motion.h2 variants={fadeUp} id="cat-heading" className="text-3xl sm:text-4xl font-black text-white mb-3">CATEGORIES</motion.h2>
        <motion.p variants={fadeUp} className="text-[#a0a0b0] max-w-lg mx-auto">
          Choose your arena. Each category is designed to challenge and develop specific robotics skills.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="visible" viewport={vp} variants={stagger(0.09)}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {categories.map((c, i) => <CategoryCard key={c.id} cat={c} i={i} />)}
      </motion.div>
    </div>
  </section>
));

Categories.displayName = 'Categories';
export default Categories;

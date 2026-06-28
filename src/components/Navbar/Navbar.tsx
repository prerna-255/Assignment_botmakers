import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { useScrollY, useActiveSection } from '../../hooks/useAnimations';

const NAV_LINKS = [
  { id: 'home',         label: 'Home',         href: '#home'         },
  { id: 'competitions', label: 'Competitions',  href: '#competitions' },
  { id: 'about',        label: 'About',         href: '#about'        },
  { id: 'categories',   label: 'Categories',    href: '#categories'   },
  { id: 'disciplines',  label: 'Disciplines',   href: '#disciplines'  },
  { id: 'sponsors',     label: 'Sponsors',      href: '#sponsors'     },
];

const SECTION_IDS = [
  'home','competitions','journey','about','categories','disciplines','advantages','join','sponsors',
];

const Navbar = memo(() => {
  const scrollY   = useScrollY();
  const active    = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const scrolled  = scrollY > 60;

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label="BotLeague – back to top"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e53935] to-[#b71c1c] flex items-center justify-center group-hover:shadow-[0_0_18px_rgba(229,57,53,0.55)] transition-shadow">
              <Zap className="w-4 h-4 text-white" aria-hidden />
            </div>
            <span className="font-black text-lg tracking-tight text-white">
              <span className="text-[#e53935]">BOT</span>LEAGUE
            </span>
          </motion.a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <motion.a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active === link.id ? 'text-white' : 'text-[#a0a0b0] hover:text-white'
                  }`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  aria-current={active === link.id ? 'page' : undefined}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/8 border border-white/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'login' } }))}
              className="text-sm font-medium text-[#a0a0b0] hover:text-white transition-colors px-3 py-2 rounded-lg"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Login
            </motion.button>
            <motion.button
              onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'register' } }))}
              className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-[#e53935] to-[#b71c1c] rounded-xl hover:shadow-[0_0_22px_rgba(229,57,53,0.45)] transition-shadow"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Register
            </motion.button>
          </div>

          {/* Hamburger */}
          <motion.button
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.88 }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait">
              {open
                ? <motion.div key="x"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-6 h-6" /></motion.div>
                : <motion.div key="mb" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate:-90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu className="w-6 h-6" /></motion.div>
              }
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#0a0a0f]/96 backdrop-blur-2xl flex flex-col items-center justify-center gap-7 pt-16"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className={`text-2xl font-bold transition-colors ${
                  active === link.id ? 'text-[#e53935]' : 'text-white hover:text-[#e53935]'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ delay: i * 0.06 }}
                aria-current={active === link.id ? 'page' : undefined}
              >
                {link.label}
              </motion.a>
            ))}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  setOpen(false);
                  window.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'login' } }));
                }}
                className="px-6 py-3 text-base font-semibold text-white border border-white/20 rounded-xl hover:border-white/40 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  window.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'register' } }));
                }}
                className="px-6 py-3 text-base font-bold text-white bg-gradient-to-r from-[#e53935] to-[#b71c1c] rounded-xl"
              >
                Register
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;

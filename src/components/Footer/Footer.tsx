import { memo } from 'react';
import { motion } from 'framer-motion';
import { Zap, Mail, MapPin, Phone } from 'lucide-react';
import { FaTwitter, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';

const QUICK_LINKS = [
  { label: 'The Arena',           href: '#home' },
  { label: 'Schedule',            href: '#competitions' },
  { label: 'Rules & Regulations', href: '#categories' },
  { label: 'Registration',        href: '#join' },
  { label: 'Leaderboard',         href: '#advantages' },
  { label: 'About Team',          href: '#about' },
  { label: 'Competitions',        href: '#competitions' },
  { label: 'Categories',          href: '#categories' },
  { label: 'Contact Us',          href: '#join' },
  { label: 'Login',               href: '#home' },
];

const SOCIAL = [
  { Icon: FaYoutube,   label: 'YouTube',   href: 'https://youtube.com/botleague',   color: '#ff0000' },
  { Icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com/botleague', color: '#e1306c' },
  { Icon: FaFacebook,  label: 'Facebook',  href: 'https://facebook.com/botleague',  color: '#1877f2' },
  { Icon: FaTwitter,   label: 'Twitter',  href: 'https://twitter.com/botleague',  color: '#1da1f2' },
];

const Footer = memo(() => (
  <footer className="bg-[#06060a] border-t border-white/5 pt-16 pb-8 relative overflow-hidden" aria-label="Site footer">
    {/* Glow blob */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[640px] h-40 bg-[#e53935]/4 rounded-full blur-3xl pointer-events-none" aria-hidden />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-[#e53935] to-[#b71c1c] rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" aria-hidden />
            </div>
            <span className="text-white font-black text-lg tracking-tight">
              <span className="text-[#e53935]">BOT</span>LEAGUE
            </span>
          </div>
          <p className="text-[#a0a0b0] text-sm leading-relaxed max-w-xs mb-6">
            India's premier structured robotics competition platform — building the next
            generation of engineers, one robot at a time.
          </p>
          <ul className="space-y-2">
            {[
              { Icon: MapPin, text: 'xx' },
              { Icon: Mail,   text: 'xx',  href: 'mailto:xx' },
              { Icon: Phone,  text: 'xx' },
            ].map(({ Icon, text, href }) => (
              <li key={text} className="flex items-center gap-2 text-[#606070] text-sm">
                <Icon className="w-4 h-4 text-[#e53935] shrink-0" aria-hidden />
                {href
                  ? <a href={href} className="hover:text-white transition-colors">{text}</a>
                  : <span>{text}</span>
                }
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick links">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3" role="list">
            {QUICK_LINKS.map(link => (
              <li key={link.label}>
                <motion.a
                  href={link.href}
                  className="group flex items-center gap-2 text-[#a0a0b0] text-sm hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span className="block w-0 h-px bg-[#e53935] group-hover:w-3 transition-all duration-200" />
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social + Newsletter */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Social Media</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {SOCIAL.map(({ Icon, label, href, color }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-light flex items-center justify-center text-[#a0a0b0] hover:text-white transition-all"
                whileHover={{ scale: 1.18, boxShadow: `0 0 16px ${color}44` }}
                whileTap={{ scale: 0.88 }}
              >
                <Icon className="w-4 h-4" aria-hidden />
              </motion.a>
            ))}
          </div>

          {/* Social text links */}
          <div className="flex flex-col gap-1.5 mb-6 text-xs text-[#606070]">
            {SOCIAL.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span className="font-semibold text-white/50">{label}:</span>
                <span className="underline truncate max-w-[180px]">{href.replace('https://', '')}</span>
              </a>
            ))}
          </div>

          <h4 className="text-white font-semibold text-sm mb-2">Newsletter</h4>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              aria-label="Newsletter email"
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-[#505060] outline-none focus:border-[#e53935]/50 transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Subscribe"
              className="px-3 py-2 bg-[#e53935] text-white text-sm font-bold rounded-lg hover:shadow-[0_0_14px_rgba(229,57,53,0.4)] transition-shadow"
            >
              →
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#505060] text-xs">© {new Date().getFullYear()} BotLeague. All rights reserved.</p>
        <div className="flex gap-5 text-[#505060] text-xs">
          {['Privacy Policy','Terms of Service','Cookie Policy'].map(l => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
));

Footer.displayName = 'Footer';
export default Footer;

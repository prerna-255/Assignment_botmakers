import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, MapPin, Trophy, ShieldAlert, Video } from 'lucide-react';
import Input from '../Input/Input';
import Button from '../Button/Button';

export type ModalType = 'login' | 'register' | 'details' | 'video' | null;

interface ModalProps {
  isOpen: boolean;
  type: ModalType;
  onClose: () => void;
  data?: any; // For dynamic data like categories, disciplines, etc.
  onSwitchType?: (newType: ModalType, newData?: any) => void;
}

const Modal = memo(({ isOpen, type, onClose, data, onSwitchType }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent, actionMessage: string) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(actionMessage);
      setTimeout(() => {
        setSuccess(null);
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#060609]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl glass card glow-red-sm p-6 sm:p-8 z-10"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#a0a0b0] hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ── LOGIN MODAL ── */}
            {type === 'login' && (
              <div>
                <h3 className="text-2xl font-black text-white mb-2">Welcome Back</h3>
                <p className="text-sm text-[#a0a0b0] mb-6">Log in to manage your robotics team and check rankings.</p>

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl border border-green-500/35 bg-green-500/10 text-green-400 text-center text-sm font-semibold mb-4"
                  >
                    {success}
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => handleFormSubmit(e, 'Logged in successfully!')} className="space-y-4">
                    <Input id="login-email" label="Email Address" placeholder="your@email.com" type="email" required />
                    <Input id="login-password" label="Password" placeholder="••••••••" type="text" required />

                    <div className="flex items-center justify-between text-xs text-[#a0a0b0] mt-2">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" className="accent-[#e53935]" />
                        <span>Remember me</span>
                      </label>
                      <a href="#" className="hover:text-[#e53935] transition-colors">Forgot password?</a>
                    </div>

                    <Button type="submit" variant="primary" className="w-full mt-6" disabled={loading}>
                      {loading ? 'Authenticating...' : 'Sign In'}
                    </Button>
                  </form>
                )}

                <p className="text-xs text-[#606070] text-center mt-6">
                  Don't have an account?{' '}
                  <button
                    onClick={() => onSwitchType?.('register')}
                    className="text-[#e53935] hover:underline font-bold"
                  >
                    Register here
                  </button>
                </p>
              </div>
            )}

            {/* ── REGISTER MODAL ── */}
            {type === 'register' && (
              <div>
                <h3 className="text-2xl font-black text-white mb-2">Create Account</h3>
                <p className="text-sm text-[#a0a0b0] mb-6">Register your team to join tournaments and earn points.</p>

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl border border-green-500/35 bg-green-500/10 text-green-400 text-center text-sm font-semibold mb-4"
                  >
                    {success}
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => handleFormSubmit(e, 'Registration successful!')} className="space-y-4">
                    <Input id="reg-name" label="Team Leader Name" placeholder="John Doe" type="text" required />
                    <Input id="reg-team" label="Team Name" placeholder="Alpha Bots" type="text" required />
                    <Input id="reg-email" label="Email Address" placeholder="team@email.com" type="email" required />
                    <Input id="reg-password" label="Create Password" placeholder="••••••••" type="text" required />

                    <p className="text-[10px] text-[#606070] leading-normal">
                      By registering, you agree to follow the official BotLeague tournament guidelines and fair play regulations.
                    </p>

                    <Button type="submit" variant="primary" className="w-full mt-6" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Register Team'}
                    </Button>
                  </form>
                )}

                <p className="text-xs text-[#606070] text-center mt-6">
                  Already registered?{' '}
                  <button
                    onClick={() => onSwitchType?.('login')}
                    className="text-[#e53935] hover:underline font-bold"
                  >
                    Sign In instead
                  </button>
                </p>
              </div>
            )}

            {/* ── DETAILS MODAL (Category / Discipline / Competition) ── */}
            {type === 'details' && data && (
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                    style={{ background: `${data.accentColor || '#e53935'}18` }}
                  >
                    {data.emoji || data.icon || '🤖'}
                  </div>
                  <div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white/5"
                      style={{ color: data.accentColor || '#e53935' }}
                    >
                      {data.tag || 'Details'}
                    </span>
                    <h3 className="text-xl font-black text-white mt-1 leading-tight">{data.title || data.name}</h3>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-[#a0a0b0] leading-relaxed">
                  <p>{data.description || 'No detailed description available.'}</p>

                  {/* Dynamic Metadata / Details */}
                  {data.location && (
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5 text-xs">
                      <div>
                        <p className="text-[#606070] font-semibold uppercase">Location</p>
                        <p className="text-white font-medium mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#e53935]" /> {data.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#606070] font-semibold uppercase">Prize Pool</p>
                        <p className="text-white font-medium mt-0.5 flex items-center gap-1">
                          <Trophy className="w-3.5 h-3.5 text-[#e53935]" /> {data.prize}
                        </p>
                      </div>
                    </div>
                  )}

                  {data.participants && (
                    <div className="pt-2 text-xs">
                      <span className="text-[#606070] font-semibold uppercase">Registered Participants: </span>
                      <span className="text-white font-bold">{data.participants}+ Teams</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-8">
                  <Button variant="secondary" className="flex-1" onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => onSwitchType?.('register')}
                  >
                    Register Now
                  </Button>
                </div>
              </div>
            )}

            {/* ── VIDEO PLAYER MODAL ── */}
            {type === 'video' && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#e53935]/15 flex items-center justify-center mb-4 text-[#e53935]">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white mb-2 text-center">BotLeague Arena Intro</h3>
                <p className="text-sm text-[#a0a0b0] text-center mb-6">Preview of the high-intensity robotics battles and arenas.</p>

                {/* Futuristic Video Simulation Container */}
                <div className="relative w-full aspect-video rounded-xl bg-black overflow-hidden border border-white/10 flex flex-col items-center justify-center gap-3">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#e53935]/10 via-transparent to-transparent opacity-60" />
                  
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

                  {/* Pulsing visual core */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-16 h-16 rounded-full bg-[#e53935]/20 flex items-center justify-center border border-[#e53935]/50 text-[#e53935]"
                  >
                    <PlayIcon />
                  </motion.div>

                  <span className="text-xs text-[#a0a0b0] tracking-widest uppercase font-semibold relative z-10 animate-pulse">
                    STREAMING LIVE DEMO
                  </span>
                </div>

                <Button variant="secondary" className="w-full mt-6" onClick={onClose}>
                  Back to Hub
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

Modal.displayName = 'Modal';
export default Modal;

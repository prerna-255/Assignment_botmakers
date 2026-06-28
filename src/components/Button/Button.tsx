import { memo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?:  'primary' | 'secondary' | 'outline' | 'ghost';
  size?:     'sm' | 'md' | 'lg';
  className?: string;
  onClick?:  () => void;
  type?:     'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

const variantCls: Record<string, string> = {
  primary:   'bg-gradient-to-r from-[#e53935] to-[#b71c1c] text-white hover:shadow-[0_0_24px_rgba(229,57,53,0.5)]',
  secondary: 'bg-white/8 text-white border border-white/15 hover:bg-white/14 hover:border-white/28',
  outline:   'border border-[#e53935]/55 text-[#e53935] hover:bg-[#e53935]/10 hover:border-[#e53935]',
  ghost:     'text-white hover:bg-white/10',
};

const sizeCls: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

type Ripple = { id: number; x: number; y: number };

const Button = memo(({
  children, variant = 'primary', size = 'md',
  className = '', onClick, type = 'button',
  disabled = false, 'aria-label': ariaLabel,
}: ButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const rect = btnRef.current!.getBoundingClientRect();
    const id = Date.now();
    setRipples(p => [...p, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 650);
    onClick?.();
  };

  return (
    <motion.button
      ref={btnRef}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={disabled ? {} : { scale: 1.04 }}
      whileTap={disabled   ? {} : { scale: 0.96 }}
      className={`relative overflow-hidden font-semibold rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${sizeCls[size]} ${variantCls[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {ripples.map(r => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/25 pointer-events-none animate-ping"
          style={{ left: r.x - 12, top: r.y - 12, width: 24, height: 24 }}
        />
      ))}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;

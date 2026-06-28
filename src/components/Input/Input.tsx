import { memo, useState } from 'react';
import { motion } from 'framer-motion';

interface InputProps {
  id: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  'aria-label'?: string;
}

const Input = memo(({ id, label, placeholder, type = 'text', required, 'aria-label': ariaLabel }: InputProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-[10px] font-semibold uppercase tracking-widest text-[#a0a0b0]">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          aria-label={ariaLabel ?? label}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder-[#505060] outline-none transition-all duration-200 ${
            focused
              ? 'border-[#e53935]/70 shadow-[0_0_16px_rgba(229,57,53,0.18)] bg-white/7'
              : 'border-white/10 hover:border-white/18'
          }`}
        />
        {focused && (
          <motion.span
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ boxShadow: '0 0 0 2px rgba(229,57,53,0.22)' }}
          />
        )}
      </div>
    </div>
  );
});

Input.displayName = 'Input';
export default Input;

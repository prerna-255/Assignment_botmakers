import { memo, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMousePosition } from '../../hooks/useAnimations';

const CustomCursor = memo(() => {
  const { x, y } = useMousePosition();

  const cfg  = { stiffness: 280, damping: 24 };
  const dotX = useSpring(useMotionValue(0), cfg);
  const dotY = useSpring(useMotionValue(0), cfg);

  useEffect(() => { dotX.set(x - 8);  dotY.set(y - 8);  }, [x, y, dotX, dotY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-4 h-4 rounded-full bg-[#e53935] z-[99999] pointer-events-none mix-blend-difference"
        style={{ x: dotX, y: dotY }}
      />
      {/* Ring */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-9 h-9 rounded-full border border-[#e53935]/60 z-[99998] pointer-events-none"
        animate={{ x: x - 18, y: y - 18 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      />
    </>
  );
});

CustomCursor.displayName = 'CustomCursor';
export default CustomCursor;

import { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar      from './components/Navbar/Navbar';
import PageLoader  from './components/PageLoader/PageLoader';
import BackToTop   from './components/BackToTop/BackToTop';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Modal from './components/Modal/Modal';
import type { ModalType } from './components/Modal/Modal';
import { useScrollProgress } from './hooks/useAnimations';

// ── Lazy-load all sections for code-splitting ───────────────────────────────
const Hero        = lazy(() => import('./sections/Hero/Hero'));
const Competitions= lazy(() => import('./sections/Competitions/Competitions'));
const Journey     = lazy(() => import('./sections/Journey/Journey'));
const About       = lazy(() => import('./sections/About/About'));
const Categories  = lazy(() => import('./sections/Categories/Categories'));
const Disciplines = lazy(() => import('./sections/Disciplines/Disciplines'));
const Advantages  = lazy(() => import('./sections/Advantages/Advantages'));
const Join        = lazy(() => import('./sections/Join/Join'));
const Sponsors    = lazy(() => import('./sections/Sponsors/Sponsors'));
const Footer      = lazy(() => import('./components/Footer/Footer'));

// ── Shimmer skeleton shown while sections load ──────────────────────────────
const Skeleton = () => (
  <div className="section-pad max-w-7xl mx-auto space-y-4">
    <div className="shimmer h-8 w-48 rounded-xl" />
    <div className="shimmer h-4 w-80 rounded-xl" />
    <div className="grid grid-cols-3 gap-4 mt-8">
      {[0, 1, 2].map(i => <div key={i} className="shimmer h-44 rounded-2xl" />)}
    </div>
  </div>
);

export default function App() {
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState<{ type: ModalType; data?: any }>({ type: null, data: null });
  const scrollProgress          = useScrollProgress();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleOpenModal = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: ModalType; data?: any }>;
      setModal({ type: customEvent.detail.type, data: customEvent.detail.data });
    };
    window.addEventListener('open-modal' as any, handleOpenModal);
    return () => window.removeEventListener('open-modal' as any, handleOpenModal);
  }, []);

  return (
    <>
      {/* ── Custom cursor (desktop only) ─────────────────────────── */}
      <CustomCursor />

      {/* ── Animated page loader ─────────────────────────────────── */}
      <PageLoader loading={loading} />

      {/* ── Scroll-progress bar ──────────────────────────────────── */}
      <motion.div
        className="scroll-bar"
        style={{ scaleX: scrollProgress / 100, transformOrigin: '0%' }}
        aria-hidden
      />

      {/* ── Root layout ──────────────────────────────────────────── */}
      <div className="relative bg-[#0a0a0f] noise min-h-screen">
        <Navbar />

        <main id="main" role="main">
          <Suspense fallback={<Skeleton />}><Hero /></Suspense>
          <Suspense fallback={<Skeleton />}><Competitions /></Suspense>
          <Suspense fallback={<Skeleton />}><Journey /></Suspense>
          <Suspense fallback={<Skeleton />}><About /></Suspense>
          <Suspense fallback={<Skeleton />}><Categories /></Suspense>
          <Suspense fallback={<Skeleton />}><Disciplines /></Suspense>
          <Suspense fallback={<Skeleton />}><Advantages /></Suspense>
          <Suspense fallback={<Skeleton />}><Join /></Suspense>
          <Suspense fallback={<Skeleton />}><Sponsors /></Suspense>
        </main>

        <Suspense fallback={<div className="h-64 shimmer" />}><Footer /></Suspense>
      </div>

      {/* ── Floating back-to-top ──────────────────────────────────── */}
      <BackToTop />

      {/* ── Global Interactive Modal System ───────────────────────── */}
      <Modal
        isOpen={modal.type !== null}
        type={modal.type}
        data={modal.data}
        onClose={() => setModal({ type: null, data: null })}
        onSwitchType={(type, data) => setModal({ type, data })}
      />
    </>
  );
}

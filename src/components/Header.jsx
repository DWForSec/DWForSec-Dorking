import { motion } from 'framer-motion';
import { Shield, Crosshair, Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative py-12 md:py-20 px-4 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[120px] animate-pulse-glow" />
      </div>
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-neon-purple/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Logo icon cluster */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="relative">
            <Shield className="w-10 h-10 text-neon-blue" />
            <Crosshair className="w-5 h-5 text-neon-blue/60 absolute -top-1 -right-1" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4"
        >
          <span className="text-white">DWForSec</span>
          <span className="text-neon-blue glow-text">-Dorking</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-6 font-light"
        >
          Automated Google Dorking Workspace for Security Researchers
        </motion.p>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { icon: Crosshair, text: 'Offensive Recon' },
            { icon: Zap, text: 'One-Click Dorking' },
            { icon: Shield, text: 'Bug Bounty Ready' },
          ].map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider glass-card text-neon-blue/80"
            >
              <Icon className="w-3.5 h-3.5" />
              {text}
            </span>
          ))}
        </motion.div>

        {/* Safety warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-severity-medium/10 border border-severity-medium/20 text-severity-medium text-xs font-medium"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          Use only on assets you own or are authorized to test.
        </motion.div>
      </div>
    </header>
  );
}

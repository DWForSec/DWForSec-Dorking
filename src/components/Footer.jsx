import { motion } from 'framer-motion';
import { Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="mt-16 border-t border-glass-border"
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Shield className="w-4 h-4 text-neon-blue/50" />
            <span>
              Built by{' '}
              <span className="text-neon-blue font-semibold">DWForSec</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-600 text-xs">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-severity-critical fill-severity-critical" />
            <span>for the security community</span>
          </div>

          <div className="text-xs text-slate-600 font-mono">
            v1.0.0 • Offensive Recon Toolkit
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

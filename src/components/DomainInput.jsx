import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Globe, Search, X, CheckCircle } from 'lucide-react';
import { normalizeDomain, isValidDomain } from '../utils/normalizeDomain';

export default function DomainInput({ domain, onDomainChange, onGenerate, canGenerate }) {
  const [rawInput, setRawInput] = useState('');
  const [error, setError] = useState('');
  const [normalized, setNormalized] = useState('');

  const handleInputChange = useCallback((value) => {
    setRawInput(value);
    const norm = normalizeDomain(value);
    setNormalized(norm);

    if (!value.trim()) {
      setError('');
      onDomainChange('');
      return;
    }

    if (!isValidDomain(norm)) {
      setError('Invalid domain format. Example: example.com');
      onDomainChange('');
      return;
    }

    setError('');
    onDomainChange(norm);
  }, [onDomainChange]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && canGenerate) {
      onGenerate();
    }
  }, [canGenerate, onGenerate]);

  const clearInput = useCallback(() => {
    setRawInput('');
    setError('');
    setNormalized('');
    onDomainChange('');
  }, [onDomainChange]);

  const isValid = domain && isValidDomain(domain);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="max-w-3xl mx-auto px-4 mb-10"
    >
      <div className="glass-card rounded-2xl p-6 glow-blue">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
          <Globe className="w-4 h-4 text-neon-blue" />
          Target Domain
        </label>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            id="domain-input"
            type="text"
            value={rawInput}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="example.com"
            className="cyber-input w-full pl-12 pr-12 py-4 rounded-xl text-white text-lg font-mono placeholder:text-slate-600"
            autoComplete="off"
            spellCheck="false"
          />
          {rawInput && (
            <button
              onClick={clearInput}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              aria-label="Clear input"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Status row */}
        <div className="mt-3 flex items-center justify-between min-h-[24px]">
          {error && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-severity-critical flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              {error}
            </motion.p>
          )}
          {isValid && !error && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-green-400 flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Normalized: <code className="font-mono text-neon-blue">{domain}</code>
            </motion.p>
          )}
          {!error && !isValid && rawInput && (
            <p className="text-sm text-slate-500">Enter a valid domain...</p>
          )}
          {!rawInput && <div />}
        </div>
      </div>
    </motion.section>
  );
}

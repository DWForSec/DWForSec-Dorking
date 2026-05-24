import { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Copy, Check, Rocket, ExternalLink, AlertTriangle } from 'lucide-react';
import { buildGoogleUrl, resolveDork } from '../utils/buildGoogleUrl';

export default function QueryPreview({
  domain,
  categories,
  selectedIds,
  onGenerate,
  canGenerate,
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fallbackLinks, setFallbackLinks] = useState([]);
  const [showFallback, setShowFallback] = useState(false);

  const resolvedDorks = useMemo(() => {
    if (!domain) return [];
    return categories
      .filter((c) => selectedIds.has(c.id))
      .flatMap((c) =>
        c.dorks.map((dork) => ({
          categoryName: c.name,
          severity: c.severity,
          raw: dork,
          resolved: resolveDork(dork, domain),
          url: buildGoogleUrl(dork, domain),
        }))
      );
  }, [domain, categories, selectedIds]);

  const handleGenerate = useCallback(() => {
    if (!canGenerate || resolvedDorks.length === 0) return;

    let blockedCount = 0;
    const links = [];

    resolvedDorks.forEach((dork) => {
      const win = window.open(dork.url, '_blank', 'noopener,noreferrer');
      if (!win) {
        blockedCount++;
        links.push(dork);
      }
    });

    if (blockedCount > 0) {
      setFallbackLinks(links);
      setShowFallback(true);
    }

    if (onGenerate) onGenerate();
  }, [canGenerate, resolvedDorks, onGenerate]);

  const copyAllQueries = useCallback(async () => {
    const text = resolvedDorks.map((d) => d.resolved).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [resolvedDorks]);

  const isDisabled = !canGenerate || resolvedDorks.length === 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="max-w-6xl mx-auto px-4 mb-10"
    >
      {/* Action bar */}
      <div className="glass-card rounded-2xl p-6 glow-blue">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4">
          {/* Stats */}
          <div className="flex-1">
            <p className="text-sm text-slate-400">
              Ready to launch{' '}
              <span className="text-neon-blue font-bold text-lg">{resolvedDorks.length}</span>{' '}
              dork{resolvedDorks.length !== 1 ? 's' : ''} against{' '}
              {domain ? (
                <code className="text-neon-blue font-mono font-bold">{domain}</code>
              ) : (
                <span className="text-slate-500">—</span>
              )}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowPreview((v) => !v)}
              disabled={resolvedDorks.length === 0}
              className="btn-secondary px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 disabled:opacity-30"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? 'Hide' : 'Preview'}
            </button>

            <button
              onClick={copyAllQueries}
              disabled={resolvedDorks.length === 0}
              className="btn-secondary px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 disabled:opacity-30"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy All'}
            </button>

            <button
              onClick={handleGenerate}
              disabled={isDisabled}
              className="btn-primary px-6 py-2.5 rounded-xl text-sm flex items-center gap-2"
              id="generate-btn"
            >
              <Rocket className="w-4 h-4" />
              Generate Dorks
            </button>
          </div>
        </div>

        {/* Preview panel */}
        <AnimatePresence>
          {showPreview && resolvedDorks.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="code-preview bg-cyber-900/80 rounded-xl border border-glass-border p-4 max-h-80 overflow-y-auto">
                <div className="space-y-1">
                  {resolvedDorks.map((dork, idx) => (
                    <div key={idx} className="flex items-start gap-2 group">
                      <span className="text-slate-600 font-mono text-xs w-8 text-right flex-shrink-0 pt-0.5">
                        {String(idx + 1).padStart(3, '0')}
                      </span>
                      <code className="text-xs font-mono text-slate-300 break-all leading-relaxed group-hover:text-neon-blue transition-colors">
                        {dork.resolved}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fallback section when popups are blocked */}
        <AnimatePresence>
          {showFallback && fallbackLinks.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              <div className="bg-severity-medium/5 border border-severity-medium/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-severity-medium" />
                  <p className="text-sm font-semibold text-severity-medium">
                    Popup Blocked — Click links manually
                  </p>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Your browser blocked {fallbackLinks.length} popup(s). Click each link below to open in a new tab:
                </p>
                <div className="code-preview max-h-60 overflow-y-auto space-y-1.5">
                  {fallbackLinks.map((dork, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <ExternalLink className="w-3 h-3 text-neon-blue flex-shrink-0 mt-1" />
                      <a
                        href={dork.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fallback-link text-xs font-mono break-all"
                      >
                        {dork.resolved}
                      </a>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowFallback(false)}
                  className="mt-3 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

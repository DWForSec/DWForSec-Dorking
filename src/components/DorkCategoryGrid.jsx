import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Database,
  Archive,
  FileCode,
  Shield,
  FolderOpen,
  Webhook,
  GitBranch,
  ScrollText,
  Key,
  Cloud,
  FileText,
  Code,
  CheckSquare,
  XSquare,
} from 'lucide-react';

const iconMap = {
  AlertTriangle,
  Database,
  Archive,
  FileCode,
  Shield,
  FolderOpen,
  Webhook,
  GitBranch,
  ScrollText,
  Key,
  Cloud,
  FileText,
  Code,
};

const severityConfig = {
  critical: { badge: 'badge-critical', label: 'CRITICAL' },
  high: { badge: 'badge-high', label: 'HIGH' },
  medium: { badge: 'badge-medium', label: 'MEDIUM' },
  low: { badge: 'badge-low', label: 'LOW' },
};

function DorkCard({ category, isSelected, onToggle }) {
  const Icon = iconMap[category.icon] || AlertTriangle;
  const severity = severityConfig[category.severity] || severityConfig.medium;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`dork-card glass-card rounded-xl p-5 cursor-pointer select-none ${isSelected ? 'selected' : ''}`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          onClick={(e) => e.stopPropagation()}
          className="cyber-checkbox mt-0.5"
          aria-label={`Select ${category.name}`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Icon className="w-5 h-5 text-neon-blue flex-shrink-0" />
            <h3 className="text-sm font-bold text-white tracking-wide">{category.name}</h3>
            <span className={`${severity.badge} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}>
              {severity.label}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-2">{category.description}</p>
          <p className="text-[11px] text-slate-500 font-mono">
            {category.dorks.length} dork{category.dorks.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function DorkCategoryGrid({ categories, selectedIds, onToggle, onSelectAll, onClearAll }) {
  const totalDorks = useMemo(() => {
    return categories
      .filter((c) => selectedIds.has(c.id))
      .reduce((sum, c) => sum + c.dorks.length, 0);
  }, [categories, selectedIds]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="max-w-6xl mx-auto px-4 mb-10"
    >
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Dork Categories</h2>
          <p className="text-sm text-slate-400">
            <span className="text-neon-blue font-semibold">{selectedIds.size}</span> of {categories.length} selected
            {selectedIds.size > 0 && (
              <span className="text-slate-500 ml-2">
                · <span className="text-neon-blue font-semibold">{totalDorks}</span> total dorks
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSelectAll}
            className="btn-secondary px-4 py-2 rounded-lg text-xs flex items-center gap-1.5"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            Select All
          </button>
          <button
            onClick={onClearAll}
            className="btn-secondary px-4 py-2 rounded-lg text-xs flex items-center gap-1.5"
          >
            <XSquare className="w-3.5 h-3.5" />
            Clear All
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <DorkCard
            key={category.id}
            category={category}
            isSelected={selectedIds.has(category.id)}
            onToggle={() => onToggle(category.id)}
          />
        ))}
      </div>
    </motion.section>
  );
}

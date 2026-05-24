import { useState, useCallback } from 'react';
import Header from './components/Header';
import DomainInput from './components/DomainInput';
import DorkCategoryGrid from './components/DorkCategoryGrid';
import QueryPreview from './components/QueryPreview';
import Footer from './components/Footer';
import { dorkCategories } from './data/dorkCategories';

export default function App() {
  const [domain, setDomain] = useState('');
  const [selectedIds, setSelectedIds] = useState(new Set());

  const handleToggle = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedIds(new Set(dorkCategories.map((c) => c.id)));
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const canGenerate = domain && selectedIds.size > 0;

  return (
    <div className="min-h-screen bg-cyber-900 bg-grid-pattern scanline-effect relative">
      <Header />

      <main>
        <DomainInput
          domain={domain}
          onDomainChange={setDomain}
          onGenerate={() => {
            // Trigger generate via QueryPreview's button programmatically
            document.getElementById('generate-btn')?.click();
          }}
          canGenerate={canGenerate}
        />

        <DorkCategoryGrid
          categories={dorkCategories}
          selectedIds={selectedIds}
          onToggle={handleToggle}
          onSelectAll={handleSelectAll}
          onClearAll={handleClearAll}
        />

        <QueryPreview
          domain={domain}
          categories={dorkCategories}
          selectedIds={selectedIds}
          canGenerate={canGenerate}
        />
      </main>

      <Footer />
    </div>
  );
}

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import CodeBlock from '../../ui/CodeBlock';
import OverviewCard from '../overview/OverviewCard';

/** Onglets : "Tous" affiche les trois exemples l'un sous l'autre. `auto` : indique que le code suit l'édition en cours. */
const CodeExamples = ({ examples, auto = false }) => {
  const [tab, setTab] = useState('all');
  const tabs = [{ id: 'all', label: 'Tous' }, ...examples];
  const shown = tab === 'all' ? examples : examples.filter((e) => e.id === tab);

  return (
    <OverviewCard
      title="Exemples de code"
      action={
        auto ? (
          <span data-tone="accent" className="tone-badge inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium">
            <RefreshCw size={12} /> Généré automatiquement
          </span>
        ) : null
      }
      sectionClassName="flex min-h-0 flex-col"
      bodyClassName="flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      <div role="tablist" aria-label="Langage" className="mb-4 grid shrink-0 grid-cols-4 gap-1 border-none border-[var(--border)] bg-[var(--bg-elevated)] p-1">
        {tabs.map((t) => {
          const on = t.id === tab;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="code-panel"
              onClick={() => setTab(t.id)}
              className={`h-9 truncate px-2 text-sm font-medium transition-colors ${
                on ? 'bg-[var(--accent-tint)] text-[var(--accent)] shadow-[inset_0_0_0_1px_var(--accent)]' : 'text-[var(--text-soft)] hover:text-[var(--text)]'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div id="code-panel" role="tabpanel" className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-2">
        {shown.map((e) => <CodeBlock key={e.id} code={e.code} />)}
      </div>
    </OverviewCard>
  );
};

export default CodeExamples;

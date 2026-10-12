import { PROJECT_TABS } from '../../../constants/projects.js';

const ProjectTabs = ({ active, onChange }) => (
  <div role="tablist" aria-label="Sections du projet" className="flex gap-1 overflow-x-auto border-b border-[var(--border)]">
    {PROJECT_TABS.map((tab) => {
      const on = tab.id === active;
      return (
        <button
          key={tab.id}
          id={`tab-${tab.id}`}
          role="tab"
          type="button"
          aria-selected={on}
          aria-controls={`panel-${tab.id}`}
          onClick={() => onChange(tab.id)}
          className={`relative -mb-px shrink-0 px-5 py-3 text-sm font-medium transition-colors ${
            on ? 'text-[var(--accent)]' : 'text-[var(--text-soft)] hover:text-[var(--text)]'
          }`}
        >
          {tab.label}
          {on && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" />}
        </button>
      );
    })}
  </div>
);

export default ProjectTabs;

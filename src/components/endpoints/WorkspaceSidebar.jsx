import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookPlus, ChevronDown, PanelLeftOpen, Plus, Search } from 'lucide-react';
import GithubIcon from '../ui/GithubIcon';
import Dropdown from '../ui/Dropdown';
import SidebarTree from './SidebarTree';

/** Second sidebar de la page Saisie : création, projet, puis arbre sections > endpoints. */
const WorkspaceSidebar = ({ projects, total, online, getCategories, filters, onFilter, onCreate, canCreate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="lg:sticky lg:top-20 lg:h-[calc(100dvh-5rem)] lg:min-h-0 lg:self-start">
      <button type="button" onClick={() => setMobileOpen((o) => !o)} aria-expanded={mobileOpen} className="btn btn-outline mb-3 w-full justify-between lg:hidden">
        <span className="flex items-center gap-2"><PanelLeftOpen size={17} /> Espace endpoints</span>
        <ChevronDown size={16} className={mobileOpen ? 'rotate-180' : ''} />
      </button>

      <div className={`floating max-h-[calc(100dvh-8rem)] ${mobileOpen ? 'block' : 'hidden'} lg:block lg:h-full lg:max-h-none`}>
        <aside className="cut-frame flex h-full min-h-0 flex-col" aria-label="Espace endpoints">
          <div className="space-y-3 border-b border-[var(--border)] p-4">
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide">Espace endpoints</h2>
              <p className="text-xs text-[var(--text-muted)]">Gérez la documentation de l'API</p>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span data-tone={online ? 'accent' : 'admin'} className="flex items-center gap-2 text-[var(--text-soft)]">
                <GithubIcon size={15} />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--tone)]" /> {online ? 'GitHub synchronisé' : 'GitHub non connecté'}
              </span>
              <span className="text-[var(--text-soft)]">{total} endpoints</span>
            </div>
            <button type="button" onClick={() => { onCreate(); setMobileOpen(false); }} disabled={!canCreate} className="btn btn-primary w-full">
              <Plus size={17} /> Créer un endpoint
            </button>
            <Link to="/guides/new" onClick={() => setMobileOpen(false)} className="btn btn-outline w-full">
              <BookPlus size={17} /> Créer une guide
            </Link>
          </div>

          <div className="space-y-2 border-b border-[var(--border)] p-4">
            <p className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-[var(--text-soft)]">
              Projet <span className="font-normal normal-case text-[var(--text-muted)]">{projects.length} projet{projects.length > 1 ? 's' : ''}</span>
            </p>
            <Dropdown
              value={filters.project}
              onChange={(project) => onFilter({ project, section: 'all' })}
              options={[
                { value: 'all', label: 'Tous les projets' },
                ...projects.map((p) => ({ value: String(p.id), label: p.name })),
              ]}
              ariaLabel="Projet"
              icon={Search}
              triggerClassName="!h-10 !px-3 text-sm"
            />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-soft)]">Sections</p>
            <SidebarTree
              key={filters.project}
              projects={projects}
              getCategories={getCategories}
              filters={filters}
              onFilter={onFilter}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default WorkspaceSidebar;

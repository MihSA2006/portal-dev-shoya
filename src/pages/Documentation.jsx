import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CARD_TONES, RECENTLY_UPDATED, RECENTLY_VIEWED } from '../constants/documentation';
import { useProjects } from '../context/ProjectsContext';
import { summarize } from '../utils/documentation';
import DocsHeader from '../components/documentation/DocsHeader';
import DocProjectCard from '../components/documentation/DocProjectCard';
import RecentlyUpdated from '../components/documentation/RecentlyUpdated';
import RecentlyViewed from '../components/documentation/RecentlyViewed';

const Documentation = () => {
  const { projects } = useProjects();
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const stats = useMemo(() => summarize(projects), [projects]);

  const entries = useMemo(
    () => projects.map((project, i) => ({ project, tone: CARD_TONES[i % CARD_TONES.length] })),
    [projects]
  );

  const visibleProjects = entries.filter(({ project: p }) =>
    !q || [p.name, p.prefix, p.repo, p.tagline].some((v) => v.toLowerCase().includes(q))
  );

  // Associe chaque événement à son projet (les projets supprimés sont ignorés).
  const resolve = (list) => {
    const byId = new Map(entries.map((e) => [e.project.id, e]));
    return list
      .filter((item) => byId.has(item.projectId))
      .map((item) => ({ ...item, ...byId.get(item.projectId) }))
      .filter((r) => !q || [r.path, r.method, r.project.name].some((v) => v.toLowerCase().includes(q)));
  };

  return (
    <div className="space-y-6">
      <DocsHeader stats={stats} query={query} onQuery={setQuery} />

      {projects.length === 0 ? (
        <p className="border border-dashed border-[var(--border-strong)] py-14 text-center text-sm text-[var(--text-muted)]">
          Aucun projet pour le moment.{' '}
          <Link to="/administration/projects" className="text-[var(--accent)] underline">Créer un projet</Link>
        </p>
      ) : (
        <section aria-label="Projets" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map(({ project, tone }) => <DocProjectCard key={project.id} project={project} tone={tone} />)}
          {visibleProjects.length === 0 && (
            <p className="col-span-full py-8 text-center text-sm text-[var(--text-muted)]">Aucun projet ne correspond à « {query} ».</p>
          )}
        </section>
      )}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <RecentlyUpdated rows={resolve(RECENTLY_UPDATED)} />
        <RecentlyViewed rows={resolve(RECENTLY_VIEWED)} />
      </div>
    </div>
  );
};

export default Documentation;

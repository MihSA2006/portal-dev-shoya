import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEndpoints } from '../context/endpointsContext';
import { useProjects } from '../context/ProjectsContext';
import { isConnected } from '../utils/documentation';
import { slugify } from '../utils/endpointLinks';
import {
  INITIAL_FILTERS, buildRegistry, computeStats, filterRows, sortRows,
} from '../utils/endpointRegistry';
import EndpointCardGrid from '../components/endpoints/EndpointCardGrid';
import EndpointFilters from '../components/endpoints/EndpointFilters';
import EndpointPagination from '../components/endpoints/EndpointPagination';
import EndpointStats from '../components/endpoints/EndpointStats';
import EndpointTable from '../components/endpoints/EndpointTable';
import EndpointsHeader from '../components/endpoints/EndpointsHeader';
import EndpointsToolbar from '../components/endpoints/EndpointsToolbar';
import QuickChips from '../components/endpoints/QuickChips';
import WorkspaceSidebar from '../components/endpoints/WorkspaceSidebar';
import { ActivityEntrySkeleton } from '../components/ui/LoadingSkeleton';
import useInitialSkeleton from '../hooks/useInitialSkeleton';

const FILTER_PARAMS = ['q', 'project', 'method', 'status', 'section', 'version', 'owner', 'doc', 'recent'];

const readFilters = (params, projects) => {
  const requestedProject = params.get('project');
  const project = projects.find((item) =>
    String(item.id) === requestedProject
    || item.name.toLocaleLowerCase() === requestedProject?.toLocaleLowerCase()
    || slugify(item.name) === requestedProject?.toLocaleLowerCase()
  );

  return {
    ...INITIAL_FILTERS,
    query: params.get('q') ?? '',
    project: project ? String(project.id) : 'all',
    method: params.get('method') ?? 'all',
    status: params.get('status') ?? 'all',
    section: params.get('section') ?? 'all',
    version: params.get('version') ?? 'all',
    owner: params.get('owner') ?? 'all',
    doc: params.get('doc') ?? 'all',
    recent: params.get('recent') === 'true',
  };
};

const writeFilters = (params, filters, projects) => {
  const next = new URLSearchParams(params);
  FILTER_PARAMS.forEach((key) => next.delete(key));

  if (filters.query) next.set('q', filters.query);
  if (filters.project !== 'all') {
    const project = projects.find((item) => String(item.id) === filters.project);
    if (project) next.set('project', slugify(project.name));
  }
  ['method', 'status', 'section', 'version', 'owner', 'doc'].forEach((key) => {
    if (filters[key] !== INITIAL_FILTERS[key]) next.set(key, filters[key]);
  });
  if (filters.recent) next.set('recent', 'true');

  return next;
};

/** Saisie : espace endpoints (sidebar du workspace + liste globale de tous les endpoints). */
const ActivityEntry = () => {
  const loading = useInitialSkeleton();
  const { projects } = useProjects();
  const { getCategories } = useEndpoints();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => readFilters(searchParams, projects), [searchParams, projects]);
  const [view, setView] = useState('list');
  const [density, setDensity] = useState('compact');
  const [sort, setSort] = useState('updated');
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(1);

  const rows = useMemo(() => buildRegistry(projects, getCategories), [projects, getCategories]);
  const stats = useMemo(() => computeStats(rows), [rows]);
  const filtered = useMemo(() => sortRows(filterRows(rows, filters), sort), [rows, filters, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * pageSize, current * pageSize);

  const online = projects.some(isConnected);
  const canClear = JSON.stringify(filters) !== JSON.stringify(INITIAL_FILTERS);

  if (loading) return <ActivityEntrySkeleton />;

  // Toute modification de filtre ramène à la première page.
  const patchFilters = (patch) => {
    setSearchParams((params) => writeFilters(params, { ...readFilters(params, projects), ...patch }, projects));
    setPage(1);
  };
  const clearFilters = () => {
    setSearchParams((params) => writeFilters(params, INITIAL_FILTERS, projects));
    setPage(1);
  };

  const create = () => navigate('/endpoints/new', {
    state: { projectId: filters.project === 'all' ? undefined : filters.project },
  });

  return (
    <div className="page-content-enter grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      <WorkspaceSidebar
        projects={projects}
        total={rows.length}
        online={online}
        getCategories={getCategories}
        filters={filters}
        onFilter={patchFilters}
        onCreate={create}
        canCreate={projects.length > 0}
      />

      <div className="min-w-0 space-y-5">
        <EndpointsHeader online={online} onCreate={create} canCreate={projects.length > 0} />
        <EndpointStats stats={stats} />

        <EndpointsToolbar
          query={filters.query}
          onQuery={(query) => patchFilters({ query })}
          view={view}
          onView={setView}
          density={density}
          onDensity={setDensity}
          sort={sort}
          onSort={setSort}
        />
        <EndpointFilters filters={filters} onChange={patchFilters} rows={rows} projects={projects} canClear={canClear} onClear={clearFilters} />
        <QuickChips count={filtered.length} filters={filters} onChange={patchFilters} />

        <div className="floating">
          <section className="cut-frame" aria-label="Liste des endpoints">
            {visible.length === 0 ? (
              <p className="px-5 py-14 text-center text-sm text-[var(--text-muted)]">
                {rows.length === 0 ? 'Aucun endpoint pour le moment.' : 'Aucun endpoint ne correspond à vos filtres.'}
              </p>
            ) : view === 'list' ? (
              <EndpointTable rows={visible} density={density} />
            ) : (
              <EndpointCardGrid rows={visible} />
            )}
            <EndpointPagination
              total={filtered.length}
              page={current}
              pages={pages}
              pageSize={pageSize}
              onPage={setPage}
              onPageSize={(size) => { setPageSize(size); setPage(1); }}
            />
          </section>
        </div>
      </div>

    </div>
  );
};

export default ActivityEntry;

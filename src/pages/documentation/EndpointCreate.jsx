import { useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronDown, Plus } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { currentVersion, getEndpointSlug } from '../../utils/documentation';
import { getBaseUrl } from '../../utils/overview';
import { endpointPath, slugify } from '../../utils/endpointLinks';
import { getEndpointDetails } from '../../utils/endpointDetails';
import { fromDraft, toDraft, validateDraft } from '../../utils/endpointDraft';
import { saveEndpointEdit } from '../../utils/endpointEdits';
import { buildEndpointExamples } from '../../utils/bodyExamples';
import { useEndpoints } from '../../context/endpointsContext';
import { useProjects } from '../../context/ProjectsContext';
import { useTasksContext } from '../../context/TasksContext';
import Dropdown from '../../components/ui/Dropdown';
import Popover from '../../components/ui/Popover';
import EndpointEditor from '../../components/documentation/endpoint/edit/EndpointEditor';
import EditCard from '../../components/documentation/endpoint/edit/EditCard';
import FloatingSaveBar from '../../components/documentation/endpoint/edit/FloatingSaveBar';
import CodeExamples from '../../components/documentation/endpoint/CodeExamples';

const createDraft = (project, categoryName = 'Nouvelle catégorie') => {
  if (!project) return null;
  const category = { id: slugify(categoryName) || 'endpoints', name: categoryName };
  const endpoint = {
    id: 'new-endpoint',
    name: '',
    method: 'GET',
    path: '/',
    status: 'active',
    version: currentVersion(project),
    category,
  };
  return toDraft(endpoint, getEndpointDetails(project, endpoint));
};

const CategoryCombobox = ({ categories, value, onChange }) => (
  <Popover
    align="left"
    width="w-full min-w-[12rem]"
    className="w-full"
    trigger={({ open, toggle }) => {
      const normalizedValue = value.trim().toLocaleLowerCase();

      return (
        <div className={`cut-frame cut-sm flex h-11 w-full items-center gap-2 px-4 text-sm text-[var(--text-soft)] transition-colors ${
          open ? '[--frame-border:var(--accent)] text-[var(--text)]' : ''
        }`}>
          <input
            id="create-endpoint-category"
            role="combobox"
            aria-label="Catégorie de l'endpoint"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls="create-endpoint-category-options"
            value={value}
            onFocus={() => { if (!open) toggle(); }}
            onChange={(event) => {
              onChange(event.target.value);
              if (!open) toggle();
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && open) {
                event.preventDefault();
                const exactMatch = categories.find((category) => category.name.toLocaleLowerCase() === normalizedValue);
                if (exactMatch) onChange(exactMatch.name);
                toggle();
              }
            }}
            placeholder="Sélectionner ou saisir une catégorie"
            autoComplete="off"
            className="min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-sm text-[var(--text)] shadow-none outline-none ring-0 placeholder:text-[var(--text-muted)] focus:border-0 focus:shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none"
          />
          <button
            type="button"
            onClick={toggle}
            aria-label={open ? 'Fermer les catégories' : 'Afficher les catégories'}
            aria-expanded={open}
            className="shrink-0 text-[var(--text-muted)]"
          >
            <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
      );
    }}
  >
    {({ close }) => {
      const normalizedValue = value.trim().toLocaleLowerCase();
      const filteredCategories = categories.filter((category) =>
        !normalizedValue || category.name.toLocaleLowerCase().includes(normalizedValue)
      );
      const hasExactMatch = categories.some((category) => category.name.toLocaleLowerCase() === normalizedValue);

      return (
        <ul id="create-endpoint-category-options" role="listbox" className="max-h-64 overflow-y-auto py-1">
          {filteredCategories.map((category) => {
            const selected = category.name === value;
            return (
              <li key={category.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => { onChange(category.name); close(); }}
                  className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[var(--surface-2)] ${
                    selected ? 'text-[var(--accent)]' : 'text-[var(--text-soft)] hover:text-[var(--text)]'
                  }`}
                >
                  <span className="flex-1 truncate">{category.name}</span>
                  {selected && <Check size={15} className="shrink-0" />}
                </button>
              </li>
            );
          })}
          {value.trim() && !hasExactMatch && (
            <li>
              <button
                type="button"
                role="option"
                aria-selected="false"
                onClick={() => { onChange(value.trim()); close(); }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[var(--accent)] transition-colors hover:bg-[var(--surface-2)]"
              >
                <Plus size={15} className="shrink-0" />
                <span className="truncate">Créer « {value.trim()} »</span>
              </button>
            </li>
          )}
          {filteredCategories.length === 0 && !value.trim() && (
            <li className="px-4 py-2.5 text-sm text-[var(--text-muted)]">Aucune catégorie. Saisissez un nom pour en créer une.</li>
          )}
        </ul>
      );
    }}
  </Popover>
);

const EndpointCreate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { getCategories, addEndpoint } = useEndpoints();
  const { tasks, linkEndpoint } = useTasksContext();
  const initialProject = projects.find((p) => String(p.id) === String(location.state?.projectId)) ?? projects[0];
  const initialCategories = initialProject ? getCategories(initialProject.id) : [];
  const initialCategoryName = initialCategories[0]?.name ?? '';

  const [projectId, setProjectId] = useState(String(initialProject?.id ?? ''));
  const [draft, setDraft] = useState(() => createDraft(initialProject, initialCategoryName || 'Nouvelle catégorie'));
  const [section, setSection] = useState(initialCategoryName);
  const [taskId, setTaskId] = useState('');
  const [bodyFormat, setBodyFormat] = useState('json');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const project = projects.find((p) => String(p.id) === projectId);
  const categories = project ? getCategories(project.id) : [];
  const issues = useMemo(() => (draft ? validateDraft(draft) : {}), [draft]);
  const errorCount = Object.keys(issues).length + (formError ? 1 : 0);
  const previewEnv = project
    ? ['production', 'staging', 'local'].find((environment) => project.environments[environment]) ?? 'production'
    : 'production';
  const baseUrl = project ? getBaseUrl(project, previewEnv) : '';
  const preview = draft ? fromDraft(draft) : null;
  const previewEndpoint = preview
    ? { ...preview.endpoint, category: { id: slugify(section) || 'endpoints', name: section } }
    : null;
  const examples = baseUrl && preview
    ? buildEndpointExamples({
      endpoint: previewEndpoint,
      details: preview.details,
      url: `${baseUrl}${draft.path}`,
      format: draft.hasBody ? bodyFormat : 'json',
    })
    : [];

  const changeProject = (value) => {
    const nextProject = projects.find((p) => String(p.id) === value);
    const nextCategory = getCategories(nextProject?.id)[0]?.name ?? '';
    setProjectId(value);
    setDraft(createDraft(nextProject, nextCategory || 'Nouvelle catégorie'));
    setSection(nextCategory);
    setFormError('');
  };

  const updateDraft = (patch) => {
    setDraft((current) => ({ ...current, ...patch }));
    setFormError('');
  };

  const cancel = () => navigate('/activity-entry');

  const save = () => {
    setSubmitted(true);
    if (Object.keys(issues).length > 0) {
      setTimeout(() => {
        const invalid = document.querySelector('[aria-invalid="true"]');
        invalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        invalid?.focus({ preventScroll: true });
      }, 50);
      return;
    }
    if (!project) {
      setFormError('Choisissez un projet.');
      return;
    }
    if (!section) {
      setFormError('Choisissez ou saisissez une catégorie.');
      return;
    }

    const savedDraft = fromDraft(draft);
    const categoriesForProject = getCategories(project.id);
    const duplicatePath = categoriesForProject.some((category) =>
      category.endpoints.some((endpoint) => endpoint.method === draft.method && endpoint.path === draft.path.trim())
    );
    const duplicateName = categoriesForProject.some((category) =>
      category.endpoints.some((endpoint) => getEndpointSlug(endpoint) === slugify(draft.name))
    );
    if (duplicatePath) {
      setFormError('Un endpoint avec cette méthode et ce chemin existe déjà dans ce projet.');
      return;
    }
    if (duplicateName) {
      setFormError('Un endpoint avec ce nom existe déjà dans ce projet.');
      return;
    }

    const created = addEndpoint({ project, section, ...savedDraft.endpoint });
    const defaults = getEndpointDetails(project, { ...created.endpoint, category: created.category });
    const linkedTask = tasks.find((task) => task.id === taskId);
    saveEndpointEdit(project.id, getEndpointSlug(created.endpoint), {
      ...savedDraft,
      details: {
        ...savedDraft.details,
        meta: { ...defaults.meta, task: linkedTask?.key ?? null },
      },
    });
    if (linkedTask) linkEndpoint(linkedTask.id, created.endpoint);
    navigate(endpointPath(project, created.endpoint), { replace: true });
  };

  if (!project || !draft) {
    return (
      <div className="space-y-3">
        <h1 className="font-display text-3xl font-semibold">Création d'un endpoint</h1>
        <p className="text-sm text-[var(--text-muted)]">Créez d'abord un projet pour lui associer un endpoint.</p>
        <Link to="/activity-entry" className="text-sm text-[var(--accent)] hover:underline">Retour à la saisie</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-5">
      <Link to="/activity-entry" className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline">
        <ArrowLeft size={17} /> Retour à tous les endpoints
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Créer un endpoint</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">Renseignez les informations et la documentation de l'endpoint.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={cancel} className="btn btn-outline">Annuler</button>
          <button type="button" onClick={save} className="btn btn-primary"><Check size={17} /> Créer l'endpoint</button>
        </div>
      </header>

      <div className="ep-layout items-start">
        <div className="min-w-0 space-y-5">
          <EditCard title="Association" icon={Plus}>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm text-[var(--text-soft)]" htmlFor="create-endpoint-project">Projet</label>
                <Dropdown
                  id="create-endpoint-project"
                  value={projectId}
                  onChange={changeProject}
                  options={projects.map((item) => ({ value: String(item.id), label: item.name }))}
                  ariaLabel="Projet associé"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[var(--text-soft)]" htmlFor="create-endpoint-category">Catégorie</label>
                <CategoryCombobox
                  categories={categories}
                  value={section}
                  onChange={(value) => { setSection(value); setFormError(''); }}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[var(--text-soft)]" htmlFor="create-endpoint-task">Tâche liée</label>
                <Dropdown
                  id="create-endpoint-task"
                  value={taskId}
                  onChange={setTaskId}
                  options={[
                    { value: '', label: 'Aucune tâche' },
                    ...tasks.map((task) => ({ value: task.id, label: `${task.key} · ${task.title}` })),
                  ]}
                  ariaLabel="Tâche liée à l'endpoint"
                />
              </div>
            </div>
            {formError && <p role="alert" className="mt-3 text-sm text-[var(--danger)]">{formError}</p>}
          </EditCard>

          <EndpointEditor
            draft={draft}
            onChange={updateDraft}
            issues={issues}
            showIssues={submitted}
            baseUrl={baseUrl}
            bodyFormat={bodyFormat}
            onBodyFormat={setBodyFormat}
          />
        </div>

        <aside className="ep-sticky">
          {examples.length > 0 ? (
            <CodeExamples
              key={`${projectId}-${bodyFormat}`}
              examples={examples}
              auto
            />
          ) : (
            <p className="border border-dashed border-[var(--border-strong)] p-8 text-center text-sm text-[var(--text-muted)]">
              Aucune URL d'environnement n'est configurée pour ce projet.
            </p>
          )}
        </aside>
      </div>

      <FloatingSaveBar dirty errorCount={errorCount} onCancel={cancel} onSave={save} />
    </div>
  );
};

export default EndpointCreate;

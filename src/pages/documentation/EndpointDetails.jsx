import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findEndpointBySlug } from '../../utils/endpoints';
import { getEndpointDetails } from '../../utils/endpointDetails';
import { getBaseUrl } from '../../utils/overview';
import { getEndpointSlug, getProjectSlug } from '../../utils/documentation';
import { buildEndpointExamples } from '../../utils/bodyExamples';
import {
  applyEdit, draftToView, fromDraft, isDraftDirty, toDraft, validateDraft,
} from '../../utils/endpointDraft';
import useEndpointEdit from '../../hooks/useEndpointEdit';
import useInView from '../../hooks/useInView';
import ConfirmModal from '../../components/ui/ConfirmModal';
import MarkdownText from '../../components/ui/MarkdownText';
import AuthInfo from '../../components/documentation/endpoint/AuthInfo';
import CodeExamples from '../../components/documentation/endpoint/CodeExamples';
import EndpointFooter from '../../components/documentation/endpoint/EndpointFooter';
import EndpointHeader from '../../components/documentation/endpoint/EndpointHeader';
import EndpointRoute from '../../components/documentation/endpoint/EndpointRoute';
import ErrorsCard from '../../components/documentation/endpoint/ErrorsCard';
import HeadersTable from '../../components/documentation/endpoint/HeadersTable';
import RequestBodyCard from '../../components/documentation/endpoint/RequestBodyCard';
import ResponseCard from '../../components/documentation/endpoint/ResponseCard';
import EndpointEditor from '../../components/documentation/endpoint/edit/EndpointEditor';
import FloatingSaveBar from '../../components/documentation/endpoint/edit/FloatingSaveBar';

/** Détail d'un endpoint (consultation + édition) : même page pour tous les projets. Utiliser key={project.id} pour réinitialiser l'environnement. */
const EndpointDetails = ({ project, categories }) => {
  const { endpointSlug } = useParams();
  // Environnement choisi : production par défaut, sinon le premier dont l'URL est renseignée.
  const [env, setEnv] = useState(() => ['production', 'staging', 'local'].find((k) => project.environments[k]) ?? 'production');

  // key : l'état d'édition est réinitialisé quand on change d'endpoint
  return (
    <EndpointDetailsView
      key={endpointSlug}
      project={project}
      categories={categories}
      slug={endpointSlug}
      env={env}
      onEnv={setEnv}
    />
  );
};

function EndpointDetailsView({ project, categories, slug, env, onEnv }) {
  const baseEndpoint = findEndpointBySlug(categories, slug);
  const baseDetails = useMemo(
    () => (baseEndpoint ? getEndpointDetails(project, baseEndpoint) : null),
    [project, baseEndpoint]
  );
  const { edit, save, reset } = useEndpointEdit(project.id, slug);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [initial, setInitial] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [bodyFormat, setBodyFormat] = useState('json');
  const [confirm, setConfirm] = useState(null); // 'discard' | 'restore'
  const [savedFlash, setSavedFlash] = useState(false);

  const headerRef = useRef(null);
  const headerVisible = useInView(headerRef);

  // Version enregistrée (données d'origine + modifications)
  const saved = useMemo(
    () => (baseEndpoint && baseDetails ? applyEdit(baseEndpoint, baseDetails, edit) : null),
    [baseEndpoint, baseDetails, edit]
  );
  // Aperçu en direct pendant l'édition
  const live = useMemo(
    () => (editing && draft && baseEndpoint ? draftToView(draft, baseEndpoint, baseDetails) : null),
    [editing, draft, baseEndpoint, baseDetails]
  );
  const issues = useMemo(() => (editing && draft ? validateDraft(draft) : {}), [editing, draft]);
  const issueCount = Object.keys(issues).length;
  const dirty = editing && draft && initial ? isDraftDirty(draft, initial) : false;

  useEffect(() => {
    if (!savedFlash) return undefined;
    const timer = setTimeout(() => setSavedFlash(false), 2500);
    return () => clearTimeout(timer);
  }, [savedFlash]);

  if (!baseEndpoint) {
    return (
      <div className="space-y-3">
        <h1 className="font-display text-3xl font-semibold">Endpoint introuvable</h1>
        <Link to={`/documentation/${getProjectSlug(project)}`} className="text-sm text-[var(--accent)] underline">
          Retour à la vue d'ensemble
        </Link>
      </div>
    );
  }

  const { endpoint, details } = live ?? saved;
  const base = getBaseUrl(project, env);
  const url = base ? `${base}${endpoint.path}` : '';
  const hasBody = !!details.body;
  const format = hasBody ? bodyFormat : 'json';
  const examples = url ? buildEndpointExamples({ endpoint, details, url, format }) : [];

  /* ───── Actions d'édition ───── */
  const startEdit = () => {
    const next = toDraft(saved.endpoint, saved.details);
    setInitial(next);
    setDraft(next);
    setSubmitted(false);
    setEditing(true);
  };
  const updateDraft = (patch) => setDraft((d) => ({ ...d, ...patch }));
  const closeEditor = () => {
    setEditing(false);
    setDraft(null);
    setInitial(null);
    setSubmitted(false);
  };
  const requestCancel = () => (dirty ? setConfirm('discard') : closeEditor());

  const handleSave = () => {
    if (issueCount > 0) {
      setSubmitted(true);
      // Fait défiler jusqu'au premier champ invalide
      setTimeout(() => {
        const el = document.querySelector('[aria-invalid="true"]');
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el?.focus({ preventScroll: true });
      }, 50);
      return;
    }
    save(fromDraft(draft));
    closeEditor();
    setSavedFlash(true);
  };

  return (
    <div className="space-y-5">
      <div className="ep-layout items-start">
        <div className="min-w-0 space-y-5">
          <div ref={headerRef}>
            <EndpointHeader
              project={project}
              endpoint={endpoint}
              env={env}
              onEnv={onEnv}
              editing={editing}
              dirty={dirty}
              saved={savedFlash}
              hasOverride={!!edit}
              onEdit={startEdit}
              onCancel={requestCancel}
              onSave={handleSave}
              onRestore={() => setConfirm('restore')}
            />
          </div>

          {editing ? (
            <EndpointEditor
              draft={draft}
              onChange={updateDraft}
              issues={issues}
              showIssues={submitted}
              baseUrl={base}
              bodyFormat={bodyFormat}
              onBodyFormat={setBodyFormat}
            />
          ) : (
            <div className="space-y-5">
              <EndpointRoute method={endpoint.method} path={endpoint.path} url={url} />

              {details.description ? (
                <MarkdownText text={details.description} className="text-sm text-[var(--text-soft)]" />
              ) : (
                <p className="text-sm italic text-[var(--text-muted)]">Description à rédiger pour cet endpoint.</p>
              )}

              <AuthInfo auth={details.auth} permission={details.permission} />
              <HeadersTable headers={details.headers} />
              {details.body && <RequestBodyCard body={details.body} format={bodyFormat} onFormat={setBodyFormat} />}

              <div className="ep-cols">
                <ResponseCard response={details.response} notes={details.notes} />
                <ErrorsCard errors={details.errors} />
              </div>
            </div>
          )}
        </div>

        <aside className="ep-sticky">
          {examples.length > 0 ? (
            <CodeExamples
              key={`${getEndpointSlug(baseEndpoint)}-${env}-${format}`}
              examples={examples}
              auto={editing}
            />
          ) : (
            <p className="border border-dashed border-[var(--border-strong)] p-8 text-center text-sm text-[var(--text-muted)]">
              Renseignez l'URL de cet environnement pour générer des exemples de code.
            </p>
          )}
        </aside>
      </div>

      <div>
        <EndpointFooter project={project} meta={details.meta} />
      </div>

      {editing && !headerVisible && (
        <FloatingSaveBar dirty={dirty} errorCount={submitted ? issueCount : 0} onCancel={requestCancel} onSave={handleSave} />
      )}

      {confirm === 'discard' && (
        <ConfirmModal
          title="Abandonner les modifications ?"
          description="Les changements non enregistrés seront perdus."
          confirmLabel="Abandonner"
          cancelLabel="Continuer l'édition"
          danger
          onConfirm={() => { setConfirm(null); closeEditor(); }}
          onClose={() => setConfirm(null)}
        />
      )}
      {confirm === 'restore' && (
        <ConfirmModal
          title="Restaurer la version d'origine ?"
          description="Vos modifications enregistrées pour cet endpoint seront supprimées."
          confirmLabel="Restaurer"
          danger
          onConfirm={() => { setConfirm(null); reset(); }}
          onClose={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

export default EndpointDetails;

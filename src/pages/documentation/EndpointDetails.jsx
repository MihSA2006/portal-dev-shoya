import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findEndpointBySlug } from '../../utils/endpoints';
import { getEndpointDetails } from '../../utils/endpointDetails';
import { buildExamples } from '../../utils/codeExamples';
import { getBaseUrl } from '../../utils/overview';
import { getEndpointSlug, getProjectSlug } from '../../utils/documentation';
import AuthInfo from '../../components/documentation/endpoint/AuthInfo';
import CodeExamples from '../../components/documentation/endpoint/CodeExamples';
import EndpointFooter from '../../components/documentation/endpoint/EndpointFooter';
import EndpointHeader from '../../components/documentation/endpoint/EndpointHeader';
import EndpointRoute from '../../components/documentation/endpoint/EndpointRoute';
import ErrorsCard from '../../components/documentation/endpoint/ErrorsCard';
import HeadersTable from '../../components/documentation/endpoint/HeadersTable';
import RequestBodyCard from '../../components/documentation/endpoint/RequestBodyCard';
import ResponseCard from '../../components/documentation/endpoint/ResponseCard';

/** Détail d'un endpoint : même page pour tous les projets. Utiliser key={project.id} pour réinitialiser l'environnement. */
const EndpointDetails = ({ project, categories }) => {
  const { endpointSlug } = useParams();
  // Environnement choisi : production par défaut, sinon le premier dont l'URL est renseignée.
  const [env, setEnv] = useState(() => ['production', 'staging', 'local'].find((k) => project.environments[k]) ?? 'production');

  const endpoint = findEndpointBySlug(categories, endpointSlug);

  if (!endpoint) {
    return (
      <div className="space-y-3">
        <h1 className="font-display text-3xl font-semibold">Endpoint introuvable</h1>
        <Link to={`/documentation/${getProjectSlug(project)}`} className="text-sm text-[var(--accent)] underline">
          Retour à la vue d'ensemble
        </Link>
      </div>
    );
  }

  const details = getEndpointDetails(project, endpoint);
  const base = getBaseUrl(project, env);
  const url = base ? `${base}${endpoint.path}` : '';
  const examples = url
    ? buildExamples({
        title: endpoint.name,
        method: endpoint.method,
        url,
        headers: details.headers,
        body: details.body?.example ?? null,
        status: details.response.status,
      })
    : [];

  return (
    <div className="space-y-5">
      <div className="ep-layout items-start">
        <div className="min-w-0 space-y-5">
          <EndpointHeader project={project} endpoint={endpoint} env={env} onEnv={setEnv} />

          <div className="space-y-5">
            <EndpointRoute method={endpoint.method} path={endpoint.path} url={url} />

            <p className={`text-sm ${details.description ? 'text-[var(--text-soft)]' : 'italic text-[var(--text-muted)]'}`}>
              {details.description ?? 'Description à rédiger pour cet endpoint.'}
            </p>

            <AuthInfo auth={details.auth} permission={details.permission} />
            <HeadersTable headers={details.headers} />
            {details.body && <RequestBodyCard body={details.body} />}

            <div className="ep-cols">
              <ResponseCard response={details.response} notes={details.notes} />
              <ErrorsCard errors={details.errors} />
            </div>
          </div>
        </div>

        <aside className="ep-sticky">
          {examples.length > 0 ? (
            <CodeExamples key={`${getEndpointSlug(endpoint)}-${env}`} examples={examples} />
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
    </div>
  );
};

export default EndpointDetails;

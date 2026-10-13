import { useState } from 'react';
import { ENVIRONMENTS } from '../../constants/projects';
import { envHealth, getBaseUrl, getOverview, overallStatus, resolveQuickStart } from '../../utils/overview';
import ApiHealthCard from '../../components/documentation/overview/ApiHealthCard';
import DocHealthCard from '../../components/documentation/overview/DocHealthCard';
import LatestChangesCard from '../../components/documentation/overview/LatestChangesCard';
import OverviewFooter from '../../components/documentation/overview/OverviewFooter';
import OverviewHero from '../../components/documentation/overview/OverviewHero';
import ProjectInfoCard from '../../components/documentation/overview/ProjectInfoCard';
import QuickStartCard from '../../components/documentation/overview/QuickStartCard';
import RequestOverviewCard from '../../components/documentation/overview/RequestOverviewCard';

/** Vue d'ensemble : même page pour tous les projets. Utiliser key={project.id} pour réinitialiser l'état. */
const ProjectOverview = ({ project, categories }) => {
  const overview = getOverview(project.id);

  // Environnement affiché : staging par défaut, sinon le premier dont l'URL est renseignée.
  const [env, setEnv] = useState(() => ['staging', 'production', 'local'].find((k) => project.environments[k]) ?? 'staging');

  const baseUrl = getBaseUrl(project, env);
  const quickStart = resolveQuickStart(overview, categories);
  const status = overallStatus(ENVIRONMENTS.map(({ key }) => envHealth(project, overview, key).status));

  return (
    <div className="space-y-5">
      <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-5">
          <OverviewHero project={project} env={env} onEnv={setEnv} baseUrl={baseUrl} deployMinutes={overview.deployMinutes} />

          <div className="grid gap-5 2xl:grid-cols-[1.3fr_1fr]">
            <QuickStartCard baseUrl={baseUrl} quickStart={quickStart} />
            <ApiHealthCard project={project} overview={overview} env={env} onEnv={setEnv} />
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <DocHealthCard project={project} overview={overview} />
            <LatestChangesCard changes={overview.changes} />
          </div>
        </div>

        <div className="grid content-start gap-5 md:grid-cols-2 2xl:grid-cols-1">
          <ProjectInfoCard project={project} overview={overview} />
          <RequestOverviewCard projectId={project.id} requests={overview.requests} />
        </div>
      </div>

      <OverviewFooter project={project} status={status} />
    </div>
  );
};

export default ProjectOverview;

import { useMemo, useState } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardFilters from '../components/dashboard/DashboardFilters';
import StatCard from '../components/dashboard/StatCard';
import ProjectsOverviewCard from '../components/dashboard/ProjectsOverviewCard';
import CycleProgressChart from '../components/dashboard/CycleProgressChart';
import DocumentationHealthCard from '../components/dashboard/DocumentationHealthCard';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import OpenAlertsCard from '../components/dashboard/OpenAlertsCard';
import ApiStatusCard from '../components/dashboard/ApiStatusCard';
import { DashboardSkeleton } from '../components/ui/LoadingSkeleton';
import { CYCLE, PROJECTS } from '../constants/dashboard';
import { buildDashboardView } from '../utils/dashboard';
import useInitialSkeleton from '../hooks/useInitialSkeleton';

const Dashboard = () => {
  const loading = useInitialSkeleton();
  const [projectId, setProjectId] = useState('');
  const view = useMemo(() => buildDashboardView(projectId), [projectId]);
  const scope = PROJECTS.find((p) => p.id === projectId)?.name;

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="page-content-enter space-y-5">
      <DashboardHeader cycle={CYCLE} />

      <DashboardFilters projects={PROJECTS} value={projectId} onChange={setProjectId} />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 2xl:grid-cols-6">
        {view.kpis.map((k, i) => (
          <StatCard key={k.id} index={i} icon={k.icon} label={k.label} value={k.value} suffix={k.suffix} trend={k.trend} to={k.to} />
        ))}
      </div>

      <div className="grid gap-5 2xl:grid-cols-[1.15fr_1fr]">
        <ProjectsOverviewCard projects={PROJECTS} selectedId={projectId} onSelect={setProjectId} />
        <CycleProgressChart weeks={view.progress} currentWeek={CYCLE.week} scope={scope} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-4">
        <DocumentationHealthCard health={view.health} projects={PROJECTS} selectedId={projectId} onSelect={setProjectId} scope={scope} />
        <RecentActivityCard items={view.activity} scope={scope} />
        <OpenAlertsCard alerts={view.alerts} scope={scope} />
        <ApiStatusCard systems={view.systems} scope={scope} />
      </div>
    </div>
  );
};

export default Dashboard;
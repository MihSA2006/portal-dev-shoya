import { ShieldCheck } from 'lucide-react';
import { docHealthCounts } from '../../../utils/overview';
import DonutChart from './DonutChart';
import OverviewCard from './OverviewCard';

const Row = ({ color, value, label }) => (
  <div className="border-t border-[var(--border)] py-2 first:border-0">
    <p className="flex items-center gap-2 text-lg font-semibold">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} /> {value}
    </p>
    <p className="pl-4 text-xs text-[var(--text-muted)]">{label}</p>
  </div>
);

const DocHealthCard = ({ project, overview }) => {
  const c = docHealthCounts(project, overview);

  return (
    <OverviewCard icon={ShieldCheck} title="Santé de la documentation" subtitle="Couverture des endpoints et statut de la documentation.">
      <div className="flex flex-wrap items-center gap-6">
        <DonutChart percent={c.pct} label="Documenté" />
        <div className="min-w-[8rem] flex-1">
          <div className="pb-2">
            <p className="font-display text-3xl font-semibold">{c.total}</p>
            <p className="text-xs text-[var(--text-muted)]">Endpoints au total</p>
          </div>
          <Row color="var(--accent)" value={c.complete} label="Complets" />
          <Row color="var(--role-admin)" value={c.inReview} label="En relecture" />
          <Row color="var(--danger)" value={c.incomplete} label="Incomplets" />
        </div>
      </div>
    </OverviewCard>
  );
};

export default DocHealthCard;

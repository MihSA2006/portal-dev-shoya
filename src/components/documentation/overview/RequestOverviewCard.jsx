import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { RANGES } from '../../../constants/overview';
import { buildSeries, getTicks } from '../../../utils/overview';
import Dropdown from '../../ui/Dropdown';
import OverviewCard from './OverviewCard';
import RequestChart from './RequestChart';

const Delta = ({ value, lowerIsBetter = false }) => {
  const good = lowerIsBetter ? value <= 0 : value >= 0;
  const Icon = value >= 0 ? ArrowUp : ArrowDown;
  return (
    <span data-tone={good ? 'accent' : 'danger'} className="flex items-center gap-1 text-xs font-medium text-[var(--tone)]">
      <Icon size={13} /> {Math.abs(value)}%
    </span>
  );
};

const Stat = ({ label, value, children }) => (
  <div className="px-3 first:pl-0 last:pr-0 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-[var(--border)]">
    <p className="text-[11px] text-[var(--text-muted)]">{label}</p>
    <p className="my-1 font-display text-base font-semibold sm:text-lg">{value}</p>
    {children}
  </div>
);

const RequestOverviewCard = ({ projectId, requests }) => {
  const [rangeId, setRangeId] = useState(RANGES[0].id);
  const range = RANGES.find((r) => r.id === rangeId);

  const chart = useMemo(() => {
    if (!requests) return null;
    const peak = range.days === 1 ? requests.peak : requests.total * 1.5;
    const values = buildSeries(range.length, peak, projectId);
    return { values, ticks: getTicks(Math.max(...values)) };
  }, [requests, range, projectId]);

  const select = (
    <Dropdown
      value={rangeId}
      onChange={setRangeId}
      options={RANGES.map(({ id, label }) => ({ value: id, label }))}
      ariaLabel="Période"
      className="w-32"
    />
  );

  return (
    <OverviewCard title="Aperçu des requêtes" titleClassName="text-base" action={requests ? select : null}>
      {!requests ? (
        <p className="py-10 text-center text-sm text-[var(--text-muted)]">Aucune donnée de trafic pour ce projet.</p>
      ) : (
        <>
          <RequestChart values={chart.values} ticks={chart.ticks} labels={range.labels} />
          <div className="mt-5 flex">
            <Stat label="Requêtes totales" value={(requests.total * range.days).toLocaleString('fr-FR')}>
              <Delta value={requests.totalDelta} />
            </Stat>
            <Stat label="Taux de succès" value={`${requests.successRate}%`}>
              <Delta value={requests.successDelta} />
            </Stat>
            <Stat label="Temps de réponse moy." value={`${requests.avgMs} ms`}>
              <Delta value={requests.avgDelta} lowerIsBetter />
            </Stat>
          </div>
        </>
      )}
    </OverviewCard>
  );
};

export default RequestOverviewCard;

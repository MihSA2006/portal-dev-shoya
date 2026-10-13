import { CalendarDays } from 'lucide-react';
import Dropdown from '../ui/Dropdown';
import AlertSwitch from './AlertSwitch';
import { REPORT_TIMES, REPORT_RECIPIENTS } from '../../constants/alerts';

export default function DailyReportCard({ report, onChange }) {
  return (
    <section className="cut-open [--frame-bg:var(--surface)] focus-within:z-20 [&:has([aria-expanded=true])]:z-20 flex flex-col">
      <div className="flex h-full flex-col px-5 py-5">
        <header className="flex items-center gap-6">
          <CalendarDays size={26} className="text-[var(--accent)]" />
          <div>
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Rapport quotidien</h2>
            <p className="text-xs text-[var(--text-muted)]">Configurez le résumé exécutif quotidien.</p>
          </div>
        </header>

        <div className="mt-4 grid flex-1 content-center gap-4 sm:grid-cols-[auto_1fr_1fr]">
          <div>
            <p className="mb-2 text-sm text-[var(--text-soft)]">Statut</p>
            <div className="flex h-11 items-center gap-3 border-none border-[var(--border-strong)] bg-[var(--surface-2)] px-3">
              <AlertSwitch checked={report.enabled} onChange={(enabled) => onChange({ enabled })} label="Activer le rapport quotidien" showLabel={false} />
              <span className="pr-1 text-sm text-[var(--text-soft)]">{report.enabled ? 'Activé' : 'Désactivé'}</span>
            </div>
          </div>

          <fieldset
            disabled={!report.enabled}
            className={`m-0 grid min-w-0 gap-4 border-0 p-0 transition-opacity sm:col-span-2 sm:grid-cols-2 ${report.enabled ? '' : 'opacity-50'}`}
          >
            <div>
              <p className="mb-2 text-sm text-[var(--text-soft)]">Heure d'envoi</p>
              <Dropdown value={report.time} onChange={(time) => onChange({ time })} options={REPORT_TIMES} ariaLabel="Heure d'envoi" />
            </div>
            <div>
              <p className="mb-2 text-sm text-[var(--text-soft)]">Destinataires</p>
              <Dropdown value={report.recipients} onChange={(recipients) => onChange({ recipients })} options={REPORT_RECIPIENTS} ariaLabel="Destinataires" />
            </div>
          </fieldset>
        </div>
      </div>
    </section>
  );
}

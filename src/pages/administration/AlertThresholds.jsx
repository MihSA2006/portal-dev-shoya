import { useState } from 'react';
import { Bell, Save, ChevronRight, ShieldCheck } from 'lucide-react';
import AlertRuleCard from '../../components/alerts/AlertRuleCard';
import GlobalChannels from '../../components/alerts/GlobalChannels';
import DailyReportCard from '../../components/alerts/DailyReportCard';
import { ALERT_RULES, createDefaultAlertConfig } from '../../constants/alerts';

const Pulse = () => (
  <svg width="90" height="22" viewBox="0 0 90 22" fill="none" aria-hidden="true" className="text-[var(--accent)]">
    <path d="M0 11h28l4-9 6 18 5-9h47" stroke="currentColor" strokeWidth="1.2" opacity=".7" />
  </svg>
);

const AlertThresholds = () => {
  const [config, setConfig] = useState(createDefaultAlertConfig);
  const [saved, setSaved] = useState(() => JSON.stringify(config));
  const dirty = JSON.stringify(config) !== saved;

  const updateRule = (id, patch) =>
    setConfig((c) => ({ ...c, rules: { ...c.rules, [id]: { ...c.rules[id], ...patch } } }));
  const updateChannel = (key, value) => setConfig((c) => ({ ...c, channels: { ...c.channels, [key]: value } }));
  const updateReport = (patch) => setConfig((c) => ({ ...c, report: { ...c.report, ...patch } }));

  const save = () => {
    // TODO : envoyer `config` à votre API
    setSaved(JSON.stringify(config));
  };

  return (
    <div className="space-y-5">
      {/* En-tête */}
      <header className="cut-frame [--frame-bg:var(--surface)]">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-4">
            <Bell size={36} className="shrink-0 text-[var(--accent)]" />
            <div>
              <h1 className="font-display text-3xl font-semibold text-[var(--text)]">Seuils d'alerte</h1>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Configurez les alertes et notifications automatisées pour votre écosystème de développement.
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-[var(--accent)] lg:flex">
            <Pulse />
            <span>SURVEILLER</span><span className="opacity-50">/</span>
            <span>DÉTECTER</span><span className="opacity-50">/</span>
            <span>AGIR</span>
            <Pulse />
          </div>
        </div>
      </header>

      {/* Règles */}
      <div className="grid gap-5 2xl:grid-cols-2">
        {ALERT_RULES.map((rule) => (
          <AlertRuleCard
            key={rule.id}
            rule={rule}
            value={config.rules[rule.id]}
            globalChannels={config.channels}
            onChange={(patch) => updateRule(rule.id, patch)}
          />
        ))}
      </div>

      {/* Notifications globales + rapport quotidien */}
      <div className="grid gap-5 xl:grid-cols-2">
        <GlobalChannels channels={config.channels} onChange={updateChannel} />
        <DailyReportCard report={config.report} onChange={updateReport} />
      </div>

      {/* Pied de page */}
      <footer className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--text-muted)]">
          <ShieldCheck size={18} className="text-[var(--accent)]" />
          <span className="text-[var(--text-soft)]">Shoya Labs</span>
          <span>·</span><span>Sécurité</span>
          <span>·</span><span>Innovation</span>
          <span>·</span><span>Avenir durable</span>
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <p className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <span className={`h-1.5 w-1.5 rounded-full ${dirty ? 'bg-[var(--role-admin)]' : 'bg-[var(--accent)]'}`} />
            {dirty ? 'Modifications non enregistrées' : 'Configuration enregistrée'}
            <span className="pl-2">v1.0.0</span>
          </p>
          <button
            type="button"
            onClick={save}
            disabled={!dirty}
            className="cut-frame cut-sm inline-flex h-12 items-center gap-3 px-6 text-sm font-semibold text-[var(--on-accent)] [--frame-border:var(--accent)] [--frame-bg:var(--accent)] enabled:hover:[--frame-bg:var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={18} /> Enregistrer les paramètres <ChevronRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AlertThresholds;

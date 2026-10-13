import { Clock, BellRing } from 'lucide-react';
import Dropdown from '../ui/Dropdown';
import Checkbox from '../ui/Checkbox';
import AlertSwitch from './AlertSwitch';
import { SEVERITY_OPTIONS, CHANNELS } from '../../constants/alerts';

/**
 * rule           : métadonnées (constants/alerts.js)
 * value          : état de la règle { enabled, threshold, severity, channels }
 * globalChannels : canaux globaux { portal, email, digest }
 * onChange(patch): met à jour la règle
 */
export default function AlertRuleCard({ rule, value, globalChannels, onChange }) {
  const RuleIcon = rule.icon;
  const severity = SEVERITY_OPTIONS.find((s) => s.value === value.severity) ?? SEVERITY_OPTIONS[0];
  const SeverityIcon = severity.icon;

  return (
    <article className="cut-open [--frame-bg:var(--surface)] focus-within:z-20 [&:has([aria-expanded=true])]:z-20">
      <div className="p-5">
        <header className="flex items-start gap-4">
          <span className="cut-frame cut-sm grid h-12 w-12 shrink-0 place-items-center text-[var(--accent)] [--frame-bg:var(--accent-tint)]">
            <RuleIcon size={22} />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span data-tone="accent" className="tone-badge px-2 py-0.5 text-xs font-semibold">{rule.number}</span>
              <h3 className="font-display text-base font-semibold text-[var(--text)]">{rule.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{rule.description}</p>
          </div>

          <AlertSwitch
            checked={value.enabled}
            onChange={(enabled) => onChange({ enabled })}
            label={`Activer l'alerte : ${rule.title}`}
          />
        </header>

        <div className="mt-4 border-t border-[var(--border)] pt-4">
          <fieldset
            disabled={!value.enabled}
            className={`m-0 grid min-w-0 gap-4 border-0 p-0 transition-opacity sm:grid-cols-[1fr_1fr_1.15fr] ${
              value.enabled ? '' : 'opacity-50'
            }`}
          >
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-medium text-[var(--accent)]">
                <Clock size={15} /> Seuil
              </p>
              <Dropdown
                value={value.threshold}
                onChange={(threshold) => onChange({ threshold })}
                options={rule.thresholds}
                ariaLabel={`Seuil : ${rule.title}`}
              />
            </div>

            <div>
              <p data-tone={severity.tone} className="mb-2 flex items-center gap-2 text-xs font-medium text-[var(--tone)]">
                <SeverityIcon size={15} /> Sévérité
              </p>
              {/* La bordure du Dropdown prend la couleur de la sévérité */}
              <div data-tone={severity.tone} className="[--frame-border:var(--tone)]">
                <Dropdown
                  value={value.severity}
                  onChange={(s) => onChange({ severity: s })}
                  options={SEVERITY_OPTIONS}
                  ariaLabel={`Sévérité : ${rule.title}`}
                />
              </div>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-medium text-[var(--accent)]">
                <BellRing size={15} /> Canaux de notification
              </p>
              <div className="space-y-2">
                {CHANNELS.map((c) => (
                  <Checkbox
                    key={c.key}
                    checked={value.channels[c.key] && globalChannels[c.key]}
                    disabled={!globalChannels[c.key]}
                    onChange={(checked) => onChange({ channels: { ...value.channels, [c.key]: checked } })}
                  >
                    {c.label}
                  </Checkbox>
                ))}
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </article>
  );
}

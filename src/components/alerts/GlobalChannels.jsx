import { Bell } from 'lucide-react';
import AlertSwitch from './AlertSwitch';
import { CHANNELS } from '../../constants/alerts';

export default function GlobalChannels({ channels, onChange }) {
  return (
    <section className="cut-open [--frame-bg:var(--surface)]">
      <div className="p-5">
        <header className="flex items-center gap-3">
          <Bell size={26} className="text-[var(--accent)]" />
          <div>
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Notifications</h2>
            <p className="text-xs text-[var(--text-muted)]">Configurez les canaux et préférences de notification globaux.</p>
          </div>
        </header>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {CHANNELS.map(({ key, label, description, icon: Icon }) => (
            <div key={key} className="flex items-center gap-3 border border-[var(--border)] bg-[var(--surface-2)] p-3 ">
              <span className="grid h-10 w-10 shrink-0 place-items-center border border-[var(--border-strong)] text-[var(--accent)]">
                <Icon size={19} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium leading-tight text-[var(--text)]">{label}</p>
                <p className="mt-1 text-[8px] leading-snug text-[var(--text-muted)]">{description}</p>
              </div>
              <AlertSwitch checked={channels[key]} onChange={(v) => onChange(key, v)} label={`Canal : ${label}`} showLabel={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

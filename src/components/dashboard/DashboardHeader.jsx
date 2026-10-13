import { Code2, CalendarDays, Leaf } from 'lucide-react';

export default function DashboardHeader({ cycle }) {
  return (
    <header className="relative overflow-hidden border-b border-[var(--border)] pb-5">
      <div className="relative z-10 flex flex-wrap items-center gap-4">
        <span className="cut-frame cut-sm grid h-14 w-14 shrink-0 place-items-center text-[var(--accent)] [--frame-border:var(--accent)] [--frame-bg:var(--accent-tint)]">
          <Code2 size={28} />
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <h1 className="font-display text-3xl font-semibold text-[var(--text)]">Vue d'ensemble de l'ingénierie</h1>
            <span className="cut-frame cut-sm inline-flex h-10 items-center gap-2 px-4 text-sm font-medium text-[var(--accent)] [--frame-bg:var(--accent-tint)]">
              <CalendarDays size={16} />
              Cycle {cycle.number} — Semaine {cycle.week} sur {cycle.totalWeeks}
            </span>
          </div>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Progression des projets, santé de l'ingénierie et visibilité opérationnelle sur toutes les équipes.
          </p>
        </div>
      </div>

      {/* Décor (grand écran uniquement) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[26rem] items-center justify-end gap-5 pb-5 xl:flex">
        <svg viewBox="0 0 300 80" fill="none" className="absolute inset-y-0 right-28 h-full w-[18rem] text-[var(--accent)]">
          <path d="M0 78 L50 60 L95 44 L140 28 L175 8 L210 30 L250 50 L300 70" stroke="currentColor" strokeOpacity=".55" />
          <path d="M20 78 L70 62 L115 48 L160 34 L190 20 L225 40 L270 60" stroke="currentColor" strokeOpacity=".3" />
          <path d="M60 78 L110 64 L150 52 L185 38 L215 48 L255 64" stroke="currentColor" strokeOpacity=".2" />
        </svg>
        <Leaf size={30} className="relative text-[var(--accent)]" />
        <p className="relative text-[10px] leading-6 tracking-[0.3em] text-[var(--text-muted)]">
          DE MEILLEURS SYSTÈMES<br />POUR UN AVENIR<br />PLUS VERT
        </p>
      </div>
    </header>
  );
}

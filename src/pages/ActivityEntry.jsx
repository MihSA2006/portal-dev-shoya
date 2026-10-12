import { ClipboardPenLine, Clock3, Send } from 'lucide-react';

const ActivityEntry = () => (
  <div className="space-y-6">
    <header>
      <p className="text-sm font-medium text-[var(--accent)]">ACTIVITÉ</p>
      <h1 className="mt-1 font-display text-3xl font-semibold">Saisie</h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
        Déclarez votre activité et consultez vos saisies récentes.
      </p>
    </header>

    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,1fr)]">
      <section className="cut-frame p-5 [--frame-bg:var(--surface)]" aria-labelledby="new-entry-title">
        <div className="mb-5 flex items-center gap-3">
          <ClipboardPenLine className="text-[var(--accent)]" size={20} />
          <h2 id="new-entry-title" className="font-display text-lg font-semibold">Nouvelle saisie</h2>
        </div>
        <form className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-[var(--text-soft)]">
            Projet
            <select className="w-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5 text-[var(--text)]">
              <option value="">Sélectionner un projet</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-[var(--text-soft)]">
            Date
            <input className="w-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5 text-[var(--text)]" type="date" />
          </label>
          <label className="space-y-2 text-sm text-[var(--text-soft)]">
            Durée (heures)
            <input className="w-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5 text-[var(--text)]" type="number" min="0.25" step="0.25" placeholder="Ex. 7,5" />
          </label>
          <label className="space-y-2 text-sm text-[var(--text-soft)]">
            Catégorie
            <select className="w-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5 text-[var(--text)]">
              <option value="">Sélectionner une catégorie</option>
              <option>Développement</option>
              <option>Réunion</option>
              <option>Support</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-[var(--text-soft)] sm:col-span-2">
            Description
            <textarea className="min-h-28 w-full resize-y border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5 text-[var(--text)]" placeholder="Décrivez brièvement votre activité" />
          </label>
          <div className="sm:col-span-2">
            <button className="inline-flex items-center gap-2 bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--bg)] transition-opacity hover:opacity-90" type="button">
              <Send size={16} />
              Enregistrer la saisie
            </button>
          </div>
        </form>
      </section>

      <section className="cut-frame p-5 [--frame-bg:var(--surface)]" aria-labelledby="recent-entries-title">
        <div className="mb-4 flex items-center gap-3">
          <Clock3 className="text-[var(--cyan)]" size={20} />
          <h2 id="recent-entries-title" className="font-display text-lg font-semibold">Saisies récentes</h2>
        </div>
        <p className="border border-dashed border-[var(--border)] px-4 py-8 text-center text-sm text-[var(--text-muted)]">
          Vos saisies apparaîtront ici une fois enregistrées.
        </p>
      </section>
    </div>
  </div>
);

export default ActivityEntry;

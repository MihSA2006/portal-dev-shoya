import { Save } from 'lucide-react';

/** Boutons Annuler / Enregistrer. */
export default function EditActions({ dirty, onCancel, onSave }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onCancel}
        className="h-9 border border-[var(--border-strong)] px-4 text-sm font-medium text-[var(--text-soft)] transition-colors hover:border-[var(--text-soft)] hover:text-[var(--text)]"
      >
        Annuler
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={!dirty}
        title={dirty ? undefined : 'Aucune modification à enregistrer'}
        className="cut-frame cut-sm inline-flex h-9 items-center gap-2 px-5 text-sm font-semibold text-[var(--on-accent)] [--frame-border:var(--accent)] [--frame-bg:var(--accent)] enabled:hover:[--frame-bg:var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Save size={15} /> Enregistrer
      </button>
    </div>
  );
}

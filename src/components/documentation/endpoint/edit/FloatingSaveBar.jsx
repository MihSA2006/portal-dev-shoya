import EditActions from './EditActions';

/** Barre flottante affichée quand les boutons de l'en-tête sont hors de l'écran. */
export default function FloatingSaveBar({ dirty, errorCount, onCancel, onSave }) {
  return (
    <div className="sticky bottom-4 z-30 flex justify-center">
      <div className="floating">
        <div className="cut-frame cut-sm [--frame-bg:var(--surface)]">
          <div className="flex flex-wrap items-center gap-4 px-4 py-3">
            <p className="flex items-center gap-2 text-xs text-[var(--text-soft)]" aria-live="polite">
              <span
                className={`h-2 w-2 rounded-full ${
                  errorCount > 0 ? 'bg-[var(--danger)]' : dirty ? 'bg-[var(--role-admin)]' : 'bg-[var(--text-muted)]'
                }`}
              />
              {errorCount > 0
                ? `${errorCount} erreur${errorCount > 1 ? 's' : ''} à corriger`
                : dirty
                  ? 'Modifications non enregistrées'
                  : 'Aucune modification'}
            </p>
            <EditActions dirty={dirty} onCancel={onCancel} onSave={onSave} />
          </div>
        </div>
      </div>
    </div>
  );
}

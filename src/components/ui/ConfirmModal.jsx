import Modal from './Modal';

export default function ConfirmModal({
  title, description, confirmLabel = 'Confirmer', cancelLabel = 'Annuler', danger = false, onConfirm, onClose,
}) {
  return (
    <Modal title={title} description={description} onClose={onClose}>
      <div className="flex justify-end gap-3 px-6 py-5">
        <button
          type="button"
          onClick={onClose}
          className="h-10 border border-[var(--border-strong)] px-4 text-sm text-[var(--text-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`h-10 border px-4 text-sm font-semibold transition-colors ${
            danger
              ? 'border-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_14%,transparent)] text-[var(--danger)] hover:bg-[var(--danger)] hover:text-white'
              : 'border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-strong)]'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

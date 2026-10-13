import Modal from '../ui/Modal';
import ResultBadge from './ResultBadge';
import { ACTIONS, formatTimestamp } from '../../constants/audit';

const Item = ({ label, children }) => (
  <div>
    <dt className="text-xs text-[var(--text-muted)]">{label}</dt>
    <dd className="mt-1 text-sm text-[var(--text)]">{children}</dd>
  </div>
);

export default function AuditDetailModal({ event, onClose }) {
  return (
    <Modal title="Détail de l'événement" description={formatTimestamp(event.time)} onClose={onClose}>
      <dl className="grid gap-5 px-6 py-5 sm:grid-cols-2">
        <Item label="Action">{ACTIONS[event.actionKey].label}</Item>
        <Item label="Résultat"><ResultBadge result={event.result} /></Item>
        <Item label="Utilisateur">
          {event.userName}
          <span className="block text-xs text-[var(--text-muted)]">{event.userRole}</span>
        </Item>
        <Item label="Projet">{event.project}</Item>
        <Item label="Ressource"><span className="font-mono text-xs">{event.resource}</span></Item>
        <Item label="Adresse IP">{event.ip}</Item>
        <Item label="Identifiant de l'événement"><span className="font-mono text-xs">{event.id}</span></Item>
      </dl>
      <div className="flex justify-end border-t border-[var(--border)] px-6 py-4">
        <button
          type="button"
          onClick={onClose}
          className="h-10 border border-[var(--border-strong)] px-4 text-sm text-[var(--text-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
        >
          Fermer
        </button>
      </div>
    </Modal>
  );
}

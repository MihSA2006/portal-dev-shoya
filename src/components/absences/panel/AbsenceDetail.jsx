import { useState } from 'react';
import { CalendarSearch, Check, Pencil, Trash2, X } from 'lucide-react';
import { EMPLOYEES_BY_ID, VALIDATORS_BY_ID } from '../../../constants/absences';
import { formatDuration } from '../../../utils/absences';
import { formatDate, formatDateRange } from '../../../utils/calendar';
import EmployeeAvatar from '../EmployeeAvatar';
import StatusBadge from '../StatusBadge';
import TypeBadge from '../TypeBadge';

const Row = ({ label, children }) => (
  <div>
    <dt className="text-xs uppercase tracking-wide text-[var(--text-muted)]">{label}</dt>
    <dd className="mt-1 text-sm">{children}</dd>
  </div>
);

const AbsenceDetail = ({ absence: a, startRejecting = false, onApprove, onReject, onEdit, onDelete, onShowInCalendar }) => {
  const [rejecting, setRejecting] = useState(startRejecting);
  const [note, setNote] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const employee = EMPLOYEES_BY_ID[a.employeeId];
  const pending = a.status === 'pending';

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-sm text-[var(--text-soft)]">{a.id}</span>
          <StatusBadge status={a.status} />
        </div>

        <div className="flex items-center gap-3">
          <EmployeeAvatar employee={employee} size="lg" />
          <div className="min-w-0">
            <p className="truncate font-medium">{employee?.label}</p>
            <p className="text-sm text-[var(--text-muted)]">{employee?.role}</p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-4 border-y border-[var(--border)] py-5">
          <Row label="Type"><TypeBadge type={a.type} /></Row>
          <Row label="Durée">{formatDuration(a)}</Row>
          <Row label="Période"><span className="block">{formatDateRange(a.startDate, a.endDate)}</span></Row>
          <Row label="Horaires">{a.fullDay ? 'Journée entière' : `${a.startTime} – ${a.endTime}`}</Row>
          <Row label="Soumise le">{formatDate(a.submittedAt)}</Row>
          <Row label="Validateur">{VALIDATORS_BY_ID[a.validatorId]?.label ?? '—'}</Row>
        </dl>

        <dl className="space-y-4">
          <Row label="Motif"><p className="whitespace-pre-line text-[var(--text-soft)]">{a.reason}</p></Row>
          <Row label="Justificatif">
            {a.attachment ? <span className="text-[var(--accent)]">{a.attachment}</span> : <span className="text-[var(--text-muted)]">Aucun justificatif</span>}
          </Row>
          {!pending && a.decidedAt && (
            <Row label={a.status === 'approved' ? 'Validée le' : 'Refusée le'}>
              {formatDate(a.decidedAt)}
              {a.decisionNote && <p className="mt-1 text-[var(--text-soft)]">« {a.decisionNote} »</p>}
            </Row>
          )}
        </dl>

        <button className="flex items-center gap-2 text-sm text-[var(--accent)] hover:underline" type="button" onClick={() => onShowInCalendar(a.startDate)}>
          <CalendarSearch size={16} />
          Voir dans le calendrier
        </button>

        {rejecting && (
          <div className="space-y-3 border border-[var(--danger)] p-3">
            <label className="block text-sm text-[var(--text-soft)]" htmlFor="reject-note">Motif du refus (optionnel)</label>
            <span className="field !h-auto items-start py-2">
              <textarea id="reject-note" rows={3} className="resize-none" value={note} maxLength={300}
                placeholder="Expliquez la décision au collaborateur…" onChange={(e) => setNote(e.target.value)} autoFocus />
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button className="btn btn-outline !h-10" type="button" onClick={() => setRejecting(false)}>Retour</button>
              <button className="btn btn-danger !h-10" type="button" onClick={() => onReject(a.id, note.trim())}>Confirmer le refus</button>
            </div>
          </div>
        )}

        {confirmDelete && (
          <div className="space-y-3 border border-[var(--danger)] p-3">
            <p className="text-sm">Supprimer définitivement la demande {a.id} ?</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="btn btn-outline !h-10" type="button" onClick={() => setConfirmDelete(false)}>Non, garder</button>
              <button className="btn btn-danger !h-10" type="button" onClick={() => onDelete(a.id)}>Supprimer</button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 border-t border-[var(--border)] px-5 py-4">
        {pending && !rejecting && (
          <div className="grid grid-cols-2 gap-3">
            <button className="btn btn-primary" type="button" onClick={() => onApprove(a.id)}><Check size={17} />Approuver</button>
            <button className="btn btn-danger" type="button" onClick={() => setRejecting(true)}><X size={17} />Refuser</button>
          </div>
        )}
        <div className={`grid gap-3 ${pending ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {pending && (
            <button className="btn btn-outline" type="button" onClick={() => onEdit(a.id)}><Pencil size={16} />Modifier</button>
          )}
          <button className="btn btn-outline" type="button" onClick={() => setConfirmDelete(true)} disabled={confirmDelete}>
            <Trash2 size={16} />
            {pending ? 'Supprimer' : "Supprimer l'absence"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AbsenceDetail;

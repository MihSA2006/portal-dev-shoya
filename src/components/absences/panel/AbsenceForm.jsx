import { useRef, useState } from 'react';
import { CalendarDays, ChevronDown, Clock, Paperclip, X } from 'lucide-react';
import { ABSENCE_TYPES, DEFAULT_HOURS, EMPLOYEES, VALIDATORS } from '../../../constants/absences';
import { findConflict, formatDuration } from '../../../utils/absences';
import { countWorkingDays, hoursBetween, todayISO } from '../../../utils/calendar';
import EmployeePicker from './EmployeePicker';

const buildInitial = (initial, prefill) => ({
  employeeId: initial?.employeeId ?? '',
  type: initial?.type ?? 'conge',
  startDate: initial?.startDate ?? prefill?.startDate ?? todayISO(),
  endDate: initial?.endDate ?? prefill?.endDate ?? prefill?.startDate ?? todayISO(),
  fullDay: initial?.fullDay ?? true,
  startTime: initial?.startTime ?? DEFAULT_HOURS.start,
  endTime: initial?.endTime ?? DEFAULT_HOURS.end,
  reason: initial?.reason ?? '',
  attachment: initial?.attachment ?? null,
  validatorId: initial?.validatorId ?? '',
});

const validate = (v, absences, ignoreId) => {
  const e = {};
  if (!v.employeeId) e.employeeId = 'Sélectionnez un collaborateur.';
  if (!v.startDate) e.startDate = 'Date de début requise.';
  if (!v.endDate) e.endDate = 'Date de fin requise.';
  if (v.startDate && v.endDate && v.endDate < v.startDate) e.endDate = 'La fin doit suivre le début.';
  if (!e.startDate && !e.endDate && v.fullDay && countWorkingDays(v.startDate, v.endDate) === 0) {
    e.endDate = 'La période ne contient aucun jour ouvré.';
  }
  if (!v.fullDay && hoursBetween(v.startTime, v.endTime) <= 0) e.time = "L'heure de fin doit suivre l'heure de début.";
  if (!v.reason.trim()) e.reason = 'Indiquez le motif de l’absence.';
  if (!v.validatorId) e.validatorId = 'Sélectionnez un validateur.';
  if (!e.employeeId && !e.startDate && !e.endDate && !e.time) {
    const conflict = findConflict(absences, v, ignoreId);
    if (conflict) e.conflict = `Ce collaborateur a déjà une absence sur cette période (${conflict.id}).`;
  }
  return e;
};

const Block = ({ label, htmlFor, required, optional, error, children }) => (
  <div>
    <label className="mb-1.5 block text-sm text-[var(--text-soft)]" htmlFor={htmlFor}>
      {label}
      {required && <span className="text-[var(--danger)]"> *</span>}
      {optional && <span className="text-[var(--text-muted)]"> (optionnel)</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-xs text-[var(--danger)]" role="alert">{error}</p>}
  </div>
);

const Select = ({ id, value, onChange, options, placeholder, icon: Icon, invalid }) => (
  <span className={`field ${invalid ? '!border-[var(--danger)]' : ''}`}>
    {Icon && <Icon className="shrink-0 text-[var(--accent)]" size={16} />}
    <select id={id} value={value} aria-invalid={invalid} onChange={(e) => onChange(e.target.value)}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
    </select>
    <ChevronDown className="pointer-events-none shrink-0 text-[var(--text-muted)]" size={16} />
  </span>
);

const AbsenceForm = ({ initial, prefill, absences, submitLabel, onSubmit, onCancel }) => {
  const [values, setValues] = useState(() => buildInitial(initial, prefill));
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);

  const set = (key, value) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      // Une absence horaire tient sur une journée ; une fin antérieure au début est ramenée au début.
      if (key === 'startDate' && (!next.fullDay || next.endDate < value)) next.endDate = value;
      if (key === 'fullDay' && !value) next.endDate = next.startDate;
      return next;
    });
    setErrors((prev) => ({ ...prev, [key]: undefined, time: undefined, conflict: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values, absences, initial?.id);
    if (Object.values(found).some(Boolean)) {
      setErrors(found);
      return;
    }
    onSubmit({ ...values, reason: values.reason.trim() });
  };

  const hasDates = values.startDate && values.endDate && values.endDate >= values.startDate;
  const duration = hasDates ? formatDuration(values) : '—';

  return (
    <form className="flex h-full flex-col" onSubmit={submit} noValidate>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5">
        <Block label="Collaborateur" htmlFor="abs-employee" required error={errors.employeeId}>
          <EmployeePicker id="abs-employee" value={values.employeeId} employees={EMPLOYEES}
            invalid={Boolean(errors.employeeId)} onChange={(v) => set('employeeId', v)} />
        </Block>

        <Block label="Type d'absence" htmlFor="abs-type" required>
          <Select id="abs-type" value={values.type} onChange={(v) => set('type', v)} options={ABSENCE_TYPES} icon={CalendarDays} />
        </Block>

        <div className="grid grid-cols-2 gap-3">
          <Block label="Date de début" htmlFor="abs-start" required error={errors.startDate}>
            <span className="field"><input id="abs-start" type="date" value={values.startDate} onChange={(e) => set('startDate', e.target.value)} /></span>
          </Block>
          <Block label="Date de fin" htmlFor="abs-end" required error={errors.endDate}>
            <span className={`field ${errors.endDate ? '!border-[var(--danger)]' : ''}`}>
              <input id="abs-end" type="date" value={values.endDate} min={values.startDate || undefined}
                disabled={!values.fullDay} onChange={(e) => set('endDate', e.target.value)} />
            </span>
          </Block>
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <button
            type="button"
            role="switch"
            aria-checked={values.fullDay}
            aria-label="Journée entière"
            onClick={() => set('fullDay', !values.fullDay)}
            className={`relative h-5 w-9 shrink-0 border transition-colors ${values.fullDay ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--border-strong)] bg-[var(--surface-2)]'}`}
          >
            <span className={`absolute top-0.5 h-3.5 w-3.5 bg-[var(--on-accent)] transition-all ${values.fullDay ? 'left-[1.1rem]' : 'left-0.5 !bg-[var(--text-muted)]'}`} />
          </button>
          Journée entière
        </label>

        {!values.fullDay && (
          <div>
            <div className="grid grid-cols-2 gap-3">
              <Block label="Heure de début" htmlFor="abs-start-time">
                <span className="field"><Clock className="shrink-0 text-[var(--accent)]" size={16} />
                  <input id="abs-start-time" type="time" value={values.startTime} onChange={(e) => set('startTime', e.target.value)} /></span>
              </Block>
              <Block label="Heure de fin" htmlFor="abs-end-time">
                <span className={`field ${errors.time ? '!border-[var(--danger)]' : ''}`}><Clock className="shrink-0 text-[var(--accent)]" size={16} />
                  <input id="abs-end-time" type="time" value={values.endTime} onChange={(e) => set('endTime', e.target.value)} /></span>
              </Block>
            </div>
            {errors.time && <p className="mt-1 text-xs text-[var(--danger)]" role="alert">{errors.time}</p>}
          </div>
        )}

        <p className="flex items-center justify-between border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm">
          <span className="text-[var(--text-muted)]">Durée estimée</span>
          <span className="font-medium text-[var(--accent)]">{duration}</span>
        </p>

        <Block label="Motif / Commentaire" htmlFor="abs-reason" required error={errors.reason}>
          <span className={`field !h-auto items-start py-2 ${errors.reason ? '!border-[var(--danger)]' : ''}`}>
            <textarea id="abs-reason" rows={4} className="resize-none" value={values.reason} maxLength={500}
              placeholder="Raison de l'absence…" aria-invalid={Boolean(errors.reason)} onChange={(e) => set('reason', e.target.value)} />
          </span>
        </Block>

        <Block label="Justificatif" htmlFor="abs-file" optional>
          <input id="abs-file" ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg" className="sr-only"
            onChange={(e) => set('attachment', e.target.files?.[0]?.name ?? null)} />
          <div className="field justify-between">
            <button className="flex items-center gap-2 text-sm text-[var(--accent)] hover:underline" type="button" onClick={() => fileRef.current?.click()}>
              <Paperclip size={15} />
              Choisir un fichier
            </button>
            {values.attachment ? (
              <span className="flex min-w-0 items-center gap-2 text-xs text-[var(--text-soft)]">
                <span className="truncate">{values.attachment}</span>
                <button type="button" onClick={() => { set('attachment', null); if (fileRef.current) fileRef.current.value = ''; }} aria-label="Retirer le justificatif">
                  <X size={14} />
                </button>
              </span>
            ) : (
              <span className="text-xs text-[var(--text-muted)]">Aucun fichier sélectionné</span>
            )}
          </div>
        </Block>

        <Block label="Validateur" htmlFor="abs-validator" required error={errors.validatorId}>
          <Select id="abs-validator" value={values.validatorId} onChange={(v) => set('validatorId', v)}
            options={VALIDATORS} placeholder="Sélectionner un validateur…" invalid={Boolean(errors.validatorId)} />
        </Block>

        <div>
          <p className="mb-1.5 text-sm text-[var(--text-soft)]">Statut</p>
          <p className="tone-badge flex items-center gap-2 px-3 py-2.5 text-sm" data-tone="admin">
            <Clock size={16} />
            En attente de validation
          </p>
        </div>

        {errors.conflict && (
          <p className="border border-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] px-3 py-2 text-sm text-[var(--danger)]" role="alert">
            {errors.conflict}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-[var(--border)] px-5 py-4">
        <button className="btn btn-outline" type="button" onClick={onCancel}>Annuler</button>
        <button className="btn btn-primary" type="submit">{submitLabel}</button>
      </div>
    </form>
  );
};

export default AbsenceForm;

import {
  ABSENCE_STATUSES_BY_ID,
  ABSENCE_TYPES_BY_ID,
  EMPLOYEES_BY_ID,
  VALIDATORS_BY_ID,
} from '../constants/absences';
import {
  countWorkingDays, diffDays, endOfMonth, hoursBetween, startOfMonth,
} from './calendar';

const formatNumber = (n) => Number(n.toFixed(2)).toLocaleString('fr-FR');

export const formatDuration = (a) => {
  if (a.fullDay) {
    const n = countWorkingDays(a.startDate, a.endDate);
    return `${n} ${n >= 2 ? 'jours' : 'jour'}`;
  }
  const h = Math.max(0, hoursBetween(a.startTime, a.endTime));
  return `${formatNumber(h)} ${h >= 2 ? 'heures' : 'heure'}`;
};

export const overlaps = (a, start, end) => a.startDate <= end && a.endDate >= start;

export const nextAbsenceId = (absences, year = new Date().getFullYear()) => {
  const max = absences.reduce((acc, a) => Math.max(acc, Number(a.id.split('-').pop()) || 0), 0);
  return `ABS-${year}-${String(max + 1).padStart(3, '0')}`;
};

// Absence déjà déclarée (non refusée) qui chevauche la période demandée.
export const findConflict = (absences, draft, ignoreId) =>
  absences.find(
    (a) =>
      a.id !== ignoreId &&
      a.employeeId === draft.employeeId &&
      a.status !== 'rejected' &&
      overlaps(a, draft.startDate, draft.endDate) &&
      !(!a.fullDay && !draft.fullDay && (a.endTime <= draft.startTime || a.startTime >= draft.endTime)),
  );

// Le calendrier ne montre pas les demandes refusées.
export const visibleOnCalendar = (absences, { employee, type }) =>
  absences.filter(
    (a) =>
      a.status !== 'rejected' &&
      (employee === 'all' || a.employeeId === employee) &&
      (type === 'all' || a.type === type),
  );

const byRecent = (a, b) => b.submittedAt.localeCompare(a.submittedAt) || b.id.localeCompare(a.id);

export const filterRequests = (absences, f, today) => {
  const q = f.search.trim().toLowerCase();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  return absences
    .filter((a) => {
      if (f.status !== 'all' && a.status !== f.status) return false;
      if (f.type !== 'all' && a.type !== f.type) return false;
      if (f.employee !== 'all' && a.employeeId !== f.employee) return false;
      if (f.period === 'month' && !overlaps(a, monthStart, monthEnd)) return false;
      if (f.period === 'upcoming' && a.endDate < today) return false;
      if (q) {
        const hay = `${a.id} ${EMPLOYEES_BY_ID[a.employeeId]?.label ?? ''} ${ABSENCE_TYPES_BY_ID[a.type]?.label ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    })
    .sort(byRecent);
};

export const nextAbsence = (absences, today) =>
  absences
    .filter((a) => a.status === 'approved' && a.endDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))[0] ?? null;

export const computeStats = (absences, teamSize, today) => {
  const absentToday = new Set(
    absences.filter((a) => a.status === 'approved' && overlaps(a, today, today)).map((a) => a.employeeId),
  ).size;
  return {
    absentToday,
    pending: absences.filter((a) => a.status === 'pending').length,
    approvedThisMonth: absences.filter((a) => a.status === 'approved' && a.startDate.startsWith(today.slice(0, 7))).length,
    availability: teamSize ? Math.round(((teamSize - absentToday) / teamSize) * 100) : 100,
  };
};

/**
 * Disposition d'une semaine : chaque absence devient un segment (colonnes début→fin)
 * placé sur la première « ligne » libre. Au-delà de `maxLanes`, on compte les masquées par jour.
 */
export const layoutWeek = (week, absences, maxLanes) => {
  const first = week[0];
  const last = week[6];
  const items = absences
    .filter((a) => overlaps(a, first, last))
    .sort(
      (a, b) =>
        a.startDate.localeCompare(b.startDate) ||
        diffDays(b.startDate, b.endDate) - diffDays(a.startDate, a.endDate) ||
        a.id.localeCompare(b.id),
    );

  const lanes = [];
  const segments = items.map((absence) => {
    const startCol = Math.max(0, diffDays(first, absence.startDate));
    const endCol = Math.min(6, diffDays(first, absence.endDate));
    let lane = lanes.findIndex((end) => end < startCol);
    if (lane === -1) {
      lane = lanes.length;
      lanes.push(endCol);
    } else {
      lanes[lane] = endCol;
    }
    return {
      absence, startCol, endCol, lane,
      continuesBefore: absence.startDate < first,
      continuesAfter: absence.endDate > last,
    };
  });

  const hidden = Array(7).fill(0);
  segments
    .filter((s) => s.lane >= maxLanes)
    .forEach((s) => {
      for (let c = s.startCol; c <= s.endCol; c += 1) hidden[c] += 1;
    });
  return { visible: segments.filter((s) => s.lane < maxLanes), hidden };
};

// ── Export (CSV compatible Excel : séparateur « ; » et BOM UTF-8) ──
const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

export const absencesToCsv = (rows) => {
  const header = ['Référence', 'Collaborateur', 'Type', 'Début', 'Fin', 'Durée', 'Soumise le', 'Validateur', 'Statut', 'Motif'];
  const lines = rows.map((a) =>
    [
      a.id,
      EMPLOYEES_BY_ID[a.employeeId]?.label,
      ABSENCE_TYPES_BY_ID[a.type]?.label,
      a.startDate,
      a.endDate,
      formatDuration(a),
      a.submittedAt,
      VALIDATORS_BY_ID[a.validatorId]?.label,
      ABSENCE_STATUSES_BY_ID[a.status]?.label,
      a.reason,
    ].map(esc).join(';'),
  );
  return [header.map(esc).join(';'), ...lines].join('\r\n');
};

export const downloadCsv = (filename, csv) => {
  const blob = new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
};

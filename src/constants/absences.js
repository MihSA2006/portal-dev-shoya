import { ASSIGNEES } from './tasks';

export const ABSENCE_TYPES = [
  { id: 'conge', label: 'Congé', tone: 'accent' },
  { id: 'maladie', label: 'Maladie', tone: 'danger' },
  { id: 'permission', label: 'Permission', tone: 'lead' },
  { id: 'autre', label: 'Autre absence', tone: 'doc' },
];

export const ABSENCE_STATUSES = [
  { id: 'pending', label: 'En attente de validation', tone: 'admin' },
  { id: 'approved', label: 'Validée', tone: 'accent' },
  { id: 'rejected', label: 'Refusée', tone: 'danger' },
];

// L'équipe est la même que celle des tâches. Remplacez par votre source d'utilisateurs.
export const EMPLOYEES = ASSIGNEES;

export const VALIDATORS = [
  { id: 'lead', label: "Chef d'équipe" },
  { id: 'hr', label: 'Responsable RH' },
];

const toMap = (list) => Object.fromEntries(list.map((item) => [item.id, item]));
export const ABSENCE_TYPES_BY_ID = toMap(ABSENCE_TYPES);
export const ABSENCE_STATUSES_BY_ID = toMap(ABSENCE_STATUSES);
export const EMPLOYEES_BY_ID = toMap(EMPLOYEES);
export const VALIDATORS_BY_ID = toMap(VALIDATORS);

export const CALENDAR_VIEWS = [
  { id: 'month', label: 'Mois' },
  { id: 'week', label: 'Semaine' },
  { id: 'list', label: 'Liste' },
];

export const PERIOD_FILTERS = [
  { id: 'month', label: 'Ce mois-ci' },
  { id: 'upcoming', label: 'À venir' },
];

export const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
export const DEFAULT_HOURS = { start: '08:00', end: '17:00' };
export const DEFAULT_REQUEST_FILTERS = { search: '', status: 'all', type: 'all', employee: 'all', period: 'all' };
export const REQUESTS_PER_PAGE = 6;
export const MAX_LANES = 2; // barres visibles par semaine dans la vue Mois

// Champs modifiables d'une demande (utilisés par le formulaire).
export const FORM_FIELDS = [
  'employeeId', 'type', 'startDate', 'endDate', 'fullDay',
  'startTime', 'endTime', 'reason', 'attachment', 'validatorId',
];

const base = { fullDay: true, startTime: '08:00', endTime: '17:00', attachment: null, decidedAt: null, decisionNote: '' };

export const INITIAL_ABSENCES = [
  { ...base, id: 'ABS-2026-030', employeeId: 'mireille', type: 'conge', startDate: '2026-10-01', endDate: '2026-10-01', reason: 'Rendez-vous personnel.', validatorId: 'lead', status: 'approved', submittedAt: '2026-09-24', decidedAt: '2026-09-25' },
  { ...base, id: 'ABS-2026-031', employeeId: 'rija', type: 'maladie', startDate: '2026-10-02', endDate: '2026-10-02', reason: 'Grippe saisonnière.', attachment: 'certificat-medical.pdf', validatorId: 'hr', status: 'approved', submittedAt: '2026-10-02', decidedAt: '2026-10-02' },
  { ...base, id: 'ABS-2026-032', employeeId: 'tiana', type: 'autre', startDate: '2026-10-06', endDate: '2026-10-06', reason: 'Démarches administratives.', validatorId: 'hr', status: 'approved', submittedAt: '2026-09-30', decidedAt: '2026-10-01' },
  { ...base, id: 'ABS-2026-033', employeeId: 'david', type: 'permission', startDate: '2026-10-14', endDate: '2026-10-14', fullDay: false, startTime: '09:00', endTime: '11:00', reason: 'Rendez-vous médical.', validatorId: 'lead', status: 'approved', submittedAt: '2026-10-09', decidedAt: '2026-10-10' },
  { ...base, id: 'ABS-2026-034', employeeId: 'andry', type: 'conge', startDate: '2026-10-19', endDate: '2026-10-20', reason: 'Congé de deux jours.', validatorId: 'lead', status: 'approved', submittedAt: '2026-10-08', decidedAt: '2026-10-09' },
  { ...base, id: 'ABS-2026-037', employeeId: 'kevin', type: 'conge', startDate: '2026-10-26', endDate: '2026-10-28', reason: 'Congés annuels.', validatorId: 'lead', status: 'approved', submittedAt: '2026-10-10', decidedAt: '2026-10-11' },
  { ...base, id: 'ABS-2026-038', employeeId: 'tiana', type: 'autre', startDate: '2026-10-16', endDate: '2026-10-16', reason: 'Événement familial.', validatorId: 'hr', status: 'rejected', submittedAt: '2026-10-12', decidedAt: '2026-10-13', decisionNote: 'Période de forte charge sur le projet NovaPay.' },
  { ...base, id: 'ABS-2026-039', employeeId: 'david', type: 'permission', startDate: '2026-10-21', endDate: '2026-10-21', fullDay: false, startTime: '14:00', endTime: '16:00', reason: 'Démarche administrative en préfecture.', validatorId: 'lead', status: 'pending', submittedAt: '2026-10-18' },
  { ...base, id: 'ABS-2026-040', employeeId: 'rija', type: 'maladie', startDate: '2026-10-19', endDate: '2026-10-19', reason: 'Fièvre, consultation prévue.', validatorId: 'hr', status: 'approved', submittedAt: '2026-10-19', decidedAt: '2026-10-19' },
  { ...base, id: 'ABS-2026-041', employeeId: 'mireille', type: 'conge', startDate: '2026-10-22', endDate: '2026-10-23', reason: 'Court séjour en famille.', validatorId: 'lead', status: 'pending', submittedAt: '2026-10-14' },
  { ...base, id: 'ABS-2026-042', employeeId: 'jean', type: 'conge', startDate: '2026-10-29', endDate: '2026-11-03', reason: 'Congés de fin de mois.', validatorId: 'lead', status: 'approved', submittedAt: '2026-10-05', decidedAt: '2026-10-06' },
];

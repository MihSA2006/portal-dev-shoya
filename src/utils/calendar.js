// Toutes les dates sont des chaînes ISO locales « AAAA-MM-JJ » (pas de décalage de fuseau).
const pad = (n) => String(n).padStart(2, '0');
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parseISO = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};
export const todayISO = () => toISO(new Date());

export const addDays = (iso, n) => {
  const d = parseISO(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
};
export const addMonths = (iso, n) => {
  const d = parseISO(iso);
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  return toISO(d);
};
export const startOfMonth = (iso) => `${iso.slice(0, 8)}01`;
export const endOfMonth = (iso) => {
  const d = parseISO(iso);
  return toISO(new Date(d.getFullYear(), d.getMonth() + 1, 0));
};
// Semaine commençant le lundi.
export const startOfWeek = (iso) => addDays(iso, -((parseISO(iso).getDay() + 6) % 7));
export const diffDays = (a, b) => Math.round((parseISO(b) - parseISO(a)) / 86400000);
export const weekDays = (iso) => {
  const start = startOfWeek(iso);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

// Semaines (tableaux de 7 jours) affichées pour le mois contenant `iso`.
export const monthGrid = (iso) => {
  const end = endOfMonth(iso);
  const weeks = [];
  for (let cursor = startOfWeek(startOfMonth(iso)); cursor <= end; cursor = addDays(cursor, 7)) {
    weeks.push(weekDays(cursor));
  }
  return weeks;
};

export const isWeekend = (iso) => [0, 6].includes(parseISO(iso).getDay());

export const countWorkingDays = (start, end) => {
  let n = 0;
  for (let c = start; c <= end; c = addDays(c, 1)) if (!isWeekend(c)) n += 1;
  return n;
};

export const hoursBetween = (start, end) => {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  return (eh * 60 + em - (sh * 60 + sm)) / 60;
};

export const formatMonthYear = (iso) =>
  cap(new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(parseISO(iso)));

export const formatDate = (iso) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).format(parseISO(iso));

export const formatDayLong = (iso) =>
  cap(new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(parseISO(iso)));

export const formatDateRange = (start, end) =>
  start === end ? formatDate(start) : `${formatDate(start)} → ${formatDate(end)}`;

export const formatWeekRange = (iso) => {
  const start = parseISO(startOfWeek(iso));
  const end = parseISO(addDays(startOfWeek(iso), 6));
  const f = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' });
  const from = start.getMonth() === end.getMonth() ? String(start.getDate()) : f.format(start);
  return `${from} – ${f.format(end)} ${end.getFullYear()}`;
};

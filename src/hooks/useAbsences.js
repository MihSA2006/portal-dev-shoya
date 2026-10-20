import { useState } from 'react';
import { FORM_FIELDS, INITIAL_ABSENCES } from '../constants/absences';
import { nextAbsenceId } from '../utils/absences';
import { todayISO } from '../utils/calendar';

const pick = (values) => Object.fromEntries(FORM_FIELDS.map((k) => [k, values[k]]));

// État des absences. Brancher l'API ici plus tard sans toucher aux composants.
const useAbsences = () => {
  const [absences, setAbsences] = useState(INITIAL_ABSENCES);

  const addAbsence = (values) => {
    const created = {
      ...pick(values),
      id: nextAbsenceId(absences),
      status: 'pending',
      submittedAt: todayISO(),
      decidedAt: null,
      decisionNote: '',
    };
    setAbsences((prev) => [...prev, created]);
    return created;
  };

  const updateAbsence = (id, values) =>
    setAbsences((prev) => prev.map((a) => (a.id === id ? { ...a, ...pick(values) } : a)));

  const decide = (id, status, note = '') =>
    setAbsences((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status, decidedAt: todayISO(), decisionNote: note } : a)),
    );

  const removeAbsence = (id) => setAbsences((prev) => prev.filter((a) => a.id !== id));

  return { absences, addAbsence, updateAbsence, decide, removeAbsence };
};

export default useAbsences;

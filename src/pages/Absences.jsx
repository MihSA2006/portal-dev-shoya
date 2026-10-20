import { useCallback, useEffect, useMemo, useState } from 'react';
import AbsenceCalendar from '../components/absences/AbsenceCalendar';
import AbsenceRequests from '../components/absences/AbsenceRequests';
import AbsencesHeader from '../components/absences/AbsencesHeader';
import AbsenceStats from '../components/absences/AbsenceStats';
import AbsenceToast from '../components/absences/AbsenceToast';
import NextAbsenceCard from '../components/absences/NextAbsenceCard';
import AbsenceDetail from '../components/absences/panel/AbsenceDetail';
import AbsenceForm from '../components/absences/panel/AbsenceForm';
import AbsencePanel from '../components/absences/panel/AbsencePanel';
import DayAbsences from '../components/absences/panel/DayAbsences';
import { DEFAULT_REQUEST_FILTERS, EMPLOYEES } from '../constants/absences';
import useAbsences from '../hooks/useAbsences';
import {
  absencesToCsv, computeStats, downloadCsv, filterRequests, nextAbsence, overlaps, visibleOnCalendar,
} from '../utils/absences';
import { endOfMonth, formatDayLong, startOfMonth, todayISO, weekDays } from '../utils/calendar';

const DEFAULT_CALENDAR = { view: 'month', cursor: todayISO(), employee: 'all', type: 'all' };

const Absences = () => {
  const { absences, addAbsence, updateAbsence, decide, removeAbsence } = useAbsences();
  const [calendar, setCalendar] = useState(DEFAULT_CALENDAR);
  const [filters, setFilters] = useState(DEFAULT_REQUEST_FILTERS);
  const [panel, setPanel] = useState(null); // { mode: 'create' | 'edit' | 'detail' | 'day', … }
  const [notice, setNotice] = useState(null);

  const today = todayISO();
  const stats = useMemo(() => computeStats(absences, EMPLOYEES.length, today), [absences, today]);
  const upcoming = useMemo(() => nextAbsence(absences, today), [absences, today]);
  const requests = useMemo(() => filterRequests(absences, filters, today), [absences, filters, today]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(timer);
  }, [notice]);

  const notify = (message, tone = 'ok') => setNotice({ message, tone });
  const closePanel = useCallback(() => setPanel(null), []);
  const openCreate = (prefill) => setPanel({ mode: 'create', prefill });
  const openDetail = (id, extra) => setPanel({ mode: 'detail', id, ...extra });
  const selectRange = useCallback((startDate, endDate) => setPanel({ mode: 'create', prefill: { startDate, endDate } }), []);

  // ── Actions ──
  const handleCreate = (values) => {
    const created = addAbsence(values);
    setCalendar((c) => ({ ...c, cursor: values.startDate }));
    notify(`Demande ${created.id} soumise.`);
    openDetail(created.id);
  };

  const handleEdit = (id, values) => {
    updateAbsence(id, values);
    notify(`Demande ${id} modifiée.`);
    openDetail(id);
  };

  const handleApprove = (id) => {
    decide(id, 'approved');
    notify(`Demande ${id} approuvée.`);
  };

  const handleReject = (id, note = '') => {
    decide(id, 'rejected', note);
    notify(`Demande ${id} refusée.`);
  };

  const handleDelete = (id) => {
    removeAbsence(id);
    closePanel();
    notify(`Demande ${id} supprimée.`);
  };

  const showInCalendar = (date) => {
    setCalendar((c) => ({ ...c, cursor: date }));
    closePanel();
  };

  // ── Export CSV ──
  const handleExport = (kind, range) => {
    let rows = absences;
    if (kind === 'filtered') rows = requests;
    if (kind === 'range') rows = absences.filter((a) => overlaps(a, range.from, range.to));
    if (kind === 'calendar') {
      const [start, end] = calendar.view === 'week'
        ? [weekDays(calendar.cursor)[0], weekDays(calendar.cursor)[6]]
        : [startOfMonth(calendar.cursor), endOfMonth(calendar.cursor)];
      rows = visibleOnCalendar(absences, calendar).filter((a) => overlaps(a, start, end));
    }
    if (rows.length === 0) {
      notify('Aucune absence à exporter.', 'danger');
      return;
    }
    downloadCsv(`absences-${today}.csv`, absencesToCsv(rows));
    notify(`${rows.length} absence${rows.length > 1 ? 's' : ''} exportée${rows.length > 1 ? 's' : ''}.`);
  };

  // ── Contenu du panneau ──
  const target = panel?.id ? absences.find((a) => a.id === panel.id) : null;
  let panelTitle = '';
  let panelBody = null;

  if (panel?.mode === 'create') {
    panelTitle = 'Déclarer une absence';
    panelBody = (
      <AbsenceForm key={`create-${panel.prefill?.startDate}-${panel.prefill?.endDate}`} prefill={panel.prefill}
        absences={absences} submitLabel="Soumettre la demande" onSubmit={handleCreate} onCancel={closePanel} />
    );
  } else if (panel?.mode === 'edit' && target) {
    panelTitle = `Modifier ${target.id}`;
    panelBody = (
      <AbsenceForm key={`edit-${target.id}`} initial={target} absences={absences} submitLabel="Enregistrer"
        onSubmit={(values) => handleEdit(target.id, values)} onCancel={() => openDetail(target.id)} />
    );
  } else if (panel?.mode === 'detail' && target) {
    panelTitle = "Détail de l'absence";
    panelBody = (
      <AbsenceDetail key={`${target.id}-${target.status}-${panel.rejecting ? 'r' : ''}`} absence={target}
        startRejecting={Boolean(panel.rejecting)} onApprove={handleApprove} onReject={handleReject}
        onEdit={(id) => setPanel({ mode: 'edit', id })} onDelete={handleDelete} onShowInCalendar={showInCalendar} />
    );
  } else if (panel?.mode === 'day') {
    panelTitle = formatDayLong(panel.date);
    const dayAbsences = visibleOnCalendar(absences, calendar).filter((a) => overlaps(a, panel.date, panel.date));
    panelBody = (
      <DayAbsences absences={dayAbsences} onOpen={(id) => openDetail(id)}
        onCreate={() => openCreate({ startDate: panel.date, endDate: panel.date })} />
    );
  }

  return (
    <div className="space-y-5">
      <div className={`grid items-start gap-5 ${panelBody ? 'lg:grid-cols-[minmax(0,1fr)_22rem]' : ''}`}>
        <div className="min-w-0 space-y-5">
          <AbsencesHeader onCreate={() => openCreate()} onExport={handleExport} />
          <AbsenceStats stats={stats} />

          <div className={`grid items-start gap-5 ${panelBody ? '' : 'lg:grid-cols-[minmax(0,1fr)_15rem]'}`}>
            <AbsenceCalendar
              absences={absences}
              state={calendar}
              onState={(patch) => setCalendar((c) => ({ ...c, ...patch }))}
              onSelectRange={selectRange}
              onOpenAbsence={(id) => openDetail(id)}
              onOpenDay={(date) => setPanel({ mode: 'day', date })}
            />
            {!panelBody && <NextAbsenceCard absence={upcoming} onOpen={(id) => openDetail(id)} />}
          </div>

          <div>
            <AbsenceRequests
              rows={requests}
              filters={filters}
              onFilter={(key, value) => setFilters((f) => ({ ...f, [key]: value }))}
              onReset={() => setFilters(DEFAULT_REQUEST_FILTERS)}
              onExport={handleExport}
              onOpen={(id) => openDetail(id)}
              onApprove={handleApprove}
              onReject={(id) => openDetail(id, { rejecting: true })}
            />
          </div>
        </div>

        {panelBody && <AbsencePanel title={panelTitle} onClose={closePanel}>{panelBody}</AbsencePanel>}
      </div>

      <AbsenceToast notice={notice} />
    </div>
  );
};

export default Absences;

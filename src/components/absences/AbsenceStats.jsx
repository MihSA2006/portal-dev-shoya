import { CheckSquare, Clock, UserMinus, Users } from 'lucide-react';

const AbsenceStats = ({ stats }) => {
  const cards = [
    { icon: UserMinus, tone: 'accent', label: "Absents aujourd'hui", value: stats.absentToday, hint: 'Parmi les absences validées' },
    { icon: Clock, tone: 'admin', label: 'Demandes en attente', value: stats.pending, hint: 'En attente de validation' },
    { icon: CheckSquare, tone: 'accent', label: 'Validées ce mois-ci', value: stats.approvedThisMonth, hint: "Demandes d'absence" },
    { icon: Users, tone: 'lead', label: "Disponibilité de l'équipe", value: `${stats.availability} %`, hint: "Effectif présent aujourd'hui" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ icon: Icon, tone, label, value, hint }) => (
        <div key={label} className="cut-frame flex items-center gap-4 p-4 [--frame-bg:var(--surface)]" data-tone={tone}>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--tone)] bg-[var(--accent-tint)] text-[var(--tone)]">
            <Icon size={22} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm text-[var(--text-soft)]">{label}</p>
            <p className="font-display text-2xl font-semibold leading-tight">{value}</p>
            <p className="truncate text-xs text-[var(--text-muted)]">{hint}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AbsenceStats;

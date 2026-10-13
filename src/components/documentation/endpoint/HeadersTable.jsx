import OverviewCard from '../overview/OverviewCard';

const HeadersTable = ({ headers }) => (
  <OverviewCard title="En-têtes">
    <div className="overflow-x-auto border border-[var(--border)]">
      <table className="w-full min-w-[420px] text-left text-sm">
        <thead>
          <tr className="bg-[var(--surface-2)] text-xs text-[var(--text-soft)]">
            <th className="px-4 py-2.5 font-medium">Nom</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            <th className="px-4 py-2.5 text-right font-medium">Requis</th>
          </tr>
        </thead>
        <tbody>
          {headers.map((h) => (
            <tr key={h.name} className="border-t border-[var(--border)]">
              <td className="px-4 py-3 text-[var(--text)]">{h.name}</td>
              <td className="px-4 py-3 text-[var(--text-soft)]">{h.type}</td>
              <td className="px-4 py-3 text-right text-[var(--text-soft)]">{h.required ? 'Requis' : 'Optionnel'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </OverviewCard>
);

export default HeadersTable;

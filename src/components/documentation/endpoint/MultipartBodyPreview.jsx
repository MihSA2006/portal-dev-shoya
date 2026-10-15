import { bodyEntries, formatFormValue } from '../../../utils/bodyExamples';

const MultipartBodyPreview = ({ body }) => {
  const entries = bodyEntries(body);

  return (
    <div className="overflow-hidden border border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] px-4 py-3">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">Content-Type</span>
        <span className="border border-[var(--border-strong)] bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--accent)]">
          multipart/form-data
        </span>
      </div>

      {entries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-[var(--surface)] text-xs text-[var(--text-muted)]">
              <tr>
                <th scope="col" className="w-2/5 px-4 py-2.5 font-medium">Paramètre</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Valeur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {entries.map(([name, value]) => (
                <tr key={name}>
                  <th scope="row" className="break-all px-4 py-3 font-mono text-xs font-medium text-[var(--text)]">
                    {name}
                  </th>
                  <td className="break-all px-4 py-3 font-mono text-xs text-[var(--text-soft)]">
                    {formatFormValue(value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="px-4 py-6 text-center text-sm text-[var(--text-muted)]">
          Aucun paramètre à afficher.
        </p>
      )}
    </div>
  );
};

export default MultipartBodyPreview;

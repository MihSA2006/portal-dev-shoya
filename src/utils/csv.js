/**
 * Télécharge un fichier CSV.
 * columns : [{ header, value: (row) => string }]
 */
export function downloadCsv(filename, columns, rows) {
  const esc = (v) => {
    let s = String(v ?? '');
    if (/^[=+\-@]/.test(s)) s = `'${s}`; // évite l'injection de formules dans Excel
    return `"${s.replace(/"/g, '""')}"`;
  };

  const lines = [
    columns.map((c) => esc(c.header)).join(','),
    ...rows.map((r) => columns.map((c) => esc(c.value(r))).join(',')),
  ];

  const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

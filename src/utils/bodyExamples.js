import { buildExamples } from './codeExamples';

/* ───────── Valeurs ───────── */
export const sampleFor = (type) => {
  switch (String(type).toLowerCase()) {
    case 'number':
    case 'integer': return 0;
    case 'boolean': return true;
    case 'object': return {};
    case 'array': return [];
    default: return 'string';
  }
};

export const formatFormValue = (value) =>
  value !== null && typeof value === 'object' ? JSON.stringify(value) : String(value);

/** Paires [nom, valeur] du corps : depuis l'exemple, sinon depuis le schéma. */
export function bodyEntries(body) {
  if (!body) return [];
  if (body.example && typeof body.example === 'object' && !Array.isArray(body.example)) {
    return Object.entries(body.example);
  }
  return (body.fields ?? []).map((f) => [f.name, sampleFor(f.type)]);
}

/* ───────── Exemple du corps de la requête ───────── */
const BOUNDARY = '----ShoyaFormBoundary7MA4YWxkTrZu0gW';

export function buildFormDataText(body) {
  const entries = bodyEntries(body);
  if (entries.length === 0) return '';

  const lines = [`Content-Type: multipart/form-data; boundary=${BOUNDARY}`, ''];
  entries.forEach(([name, value]) => {
    lines.push(`--${BOUNDARY}`, `Content-Disposition: form-data; name="${name}"`, '', formatFormValue(value));
  });
  lines.push(`--${BOUNDARY}--`);
  return lines.join('\r\n');
}

export const buildBodyExampleText = (format, body) =>
  format === 'form-data' ? buildFormDataText(body) : JSON.stringify(body?.example ?? {}, null, 2);

/* ───────── Exemples de code en form-data ───────── */
const headerValue = (name) => {
  const n = name.toLowerCase();
  if (n === 'authorization') return 'Bearer YOUR_TOKEN';
  if (n === 'accept') return 'application/json';
  if (n.includes('key')) return 'YOUR_API_KEY';
  return 'VALUE';
};

const js = (s) => JSON.stringify(String(s));
const php = (s) => JSON.stringify(String(s)).replace(/\$/g, '\\$');
const sh = (s) => `'${String(s).replace(/'/g, `'\\''`)}'`;

function curlFormData({ method, url, headers, entries }) {
  const args = [
    ...headers.map((h) => `-H ${JSON.stringify(`${h.name}: ${headerValue(h.name)}`)}`),
    ...entries.map(([k, v]) => `-F ${sh(`${k}=${formatFormValue(v)}`)}`),
  ];
  return [`curl -X ${method} ${url}`, ...args].join(' \\\n  ');
}

function jsFormData({ method, url, headers, entries }) {
  return [
    'const formData = new FormData();',
    ...entries.map(([k, v]) => `formData.append(${js(k)}, ${js(formatFormValue(v))});`),
    '',
    `const response = await fetch(${js(url)}, {`,
    `  method: ${js(method)},`,
    ...(headers.length
      ? [
          '  headers: {',
          ...headers.map((h, i) => `    ${js(h.name)}: ${js(headerValue(h.name))}${i < headers.length - 1 ? ',' : ''}`),
          '  },',
        ]
      : []),
    '  body: formData',
    '});',
    '',
    'const data = await response.json();',
    'console.log(data);',
  ].join('\n');
}

function phpFormData({ method, url, headers, entries }) {
  return [
    '<?php',
    '$curl = curl_init();',
    '',
    'curl_setopt_array($curl, [',
    `    CURLOPT_URL => ${php(url)},`,
    '    CURLOPT_RETURNTRANSFER => true,',
    `    CURLOPT_CUSTOMREQUEST => ${php(method)},`,
    ...(headers.length
      ? [
          '    CURLOPT_HTTPHEADER => [',
          ...headers.map((h) => `        ${php(`${h.name}: ${headerValue(h.name)}`)},`),
          '    ],',
        ]
      : []),
    '    CURLOPT_POSTFIELDS => [',
    ...entries.map(([k, v]) => `        ${php(k)} => ${php(formatFormValue(v))},`),
    '    ],',
    ']);',
    '',
    '$response = curl_exec($curl);',
    'curl_close($curl);',
    '',
    'echo $response;',
  ].join('\n');
}

/**
 * Exemples de code (cURL / JavaScript / PHP) d'un endpoint.
 * JSON → générateur existant ; form-data → générateur ci-dessus.
 */
export function buildEndpointExamples({ endpoint, details, url, format }) {
  const body = details.body;

  if (format === 'form-data' && body) {
    const headers = (details.headers ?? []).filter(
      (h) => !/^content-type$/i.test(h.name) && (h.required || /^authorization$/i.test(h.name))
    );
    const ctx = { method: endpoint.method, url, headers, entries: bodyEntries(body) };
    return [
      { id: 'curl', label: 'cURL', code: curlFormData(ctx) },
      { id: 'javascript', label: 'JavaScript', code: jsFormData(ctx) },
      { id: 'php', label: 'PHP', code: phpFormData(ctx) },
    ];
  }

  return buildExamples({
    title: endpoint.name,
    method: endpoint.method,
    url,
    headers: details.headers,
    body: body?.example ?? null,
    status: details.response.status,
  });
}

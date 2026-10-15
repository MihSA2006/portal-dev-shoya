const isObject = (v) => v && typeof v === 'object' && !Array.isArray(v);
const quote = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const defaultHeaderExample = (name) => {
  const normalizedName = String(name ?? '').toLowerCase();
  if (normalizedName === 'authorization') return '******';
  if (normalizedName === 'accept') return 'application/json';
  if (normalizedName.includes('key')) return 'YOUR_API_KEY';
  return 'VALUE';
};
const normalizeHeader = (header) => {
  const value = header.example ?? defaultHeaderExample(header.name);
  return { ...header, example: String(value) };
};

const jsLiteral = (value, depth = 0) => {
  const pad = '  '.repeat(depth + 1);
  const end = '  '.repeat(depth);
  if (Array.isArray(value)) {
    return value.length ? `[\n${value.map((v) => pad + jsLiteral(v, depth + 1)).join(',\n')}\n${end}]` : '[]';
  }
  if (isObject(value)) {
    const entries = Object.entries(value);
    const key = (k) => (/^[a-z_$][\w$]*$/i.test(k) ? k : quote(k));
    return entries.length ? `{\n${entries.map(([k, v]) => `${pad}${key(k)}: ${jsLiteral(v, depth + 1)}`).join(',\n')}\n${end}}` : '{}';
  }
  return typeof value === 'string' ? quote(value) : String(value);
};

const phpLiteral = (value, depth = 0) => {
  const pad = '  '.repeat(depth + 1);
  const end = '  '.repeat(depth);
  if (Array.isArray(value)) {
    return value.length ? `[\n${value.map((v) => pad + phpLiteral(v, depth + 1)).join(',\n')}\n${end}]` : '[]';
  }
  if (isObject(value)) {
    const entries = Object.entries(value);
    return entries.length ? `[\n${entries.map(([k, v]) => `${pad}${quote(k)} => ${phpLiteral(v, depth + 1)}`).join(',\n')}\n${end}]` : '[]';
  }
  return typeof value === 'string' ? quote(value) : String(value);
};

const curlExample = ({ title, method, url, headers, body }) => {
  const parts = [`curl -X ${method} ${url}`, ...headers.map((h) => `  -H "${h.name}: ${h.example}"`)];
  if (body) parts.push(`  -d '${JSON.stringify(body, null, 2).split('\n').map((l, i) => (i ? `  ${l}` : l)).join('\n')}'`);
  return `# ${title} (cURL)\n${parts.join(' \\\n')}`;
};

const jsExample = ({ title, method, url, headers, body, status }) => {
  const headerLines = headers.map((h) => {
    const value = h.example.startsWith('Bearer ') ? '`Bearer ${token}`' : quote(h.example);
    return `    ${quote(h.name)}: ${value}`;
  });
  const options = [`  method: ${quote(method)}`, `  headers: {\n${headerLines.join(',\n')}\n  }`];
  if (body) options.push(`  body: JSON.stringify(${jsLiteral(body, 1)})`);
  const tail = status === 204 ? 'console.log(response.status);' : 'const data = await response.json();\nconsole.log(data);';
  return `// ${title} (JavaScript)\nconst response = await fetch(${quote(url)}, {\n${options.join(',\n')}\n});\n\n${tail}`;
};

const phpExample = ({ title, method, url, headers, body }) => {
  const lines = [`// ${title} (PHP)`, `$ch = curl_init(${quote(url)});`];
  if (method === 'POST') lines.push('curl_setopt($ch, CURLOPT_POST, true);');
  else if (method !== 'GET') lines.push(`curl_setopt($ch, CURLOPT_CUSTOMREQUEST, ${quote(method)});`);
  lines.push('curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);');
  lines.push(`curl_setopt($ch, CURLOPT_HTTPHEADER, [\n${headers.map((h) => `  ${quote(`${h.name}: ${h.example}`)}`).join(',\n')}\n]);`);
  if (body) lines.push(`curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(${phpLiteral(body, 0)}));`);
  lines.push('$response = curl_exec($ch);', 'curl_close($ch);', 'echo $response;');
  return lines.join('\n');
};

/** Exemples de code dans les trois langages. `headers` : seuls les en-têtes requis sont inclus. */
export const buildExamples = ({ title, method, url, headers, body, status }) => {
  const input = {
    title,
    method,
    url,
    headers: (headers ?? []).filter((h) => h.required).map(normalizeHeader),
    body,
    status,
  };
  return [
    { id: 'curl', label: 'cURL', code: curlExample(input) },
    { id: 'js', label: 'JavaScript', code: jsExample(input) },
    { id: 'php', label: 'PHP', code: phpExample(input) },
  ];
};

import CodeBlock from '../ui/CodeBlock';

/** Bloc de code de l'aperçu : libellé du langage + coloration + bouton copier. */
const GuideCodeBlock = ({ lang, code }) => (
  <figure className="border border-[var(--border)] bg-[var(--bg-elevated)]">
    {lang && <figcaption className="px-4 pt-2 text-[11px] text-[var(--text-muted)]">{lang}</figcaption>}
    <CodeBlock code={code} className="!border-0" />
  </figure>
);

export default GuideCodeBlock;

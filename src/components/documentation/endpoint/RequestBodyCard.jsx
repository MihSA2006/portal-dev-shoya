import CodeBlock from '../../ui/CodeBlock';
import OverviewCard from '../overview/OverviewCard';
import SchemaTree from './SchemaTree';

const Pill = ({ children }) => (
  <span className="border border-[var(--border-strong)] bg-[var(--surface-2)] px-2.5 py-1 text-xs text-[var(--text-soft)]">{children}</span>
);

const RequestBodyCard = ({ body }) => (
  <OverviewCard title="Corps de la requête" action={<Pill>application/json</Pill>}>
    {body.fields.length === 0 ? (
      <p className="border border-dashed border-[var(--border-strong)] py-8 text-center text-sm text-[var(--text-muted)]">
        Schéma de requête non documenté pour cet endpoint.
      </p>
    ) : (
      <div className="ep-cols">
        <SchemaTree fields={body.fields} />
        <div>
          <p className="mb-2 text-sm font-medium text-[var(--text)]">Exemple</p>
          <CodeBlock code={JSON.stringify(body.example, null, 2)} />
        </div>
      </div>
    )}
  </OverviewCard>
);

export default RequestBodyCard;

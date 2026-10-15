import CodeBlock from '../../ui/CodeBlock';
import OverviewCard from '../overview/OverviewCard';
import SchemaTree from './SchemaTree';
import BodyFormatSwitch from './BodyFormatSwitch';
import { buildBodyExampleText } from '../../../utils/bodyExamples';
import MultipartBodyPreview from './MultipartBodyPreview';

const RequestBodyCard = ({ body, format = 'json', onFormat }) => (
  <OverviewCard
    title="Corps de la requête"
    action={onFormat ? <BodyFormatSwitch value={format} onChange={onFormat} /> : null}
  >
    {body.fields.length === 0 ? (
      <p className="border border-dashed border-[var(--border-strong)] py-8 text-center text-sm text-[var(--text-muted)]">
        Schéma de requête non documenté pour cet endpoint.
      </p>
    ) : (
      <div className="ep-cols">
        <SchemaTree fields={body.fields} />
        <div>
          <p className="mb-2 text-sm font-medium text-[var(--text)]">
            Exemple <span className="font-normal text-[var(--text-muted)]">· {format === 'form-data' ? 'multipart/form-data' : 'application/json'}</span>
          </p>
          {format === 'form-data' ? (
            <MultipartBodyPreview body={body} />
          ) : (
            <CodeBlock code={buildBodyExampleText(format, body)} />
          )}
        </div>
      </div>
    )}
  </OverviewCard>
);

export default RequestBodyCard;

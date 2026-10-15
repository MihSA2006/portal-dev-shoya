import CompletenessCard from './CompletenessCard';
import BasicInfoEditor from './BasicInfoEditor';
import DescriptionEditor from './DescriptionEditor';
import AuthEditor from './AuthEditor';
import HeadersEditor from './HeadersEditor';
import BodyEditor from './BodyEditor';
import ResponseEditor from './ResponseEditor';
import ErrorsEditor from './ErrorsEditor';

/**
 * Formulaire d'édition d'un endpoint.
 * draft / onChange(patch) / issues (validation) / showIssues (affichées après une tentative d'enregistrement)
 */
export default function EndpointEditor({ draft, onChange, issues, showIssues, baseUrl, bodyFormat, onBodyFormat }) {
  return (
    <div className="space-y-5">
      <CompletenessCard draft={draft} />
      <BasicInfoEditor draft={draft} onChange={onChange} issues={issues} showIssues={showIssues} baseUrl={baseUrl} />
      <DescriptionEditor value={draft.description} onChange={(description) => onChange({ description })} />
      <AuthEditor draft={draft} onChange={onChange} />
      <HeadersEditor headers={draft.headers} onChange={(headers) => onChange({ headers })} issues={issues} showIssues={showIssues} />
      <BodyEditor draft={draft} onChange={onChange} issues={issues} showIssues={showIssues} format={bodyFormat} onFormat={onBodyFormat} />

      <div className="ep-cols">
        <ResponseEditor draft={draft} onChange={onChange} issues={issues} showIssues={showIssues} />
        <ErrorsEditor draft={draft} onChange={onChange} issues={issues} showIssues={showIssues} />
      </div>
    </div>
  );
}

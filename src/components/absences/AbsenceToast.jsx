import { CheckCircle2, TriangleAlert } from 'lucide-react';

const AbsenceToast = ({ notice }) =>
  notice && (
    <div
      className="anim-pop fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2.5 border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-3 text-sm shadow-lg"
      role="status"
    >
      {notice.tone === 'danger'
        ? <TriangleAlert className="text-[var(--danger)]" size={17} />
        : <CheckCircle2 className="text-[var(--accent)]" size={17} />}
      {notice.message}
    </div>
  );

export default AbsenceToast;

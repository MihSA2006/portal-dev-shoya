import { ClipboardList, Clock, FileText, GitBranch, GitCommitHorizontal, GitPullRequest, Pencil } from 'lucide-react';
import { ASSIGNEES_BY_ID } from '../../../constants/tasks';
import { getInitials, timeAgo } from '../../../utils/tasks';
import DetailCard from './DetailCard';

const EVENT_TYPES = {
  created: { icon: ClipboardList, tone: 'dev' },
  branch: { icon: GitBranch, tone: 'accent' },
  commit: { icon: GitCommitHorizontal, tone: 'lead' },
  pr: { icon: GitPullRequest, tone: 'doc' },
  docs: { icon: FileText, tone: 'doc' },
  updated: { icon: Pencil, tone: 'admin' },
};

const TaskTimeline = ({ events }) => (
  <DetailCard icon={Clock} title="Historique">
    {events.length === 0 ? (
      <p className="text-sm text-[var(--text-muted)]">Aucun événement pour le moment.</p>
    ) : (
      <ol>
        {events.map((event, index) => {
          const { icon: Icon, tone } = EVENT_TYPES[event.type] ?? EVENT_TYPES.updated;
          const author = ASSIGNEES_BY_ID[event.by];
          const isLast = index === events.length - 1;
          return (
            <li
              key={event.id}
              data-tone={tone}
              className={`relative flex items-center gap-4 py-3 ${isLast ? '' : 'border-b border-[var(--border)]'}`}
            >
              {!isLast && <span className="absolute -bottom-3 left-[1.125rem] top-[3.25rem] w-px bg-[var(--border-strong)]" />}
              <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center border border-[var(--tone)] bg-[var(--accent-tint)] text-[var(--tone)]">
                <Icon size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{event.title}</p>
                <p className="truncate text-xs text-[var(--text-muted)]">{event.detail}</p>
              </div>
              <div className="flex shrink-0 items-center gap-6 text-sm text-[var(--text-muted)]">
                <span className="hidden sm:inline" title={author?.label}>par {getInitials(author?.label)}</span>
                <span>{timeAgo(event.at)}</span>
              </div>
            </li>
          );
        })}
      </ol>
    )}
  </DetailCard>
);

export default TaskTimeline;

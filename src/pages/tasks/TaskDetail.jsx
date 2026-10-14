import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import GithubSyncCard from '../../components/tasks/detail/GithubSyncCard';
import GithubActivityCard from '../../components/tasks/detail/GithubActivityCard';
import QuickActionsCard from '../../components/tasks/detail/QuickActionsCard';
import TaskDetailHeader from '../../components/tasks/detail/TaskDetailHeader';
import TaskDocsCard from '../../components/tasks/detail/TaskDocsCard';
import TaskInfoCard from '../../components/tasks/detail/TaskInfoCard';
import TaskTimeline from '../../components/tasks/detail/TaskTimeline';
import {
  ASSIGNEES_BY_ID, CYCLES_BY_ID, ENDPOINTS_BY_ID, PROJECTS_BY_ID, STATUSES_BY_ID, TASKS_ROUTE,
} from '../../constants/tasks';
import { useTasksContext } from '../../context/TasksContext';

const BackLink = () => (
  <Link to={TASKS_ROUTE} className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline">
    <ArrowLeft size={17} />
    Retour aux tâches
  </Link>
);

const toDraft = (task) => ({
  title: task.title,
  description: task.description,
  status: task.status,
  assigneeId: task.assigneeId,
  cycleId: task.cycleId,
  acceptanceCriteria: task.acceptanceCriteria.map((c) => ({ ...c })),
});

const TaskDetail = () => {
  const { taskKey } = useParams();
  const { tasks, updateTask, toggleStar } = useTasksContext();
  const task = tasks.find((t) => t.key === taskKey);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState('');

  if (!task) {
    return (
      <div className="space-y-5">
        <BackLink />
        <div className="cut-frame px-5 py-12 text-center [--frame-bg:var(--surface)]">
          <p className="font-medium">Tâche introuvable</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Elle a peut-être été supprimée ou le lien est incorrect.</p>
        </div>
      </div>
    );
  }

  // En édition, l'interface reflète le brouillon ; sinon la tâche enregistrée.
  const view = editing ? draft : task;
  const endpoints = task.endpointIds.map((id) => ENDPOINTS_BY_ID[id]).filter(Boolean);

  const change = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    if (key === 'title') setError('');
  };

  const startEdit = () => {
    setDraft(toDraft(task));
    setError('');
    setEditing(true);
  };

  const cancel = () => {
    setEditing(false);
    setDraft(null);
    setError('');
  };

  const save = () => {
    const title = draft.title.trim();
    if (!title) {
      setError('Le titre est obligatoire.');
      return;
    }
    updateTask(task.id, {
      ...draft,
      title,
      description: draft.description.trim(),
      acceptanceCriteria: draft.acceptanceCriteria
        .map((c) => ({ ...c, text: c.text.trim() }))
        .filter((c) => c.text),
    });
    cancel();
  };

  return (
    <div className="space-y-5">
      <BackLink />

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <TaskDetailHeader
          task={task}
          project={PROJECTS_BY_ID[task.projectId]}
          status={STATUSES_BY_ID[view.status]}
          editing={editing}
          draft={draft}
          error={error}
          onChange={change}
          onEdit={startEdit}
          onCancel={cancel}
          onSave={save}
          onToggleStar={() => toggleStar(task.id)}
        />
        <GithubSyncCard github={task.github} />

        <div className="min-w-0 space-y-5">
          <TaskInfoCard
            task={task}
            view={view}
            editing={editing}
            endpoints={endpoints}
            assignee={ASSIGNEES_BY_ID[view.assigneeId]}
            createdBy={ASSIGNEES_BY_ID[task.createdBy]}
            cycle={CYCLES_BY_ID[view.cycleId]}
            onChange={change}
          />
          <TaskTimeline events={task.timeline} />
        </div>

        <div className="space-y-5">
          <GithubActivityCard github={task.github} />
          <TaskDocsCard endpoints={endpoints} />
          <QuickActionsCard github={task.github} hasEndpoints={endpoints.length > 0} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;

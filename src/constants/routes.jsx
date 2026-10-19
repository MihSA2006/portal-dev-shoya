import { Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PenLine,
  CheckSquare,
  CalendarOff,
  BookOpen,
  Users,
  Settings,
} from 'lucide-react';

import Dashboard from '../pages/Dashboard.jsx';
import Documentation from '../pages/Documentation.jsx';
import DocumentationProject from '../pages/DocumentationProject.jsx';
import ActivityEntry from '../pages/ActivityEntry.jsx';
import Tasks from '../pages/Tasks.jsx';
import TaskDetail from '../pages/tasks/TaskDetail.jsx';
import EndpointCreate from '../pages/documentation/EndpointCreate.jsx';
import GuideCreate from '../pages/GuideCreate.jsx';
import GuideEditor from '../pages/guides/GuideEditor.jsx';
import Absences from '../pages/Absences.jsx';
import SettingsPage from '../pages/Settings.jsx';

// Administration sub-pages.
import AdminUsers from '../pages/administration/Users.jsx';
import AdminProjects from '../pages/administration/Projects.jsx';
import AdminAlertThresholds from '../pages/administration/AlertThresholds.jsx';
import AdminAuditLog from '../pages/administration/AuditLog.jsx';

const SUFFIX = 'Portal Dev Shoya';

/**
 * Navigation tree (used by the Sidebar). An item with `children` becomes a collapsible group.
 * `submenu: 'projects'` : la Sidebar affiche <DocsSubmenu /> (un lien par projet) sous cet élément.
 */
export const PAGES = [
  { path: '/', name: 'Tableau de bord', title: `Tableau de bord | ${SUFFIX}`, icon: LayoutDashboard, element: <Dashboard /> },
  { path: '/documentation', name: 'Documentation', title: `Documentation | ${SUFFIX}`, icon: FileText, element: <Documentation />, submenu: 'projects' },
  { path: '/activity-entry', name: 'Saisie', title: `Saisie | ${SUFFIX}`, icon: PenLine, element: <ActivityEntry /> },
  { path: '/guides', name: 'Guides', title: `Guides | ${SUFFIX}`, icon: BookOpen, element: <GuideCreate /> },
  { path: '/tasks', name: 'Tâches', title: `Tâches | ${SUFFIX}`, icon: CheckSquare, element: <Tasks />, badge: 3 },
  { path: '/absences', name: 'Absences', title: `Absences | ${SUFFIX}`, icon: CalendarOff, element: <Absences /> },
  {
    path: '/administration',
    name: 'Administration',
    icon: Users,
    children: [
      { path: '/administration/users', name: 'Utilisateurs', title: `Utilisateurs | ${SUFFIX}`, element: <AdminUsers /> },
      { path: '/administration/projects', name: 'Projets', title: `Projets | ${SUFFIX}`, element: <AdminProjects /> },
      { path: '/administration/alert-thresholds', name: "Seuils d'alerte", title: `Seuils d'alerte | ${SUFFIX}`, element: <AdminAlertThresholds /> },
      { path: '/administration/audit-log', name: "Journal d'audit", title: `Journal d'audit | ${SUFFIX}`, element: <AdminAuditLog /> },
    ],
  },
  { path: '/settings', name: 'Paramètres', title: `Paramètres | ${SUFFIX}`, icon: Settings, element: <SettingsPage /> },
];

/** Routes absentes du menu (pages dynamiques). */
const HIDDEN_ROUTES = [
  { path: '/tasks/:taskKey', title: `Détail de la tâche | ${SUFFIX}`, element: <TaskDetail /> },
  { path: '/endpoints/new', title: `Créer un endpoint | ${SUFFIX}`, element: <EndpointCreate /> },
  // /guides/new : compatibilité du lien de création du WorkspaceSidebar.
  { path: '/guides/new', element: <Navigate to="/guides" replace /> },
  { path: '/guides/:guideId', title: `Éditeur de guide | ${SUFFIX}`, element: <GuideEditor /> },
  { path: '/documentation/:projectSlug/*', title: `Documentation | ${SUFFIX}`, element: <DocumentationProject /> },
];

/** Flat list of routes (used by App). /administration redirects to its first child. */
export const ROUTES = [
  ...PAGES.flatMap((page) =>
    page.children
      ? [{ path: page.path, element: <Navigate to={page.children[0].path} replace /> }, ...page.children]
      : [page]
  ),
  ...HIDDEN_ROUTES,
];

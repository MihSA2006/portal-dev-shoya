# Portal Dev Shoya

A responsive project and team management portal built with React, Vite, Tailwind CSS, and React Router. The application interface is in French.

## Features

- Responsive application layout with collapsible navigation and light/dark themes
- Dashboard, activity entry, absences, settings, and task board
- Task board with project, assignee, status, and cycle filters; drag-and-drop status changes; and task creation
- Project documentation with project overviews, endpoint details, request examples, and a searchable project directory
- Documentation URLs use project and endpoint slugs, for example `/documentation/shoya-wallet/endpoints/consulter-le-solde`
- Documentation search can be focused with `Ctrl+L` (`Cmd+L` on macOS)
- Administration pages for users, projects, alert thresholds, and audit history
- Shared dropdowns, popovers, and dialogs
- Client-side routing with page-specific document titles

The application currently uses demonstration data and in-memory client state. Changes are not persisted after a page reload, and no backend API is configured.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Open the local URL printed by Vite in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot module replacement. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## Routes

| Path | Page |
| --- | --- |
| `/` | Dashboard |
| `/documentation` | Documentation project directory and search |
| `/documentation/:projectSlug` | Project documentation overview |
| `/documentation/:projectSlug/endpoints/:endpointSlug` | Endpoint details and code examples |
| `/activity-entry` | Activity entry |
| `/tasks` | Task board |
| `/tasks/:taskKey` | Task details |
| `/absences` | Absences |
| `/administration/users` | Administration: users |
| `/administration/projects` | Administration: projects |
| `/administration/alert-thresholds` | Administration: alert thresholds |
| `/administration/audit-log` | Administration: audit log |
| `/settings` | Settings |

Visiting `/administration` redirects to `/administration/users`.

## Deployment base path

Vite is configured with `/portal-dev-shoya/` as the application base path. The router uses this base path, so deployed URLs include it before the routes above. For example:

```text
/portal-dev-shoya/documentation/shoya-wallet
```

Update the `base` value in `vite.config.js` if deploying under a different path.

## Project structure

```text
src/
├── components/
│   ├── audit/            # Audit log filters, table, and details
│   ├── documentation/    # Documentation directory, project views, and endpoint details
│   ├── layout/           # Navbar, sidebars, and shared application layout
│   ├── projects/         # Project administration panels and tabs
│   ├── tasks/            # Task board, filters, columns, and task creation
│   └── ui/               # Shared UI components
├── constants/            # Routes and demonstration data
├── context/              # Shared project and task state
├── hooks/                # Reusable React hooks
├── pages/                # Application pages
│   ├── administration/   # Administration pages
│   └── documentation/    # Documentation overview and endpoint pages
└── utils/                # Data formatting and domain helpers
```

## Technology

- React 19
- Vite 8
- React Router 7
- Tailwind CSS 3
- Lucide React
- ESLint

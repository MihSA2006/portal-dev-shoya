# Portal Dev Shoya

A responsive project and team management portal built with React, Vite, Tailwind CSS, and React Router. The application interface is in French.

## Features

- Responsive layout with collapsible sidebar navigation
- Dark and light themes
- Dashboard, documentation, activity entry, tasks, absences, and settings pages
- Administration pages for users, projects, alert thresholds, and audit history
- Search and filters on administration tables
- Client-side routing with page-specific document titles

Administration pages currently use static sample data. Connect them to an API to load and manage live data.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

Install the dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Vite prints the local URL in the terminal. Open it in a browser to use the application.

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
| `/documentation` | Documentation |
| `/activity-entry` | Activity entry |
| `/tasks` | Tasks |
| `/absences` | Absences |
| `/administration/users` | Administration: users |
| `/administration/projects` | Administration: projects |
| `/administration/alert-thresholds` | Administration: alert thresholds |
| `/administration/audit-log` | Administration: audit log |
| `/settings` | Settings |

Visiting `/administration` redirects to the users page.

## Project structure

```text
src/
├── components/
│   ├── layout/          # Navbar, sidebar, and shared layout
│   └── ui/              # Reusable interface components
├── constants/           # Route configuration
├── hooks/               # Shared React hooks
└── pages/               # Application pages
    └── administration/  # Administration sub-pages
```

## Technology

- React 19
- Vite 8
- React Router 7
- Tailwind CSS 3
- Lucide React
- ESLint

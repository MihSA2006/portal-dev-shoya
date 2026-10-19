import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ProjectsProvider } from './context/ProjectsContext.jsx';
import { EndpointsProvider } from './context/EndpointsContext.jsx';
import { TasksProvider } from './context/TasksContext.jsx';
import { GuidesProvider } from './context/GuidesContext.jsx';
import './index.css'; // Global styles.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ProjectsProvider>
        <EndpointsProvider>
          <TasksProvider>
            <GuidesProvider>
              <App />
            </GuidesProvider>
          </TasksProvider>
        </EndpointsProvider>
      </ProjectsProvider>
    </BrowserRouter>
  </React.StrictMode>
);

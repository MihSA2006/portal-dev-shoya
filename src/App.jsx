import React, { useEffect } from 'react';
import { Routes, Route, matchPath, useLocation } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import Layout from './components/layout/Layout';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // matchPath gère aussi les routes dynamiques (ex. /documentation/:projectSlug).
    const current = ROUTES.find((route) => matchPath({ path: route.path, end: true }, location.pathname));
    if (current?.title) document.title = current.title;
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<Layout />}>
        {ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default App;

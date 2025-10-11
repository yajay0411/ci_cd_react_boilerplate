import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { CONFIG } from '@/configuration/config';

// Lazy imports
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));
const HomePage = lazy(() => import('@pages/MyHomePage/MyHomePage'));

const AllImages = lazy(() => import('@/components/dev/AllImages/AllImages'));
const FormikPlayground = lazy(() => import('@/components/dev/Playground/FormikPlayground'));

// ---- Route Config ----
type AppRoute = {
  path?: string;
  element?: React.ReactElement;
  children?: AppRoute[];
  index?: boolean;
};

const routeConfig: AppRoute[] = [
  { path: '/', element: <HomePage /> },
  ...(CONFIG.NODE_ENV === 'development'
    ? [
        {
          path: '/dev',
          children: [
            { path: 'all_images', element: <AllImages /> },
            {
              path: 'playground',
              children: [
                { index: true, element: <FormikPlayground /> },
                { path: 'form', element: <FormikPlayground /> },
              ],
            },
          ],
        },
      ]
    : []),

  { path: '*', element: <NotFoundPage /> },
];

// ---- Recursive Renderer ----
const renderRoutes = (routes: AppRoute[]) =>
  routes.map(({ path, element, children, index }) => {
    if (index) {
      return <Route key={`index-${path ?? ''}`} index element={element} />;
    }

    if (children) {
      return (
        <Route key={path} path={path} element={element}>
          {renderRoutes(children)}
        </Route>
      );
    }

    return <Route key={path} path={path} element={element} />;
  });

// ---- Component ----
const AppRoutes: React.FC = () => (
  <Suspense fallback={'Loading'}>
    <Routes>{renderRoutes(routeConfig)}</Routes>
  </Suspense>
);

export default AppRoutes;

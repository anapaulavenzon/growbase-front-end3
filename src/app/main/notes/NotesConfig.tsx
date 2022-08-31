import { authRoles } from 'app/auth';
import { lazy } from 'react';

const Notes = lazy(() => import('./list/Notes'));
const Note = lazy(() => import('./detail/Note'));

const NotesConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: true,
        },
        toolbar: {
          display: true,
        },
      },
    },
  },
  auth: authRoles.admin, // isso aqui tem que existir
  routes: [
    {
      path: 'notes',
      element: <Notes />,
    },
    {
      path: 'notes/:id',
      element: <Note />,
    },
  ],
};

export default NotesConfig;

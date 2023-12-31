import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components//Navigation/Navigation';
import OpeningPage from './components/OpeningPage/OpeningPage';
import GroupsList from './components/ListsPage/Lists/Groups/GroupsList/GroupsList';
import GroupDetailsPage from './components/GroupDetailsPage/GroupDetailsPage';
import CreateAGroupPage from './components/CreateAGroupPage/CreateAGroupPage';
import UpdateAGroupPage from './components/UpdateAGroupPage/UpdateAGroupPage';
import EventsList from './components/ListsPage/Lists/Events/EventsList/EventsList';
import EventDetailsPage from './components/EventDetailsPage/EventDetailsPage';
import CreateEventPage from './components/CreateEventPage/CreateEventPage';
import { Modal } from './context/Modal';
import * as sessionActions from './store/session';
import './index.css'

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Modal />
      <Navigation isLoaded={isLoaded} />
      <main>
      {isLoaded && <Outlet />}
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <OpeningPage />
      },
      {
        path: '/groups',
        element: <GroupsList />,
      },
      {
        path: '/groups/:groupId',
        element: <GroupDetailsPage/>
      },
      {
        path: '/groups/new',
        element: <CreateAGroupPage />
      },
      {
        path: '/groups/:groupId/edit',
        element: <UpdateAGroupPage />
      },
      {
        path: '/events',
        element: <EventsList />
      },
      {
        path: '/events/:eventId',
        element: <EventDetailsPage />
      },
      {
        path: '/groups/:groupId/events/new',
        element: <CreateEventPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

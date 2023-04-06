import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserList } from './page-components/UserList/UserList';
import { SnackbarProvider } from 'notistack';
import { getUserById } from './common/UserLocalStorageController';
import { UserCreateForm } from './page-components/UserCreateForm/UserCreateForm';

function loader(props: any) {
  const { request } = props;
  const url = new URL(request.url);
  const currentUserId = Number(url.searchParams.get('userId'));
  const currentUser = getUserById(currentUserId);

  return { currentUser };
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserList />,
  },
  {
    path: '/form',
    element: <UserCreateForm />,
    loader,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={5} autoHideDuration={4000}>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

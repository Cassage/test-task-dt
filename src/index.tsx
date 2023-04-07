import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserList } from './page-components/UserList/UserList';
import { SnackbarProvider } from 'notistack';
import { ApolloProvider } from '@apollo/client';
import { UserCreateForm } from './page-components/UserCreateForm/UserCreateForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GET_USERS } from './common/Apollo/apolloQueries';
import client from './common/Apollo/client';

const apolloClient = client;

const { cache } = apolloClient;

cache.writeQuery({
  query: GET_USERS,
  data: {
    users: [],
  },
});

function loader(props: any) {
  const { request } = props;
  const url = new URL(request.url);
  const currentUserId = Number(url.searchParams.get('userId'));

  return { currentUserId };
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
    <ApolloProvider client={client}>
      <SnackbarProvider maxSnack={5} autoHideDuration={4000}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

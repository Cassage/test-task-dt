import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserList } from './page-components/UserList/UserList';
import { SnackbarProvider } from 'notistack';
import {
  gql,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { UserCreateForm } from './page-components/UserCreateForm/UserCreateForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { IUser } from './common/UserDataModel';

const cache = new InMemoryCache();

const GET_USERS = gql`
  query getUsers {
    users
  }
`;

const client = new ApolloClient({
  cache,
  resolvers: {
    Query: {
      getUserById: (_root, variables, { cache }) => {
        const { id } = variables;

        const query = gql`
          query getUsers {
            users
          }
        `;

        const { users } = cache.readQuery({ query });

        const userIndex = users.findIndex((user: IUser) => user.id === id);

        return users[userIndex];
      },
    },
    Mutation: {
      addUser: (_root, variables, { cache }) => {
        const { user } = variables;

        const query = gql`
          query getUsers {
            users
          }
        `;

        const { users } = cache.readQuery({ query });

        const data = {
          users: [user, ...users],
        };

        cache.writeQuery({ query, data });

        return null;
      },
      modifyUser: (_root, variables, { cache }) => {
        const { user } = variables;

        const query = gql`
          query getUsers {
            users
          }
        `;

        const { id } = user;

        const { users } = cache.readQuery({ query });

        const userIndex = users.findIndex((user: IUser) => user.id === id);

        users[userIndex] = user;

        const data = {
          users: [user, ...users],
        };

        cache.writeQuery({ query, data });

        return null;
      },

      deleteUser: (_root, variables, { cache }) => {
        const { id } = variables;

        const query = gql`
          query getUsers {
            users
          }
        `;

        const { users } = cache.readQuery({ query });

        const userIndex = users.findIndex((user: IUser) => user.id === id);

        const usersCopy = [...users];

        usersCopy.splice(userIndex, 1);

        const data = {
          users: [...usersCopy],
        };

        cache.writeQuery({ query, data });

        return null;
      },
    },
  },
});

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

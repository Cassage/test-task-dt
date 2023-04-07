import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_USERS } from './apolloQueries';
import { IUser } from '../UserDataModel';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  resolvers: {
    Query: {
      getUserById: (_root, variables, { cache }) => {
        const { id } = variables;

        const query = GET_USERS;

        const { users } = cache.readQuery({ query });

        const userIndex = users.findIndex((user: IUser) => user.id === id);

        return users[userIndex];
      },
    },
    Mutation: {
      addUser: (_root, variables, { cache }) => {
        const { user } = variables;

        const query = GET_USERS;

        const { users } = cache.readQuery({ query });

        user.id = users[0]?.id + 1 || 1;

        const data = {
          users: [user, ...users],
        };

        cache.writeQuery({ query, data });

        return null;
      },
      modifyUser: (_root, variables, { cache }) => {
        const { user } = variables;

        const query = GET_USERS;

        const { id } = user;

        const { users } = cache.readQuery({ query });

        const usersCopy = [...users];

        const userIndex = users.findIndex((user: IUser) => user.id === id);

        usersCopy[userIndex] = user;

        const data = {
          users: [...usersCopy],
        };

        cache.writeQuery({ query, data });

        return null;
      },

      deleteUser: (_root, variables, { cache }) => {
        const { id } = variables;

        const query = GET_USERS;

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

export default client;

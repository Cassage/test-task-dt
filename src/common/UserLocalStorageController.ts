import { IUser } from './UserDataModel';

export const getUsers = () => {
  let users: IUser[] = [];
  try {
    const stringifiedUsers = localStorage.getItem('users');

    if (stringifiedUsers !== null) {
      users = JSON.parse(stringifiedUsers);
    }
  } catch (e) {
    users = [];
  }

  return users;
};

export const getUserById = (id: number) => {
  const users = getUsers();

  return users.find((user) => user.id === id);
};

export const addUser = (user: IUser) => {
  let users: IUser[] = [];
  try {
    const stringifiedUsers = localStorage.getItem('users');

    if (stringifiedUsers !== null) {
      users = JSON.parse(stringifiedUsers);
    }
  } catch (e) {
    users = [];
  }

  const userId = users[users.length - 1]?.id + 1 || 1;

  user.id = userId;

  users.push(user);

  localStorage.setItem('users', JSON.stringify(users));
};

export const modifyUser = (user: IUser) => {
  const { id } = user;
  let users: IUser[] = [];
  try {
    const stringifiedUsers = localStorage.getItem('users');

    if (stringifiedUsers !== null) {
      users = JSON.parse(stringifiedUsers);
    }
  } catch (e) {
    users = [];
  }

  const userIndex = users.findIndex((user) => user.id === id);

  users[userIndex] = user;

  localStorage.setItem('users', JSON.stringify(users));
};

export const deleteUser = (id: number) => {
  let users: IUser[] = [];
  try {
    const stringifiedUsers = localStorage.getItem('users');

    if (stringifiedUsers !== null) {
      users = JSON.parse(stringifiedUsers);
    }
  } catch (e) {
    users = [];
  }

  const userIndex = users.findIndex((user) => user.id === id);

  users.splice(userIndex, 1);

  localStorage.setItem('users', JSON.stringify(users));
};

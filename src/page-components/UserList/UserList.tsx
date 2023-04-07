import { Button } from 'react-bootstrap';
import { UserCard } from './UserCard/UserCard';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { IUser } from '../../common/UserDataModel';

const GET_USERS = gql`
  query getUsers {
    users @client {
      id
      username
      firstName
      lastName
    }
  }
`;

export const UserList = () => {
  const { data } = useQuery(GET_USERS);

  const { users } = data;

  const [userSearchQuery, setUserSearchQuery] = useState<string>('');

  return (
    <div className="container pt-3">
      <div className="d-flex gap-3">
        {!!users.length && (
          <input
            placeholder="Юзернейм"
            value={userSearchQuery}
            onChange={(e) => setUserSearchQuery(e.currentTarget.value)}
          />
        )}
        <Link to={`/form`}>
          <Button style={{ float: 'right' }}>
            Добавить нового пользователя
          </Button>
        </Link>
      </div>
      <div className="row justify-content-start">
        {(users as IUser[])
          .filter((user) =>
            user.username
              .toLowerCase()
              .startsWith(userSearchQuery.toLowerCase())
          )
          .map((user, index) => {
            return <UserCard key={index} user={user} />;
          })}
      </div>
    </div>
  );
};

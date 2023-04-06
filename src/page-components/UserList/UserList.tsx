import { Button } from 'react-bootstrap';
import { UserCard } from './UserCard/UserCard';
import { Link } from 'react-router-dom';
import { getUsers } from '../../common/UserLocalStorageController';
import { useState } from 'react';

export const UserList = () => {
  const users = getUsers();

  const [userSearchQuery, setUserSearchQuery] = useState<string>('');

  return (
    <div className="container pt-3">
      {!!users.length && (
        <input
          placeholder="Юзернейм"
          value={userSearchQuery}
          onChange={(e) => setUserSearchQuery(e.currentTarget.value)}
        />
      )}
      <div className="row justify-content-start">
        {users
          .filter((user) =>
            user.username
              .toLowerCase()
              .startsWith(userSearchQuery.toLowerCase())
          )
          .map((user, index) => {
            return <UserCard key={index} user={user} />;
          })}
      </div>
      <Link to={`/form`} className="fixed-bottom p-4">
        <Button style={{ float: 'right' }}>Добавить нового пользователя</Button>
      </Link>
    </div>
  );
};

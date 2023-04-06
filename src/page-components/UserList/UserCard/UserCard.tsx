import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IUser } from '../../../common/UserDataModel';
import Card from 'react-bootstrap/Card';

interface UserCardProps {
  user: IUser;
}

export const UserCard = (props: UserCardProps) => {
  const { user } = props;

  const { username, firstName, lastName } = user;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 pt-2 pb-2">
      <Card>
        <Card.Body>
          <Card.Title>Юзернейм: {username}</Card.Title>
          <Card.Text className="m-0">Имя: {firstName}</Card.Text>
          <Card.Text>Фамилия: {lastName}</Card.Text>
          <Link to={`/form?userId=${user.id}`}>
            <Button>Изменить данные</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

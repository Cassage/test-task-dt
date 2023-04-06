import { ERoles, IUser } from '../../common/UserDataModel';

export const emptyUser: IUser = {
  username: '',
  firstName: '',
  lastName: '',
  password: '',
  roles: [ERoles.ANT],
  id: 1,
  workBorders: [],
};

export const errorMessage = (error: string | string[]) => {
  return <div className="invalid-feedback d-block">{error}</div>;
};

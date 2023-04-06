export interface IWorkBorders {
  id: string;
  name: string;
}

export enum ERoles {
  ANT = 'ant',
  ANT_MANAGER = 'antManager',
  ANT_OFFICER = 'antOfficer',
  DEVELOPER = 'developer',
}

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  id: number;
  roles: ERoles[];
  workBorders: IWorkBorders[];
}

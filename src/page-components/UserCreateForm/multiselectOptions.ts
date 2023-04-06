import { ERoles } from '../../common/UserDataModel';

export const rolesOptions = [
  { value: ERoles.ANT, label: 'ANT' },
  { value: ERoles.ANT_MANAGER, label: 'ANT MANAGER' },
  { value: ERoles.ANT_OFFICER, label: 'ANT OFFICER' },
  { value: ERoles.DEVELOPER, label: 'DEVELOPER' },
];

export const workBordersOptions = [
  { value: { id: '1', name: 'Воронеж' }, label: 'Воронеж' },
  { value: { id: '2', name: 'Москва' }, label: 'Москва' },
  { value: { id: '3', name: 'Тверь' }, label: 'Тверь' },
];

import { FormikErrors } from 'formik';
import { IUser, ERoles, IWorkBorders } from '../../common/UserDataModel';

const required = 'Это поле необходимо заполнить';

export const validateStringField = (value: string, minLength: number) => {
  let error;

  switch (true) {
    case !value:
      error = required;
      break;

    case value.length < minLength:
      error = `Минимальное кол-во символов - ${minLength}`;
      break;
  }

  return error;
};

export const validateArrayField = (
  errors: FormikErrors<IUser>,
  setErrors: (errors: FormikErrors<IUser>) => void,
  key: 'roles' | 'workBorders',
  value: ERoles[] | IWorkBorders[]
) => {
  switch (true) {
    case !value.length:
      errors[key] = required;
      setErrors({ ...errors });
      break;
    default:
      delete errors[key];
  }
};

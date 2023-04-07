import { FormikErrors } from 'formik';
import { ERoles, IUser, IWorkBorders } from '../../common/UserDataModel';

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

export const validateArrayField = (value: ERoles[] | IWorkBorders[]) => {
  let error;
  switch (true) {
    case !value.length:
      error = required;
      break;
  }

  return error;
};

export const manuallyValidateArrayField = (
  errors: FormikErrors<IUser>,
  key: 'roles' | 'workBorders',
  value: ERoles[] | IWorkBorders[]
) => {
  switch (true) {
    case !value.length:
      errors[key] = required;
      break;
    default:
      delete errors[key];
  }
};

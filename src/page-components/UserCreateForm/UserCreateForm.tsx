import { Formik, Field, Form, FormikTouched } from 'formik';
import { IUser, IWorkBorders } from '../../common/UserDataModel';
import Select from 'react-select';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  addUser,
  deleteUser,
  modifyUser,
} from '../../common/UserLocalStorageController';
import { useSnackbar } from 'notistack';
import { validateStringField, validateArrayField } from './validateFunctions';
import { rolesOptions, workBordersOptions } from './multiselectOptions';
import { emptyUser, errorMessage } from './additionalFormConsts';

interface UserCreateFormProps {
  currentUser: IUser;
}

export const UserCreateForm = () => {
  const { currentUser } = useLoaderData() as UserCreateFormProps;
  const user = currentUser ?? emptyUser;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={true}
      validateOnMount={true}
      initialValues={user}
      onSubmit={(user) => {
        const message = currentUser
          ? 'Пользователь успешно обновлён'
          : 'Пользователь успешно добавлен';

        currentUser ? modifyUser(user) : addUser(user);
        goHome();
        enqueueSnackbar(message, {
          variant: 'success',
        });
      }}
    >
      {({ errors, touched, setValues, isValid, setErrors }) => {
        const generateError = (key: keyof IUser) => {
          const currentError = errors[key];

          return (
            currentError && touched[key] && errorMessage(currentError as string)
          );
        };

        return (
          <div className="container p-4">
            <h3>Форма</h3>
            <div>
              <Form className="col-sm-12 d-flex flex-column gap-2">
                <div className="form-group">
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Юзернейм"
                    name="username"
                    validate={(value: string) => validateStringField(value, 3)}
                  />
                  {generateError('username')}
                </div>

                <div className="form-group">
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Имя"
                    name="firstName"
                    validate={(value: string) => validateStringField(value, 2)}
                  />
                  {generateError('firstName')}
                </div>

                <div className="form-group">
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Фамилия"
                    name="lastName"
                  />
                </div>

                <div className="form-group">
                  <Select
                    isMulti
                    placeholder="Роль"
                    onChange={(rolesObjects) => {
                      const roles = rolesObjects.map(
                        (rolesObject) => rolesObject.value
                      );
                      validateArrayField(errors, setErrors, 'roles', roles);
                      touched.roles = true;
                      setValues((prevState) => {
                        return { ...prevState, roles };
                      });
                    }}
                    options={rolesOptions}
                    defaultValue={rolesOptions.filter((rolesOption) =>
                      user.roles.find((role) => role === rolesOption.value)
                    )}
                  />
                  {generateError('roles')}
                </div>
                <div className="form-group">
                  <Select
                    isMulti
                    placeholder="Зона работы"
                    onChange={(workBordersObjects) => {
                      const workBorders = workBordersObjects.map(
                        (workBorderObject) => workBorderObject.value
                      );
                      validateArrayField(
                        errors,
                        setErrors,
                        'workBorders',
                        workBorders
                      );
                      touched.workBorders =
                        true as unknown as FormikTouched<IWorkBorders>[];
                      setValues((prevState) => {
                        return { ...prevState, workBorders };
                      });
                    }}
                    defaultValue={workBordersOptions.filter(
                      (workBordersOption) =>
                        user.workBorders.find(
                          (workBorder) =>
                            workBorder.id === workBordersOption.value.id
                        )
                    )}
                    options={workBordersOptions}
                  />
                  {generateError('workBorders')}
                </div>

                <div className="form-group">
                  <Field
                    className="form-control"
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    validate={(value: string) => validateStringField(value, 4)}
                  />
                  {generateError('password')}
                </div>

                <div className="form-group d-flex gap-2">
                  <button
                    disabled={!isValid}
                    className="btn btn-primary"
                    type="submit"
                  >
                    {currentUser ? 'Обновить' : 'Добавить'}
                  </button>
                  <button className="btn btn-primary" onClick={goHome}>
                    Вернуться к списку
                  </button>
                  {currentUser && (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        const message = 'Пользователь успешно удалён';

                        deleteUser(user.id);
                        goHome();
                        enqueueSnackbar(message, {
                          variant: 'success',
                        });
                      }}
                    >
                      Удалить
                    </button>
                  )}
                </div>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

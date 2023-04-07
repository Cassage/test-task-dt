import { Formik, Field, Form, FormikTouched } from 'formik';
import { IUser, IWorkBorders } from '../../common/UserDataModel';
import Select from 'react-select';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  validateStringField,
  validateArrayField,
  manuallyValidateArrayField,
} from './validateFunctions';
import { rolesOptions, workBordersOptions } from './multiselectOptions';
import { emptyUser, errorMessage } from './additionalFormConsts';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../common/Apollo/apolloQueries';
import {
  ADD_USER,
  MODIFY_USER,
  DELETE_USER,
} from '../../common/Apollo/apolloMutations';

interface UserCreateFormProps {
  currentUserId: number;
}

export const UserCreateForm = () => {
  const { currentUserId } = useLoaderData() as UserCreateFormProps;

  const { data, loading } = useQuery(GET_USER_BY_ID, {
    variables: { currentUserId },
  });

  const currentUser = data?.getUserById;
  const user: IUser = currentUser || emptyUser;

  const [addUser] = useMutation(ADD_USER);
  const [modifyUser] = useMutation(MODIFY_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const goHome = () => {
    navigate('/');
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Formik
      validateOnChange={false}
      validateOnBlur={true}
      validateOnMount={true}
      initialValues={user}
      onSubmit={(user) => {
        const message = currentUser
          ? 'Пользователь успешно обновлён'
          : 'Пользователь успешно добавлен';

        currentUser
          ? modifyUser({ variables: { user } })
          : addUser({ variables: { user } });
        goHome();
        enqueueSnackbar(message, {
          variant: 'success',
        });
      }}
    >
      {({ errors, touched, setValues, isValid, values }) => {
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
                  <div className="d-none">
                    <Field
                      name="roles"
                      value={values.roles}
                      validate={validateArrayField}
                    />
                  </div>

                  <Select
                    isMulti
                    placeholder="Роль"
                    onChange={(rolesObjects) => {
                      const roles = rolesObjects.map(
                        (rolesObject) => rolesObject.value
                      );
                      touched.roles = true;
                      manuallyValidateArrayField(errors, 'roles', roles);

                      setValues((prevState) => {
                        return { ...prevState, roles };
                      });
                    }}
                    options={rolesOptions}
                    defaultValue={rolesOptions.filter((rolesOption) =>
                      values.roles.find((role) => role === rolesOption.value)
                    )}
                  />

                  {generateError('roles')}
                </div>
                <div className="form-group">
                  <div className="d-none">
                    <Field
                      name="workBorders"
                      value={values.workBorders}
                      validate={validateArrayField}
                    />
                  </div>
                  <Select
                    isMulti
                    onFocus={() => {
                      touched.workBorders =
                        true as unknown as FormikTouched<IWorkBorders>[];
                    }}
                    placeholder="Зона работы"
                    onChange={(workBordersObjects) => {
                      const workBorders = workBordersObjects.map(
                        (workBorderObject) => workBorderObject.value
                      );

                      manuallyValidateArrayField(
                        errors,
                        'workBorders',
                        workBorders
                      );

                      setValues((prevState) => {
                        return { ...prevState, workBorders };
                      });
                    }}
                    defaultValue={workBordersOptions.filter(
                      (workBordersOption) =>
                        values.workBorders.find(
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
                        deleteUser({
                          variables: { currentUserId: currentUser.id },
                        });
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

import { Container, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { LoginFormStyles } from './styles';

export type LoginFormProps = {
  onSubmit: (values: any) => void;
  showModal?: any;
};

// Pattern for password validation
const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const LoginForm: FC<LoginFormProps> = (props: LoginFormProps) => {
  // Translation hook
  const { t } = useTranslation();
  const { onSubmit, showModal } = props;

  const PASSWORD_PATTERN_WARNING = t('passwordPatternInvalid');
  const INVALID_EMAIL_TEXT = t('invalidEmail');
  const EMAIL_REQUIRED_TEXT = t('emailIdRequired');
  const PASSWORD_REQUIRED_TEXT = t('passwordRequired');

  // Email & Password Validation Schema for Formik
  const validationSchema = yup.object({
    email: yup.string().email(INVALID_EMAIL_TEXT).required(EMAIL_REQUIRED_TEXT),
    password: yup
      .string()
      .required(PASSWORD_REQUIRED_TEXT)
  });
  return (
    <Container css={LoginFormStyles.root}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form css={LoginFormStyles.loginForm}>
            <Typography css={LoginFormStyles.greeting} variant="h2">
              {t('LoginHello')}
            </Typography>
            <Field type="email" name="email">
              {({
                field,
                form: { isSubmitting }
              }: {
                field: any;
                form: { isSubmitting: boolean };
              }) => (
                <input
                  css={LoginFormStyles.field}
                  {...field}
                  disabled={isSubmitting}
                  type="text"
                  placeholder={t('LoginEmailPlaceHolder')}
                />
              )}
            </Field>
            <ErrorMessage
              name="email"
              component="div"
              css={LoginFormStyles.errorMessage}
            />
            <Field type="password" name="password">
              {({
                field,
                form: { isSubmitting }
              }: {
                field: any;
                form: { isSubmitting: boolean };
              }) => (
                <input
                  css={LoginFormStyles.field}
                  {...field}
                  disabled={isSubmitting}
                  type="password"
                  placeholder={t('LoginPasswordPlaceHolder')}
                />
              )}
            </Field>
            <ErrorMessage
              name="password"
              component="div"
              css={LoginFormStyles.errorMessage}
            />
            <button
              css={LoginFormStyles.loginBtn}
              type="submit"
              disabled={isSubmitting}
            >
              {t('Login')}
            </button>
            <a
              css={LoginFormStyles.forgotPassword}
              id="forgotpassword"
              href="#"
              onClick={() => showModal(true)}
            >
              {t('LoginPassword')}
            </a>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

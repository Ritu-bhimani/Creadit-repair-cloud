import { Box, Button, css, Grid } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import ForgotPasswordImg from '../../assets/images/forgotpassword.png';
import {
  BusyIndicator,
  ErrorBoundary,
  Input,
  LoginForm,
  Modal
} from '../../components';
import { login } from '../../features';
import { useAuth } from '../../hooks';
import { LoginLayout } from '../../layouts';
import { RootState, useAppDispatch } from '../../store';
import { routes } from '../../utils';
import { useForgotPasswordMutation } from './../../features/forgot-password/forgotPassword.api';
export const LoginPage: FC = () => {
  const { t } = useTranslation();
  const [isSentMail, setIsSentMail] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) {
      navigate(routes.APP_HOME);
    }
  }, [isAuthenticated()]);

  const isLoading: boolean = useSelector<RootState, boolean>(
    (state) => state.auth.isLoading
  );
  const dispatch = useAppDispatch();
  const onSubmitLogin = (values: { email: string; password: string }) => {
    dispatch(login(values));
  };
  const onSubmit = async (value: { email: string }) => {
    const result = await forgotPassword(value);
    if ('error' in result) {
      toast.error(t('somethingWentWrong'));
    } else {
      setIsSentMail(true);
      //toast.success(result?.data?.message);
    }
  };

  const [openForgotPasswordModel, setOpenForgotPasswordModel] = useState(false);
  const INVALID_EMAIL_TEXT = t('invalidEmail');
  const EMAIL_REQUIRED_TEXT = t('emailIdRequired');
  const validationSchema = yup.object({
    email: yup.string().email(INVALID_EMAIL_TEXT).required(EMAIL_REQUIRED_TEXT)
  });

  const emailinput = css`
    .emailinputfield input {
      font-size: 13px !important;
      color: #000;
      margin-bottom: 10px;
    }
  `;

  return (
    <>
      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 30vh',
          '@media only screen and (max-width:600px)': {
            marginTop: '25vh'
          },
          '& .MuiDialog-paper': {
            maxWidth: '35vw',
            '@media only screen and (max-width:600px)': {
              maxWidth: 'none',
              margin: '0px'
            }
          }
        }}
        width={'sm'}
        open={openForgotPasswordModel}
        closeIconVisible
        title={'Forgot Password?'}
        onClose={() => [
          setOpenForgotPasswordModel(!openForgotPasswordModel),
          setIsSentMail(false)
        ]}
      >
        <Box>
          {isSentMail && (
            <div
              css={{
                padding: '15px',
                background: '#E1F9E3',
                color: '#4a4a4a',
                fontSize: '15px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <img src={ForgotPasswordImg} css={{ marginRight: '12px' }}></img>{' '}
              Sent! Please check your inbox/spam folder.
            </div>
          )}
          <Grid item>
            <div css={{ color: '#4a4a4a' }}>
              Don’t worry! We can email you the login details. Please enter the
              email associated with your account.
            </div>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                onSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form css={emailinput}>
                  <Field type="email" name="email">
                    {({
                      field,
                      form: { isSubmitting }
                    }: {
                      field: any;
                      form: { isSubmitting: boolean };
                    }) => (
                      <Input
                        className="emailinputfield"
                        {...field}
                        disabled={isSubmitting}
                        type="text"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="email" component="div" />
                  <br />
                  <br />
                  <Button
                    sx={{
                      textTransform: 'none',
                      background: '#00A650',
                      fontWeight: '600',
                      padding: '11px 12px',
                      lineHeight: '21px',
                      ':hover': { background: '#008a43' }
                    }}
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    Send Login Details
                  </Button>
                </Form>
              )}
            </Formik>
          </Grid>
        </Box>
      </Modal>
      <LoginLayout>
        <ErrorBoundary>
          <BusyIndicator isBusy={isLoading} />
          <LoginForm
            onSubmit={onSubmitLogin}
            showModal={() => setOpenForgotPasswordModel(true)}
          />
        </ErrorBoundary>
      </LoginLayout>
    </>
  );
};

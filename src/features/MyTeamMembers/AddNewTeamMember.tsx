import { Cancel } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  css,
  Divider,
  Grid,
  Link,
  Stack,
  styled,
  Typography
} from '@mui/material';
import {
  ErrorMessage,
  Form,
  Formik,
  FormikHelpers,
  FormikValues
} from 'formik';
import { get, map } from 'lodash-es';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  AutoCompleteAddress,
  CheckBox,
  EditableAvatar,
  Input,
  Select2Dropdown
} from '../../components';
import { routes } from '../../utils';
import { numberFormate } from '../../utils/number-formate-utils';
import {
  useAddNewTeamMemberMutation,
  useGetRolesQuery,
  useGetUsersQuery
} from './MyTeamMembers.api';
import NoImage from '../../assets/images/noimage-fmale.png';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
    color: '#244894'
  }
}));
type Option = {
  label: string;
  value: any;
};
interface AddNewTeamMemberProps {
  setOpenAddTeamMemberModel?: any;
}

export const AddNewTeamMember: FC<AddNewTeamMemberProps> = (
  props: AddNewTeamMemberProps
) => {
  const { setOpenAddTeamMemberModel } = props;
  const { t } = useTranslation();
  const { data: rolesData, isFetching: rolesFetching } = useGetRolesQuery(null);
  const { refetch } = useGetUsersQuery(null);
  const [addNewTeamMember, { isLoading }] = useAddNewTeamMemberMutation();

  const [imageURL, setImageURL] = useState('');
  const rolesOptions: Option[] =
    map(
      rolesData?.roles_list,
      (list) =>
      ({
        value: list.id,
        label: list.role_name
      } as Option)
    ) || [];
  rolesOptions.unshift({ value: '', label: 'Select role' });
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    portalTitle: '',
    role: '',
    userName: '',
    password: '',
    phone: '',
    mobile: '',
    fax: '',
    address: '',
    photo: '',
    sendLoginInformation: 0,
    systemGeneratedPassword: 0,
    phone_ext: ''
  };
  const handleSubmit = async (values: any, setFieldError: any) => {
    console.log(values);
    const result = await addNewTeamMember(values);
    if ('error' in result) {
      const errorMsg: any = get(result.error, 'data.message');
      const errordesp: any = get(result.error, 'data.description');
      if (errordesp) {
        setFieldError('email', errordesp);
      }
      if (errorMsg) {
        Object.entries(errorMsg).map(([key, value]: any) => {
          setFieldError(key, value[0]);
          toast.error(t('pleaseFillAllrequriedFields'), {
            icon: <Cancel />,
            toastId: 'errorMsg'
          });
        });
      } else {
        toast.error(t('somethingWentWrong'), {
          icon: <Cancel />,
          toastId: 'errorMsg'
        });
      }
    } else {
      refetch();
      toast.success(result.data?.message, {
        icon: <CheckCircleIcon />,
        toastId: 'successMsg'
      });
    }
  };
  const handleImageUpload = (file: any, setFieldValue: any) => {
    const imageURL = URL.createObjectURL(file);
    setFieldValue('photo', file);
    setImageURL(imageURL);
  };
  const AddNewTeamMemberStyle = css`
    .m-b-24 {
      margin-bottom: 24px !important;
      margin-top: 24px;
    }
    .MuiFormLabel-root {
      font-weight: 400;
      color: #666 !important;
      font-family: Latofont;
    }
    .MuiInputBase-input:focus {
      border-color: #dedede !important;
      border: none !important;
    }
    .MuiInputBase-input {
      font-size: 14px !important;
      color: #495057 !important;
      border-radius: 4px;
      border: 1px solid #dedede;
      background-color: #f5f8fa;
    }
  `;
  const item = css`
    padding-left: 24px !important;
    padding-top: 8px !important;
  `;
  const errorStyle = css`
    border: solid 1px #e4251b !important;
    border-radius: 4px;
  `;
  const footerStyle = css`
    justify-content: end;
  `;
  const cancelbutton = css`
    text-transform: none !important;
    color: #0075cc;
    font-weight: 500;
    font-size: 14px !important;
    :hover {
      text-decoration: underline;
      color: #244894;
      background: transparent;
    }
  `;
  const submitButtomStyle = css`
    padding: 11px 12px;
    border-radius: 4px;
    background-color: #00a650;
    font-size: 14px;
    min-width: 133px;
    font-weight: 600;
    color: #fff;
    text-align: center;
    height: 40px !important;
    text-transform: none !important;
    :hover {
      background: #008a43;
    }
  `;
  const checkboxStyle = css`
    color: #666;
    font-family: Latofont;
    font-weight: 500 !important;
    font-size: 14px !important;
  `;
  const errorText = css`
    margin-top: 10px !important;
    color: #e4251b !important;
    font-size: 12px !important;
  `;
  return (
    <Box>
      <Typography gutterBottom css={{ marginBottom: '24px' }}>
        {t('AddTeamMemberInfoText')}{' '}
        <LinkStyled href={routes.MY_COMPANY_ROLES}>
          {' '}
          {t('Roles&Permissions')}.
        </LinkStyled>
      </Typography>
      <Grid>
        {rolesFetching ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              height: '35vh',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Formik
            initialValues={initialValues}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={async (values, { setFieldError }) => {
              await handleSubmit(values, setFieldError);
            }}
          >
            {({ values, handleChange, errors, touched, setFieldValue }) => (
              <Form css={AddNewTeamMemberStyle}>
                <Grid
                  container
                  className="m-b-24"
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <EditableAvatar
                    // name='photo'
                    onChange={(file) => handleImageUpload(file, setFieldValue)}
                    css={{ height: '15rem', width: '15rem' }}
                    src={imageURL === '' ? NoImage : imageURL}
                    editIcon={true}
                  />
                </Grid>
                <Grid
                  container
                  className="m-b-24"
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item md={6} css={item}>
                    <Input
                      label={t('firstName')}
                      name="firstName"
                      onChange={handleChange}
                      showRequired={true}
                      value={values.firstName}
                      css={
                        errors.firstName && touched.firstName ? errorStyle : ''
                      }
                    />
                    <ErrorMessage
                      component="div"
                      name="firstName"
                      css={errorText}
                    />
                  </Grid>
                  <Grid item md={6} css={item}>
                    <Input
                      label={t('lastName')}
                      name="lastName"
                      onChange={handleChange}
                      value={values.lastName}
                      showRequired={true}
                      css={
                        errors.lastName && touched.lastName ? errorStyle : ''
                      }
                    />
                    <ErrorMessage
                      component="div"
                      name="lastName"
                      css={errorText}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  className="m-b-24"
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item md={6} css={item}>

                    <AutoCompleteAddress
                      label={t('address')}
                      value={values.address}
                      onPlaceSelected={(place: any) =>
                        setFieldValue('address', place.formatted_address)
                      }
                      onChange={handleChange}
                      name="address"
                      country="us"
                    />
                  </Grid>
                  <Grid item md={6} css={item}>
                    <Input
                      label={t('mobilePhone')}
                      name="mobile"
                      value={values.mobile}
                      onChange={(e) =>
                        setFieldValue('mobile', numberFormate(e.target.value))
                      }
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  className="m-b-24"
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item md={4} css={item}>
                    <Input
                      label={t('alternatePhone')}
                      name="phone"
                      value={values.phone}
                      onChange={(e) =>
                        setFieldValue('phone', numberFormate(e.target.value))
                      }
                    />
                  </Grid>
                  <Grid item md={2} css={item} mt={3}>
                    <Input
                      label={''}
                      name="phone_ext"
                      onChange={handleChange}
                      value={values.phone_ext}
                      placeholder="Ext."
                    />
                  </Grid>
                  <Grid item md={6} css={item}>
                    <Input
                      label={t('fax')}
                      name="fax"
                      value={values.fax}
                      onChange={(e) =>
                        setFieldValue('fax', numberFormate(e.target.value))
                      }
                    />
                  </Grid>
                </Grid>
                <Divider />
                <Grid
                  container
                  className="m-b-24"
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item md={6} css={item}>
                    <Input
                      label={
                        t('email') +
                        '(' +
                        t('thisWillBeUsedTeamMemberUserID') +
                        ')'
                      }
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      showRequired={true}
                      css={errors.email && touched.email ? errorStyle : ''}
                    />
                    <Grid css={{ paddingTop: '20px', paddingBottom: '10px' }}>
                      <CheckBox
                        sx={{
                          width: '14px',
                          height: '14px',
                          fontSize: '14px',
                          color: '#666 !important',
                          fontweight: '500'
                        }}
                        label={t('SendLoginInformation')}
                        checked={
                          values.sendLoginInformation === 1 ? true : false
                        }
                        id={values.sendLoginInformation}
                        onChange={(value) => {
                          setFieldValue(
                            'sendLoginInformation',
                            value === 1 ? 0 : 1
                          );
                        }}
                      ></CheckBox>
                      <ErrorMessage
                        component="div"
                        name="email"
                        css={errorText}
                      />
                    </Grid>
                  </Grid>
                  <Grid item md={6} css={item}>
                    <Input
                      label={t('password')}
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                      showRequired={true}
                      css={
                        errors.password && touched.password ? errorStyle : ''
                      }
                    />

                    <Grid css={{ paddingTop: '20px', paddingBottom: '10px' }}>
                      <CheckBox
                        sx={{ width: '14px', height: '14px' }}
                        label={t('systemGeneratedPassword')}
                        checked={
                          values.systemGeneratedPassword === 1 ? true : false
                        }
                        id={values.systemGeneratedPassword}
                        onChange={(value) => {
                          setFieldValue(
                            'systemGeneratedPassword',
                            value === 1 ? 0 : 1
                          );
                        }}
                      ></CheckBox>
                      <ErrorMessage
                        component="div"
                        name="password"
                        css={errorText}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  className="m-b-24"
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6} css={item}>
                    <Input
                      label={t('Title to Display in Portal')}
                      name="portalTitle"
                      onChange={handleChange}
                      value={values.portalTitle}
                    />
                  </Grid>

                  <Grid item xs={6} css={item}>
                    <Select2Dropdown
                      fullWidth
                      options={rolesOptions}
                      label={t('role')}
                      name="role"
                      onChange={(e) => {
                        setFieldValue('role', e);
                      }}
                      value={values.role}
                      selectedOption={values.role}
                      showRequired={true}
                      Iserror={errors.role ? true : false}
                      menuPlacement="top"
                    />
                    <ErrorMessage component="div" name="role" css={errorText} />
                  </Grid>
                </Grid>
                <Stack direction="row" gap={2} css={footerStyle}>
                  <Button
                    css={cancelbutton}
                    onClick={() => setOpenAddTeamMemberModel(false)}
                  >
                    {t('Cancel')}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    css={submitButtomStyle}
                    disabled={isLoading}
                  >
                    {t('Save')}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        )}
      </Grid>
    </Box>
  );
};

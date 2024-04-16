import { Cancel } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import {
  Box,
  Button,
  CircularProgress,
  css,
  Grid,
  InputAdornment,
  InputBase,
  InputLabel,
  Link,
  styled,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import { get, isEmpty, map } from 'lodash-es';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  AutoCompleteAddress,
  InfoMessage,
  Input,
  Select2Dropdown
} from '../../components';
import { useAuth, UserDetails } from '../../hooks';
import { numberFormate } from '../../utils/number-formate-utils';
import {
  useGetMyCompanyProfileDataQuery,
  useGetStatesQuery,
  useGetTimeZonesQuery,
  useUpdateCompanyProfileMutation
} from './MyCompanyProfile.api';
import { StyleWrapper } from './styles';

export const MyCompanyProfile = () => {
  const initialValues = {
    id: '',
    profile_details: {
      company_name: '',
      website: '',
      time_zone: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      country_name: '',
      phone: '',
      fax: '',
      invoices_payable_to: ''
    },
    sender_details: {
      sender_name: '',
      sender_email: ''
    }
  };
  const { t } = useTranslation();
  const { getUserDetails } = useAuth();
  const user: UserDetails = getUserDetails();
  const { data, isFetching, refetch } = useGetMyCompanyProfileDataQuery({
    id: user.reg_id
  });
  const [updateCompanyProfile, { isLoading }] =
    useUpdateCompanyProfileMutation();
  type Option = {
    label: string;
    value: any;
  };
  const { data: timezonesData, isFetching: timezoneFetching } =
    useGetTimeZonesQuery(null);
  const { data: statesData, isFetching: statesFetching } =
    useGetStatesQuery(null);
  useEffect(() => {
    const userDetails: any = get(data, 'user_details');
    if (!isEmpty(data)) {
      formik.setValues({
        id: user.reg_id,
        profile_details: userDetails?.profile_details,
        sender_details: userDetails?.sender_details
      });
    }
  }, [data]);

  const handleSubmit = async (values: any) => {
    const result = await updateCompanyProfile(values);
    if ('error' in result) {
      const errorMsg: any = get(result.error, 'data.message');
      if (errorMsg) {
        Object.entries(errorMsg).map(([key, value]: any) => {
          formik.setFieldError(key, value[0]);
          if (
            key === 'profile_details.phone' ||
            key === 'profile_details.fax'
          ) {
            formik.setFieldValue(key, '');
          }
          toast.error(value[0], {
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
        toastId: 'successMsg'
      });
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });
  interface GroupedOption {
    label: string;
    options: Option[];
  }
  const statesOptions: Option[] =
    map(
      statesData?.states,
      (state) =>
      ({
        value: state,
        label: state
      } as Option)
    ) || [];
  const getTimeZoneOptions = (data: any) => {
    return (
      map(
        data,
        (key, zone) =>
        ({
          value: zone,
          label: key
        } as Option)
      ) || []
    );
  };
  const timeZoneOptions: GroupedOption[] =
    map(
      timezonesData,
      (key, zone) =>
      ({
        label: zone === 'others' ? null : zone,
        options: getTimeZoneOptions(key)
      } as GroupedOption)
    ) || [];

  const handlePhoneNumberFormate = (value: any) => {
    const formattedPhoneNumber = numberFormate(value);
    formik.setFieldValue('profile_details.phone', formattedPhoneNumber);
  };
  const handleFaxNumberFormate = (value: any) => {
    const formattedPhoneNumber = numberFormate(value);
    formik.setFieldValue('profile_details.fax', formattedPhoneNumber);
  };

  const handleCheckUrl = () => {
    if (
      formik.values.profile_details.website === '' ||
      formik.values.profile_details.website === null
    ) {
      toast.error(t('PleaseEnterURL'), {
        icon: <Cancel />,
        toastId: 'enterUrl'
      });
    } else {
      let link = formik.values.profile_details.website.includes('http')
        ? formik.values.profile_details.website
        : `https://${formik.values.profile_details.website} `;
      const newWindow = window.open(link, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    }
  };

  const handleAddress = (place: any) => {
    console.log(place);
    formik.setFieldValue('profile_details.zip_code', '');
    formik.setFieldValue('profile_details.city', '');
    formik.setFieldValue('profile_details.state', '');
    if (place && place.address_components) {
      place.address_components.map((address: any, index: any) => {
        console.log(address);
        if (address.types.includes('postal_code')) {
          formik.setFieldValue('profile_details.zip_code', address.long_name);
        }
        if (address.types.includes('locality')) {
          formik.setFieldValue('profile_details.city', address.long_name);
        }
        if (address.types.includes('administrative_area_level_1')) {
          formik.setFieldValue('profile_details.state', address.long_name);
        }

      });
    }
    formik.setFieldValue('profile_details.address', place.formatted_address);
  };
  const IconInput = styled(InputBase)(({ theme }) => ({
    '&.MuiInputBase-adornedEnd': {
      height: '42px',
      width: '100%',
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '#f5f8fa',
      border: 'solid 1px #dedede',
      fontSize: 14,
      fontweight: 400,
      padding: '10px 12px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: 'LatoFont',
      color: '#b0adab',
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)'
      }
    },
    '& .MuiList-root .MuiMenu-list': {
      maxHeight: 200,
      overflowY: 'auto'
    }
  }));

  const FormContainer = css`
    .m-b-24 {
      margin-bottom: 24px !important;
      margin-top: 24px;
    }
  `;
  const item = css`
    padding-left: 24px !important;
    padding-top: 8px !important;
  `;
  const MyCompanyProfileStyle = css`
    .MuiFormLabel-root {
      font-weight: 400;
      color: #666 !important;
      font-family: Latofont;
    }
    .MuiInputBase-input:focus {
      border-color: #dedede !important;
    }
    .MuiInputBase-input {
      font-size: 14px !important;
      color: #4a4a4a;
    }
  `;
  const notificationsTextStyle = css`
    color: #666 !important;
    font-size: 15px !important;
    font-weight: 400;
  `;
  const errorStyle = css`
    .MuiInputBase-input:focus {
      border-color: #ff0000 !important;
      box-shadow: rgba(25, 118, 210, 0.25) 0px 0px 3px 3px;
    }
    border: solid 1px #e4251b !important;
    border-radius: 4px;
    color: #e4251b !important;
    input {
      color: #ff0000 !important;
    }
  `;
  const submitButtomStyle = css`
    padding: 11px 12px;
    border-radius: 4px;
    font-size: 14px;
    min-width: 144px;
    font-weight: 600;
    color: #fff !important;
    text-align: center;
    height: 40px !important;
    text-transform: none;
    background-color: #00a650 !important;
    :hover {
      color: #fff !important;
      background-color: #008a43 !important;
    }
    :focus {
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  `;
  const checkUrlStyle = css`
    display: block;
    margin-top: 12px;
    text-decoration: none;
    color: #0075cc !important;
    cursor: pointer;
    font-size: 14px;
    :hover {
      color: #244894 !important;
    }
  `;
  return (
    <StyleWrapper>
      <Grid className="profilecontainer">
        <InfoMessage message={<>{t('myCompanyProfilePageInstruction')}</>} />
        <Grid css={FormContainer}>
          {isFetching || timezoneFetching ? (
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
            <form onSubmit={formik.handleSubmit} css={MyCompanyProfileStyle}>
              <Grid
                container
                className="m-b-24"
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4} css={item}>
                  <Input
                    label={t('companyName')}
                    name="profile_details.company_name"
                    onChange={formik.handleChange}
                    showRequired={true}
                    value={formik.values.profile_details.company_name}
                    css={
                      formik.errors.profile_details?.company_name &&
                        formik.touched.profile_details?.company_name
                        ? errorStyle
                        : ''
                    }
                  />
                </Grid>
                <Grid item xs={4} css={item}>
                  <Input
                    label={t('website')}
                    name="profile_details.website"
                    onChange={formik.handleChange}
                    value={formik.values.profile_details.website}
                  />
                  <Link
                    target="_blank"
                    css={checkUrlStyle}
                    rel="noreferrer"
                    onClick={() => handleCheckUrl()}
                  >
                    {' '}
                    <span>{t('checkURL')} </span>
                  </Link>
                </Grid>
                <Grid item xs={4} css={item}>
                  <Select2Dropdown
                    fullWidth
                    options={timeZoneOptions}
                    label={t('timeZone')}
                    name="profile_details.time_zone"
                    onChange={(e) => {
                      formik.setFieldValue('profile_details.time_zone', e);
                    }}
                    value={formik.values.profile_details.time_zone}
                    selectedOption={formik.values.profile_details.time_zone}
                    groupOptions={true}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                className="m-b-24"
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4} css={item}>
                  {/* <Input
                    label={t('mailingAddress')}
                    showRequired={true}
                    name="profile_details.address"
                    onChange={formik.handleChange}
                    value={formik.values.profile_details.address}
                    css={
                      formik.errors.profile_details?.address ? errorStyle : ''
                    }
                  /> */}
                  <AutoCompleteAddress
                    label={t('address')}
                    showRequired={true}
                    value={formik.values.profile_details.address}
                    onPlaceSelected={(place: any) => handleAddress(place)}
                    Iserror={
                      formik.errors.profile_details?.address ? true : false
                    }
                    onChange={formik.handleChange}
                    name="profile_details.address"
                    country="us"
                  />
                </Grid>
                <Grid item xs={4} css={item}>
                  <Input
                    label={t('city')}
                    showRequired={true}
                    name="profile_details.city"
                    onChange={formik.handleChange}
                    value={formik.values.profile_details.city}
                    css={formik.errors.profile_details?.city ? errorStyle : ''}
                  />
                </Grid>
                <Grid item xs={2} css={item}>
                  <Select2Dropdown
                    fullWidth
                    showRequired={true}
                    options={statesOptions}
                    label={t('state')}
                    name="profile_details.state"
                    onChange={(e) => {
                      formik.setFieldValue('profile_details.state', e);
                    }}
                    value={formik.values.profile_details.state}
                    selectedOption={formik.values.profile_details.state}
                    Iserror={
                      formik.errors.profile_details?.state ? true : false
                    }
                  />
                </Grid>
                <Grid item xs={2} css={item}>
                  <Input
                    style={{ marginTop: '20px' }}
                    label={t('zipCode')}
                    showRequired={true}
                    name="profile_details.zip_code"
                    onChange={formik.handleChange}
                    value={formik.values.profile_details.zip_code}
                    css={
                      formik.errors.profile_details?.zip_code ? errorStyle : ''
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
                <Grid item xs={4} css={item}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    {t('country')}
                  </InputLabel>
                  <IconInput
                    name="profile_details.country_name"
                    onChange={formik.handleChange}
                    value={formik.values.profile_details.country_name}
                    disabled
                    endAdornment={
                      <InputAdornment position="end">
                        {<LockIcon style={{ color: '#dedede' }} />}
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={4} css={item}>
                  <Input
                    label={t('phone')}
                    showRequired={true}
                    name="profile_details.phone"
                    onChange={(e) => {
                      handlePhoneNumberFormate(e.target.value);
                    }}
                    value={formik.values.profile_details.phone}
                    css={formik.errors.profile_details?.phone ? errorStyle : ''}
                    type="tel"
                  />
                </Grid>
                <Grid item xs={4} css={item}>
                  <Input
                    label={t('fax')}
                    name="profile_details.fax"
                    onChange={(e) => {
                      handleFaxNumberFormate(e.target.value);
                    }}
                    value={formik.values.profile_details.fax}
                  />
                </Grid>
              </Grid>
              <Grid container className="m-b-24">
                <Typography gutterBottom css={notificationsTextStyle}>
                  {t('automatedNotificationsMyCompanyProfileText')}
                </Typography>
              </Grid>
              <Grid
                container
                className="m-b-24"
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4} css={item}>
                  <Input
                    label={t('senderName')}
                    name="sender_details.sender_name"
                    onChange={formik.handleChange}
                    value={formik.values.sender_details.sender_name}
                  />
                </Grid>
                <Grid item xs={4} css={item}>
                  <Input
                    label={t('senderEmail')}
                    name="sender_details.sender_email"
                    onChange={formik.handleChange}
                    value={formik.values.sender_details.sender_email}
                  />
                </Grid>
                <Grid item xs={4} css={item}>
                  <Input
                    label={t('name/CompanyCliensInvoiceShouldPayableTo')}
                    name="profile_details.invoices_payable_to"
                    onChange={formik.handleChange}
                    value={formik.values.profile_details.invoices_payable_to}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                css={submitButtomStyle}
                type="submit"
                disabled={isLoading}
              >
                {t('submit')}
              </Button>
            </form>
          )}
        </Grid>
      </Grid>
    </StyleWrapper>
  );
};

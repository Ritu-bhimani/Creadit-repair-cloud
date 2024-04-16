import { Cancel } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  ClickAwayListener,
  css,
  Grid,
  Link,
  Popper,
  Stack,
  styled,
  Typography
} from '@mui/material';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  CustomButton,
  DataTable,
  ErrorBoundary,
  Input,
  Modal
} from '../../components';
import {
  useGetDisputeOptionQuery,
  useResetDisputeMutation,
  useUpdateDisputeMutation
} from './disputeOptions.api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const footerStyle = css`
  justify-content: end;
  margin-top: 0px;
`;
const cancelButtomStyle = css`
  text-transform: none;
  background: transparent !important;
  :hover {
    color: #244894 !important;
    text-decoration: underline;
  }
`;
const item = css`
  margin-bottom: 24px !important;
`;

const itemCol = css`
  padding-left: 24px !important;
`;

const Menu = styled(Popper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'rgb(0 0 0 / 14%) 0 8px 10px 0',
  marginLeft: '-2vw !important',
  borderRadius: 4,
  '& .MuiLink-root': {
    color: '#4a4a4a'
  }
}));

export const DisputeOptions: FC = () => {
  const {
    data: disputeData,
    isFetching,
    refetch
  } = useGetDisputeOptionQuery(null);
  const [updateDisputeOp, {}] = useUpdateDisputeMutation();
  const [resetDisputeOp, {}] = useResetDisputeMutation();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(Boolean(anchorEl));
  const [openEditcModel, setOpenEditModel] = useState(false);
  const [openResetcModel, setOpenResetModel] = useState(false);
  const [defaultSelectRow, setDefaultSelectRow] = useState<any | undefined>({});
  const toastConfig = {
    icon: <Cancel />
  };

  const addVal =
    Object.keys(defaultSelectRow).length !== 0 &&
    defaultSelectRow?.address?.split('\n');
  const addCity = addVal && addVal[3]?.split(' ');
  console.log('addVal', addCity, addVal);

  const [companyName, setCompanyName] = useState('');
  const [addresses, setAddresses] = useState('');
  const [addressOp, setAddressOp] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    if (defaultSelectRow) {
      setCompanyName(addVal[0]);
      setAddresses(addVal[1]);
      setAddressOp(addVal[2]);
      setCity(addVal[3]?.split(' ')[0]);
      setState(addVal[3]?.split(' ')[1]);
      setZipCode(addVal[3]?.split(' ')[2]);
    }
  }, [defaultSelectRow]);

  const handleOutsideClickClose = () => {
    setAnchorEl(null);
  };

  const selectedRow = (event: any, data: any) => {
    setDefaultSelectRow(data);
  };

  console.log('defaultSelectedRow', defaultSelectRow);

  const handleEdit = async (selectedData: any) => {
    setOpenEditModel(true);
  };

  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'helpAndSupportPopup'
  });

  const currentColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.name}</span>
          </>
        );
      }
    },
    {
      field: 'logo',
      headerName: 'Logo',
      flex: 1,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        return (
          <span>
            <img src={params.row.logo} />
          </span>
        );
      }
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span className="text-[#e4251b]" style={{ whiteSpace: 'unset' }}>
              {' '}
              {params.row.address}
            </span>
            <Link
              {...bindTrigger(popupState)}
              component="button"
              variant="body2"
            >
              <EditIcon onClick={(e) => selectedRow(e, params.row)} />
            </Link>
            <Menu
              className="headerpopover"
              {...bindPopover(popupState)}
              // open
              placement="bottom"
            >
              <ClickAwayListener onClickAway={popupState.close}>
                <Stack>
                  <Link
                    sx={(theme) => {
                      return {
                        p: 1.5,
                        color: theme.palette.text.secondary,
                        ...theme.typography.subtitle1,
                        fontSize: theme.typography.body2.fontSize,
                        fontFamily: 'Latofont',
                        cursor: 'pointer'
                      };
                    }}
                    onClick={() => {
                      setOpen(false);
                      handleEdit(defaultSelectRow);
                    }}
                  >
                    Edit
                  </Link>

                  <Link
                    sx={(theme) => {
                      return {
                        p: 1.5,
                        color: theme.palette.text.secondary,
                        ...theme.typography.subtitle1,
                        fontSize: theme.typography.body2.fontSize,
                        fontFamily: 'Latofont',
                        cursor: 'pointer'
                      };
                    }}
                    onClick={() => {
                      setOpen(false);
                      setOpenResetModel(true);
                    }}
                  >
                    Reset to default
                  </Link>
                </Stack>
              </ClickAwayListener>
            </Menu>
          </>
        );
      }
    }
  ];

  const handleReset = async () => {
    const payload = {
      id: defaultSelectRow.id
    };
    const result = await resetDisputeOp(payload);
    if ('error' in result) {
      toast.error(t('somethingWentWrong'), {
        ...toastConfig,
        toastId: 'somethingWentWrong'
      });
    } else {
      toast.success(result?.data?.message, {
        icon: <CheckCircleIcon />,
        toastId: 'successMsg'
      });
      setOpenResetModel(false);
      refetch();
    }
  };

  const handleUpdate = async () => {
    const payload = {
      id: defaultSelectRow.id,
      company_name: companyName,
      address: addresses,
      urbanización: addressOp,
      city: city,
      state: 'GA',
      zip_code: zipCode
    };
    const result = await updateDisputeOp(payload);
    if ('error' in result) {
      toast.error(t('somethingWentWrong'), {
        ...toastConfig,
        toastId: 'somethingWentWrong'
      });
    } else {
      toast.success(result?.data?.message, {
        icon: <CheckCircleIcon/>,
        toastId: 'successMsg'
      });
      setOpenEditModel(false);
      refetch();
    }
  };

  return (
    <>
      <DataTable
        getRowId={(row: any) => row.id}
        height={''}
        hideFooter={true}
        columnData={currentColumns}
        tableData={disputeData ? disputeData : []}
      />
      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 20vh',
          '& .MuiDialog-paper': {
            maxWidth: '35vw'
          }
        }}
        width={'sm'}
        open={openEditcModel}
        closeIconVisible
        title={t('Edit Bureau Details')}
        onClose={() => setOpenEditModel(false)}
      >
        {' '}
        <ErrorBoundary>
          <Grid container direction={'column'}>
            <Grid item css={item}>
              <Input
                fullWidth
                label={t('Company Name')}
                value={companyName}
                name="company_name"
                onChange={(e) => setCompanyName(e.target.value)}
                showRequired={true}
              />
            </Grid>
            <Grid item css={item}>
              <Input
                fullWidth
                label={t('Address')}
                value={addresses}
                name="addresses"
                onChange={(e) => setAddresses(e.target.value)}
                showRequired={true}
              />
            </Grid>
            <Grid item css={item}>
              <Input
                fullWidth
                label={t('Apt, Suite, Urbanización, etc. (optional)')}
                value={addressOp}
                name="addressOp"
                onChange={(e) => setAddressOp(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid
            container
            className="m-b-24"
            css={item}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4} css={itemCol}>
              <Input
                fullWidth
                label={t('City')}
                value={city}
                name="city"
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={4} css={itemCol}>
              <Input
                fullWidth
                label={t('State')}
                value={state}
                name="state"
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
            <Grid item xs={4} css={itemCol}>
              <Input
                fullWidth
                label={t('Zip Code')}
                value={zipCode}
                name="zip_code"
                onChange={(e) => setZipCode(e.target.value)}
              />
            </Grid>
          </Grid>
          <Stack direction="row" gap={2} css={footerStyle}>
            <Button
              onClick={() => setOpenEditModel(false)}
              css={cancelButtomStyle}
            >
              {t('cancel')}
            </Button>
            <CustomButton
              variant="contained"
              color="success"
              label="Save Changes"
              size="medium"
              onClick={() => handleUpdate()}
            />
          </Stack>
        </ErrorBoundary>
      </Modal>
      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 20vh',
          '& .MuiDialog-paper': {
            maxWidth: '35vw'
          }
        }}
        width={'sm'}
        open={openResetcModel}
        closeIconVisible
        title={t('Warning')}
        onClose={() => setOpenResetModel(false)}
      >
        {' '}
        <ErrorBoundary>
          <Typography gutterBottom>
            {t(
              'If you change this bureau, that will effect any letters you have already saved with the previous bureau. Are you sure you want to do this?'
            )}
          </Typography>
          <Stack direction="row" gap={2} css={footerStyle}>
            <CustomButton
              variant="contained"
              color="success"
              label="Ok"
              size="medium"
              onClick={() => handleReset()}
            />
            <CustomButton
              variant="outlined"
              color="success"
              label="Cancel"
              size="medium"
              onClick={() => setOpenResetModel(false)}
            />
          </Stack>
        </ErrorBoundary>
      </Modal>
    </>
  );
};

import { css, Grid, Typography } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Modal } from '../../components';
import { DataTable, DataTableUtils } from '../../components/DataTable';
import ChangePassword from '../change-password/ChangePassword';
import { useGetLoginHistoryQuery } from './loginHistory.api';

type Props = {
  getLoginhistoryData: any;
  loginHistoryData: any;
  changePassword: any;
  changePwdResponse: any;
};

const links = css`
  color: #0075cc;
  cursor: pointer;
  text-decoration: none;
  :hover {
    text-decoration: underline !important;
    color: #244894;
  }
`;

const LoginHistory = (props: Props) => {
  const { isLoading, data, isError } = useGetLoginHistoryQuery(null);
  const { t } = useTranslation();
  const [openChangePasswordModel, setOpenChangePasswordModel] = useState(false);

  const columns: GridColumns<any> = [
    {
      field: 'username',
      headerName: 'User',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false
    },
    {
      field: 'ipaddress',
      headerName: 'IP Address',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false
    },
    {
      field: 'devicetype',
      headerName: 'Access Type',
      minWidth: 150,
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false
    },
    {
      field: 'login_time',
      type: 'date',
      headerName: 'Login',
      minWidth: 200,
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      renderCell: DataTableUtils.renderDate,
      sortable: false
    },
    {
      field: 'logout_time',
      type: 'date',
      headerName: 'Logout',
      minWidth: 200,
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      renderCell: DataTableUtils.renderDate,
      sortable: false
    },
    {
      field: 'location',
      headerName: 'Location',
      minWidth: 100,
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false
    }
  ];
  return (
    <>
      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 20vh',
          '& .MuiDialog-paper': {
            maxWidth: '30vw'
          }
        }}
        width={'sm'}
        open={openChangePasswordModel}
        closeIconVisible
        title={'Change Password'}
        onClose={() => setOpenChangePasswordModel(!openChangePasswordModel)}
      >
        <ChangePassword showModal={() => setOpenChangePasswordModel(false)} />
      </Modal>
      <Grid>
        <Typography
          gutterBottom
          css={{
            fontWeight: '100',
            display: 'flex',
            marginTop: '24px',
            marginBottom: '16px'
          }}
        >
          {t('recentLoginActivity')}
        </Typography>
        <Typography variant="body2" gutterBottom css={{ marginBottom: '16px' }}>
          {t('recentLoginHeading1')}
          <Link
            to=""
            css={links}
            onClick={() => {
              setOpenChangePasswordModel(true);
            }}
          >
            {t('changePwd')}
          </Link>
          {t('recentLoginHeading2')}
        </Typography>
        <DataTable
          getRowId={(row) => `${row.login_time}${row.logout_time}`}
          loading={isLoading}
          height={''}
          hideFooter={true}
          columnData={columns}
          tableData={data?.log_details ? data.log_details : []}
        />
        <div>
          <Link to="" css={links}>
            {t('viewFullHistory')}
          </Link>
        </div>
      </Grid>
    </>
  );
};
export default LoginHistory;

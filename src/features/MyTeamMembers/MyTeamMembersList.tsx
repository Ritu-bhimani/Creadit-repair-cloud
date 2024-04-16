import { Box, Button, CircularProgress, css, Grid, Link, Stack, Typography } from '@mui/material';
import { EditableAvatar, ErrorBoundary, Modal } from '../../components';
import { useDeleteUserMutation, useGetUsersQuery } from './MyTeamMembers.api';
import NoImage from '../../assets/images/noimage-fmale.png';
import { get } from 'lodash-es';
import { API_BASE_URL } from '../../services';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const MyTeamMembersList = () => {
  const { data: data, isFetching, refetch } = useGetUsersQuery(null);
  const usersDate = get(data, 'team_details.team_list');
  console.log(usersDate);
  console.log(data)
  const ImageBase = 'qa-api.creditrepaircloud.com' || process.env.REACT_APP_API_HOSTNAME;
  const ImageBaseUrl = `https://${ImageBase}/`;
  const [deleteId, setDeleteId] = useState<number>()
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const { t } = useTranslation();
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDeletePopUp = (userId: number) => {
    setDeleteId(userId);
    setOpenDeleteModel(true)
  }

  const handleDeleteUser = async () => {
    let id = deleteId;
    const result = await deleteUser({ id });
    if ('error' in result) {
      setOpenDeleteModel(false)
      toast.error('Something went wrong');
    } else {
      setOpenDeleteModel(false);
      refetch();
      toast.success('Team Member deleted');
    }
  };

  const DeleteUser = () => {
    return (
      <>
        <Typography gutterBottom>
          {t('AreYouSureWantDeleteTeamMember')}
        </Typography>
        <Typography gutterBottom>
          Deleting a team member will erase all their information, documents, notes and messages permanently.
        </Typography>
        <Typography gutterBottom>
          Another option is to deactivate this team member and keep the work history.
        </Typography>
        <Stack direction="row" gap={2} css={footerStyle}>
          <Button
            variant="outlined"
            color="error"
            css={DeactivatebuttomStyle}
            onClick={() => setOpenDeleteModel(false)}
          >
            Deactivate this team member
          </Button>
          <Button
            variant="contained"
            color="error"
            css={buttomStyle}
            onClick={() => handleDeleteUser()}
            disabled={isLoading}
          >
            Delete this team member
          </Button>
        </Stack>
      </>
    );
  };
  const teamMemberName = css`
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    color: #4a4a4a !important;
    height: 20px !important;
    text-decoration: none;
    cursor: pointer;
    text-transform: capitalize;
    :hover {
      color: #244894 !important;
      text-decoration: underline !important;
    }
  `;
  const statusStyle = css`
    text-transform: capitalize;
    font-family: Latofont;
    font-size: 15px;
    color: #4a4a4a;
  `
  const footerStyle = css`
  justify-content: end;
  margin-top: 40px;
`;
  const buttomStyle = css`
  padding: 11px 12px;
  border-radius: 4px;
  font-size: 14px;
  min-width: 144px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  height: 40px !important;
  text-transform: none;
  background: #ff0000;
`;
  const DeactivatebuttomStyle = css`
  padding: 11px 12px;
  border-radius: 4px;
  font-size: 14px;
  min-width: 144px;
  font-weight: 600;
  color: #ff0000;
  text-align: center;
  height: 40px !important;
  text-transform: none;
  background: #ffff;
  border: 2px solid red!important;
`;
  return (
    <>
      {isFetching || usersDate === 'undefined' ? (
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
        <Box>
          {usersDate.map((user: any) => (
            <>
              <Grid
                sx={{
                  display: 'inline-block',
                  textAlign: 'center',
                  marginBottom: '40px',
                  marginLeft: '40px'
                }}
              >
                <EditableAvatar
                  onChange={() => { }}
                  css={{ height: '15rem', width: '15rem' }}
                  src={user.photo === '' ? NoImage : ImageBaseUrl + user.path + user.photo}
                  deleteIcon={true}
                  messageIcon={true}
                  messageText={user.date ? moment(user.date).format('MM/DD/YYYY hh:mm A') : ''}
                  handleDelete={() => handleDeletePopUp(user.id)}
                />
                <Link css={teamMemberName}>
                  {user.first_name}{' '}
                  {user.last_name}
                </Link>
                <p css={statusStyle}>({user.status})</p>
              </Grid>
            </>
          ))}
        </Box>
      )
      }
      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 30vh',
          '& .MuiDialog-paper': {
            maxWidth: '36vw',
            '@media only screen and (max-width:600px)': {
              maxWidth: 'none',
              margin: '0px'
            }
          }
        }}
        width={'sm'}
        open={openDeleteModel}
        closeIconVisible
        title={t('warning')}
        onClose={() => setOpenDeleteModel(!openDeleteModel)}
      >
        <ErrorBoundary>
          <DeleteUser />
        </ErrorBoundary>
      </Modal>
    </ >
  )
    ;
};

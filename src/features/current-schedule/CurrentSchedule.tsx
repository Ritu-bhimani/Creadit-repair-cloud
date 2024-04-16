import { Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  css,
  Grid,
  Stack,
  styled,
  Typography
} from '@mui/material';
import moment from 'moment';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cancel } from '@mui/icons-material';
import { Clock, ErrorBoundary, Modal } from '../../components';
import { useAuth } from '../../hooks';
import {
  useDeleteTaskMutation,
  useGetCurrentTasksQuery
} from './currentSchedule.api';
import { currentScheduleStyles } from './styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: '#666',
  ':hover': {
    color: '#0075cc'
  }
}));

export const CurrentSchedule: FC = () => {
  const { data, isFetching, refetch } = useGetCurrentTasksQuery(null);
  const currentSchedule = data;
  const [warn, SetWarning] = useState(false);
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const { t } = useTranslation();
  const styles = currentScheduleStyles;
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState<
    number | undefined
  >();
  const toastConfig = {
    icon: <Cancel />
  };

  const handleDeleteModel = (id: number) => {
    setOpenDeleteModel(true);
    setDeleteScheduleId(id);
  };
  const handleDelete = async () => {
    let id = deleteScheduleId;
    const result = await deleteTask({ id: id });
    if ('error' in result) {
      toast.error(t('somethingWentWrong'), {
        ...toastConfig,
        toastId: 'somethingWentWrong'
      });
    } else {
      refetch();
      toast.success(t('Task has been deleted'), {
        icon: <CheckCircleIcon/>,
        toastId: 'successMsg'
      });
      setOpenDeleteModel(false);
    }
  };
  const footerStyle = css`
    justify-content: end;
    margin-top: 40px;
  `;
  const okButtomStyle = css`
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
  const cancelButtomStyle = css`
    text-transform: none;
    background: transparent !important;
    :hover {
      text-decoration: underline;
      color: #244894;
    }
  `;
  const deleteText = css`
    font-weight: 600 !important;
    font-size: 16px !important;
    color: #666;
  `;
  const DeleteSchedule = () => {
    return (
      <>
        <Typography css={deleteText} gutterBottom>
          {t('areYouSureYouWantToDeleteThisTask')}
        </Typography>
        <Stack direction="row" gap={2} css={footerStyle}>
          <Button
            css={cancelButtomStyle}
            onClick={() => setOpenDeleteModel(false)}
          >
            {t('cancel')}
          </Button>
          <Button
            variant="contained"
            color="error"
            css={okButtomStyle}
            onClick={() => handleDelete()}
            disabled={isLoading}
          >
            {t('ok')}
          </Button>
        </Stack>
      </>
    );
  };
  const { getUserDetails } = useAuth();
  const { company_timezone } = getUserDetails();
  return (
    <>
      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 20vh',
          '@media only screen and (max-width:600px)': {
            marginTop: '30vh'
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
        open={openDeleteModel}
        closeIconVisible
        title={t('warning')}
        onClose={() => setOpenDeleteModel(!openDeleteModel)}
      >
        {' '}
        <ErrorBoundary>
          <DeleteSchedule />
        </ErrorBoundary>
      </Modal>
      <styles.CurrentScheduleContainer>
        <styles.ContainerHeader>
          <Grid item xs={8}>
            <Typography css={styles.title} component={'span'}>
              <styles.MainTitle>{t('categoryToday')}</styles.MainTitle>
              <styles.CurrentDate>
                <Clock timeZone={company_timezone} />
              </styles.CurrentDate>
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <styles.MainSchedule>{t('manageSchedule')}</styles.MainSchedule>
          </Grid>
        </styles.ContainerHeader>
        <styles.ContainerBody>
          {(currentSchedule?.todays_event &&
            currentSchedule?.todays_event.length > 0 &&
            currentSchedule?.todays_event.map(
              ({ StartTime, Subject, Id }: any, i: number) => {
                return (
                  <styles.Events key={i}>
                    <p css={{ marginTop: '0' }}>
                      <LinkStyled to="">
                        {moment(StartTime).format('HH:mm A')}{' '}
                        {Subject.length < 67
                          ? `${Subject}`
                          : `${Subject.substring(0, 64)}...`}
                      </LinkStyled>
                    </p>
                    <div className="schedule-icon">
                      <Delete
                        onClick={() => handleDeleteModel(Id)}
                        sx={{
                          color: '#0075cc',
                          marginRight: '1vw',
                          cursor: 'pointer'
                        }}
                      />
                    </div>
                  </styles.Events>
                );
              }
            )) ||
            (isFetching || isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              <styles.NoEventsText>
                You have nothing scheduled today
              </styles.NoEventsText>
            ))}
        </styles.ContainerBody>
      </styles.CurrentScheduleContainer>
    </>
  );
};

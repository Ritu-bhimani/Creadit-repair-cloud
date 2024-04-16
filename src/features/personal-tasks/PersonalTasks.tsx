import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  CircularProgress,
  css,
  Divider,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography
} from '@mui/material';
import { filter } from 'lodash-es';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary, Modal } from '../../components';
import { CheckBox } from '../../components/CheckBox';

import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { NewTask } from './NewTask';
import {
  useDeleteTaskMutation,
  useGetPersonalTasksQuery,
  useMarkTaskAsCompletedOrIncompleteMutation
} from './personalTasks.api';

const tasksTitle = css`
  font-weight: 400 !important;
  font-size: 18px !important;
  color: #4a4a4a;
  margin-bottom: 32px !important;
`;

const NewTaskLink = styled.div`
  display: flex;
  padding: 0;
  line-height: 1.25rem;
  cursor: pointer;
  color: rgb(0 117 204 / 1);
  font-weight: 400;
  :hover {
    text-decoration: underline;
    color: #244894;
  }
`;

const ViewAllTasks = styled.div`
  cursor: pointer;
  color: rgb(0 117 204 / 1);
  :hover {
    text-decoration: underline;
    color: #244894;
  }
`;
const footerStyle = css`
  justify-content: end;
  margin-top: 40px;
`;
const cancelbutton = css`
  text-transform: none !important;
  background: transparent !important;
  :hover {
    text-decoration: underline;
    color: #244894;
  }
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
const tasksDeleteText = css`
  font-weight: 600 !important;
  font-size: 16px !important;
  color: #666;
`;

export const PersonalTasks: FC = () => {
  const [showAlPersonalTasks, setShowAllPersonalTasks] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<number | undefined>();
  const { t } = useTranslation();
  const { data, isFetching, refetch } = useGetPersonalTasksQuery(null);
  const [markTaskAsCompletedOrIncomplete, {}] =
    useMarkTaskAsCompletedOrIncompleteMutation();

  const [deleteTask, { isLoading }] = useDeleteTaskMutation();

  const onTaskMarkCompleOrIncomplete = async (id: number, flag: boolean) => {
    const result = await markTaskAsCompletedOrIncomplete({ id, flag });
    if ('error' in result) {
      toast.error('Something went wrong');
    } else {
      refetch().then((res) => {
        toast.success(result.data?.message);
      });
    }
  };

  const deleteTaskHandlerModel = (id: number) => {
    setDeleteTaskId(id);
    setOpenDeleteModel(true);
    setShowAllPersonalTasks(false);
  };
  const deleteTaskHandler = async () => {
    let id = deleteTaskId;
    const result = await deleteTask({ id });
    if ('error' in result) {
      toast.error('Something went wrong');
    } else {
      setOpenDeleteModel(false);
      setShowAllPersonalTasks(true);
      refetch();
      toast.success('Task deleted successfully');
    }
  };

  const handleCancel = () => {
    setOpenDeleteModel(false);
    setShowAllPersonalTasks(true);
  };
  const DeleteTask = () => {
    return (
      <>
        <Typography css={tasksDeleteText} gutterBottom>
          {t('areYouSureYouWantToDeleteThisTask')}
        </Typography>
        <Stack direction="row" gap={2} css={footerStyle}>
          <Button css={cancelbutton} onClick={() => handleCancel()}>
            {t('cancel')}
          </Button>
          <Button
            variant="contained"
            color="error"
            css={okButtomStyle}
            onClick={() => deleteTaskHandler()}
            disabled={isLoading}
          >
            {t('ok')}
          </Button>
        </Stack>
      </>
    );
  };
  const personalTasksdata =
    data?.tasks &&
    data?.tasks.length > 0 &&
    filter(data?.tasks, (task) => task.status !== 'done').slice(0, 4);
  return (
    <Grid>
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
          <DeleteTask />
        </ErrorBoundary>
      </Modal>
      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 10vh',
          '& .MuiDialog-paper': {
            maxWidth: '36vw',
            '@media only screen and (max-width:600px)': {
              maxWidth: 'none',
              margin: '0px'
            }
          }
        }}
        width={'sm'}
        open={openAddTask}
        closeIconVisible
        title={'Reminder'}
        onClose={() => setOpenAddTask(!openAddTask)}
      >
        <ErrorBoundary>
          <NewTask
            setOpenAddTask={() => setOpenAddTask(false)}
            reloadPage={() => refetch()}
          />
        </ErrorBoundary>
      </Modal>
      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 20vh'
        }}
        width={'sm'}
        open={showAlPersonalTasks}
        closeIconVisible
        title={'Task List'}
        onClose={() => setShowAllPersonalTasks(!showAlPersonalTasks)}
      >
        <Box>
          <List
            className="tasklist"
            dense
            sx={{ width: '100%', maxHeight: '35vh' }}
          >
            {data &&
              data.tasks &&
              data?.tasks.length > 0 &&
              data?.tasks.map(({ id, subject, status }, index: number) => {
                return (
                  <>
                    <ListItem
                      className="labelnobottom"
                      aria-label="position"
                      sx={{ marginTop: '', padding: '15px 10px' }}
                      key={`${id}-${index}}`}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon
                            color="primary"
                            onClick={() => deleteTaskHandlerModel(id)}
                          />
                        </IconButton>
                      }
                    >
                      <CheckBox
                        key={id}
                        stricked={status === 'done'}
                        label={
                          subject.length < 40
                            ? `${subject}`
                            : `${subject.substring(0, 37)}...`
                        }
                        checked={status === 'done'}
                        onChange={(id) =>
                          onTaskMarkCompleOrIncomplete(id, !(status === 'done'))
                        }
                        id={id}
                      />
                    </ListItem>
                    <Divider variant="fullWidth" component="li" />
                  </>
                );
              })}
          </List>
        </Box>
      </Modal>
      <Typography css={tasksTitle} gutterBottom>
        {t('PersonalTasks')}
      </Typography>
      <Box minHeight={'18vh'}>
        {isFetching ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <FormControl component="fieldset">
              {personalTasksdata && personalTasksdata.length > 0 ? (
                personalTasksdata.map(({ id, subject }) => {
                  return (
                    <FormGroup
                      aria-label="position"
                      key={`${id}-done`}
                      css={{ color: '#4a4a4a' }}
                    >
                      <div css={{ display: 'flex' }}>
                        <CheckBox
                          stricked
                          label={
                            subject.length < 40
                              ? `${subject}`
                              : `${subject.substring(0, 37)}...`
                          }
                          checked={selectedTask === id}
                          onChange={(id) => {
                            setSelectedTask(id);
                            onTaskMarkCompleOrIncomplete(id, true);
                          }}
                          id={id}
                        />
                      </div>
                    </FormGroup>
                  );
                })
              ) : (
                <div css={{ color: '#b0adab' }}>You have no tasks</div>
              )}
            </FormControl>
          </Box>
        )}
      </Box>
      <Grid
        sx={{
          fontSize: '14px',
          marginTop: '8px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <NewTaskLink
          css={{ alignItems: 'center' }}
          onClick={() => setOpenAddTask(true)}
        >
          <AddIcon style={{ marginRight: '5px' }} />
          <span>{t('DetailNewTask')}</span>
        </NewTaskLink>
        <ViewAllTasks
          onClick={() => {
            setShowAllPersonalTasks(true);
          }}
        >
          {t('DetailAllTask')}
        </ViewAllTasks>
      </Grid>
    </Grid>
  );
};

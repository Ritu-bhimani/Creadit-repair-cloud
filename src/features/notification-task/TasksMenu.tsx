import styled from '@emotion/styled';
import { CheckBoxRounded, Person } from '@mui/icons-material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  SxProps,
  Theme
} from '@mui/material';
import {
  capitalize,
  get,
  isEmpty,
  isNil,
  startCase,
  trim,
  truncate
} from 'lodash-es';
import { bindTrigger } from 'material-ui-popup-state';
import { bindPopover, usePopupState } from 'material-ui-popup-state/hooks';
import moment from 'moment-timezone';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowPopover, CheckBox, ErrorBoundary, Modal } from '../../components';
import { useAuth, UserDetails } from '../../hooks';
import { routes } from '../../utils';
import {
  NewTask,
  useMarkTaskAsCompletedOrIncompleteMutation
} from '../personal-tasks';
import { useNotificationTaskQuery } from './notificationTask.api';

const Icons: SxProps<Theme> = {
  fill: '#8fadd1',
  ':hover': {
    fill: '#fff'
  }
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Latofont;
  font-size: 14px;
  color: #4a4a4a;
  font-weight: 400;
  padding: 12px;
  align-items: center;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Latofont;
  font-size: 14px;
  a {
    color: #0075cc;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
    color: #244894;
  }
  font-weight: 400;
  padding: 12px;
  align-items: center;
`;

const TaskDescription = styled.div`
  font-family: Latofont;
  font-size: 12px;
  font-weight: 400;
`;

const Links = styled(Link)`
  color: #0075cc;
  a:hover {
    text-decoration: underline;
    color: #244894;
  }
  text-decoration: none;
`;

const SubHeader = styled.p`
  font-family: Latofont;
  font-size: 12px;
  color: #4a4a4a;
  margin: 12px;
  font-weight: 700;
`;
type TaskProps = {
  value: string | number;
  taskName: string;
  assignee: string;
  comment: JSX.Element;
  onMarkComplete: (id: string | number) => void;
};

const Tasks = ({
  value,
  taskName,
  assignee,
  comment,
  onMarkComplete
}: TaskProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  return (
    <>
      <ListItem
        key={value}
        secondaryAction={<>{comment}</>}
        sx={{
          padding: '1vw ',
          ':hover': { backgroundColor: '#e4e4e4' }
        }}
      >
        <ListItemIcon
          sx={{ minWidth: '0.5vw', marginBottom: 'auto', marginTop: '5px' }}
        >
          <CheckBox
            sx={{ width: '14px', height: '14px' }}
            checked={isCompleted}
            id={value}
            onChange={(id) => {
              onMarkComplete(id);
              setIsCompleted(!isCompleted);
            }}
          ></CheckBox>
        </ListItemIcon>
        <ListItemText
          sx={{ marginLeft: '0.5rem', marginTop: '0', marginBottom: '0' }}
          primaryTypographyProps={{
            sx: {
              color: 'primary.main',
              fontWeight: 600,
              fontSize: '14px',
              fontFamily: 'Latofont',
              width: 'fit-content',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '170px',
              ':hover': {
                textDecoration: 'underline',
                cursor: 'pointer',
                color: '#005cb3'
              }
            }
          }}
          primary={
            <span>{truncate(taskName, { length: 30, omission: '...' })}</span>
          }
          secondary={
            <Grid
              container
              alignItems="flex-start"
              gap={1}
              direction="row"
              sx={{ marginTop: '0.5rem' }}
            >
              <Grid item>
                <Avatar
                  sx={{
                    bgcolor: '#dedede',
                    height: '1.2rem',
                    width: '1.2rem'
                  }}
                >
                  <Person fontSize="small" />
                </Avatar>
              </Grid>
              <Grid item>
                <TaskDescription>
                  {!isEmpty(trim(assignee)) ? (
                    <Links
                      css={{
                        color: '#0075cc',
                        width: 'auto',
                        ':hover': {
                          color: '#005cb3',
                          textDecoration: 'underline'
                        }
                      }}
                      to={'#'}
                    >
                      {startCase(assignee)}
                    </Links>
                  ) : (
                    <span css={{ color: '#4a4a4a' }}>Not assigned</span>
                  )}
                </TaskDescription>
              </Grid>
            </Grid>
          }
        />
      </ListItem>
    </>
  );
};

export const TaskMenu: FC = () => {
  const { getUserDetails } = useAuth();
  const user: UserDetails = getUserDetails();
  const currentDate = moment.tz(user.company_timezone);
  const { data, isLoading, isError, refetch } = useNotificationTaskQuery(null);
  const [openAddTask, setOpenAddTask] = useState(false);
  const badgeCount = get(data, 'count', 0);
  const overDue = get(data, 'overDue', []);
  let upComing = get(data, 'upComing', []);

  const toDay = get(data, 'toDay', []);

  const [markTaskAsCompletedOrIncomplete, {}] =
    useMarkTaskAsCompletedOrIncompleteMutation();

  const onMarkTaskComplete = async (id: number, flag: boolean) => {
    const result = await markTaskAsCompletedOrIncomplete({ id, flag });
    if ('error' in result) {
      toast.error('Something went wrong');
    } else {
      refetch();
      toast.success(result.data?.message);
    }
  };
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'TaskMenu'
  });
  upComing = upComing.slice().sort((a: any, b: any) => {
    return moment(a.StartTime).diff(moment(b.StartTime));
  });

  const noTasks: boolean =
    isEmpty(overDue) && isEmpty(upComing) && isEmpty(toDay);
  return (
    <>
      <IconButton
        color="error"
        sx={{ fill: '#8fadd1' }}
        {...bindTrigger(popupState)}
      >
        <Badge
          className="headerbadge"
          badgeContent={badgeCount}
          color="secondary"
        >
          <CheckBoxRounded color="action" fontSize="large" sx={Icons} />
        </Badge>
      </IconButton>
      <ErrorBoundary>
        <div>
          <Modal
            sx={{
              '& .MuiDialog-container': {
                alignItems: 'flex-start'
              },
              marginTop: ' 10vh',
              '& .MuiDialog-paper': {
                maxWidth: '36vw',
                '@media only screen and (max-width:600px)': {
                  maxWidth: '95vw'
                }
              }
            }}
            width={'sm'}
            open={openAddTask}
            closeIconVisible
            title={
              <span
                css={{
                  fontFamily: 'Latofont',
                  fontWeight: 500,
                  color: '#4a4a4a',
                  fontSize: '1.25rem'
                }}
              >
                Reminder
              </span>
            }
            onClose={() => setOpenAddTask(!openAddTask)}
          >
            <ErrorBoundary>
              <NewTask setOpenAddTask={() => setOpenAddTask(false)} />
            </ErrorBoundary>
          </Modal>
          <ArrowPopover
            placement="bottom"
            popoverBinder={bindPopover(popupState)}
            header={
              <Header>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  My Tasks & Events
                  <AddBoxIcon
                    onClick={() => setOpenAddTask(true)}
                    sx={{
                      color: '#0075cc',
                      cursor: 'pointer',
                      alignItems: 'center'
                    }}
                  />
                </Grid>
              </Header>
            }
            footer={
              <Footer>
                <Link css={{ fontWeight: '600' }} to={routes.APP_HOME}>
                  See all tasks
                </Link>
              </Footer>
            }
          >
            <ClickAwayListener onClickAway={popupState.close}>
              <div>
                {noTasks ? (
                  <div
                    css={{
                      padding: '12px',
                      textAlign: 'center',
                      color: '#999999'
                    }}
                  >
                    You have no tasks
                  </div>
                ) : (
                  <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    {overDue.length > 0 && (
                      <Box>
                        <SubHeader>Overdue</SubHeader>
                        <Divider />
                        <Box sx={{ maxHeight: '35vh', overflowY: 'auto' }}>
                          {overDue.map((task: any) => {
                            const assignee = `${
                              !isNil(task.first_name) ? task.first_name : ''
                            } ${!isNil(task.last_name) ? task.last_name : ''}`;
                            const comment = (
                              <span
                                css={{
                                  color: '#ab0000',
                                  fontSize: 12,
                                  marginTop: '-23px',
                                  display: 'block'
                                }}
                              >
                                {task.days}
                              </span>
                            );
                            return (
                              <>
                                <Tasks
                                  onMarkComplete={() =>
                                    onMarkTaskComplete(task.Id, true)
                                  }
                                  key={task.Id}
                                  value={task.Id}
                                  taskName={task.Subject}
                                  assignee={capitalize(assignee)}
                                  comment={comment}
                                />
                                <Divider />
                              </>
                            );
                          })}
                        </Box>
                      </Box>
                    )}
                    {toDay.length > 0 && (
                      <Box>
                        <SubHeader>Today</SubHeader>
                        <Divider />
                        <Box sx={{ maxHeight: '35vh', overflowY: 'auto' }}>
                          {toDay.map((task: any) => {
                            const assignee = `${
                              !isNil(task.first_name) ? task.first_name : ''
                            } ${!isNil(task.last_name) ? task.last_name : ''}`;
                            const comment = (
                              <span
                                css={{
                                  color: '#4a4a4a',
                                  fontSize: 12,
                                  marginTop: '-23px',
                                  display: 'block'
                                }}
                              >
                                {task.days}
                              </span>
                            );
                            return (
                              <>
                                <Tasks
                                  onMarkComplete={() =>
                                    onMarkTaskComplete(task.Id, true)
                                  }
                                  key={task.Id}
                                  value={task.Id}
                                  taskName={task.Subject}
                                  assignee={capitalize(assignee)}
                                  comment={comment}
                                />
                                <Divider />
                              </>
                            );
                          })}
                        </Box>
                      </Box>
                    )}
                    <Divider />
                    {upComing.length > 0 && (
                      <Box>
                        <SubHeader>Upcoming</SubHeader>
                        <Divider />
                        <Box sx={{ maxHeight: '25vh', overflowY: 'auto' }}>
                          {upComing.map((task: any) => {
                            const assignee = `${
                              !isNil(task.first_name) ? task.first_name : ''
                            } ${!isNil(task.last_name) ? task.last_name : ''}`;
                            return (
                              <>
                                <Tasks
                                  onMarkComplete={() =>
                                    onMarkTaskComplete(task.Id, true)
                                  }
                                  key={task.Id}
                                  value={task.Id}
                                  taskName={task.Subject}
                                  assignee={capitalize(assignee)}
                                  comment={
                                    <span
                                      css={{
                                        fontSize: 12,
                                        color: '#4a4a4a',
                                        display: 'block',
                                        marginTop: '-23px'
                                      }}
                                    >
                                      {task.days}
                                    </span>
                                  }
                                />
                                <Divider />
                              </>
                            );
                          })}
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}
              </div>
            </ClickAwayListener>
          </ArrowPopover>
        </div>
      </ErrorBoundary>
    </>
  );
};

import { Cancel } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  css,
  Grid,
  InputLabel,
  Stack,
  TextareaAutosize
} from '@mui/material';
import { capitalize, get } from 'lodash-es';
import map from 'lodash-es/map';
// import moment from 'moment';
import moment from 'moment-timezone';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Input, Select2Dropdown } from '../../components';
import { CustomDatePicker } from '../../components/DatePicker';
import { useAuth, UserDetails } from '../../hooks';
import {
  timeOptions,
  useAddNewTaskMutation,
  useGetClientTypesQuery,
  useGetLoginUserQuery,
  useGetRemaninderTypesQuery,
  useGetTeamMembersQuery
} from './personalTasks.api';

interface newTaskProps {
  setOpenAddTask?: any;
  reloadPage?: any;
}
type Option = {
  label: string;
  value: any;
};
export const NewTask = (props: newTaskProps) => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetRemaninderTypesQuery(null);
  const { data: userDetails, isFetching: UserFetching } =
    useGetLoginUserQuery(null);
  const { data: clientsType, isFetching: clientFetching } =
    useGetClientTypesQuery({ type: 'dropdown' });
  // const { data: teamMemberType, isFetching: teamTypeFetching } =
  //   useGetTeamMembersTypesQuery({ type: 'active' });
  const { getUserDetails } = useAuth();
  const user: UserDetails = getUserDetails();
  const todate = new Date(
    new Date().toLocaleString('en-US', { timeZone: user.company_timezone })
  );
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState(todate);
  const [dateVal, setDateVal] = useState();
  const [taskType, setTaskType] = useState('');
  const [dueTime, setDueTime] = useState('00:00:00');
  const [client, setClient] = useState('select');
  const { data: teamOptions, isFetching: teamFetching } =
    useGetTeamMembersQuery(
      {
        id: client === 'select' ? '' : client
      },
      {
        refetchOnMountOrArgChange: true,
        skip: false
      }
    );
  const [teamMember, setTeamMember] = useState('');
  const [notes, setNotes] = useState('');
  const [otherType, setOtherType] = useState('');
  const [addtask, { isLoading }] = useAddNewTaskMutation();
  const [subjectError, setSubjectError] = useState(false);
  const [otherTypeError, setOtherTypeError] = useState(false);
  const [teamMemberError, setTeamMemberError] = useState(false);
  const toastConfig = {
    icon: <Cancel />
  };

  const handleDate = (val: any | undefined) => {
    setDateVal(val);
  };
  const taskTypeOptions: Option[] =
    map(
      data?.reminder_types,
      (taskType) =>
        ({
          label: taskType.reminder_name,
          value: taskType.reminder_name
        } as Option)
    ) || [];

  const clientsTypeClients: any = get(clientsType, 'clients');
  const clientOptions: Option[] =
    map(
      clientsTypeClients,
      (client) =>
        ({
          value: client.id,
          label: `${capitalize(client.first_name)}  ${capitalize(
            client.last_name
          )}`
        } as Option)
    ) || [];
  clientOptions.unshift({ value: 'select', label: 'Select' });
  const teamMemberTypeClients: any = get(teamOptions, 'team_details');
  const teamMemberOptions: Option[] =
    map(
      teamMemberTypeClients,
      (team) =>
        ({
          value: team.id,
          label: `${capitalize(team.first_name)}  ${capitalize(team.last_name)}`
        } as Option)
    ) || [];
  teamMemberOptions.unshift({ value: 'select', label: 'Select' });
  useEffect(() => {
    if (userDetails && client === 'select') {
      let userId: any = get(userDetails, 'team_details.id');
      setTeamMember(userId);
    } else {
      setTeamMember('select');
    }
  }, [userDetails, teamFetching]);
  const handleSubmit = async () => {
    setSubjectError(false);
    setOtherTypeError(false);
    setTeamMemberError(false);
    if (subject === '' && (teamMember === '' || teamMember === 'select')) {
      toast.error(t('subjectAndTeamMemberRequried'), {
        ...toastConfig,
        toastId: 'subject_TeamMember'
      });
      setSubjectError(true);
      setTeamMemberError(true);
    } else if (subject === '') {
      toast.error(t('subjectIsRequired'), {
        ...toastConfig,
        toastId: 'subject'
      });
      setSubjectError(true);
    } else if (teamMember === '' || teamMember === 'select') {
      toast.error(t('teamMemberIsRequired'), {
        ...toastConfig,
        toastId: 'teamMember'
      });
      setTeamMemberError(true);
    } else if (taskType === 'Other' && otherType === '') {
      toast.error(t('otherTypeIsRequired'), {
        ...toastConfig,
        toastId: 'otherType'
      });
      setOtherTypeError(true);
    } else {
      const startDate = moment(dueDate).format('DD/MM/YYYY');
      const obj = {
        reminder_type: taskType,
        other_type: otherType !== '' ? otherType : taskType,
        subject: subject,
        start_date_reminder: startDate,
        start_date_time: dueTime,
        end_date_reminder: startDate,
        end_date_time: dueTime,
        client_id: client === 'select' ? '' : client,
        team_id: teamMember,
        notes: notes,
        type: 'task'
      };
      const result = await addtask(obj);
      if ('error' in result) {
        toast.error(t('somethingWentWrong'), {
          ...toastConfig,
          toastId: 'somethingWentWrong'
        });
      } else {
        toast.success(result.data?.message);
        props.setOpenAddTask(false);
        props.reloadPage();
      }
    }
  };

  const newTask = css`
    .m-b-24 {
      margin-bottom: 24px !important;
    }

    label {
      color: #666 !important;
      font-family: LatoFont;
    }

    textarea {
      border-radius: 4px;
      position: relative;
      background-color: #f5f8fa;
      border: solid 1px #dedede;
      font-size: 14px;
      font-weight: 400;
      transition: theme.transitions.create([ 'border-color', 'box-shadow']);
      font-family: LatoFont;
      color: #4a4a4a;
      width: 95% !important;
      padding: 10px 12px;
    }
    ,
    textarea:focus {
      border-radius: 4px;
      border-color: transparent;
      outline: none;
      box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
    }
    input {
      border: solid 1px #dedede;
      font-size: 14px !important;
      font-weight: 400;
      color: #4a4a4a;
    }
    ,
    input:focus {
      border-color: transparent !important;
      outline: none;
    }
    .selecttime {
      min-width: 120px;
    }
    .selecttime .MuiSelect-select {
      padding: 8px 40px 8px 12px !important;
    }
    .selecttime svg {
      color: #0075cc;
    }
  `;
  const footerStyle = css`
    justify-content: end;
  `;
  const taskcancelbutton = css`
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
  const errorStyle = css`
    border: solid 1px #e4251b !important;
    border-radius: 4px;
  `;
  if (teamMember === '' && teamMemberOptions.length > 0) {
    setTeamMember(teamMemberOptions[0].value);
  }
  if (taskType === '' && taskTypeOptions.length > 0) {
    setTaskType(taskTypeOptions[0].value);
  }
  const handleClient = (id: any) => {
    setClient(id);
    setTeamMember('select');
  };
  return (
    <>
      {isFetching || clientFetching || UserFetching ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box css={newTask}>
          <Grid
            container
            direction={'column'}
            gap={3}
            sx={{ marginBottom: '40px' }}
          >
            <Grid item>
              <Select2Dropdown
                fullWidth={true}
                options={taskTypeOptions}
                onChange={(value) => setTaskType(value)}
                name="taskType"
                selectedOption={taskType}
                label={t('taskType')}
              />
            </Grid>
            {taskType === 'Other' && (
              <Grid item>
                <Input
                  fullWidth
                  label={t('otherType')}
                  value={otherType}
                  name="otherType"
                  onChange={(e) => setOtherType(e.target.value)}
                  showRequired={true}
                  css={otherTypeError ? errorStyle : null}
                />
              </Grid>
            )}
            <Grid item>
              <Input
                fullWidth
                label={t('subject')}
                value={subject}
                name="subject"
                onChange={(e) => setSubject(e.target.value)}
                showRequired={true}
                css={subjectError ? errorStyle : null}
              />
            </Grid>
            <Grid
              item
              container
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Grid item>
                <CustomDatePicker
                  value={dueDate}
                  setStartDate={setDueDate}
                  getSelectedDate={handleDate}
                  label={t('dueDate')}
                />
              </Grid>
              <Grid
                item
                container
                alignContent={'flex-end'}
                sx={{ width: 'auto' }}
              >
                <Select2Dropdown
                  className="selecttime"
                  fullWidth
                  options={timeOptions}
                  onChange={(value) => setDueTime(value)}
                  name="time"
                  selectedOption={dueTime}
                  EndIcon={
                    <AccessTimeIcon
                      style={{ color: '#0075cc', fontSize: '24px' }}
                    />
                  }
                />
              </Grid>
            </Grid>
            <Grid item>
              <Select2Dropdown
                fullWidth
                options={clientOptions}
                // onChange={(value) => setClient(value)}
                onChange={(value) => handleClient(value)}
                name="client"
                selectedOption={client}
                label={t('client')}
              />
            </Grid>
            <Grid item>
              {teamFetching ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Select2Dropdown
                  fullWidth
                  options={teamMemberOptions}
                  onChange={(value) => setTeamMember(value)}
                  name="teamMember"
                  selectedOption={
                    userDetails?.team_details?.id && client === 'select'
                      ? userDetails.team_details?.id
                      : teamMember
                  }
                  label={t('teamMember')}
                  showRequired={true}
                  Iserror={teamMemberError}
                />
              )}
            </Grid>
            <Grid item>
              <InputLabel shrink htmlFor="bootstrap-input">
                {t('notes')}
              </InputLabel>
              <TextareaAutosize
                aria-label="Notes"
                minRows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Grid>
          </Grid>
          <Stack direction="row" gap={2} css={footerStyle}>
            <Button
              css={taskcancelbutton}
              onClick={() => {
                props.setOpenAddTask(false);
              }}
            >
              {t('Cancel')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              css={submitButtomStyle}
              disabled={isLoading}
              onClick={() => handleSubmit()}
            >
              {t('Save')}
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
};

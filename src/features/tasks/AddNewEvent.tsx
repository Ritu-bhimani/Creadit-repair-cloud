import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {
  Button,
  css,
  InputLabel,
  Stack,
  TextareaAutosize
} from '@mui/material';
import { toast } from 'react-toastify';
import { FC, useEffect, useState } from 'react';
import { Cancel } from '@mui/icons-material';
import { CheckBox } from '../../components/CheckBox';
import { ErrorBoundary, Input, Modal, SelectDropdown } from '../../components';
import Moment from 'moment';
import { CustomDatePicker } from '../../components/DatePicker';
import { useTranslation } from 'react-i18next';
import { get, map } from 'lodash-es';
import { useGetAllEventsQuery } from '../../features/tasks/tasks.api';
import {
  timeOptions,
  useAddNewTaskMutation,
  useGetClientTypesQuery,
  useGetRemaninderTypesQuery,
  useGetTeamMembersTypesQuery,
  useUpdateScheduleTaskMutation
} from '../../features/personal-tasks/personalTasks.api';
import { SelectColorPlatte } from './SelectColorPlatte';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const submitButtomStyle = css`
  padding: 11px 12px;
  border-radius: 4px;
  background-color: #00a650;
  font-size: 14px;
  min-width: 144px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  height: 40px !important;
  text-transform: none;
  :hover {
    background: #008a43;
  }
`;
const cancelButtomStyle = css`
  text-transform: none;
  background: transparent !important;
  :hover {
    color: #244894 !important;
    text-decoration: underline;
  }
`;
const newTask = css`
  .m-b-24 {
    margin-bottom: 24px !important;
  }
  .addeventform .eventdatepicker input {
    max-width: 80px !important;
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
    border-color: #dedede;
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
  }
  textarea:focus-visible {
    outline: none;
  }
  input {
    background-color: #f5f8fa !important;
    border: solid 1px #dedede;
    font-size: 14px;
    font-weight: 400;
    color: #4a4a4a;
    :focus {
      border-color: #dedede;
    }
  }
  ,
  .addeventform label {
    color: #666;
  }
  .addeventform input {
    font-size: 14px !important;
    color: #4a4a4a;
    font-family: 'Latofont';
    background-image: none;
    :focus {
      border-color: #dedede;
    }
  }
  .subjectcolor {
    display: flex;
    align-items: end;
    input#color {
      margin-right: 10px;
      height: 40px;
    }
  }
  .alldayevent label {
    font-size: 12px;
    text-decoration: none;
  }

  .alldayevent label {
    padding-left: 0 !important;
  }
  .alldayevent label span.checkmarkbox {
    margin-left: 75px !important;
    margin-top: 2px;
  }
`;

const footerStyle = css`
  justify-content: end;
  margin-top: 0px;
`;

const CustomDatePickerStyle = css`
  .customDatePicker .react-datepicker-wrapper {
    padding-right: 15px;
  }
`;

type Option = {
  label: string;
  value: any;
};

interface EditEvent {
  INITIAL_EVENTS?: any;
  currentId?: any;
  closeModal: () => void | FC;
}

export const AddNewEvent: FC<EditEvent> = (props: EditEvent) => {
  const { t } = useTranslation();
  const getHours = new Date().getHours();
  const { data, isFetching } = useGetRemaninderTypesQuery(null);
  const { data: getCalenderEvent, refetch: currentRefetch } =
    useGetAllEventsQuery({ type: 'all' });
  const { data: clientsType, isFetching: clientFetching } =
    useGetClientTypesQuery({ type: 'dropdown' });
  const { data: teamMemberType, isFetching: teamFetching } =
    useGetTeamMembersTypesQuery({ type: 'all' });
  const [addtask, { isLoading }] = useAddNewTaskMutation();
  const [taskType, setTaskType] = useState('');
  const [startDate, setStartDate] = useState<any | null>(new Date());
  const [toDate, setToDate] = useState<any | null>(new Date());
  const [startTime, setStartTime] = useState(getHours + ':00:00');
  const [dueTime, setDueTime] = useState(
    (getHours + 1 === 24 ? '00' : getHours + 1) + ':00:00'
  );
  const [dateVal, setDateVal] = useState();
  const [client, setClient] = useState(null);
  const [teamMember, setTeamMember] = useState(null);
  const [reminderType, setReminderType] = useState(null);
  const [subject, setSubject] = useState('');
  const [otherType, setOtherType] = useState('');
  const [color, setColor] = useState('#336ABC');
  const [IsAllDayEvent, setIsAllDayEvent] = useState(false);
  const [Location, setLocation] = useState('');
  const [remark, setRemark] = useState('');
  const [selectOpt, setSelectOpt] = useState<any | null>([]);
  const toastConfig = {
    icon: <Cancel />
  };

    useEffect(() => {
    if (data?.reminder_types) {
      setSelectOpt(
        data?.reminder_types.map((event) => {
          return { label: event, value: event };
        })
      );
    }
  }, [data]);

  const taskTypeOptionsArr: Option[] =
    map(
      data?.reminder_types,
      (taskType) =>
        ({
          label: taskType.reminder_name,
          value: taskType.reminder_name
        } as Option)
    ) || [];
  const taskTypeOptions = [
    {
      label: 'Choose',
      value: 'Choose'
    },
    ...taskTypeOptionsArr
  ];

  const clientsTypeClients: any = get(clientsType, 'clients');
  const clientOptionsArr: Option[] =
    map(
      clientsTypeClients,
      (client) =>
        ({
          value: client.id,
          label: client.first_name + ' ' + client.last_name
        } as Option)
    ) || [];
  const clientOptions = [
    {
      label: 'Select',
      value: 'Select'
    },
    ...clientOptionsArr
  ];

  const teamMemberTypeClients: any = get(
    teamMemberType,
    'team_details.team_list'
  );
  const teamMemberOptionsArr: Option[] =
    map(
      teamMemberTypeClients,
      (team) =>
        ({
          value: team.id,
          label: team.first_name + ' ' + team.last_name
        } as Option)
    ) || [];
  const teamMemberOptions = [
    {
      label: 'Select',
      value: 'Select'
    },
    ...teamMemberOptionsArr
  ];

  const handleDate = (val: any | undefined) => {
    setDateVal(val);
  };

  const updateEvent = async () => {
    const payload = {
      reminder_type: reminderType,
      other_type: otherType,
      color: color,
      subject: subject,
      start_date_reminder: Moment(startDate).format('DD/MM/YYYY'),
      start_date_time: startTime,
      end_date_reminder: Moment(toDate).format('DD/MM/YYYY'),
      end_date_time: dueTime,
      location: Location,
      IsAllDayEvent: IsAllDayEvent,
      client_id: client,
      team_id: teamMember,
      notes: remark,
      type: 'event'
    };
    if (!subject) {
      toast.error(t('Please enter subject'), {
        ...toastConfig,
        toastId: 'somethingWentWrong'
      });
    } else {
      const result = await addtask(payload);
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
        return props.closeModal();
        currentRefetch();
      }
    }
  };

  const setColorPlatte = (name: string): void => {
    setColor(name);
  };

  return (
    <>
      <Box css={newTask}>
        <Grid container direction={'column'} className="addeventform">
          <Grid item className="m-b-24">
             {selectOpt && selectOpt.length > 0 && (
              <SelectDropdown
                fullWidth={true}
                options={selectOpt}
                onChange={(value) => setReminderType(value)}
                name="taskType"
                selectedOption={reminderType}
                label={t('eventType')}
              />
            )}
          </Grid>
          {taskType === 'Other' && (
            <Grid item className="m-b-24">
              <Input
                fullWidth
                key={otherType}
                label={t('otherType')}
                value={otherType}
                name="other_type"
                onChange={(e) => setOtherType(e.target.value)}
                showRequired={true}
              />
            </Grid>
          )}
          <Grid item className="m-b-24 subjectcolor">
            <input
              type="color"
              id="color"
              name="color"
              onChange={(e) => setColor(e.target.value)}
              value={color}
              key={color}
            />
            {/* {/ <SelectColorPlatte colorPlatte={setColorPlatte} /> /} */}
            <Input
              fullWidth
              label={t('subject')}
              value={subject}
              name="Subject"
              onChange={(e) => setSubject(e.target.value)}
              showRequired={true}
              error={true}
            />
          </Grid>

          <InputLabel shrink htmlFor="bootstrap-input">
            {t('datenfrom')}
          </InputLabel>
          <Grid
            item
            className="m-b-24 eventdatepicker"
            sx={{ display: 'flex' }}
            css={CustomDatePickerStyle}
          >
            <Grid
              item
              className="customDatePicker"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingRight: '15px'
              }}
            >
              <CustomDatePicker
                value={startDate}
                setStartDate={setStartDate}
                getSelectedDate={handleDate}
                label={t('from')}
              />
              {!IsAllDayEvent && (
                <SelectDropdown
                  fullWidth
                  options={timeOptions}
                  onChange={(value) => setStartTime(value)}
                  name="time"
                  selectedOption={startTime}
                />
              )}
            </Grid>
            <Grid
              item
              className="customDatePicker"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingLeft: '15px'
              }}
            >
              <CustomDatePicker
                value={toDate}
                setStartDate={setToDate}
                getSelectedDate={handleDate}
                label={t('to')}
              />
              {!IsAllDayEvent && (
                <SelectDropdown
                  fullWidth
                  options={timeOptions}
                  onChange={(value) => setDueTime(value)}
                  name="time"
                  selectedOption={dueTime}
                />
              )}
            </Grid>
          </Grid>

          <Grid item className="alldayevent">
            {clientOptions && clientOptions.length > 0 && (
              <CheckBox
                CheckBox
                stricked={IsAllDayEvent}
                label={'All day event'}
                checked={IsAllDayEvent}
                onChange={(id) => setIsAllDayEvent(!IsAllDayEvent)}
                id={'IsAllDayEvent'}
              />
            )}
          </Grid>
          <Grid item className="m-b-24">
            {clientOptions && clientOptions.length > 0 && (
              <SelectDropdown
                fullWidth
                options={clientOptions}
                onChange={(e) => setClient(e)}
                name="client"
                selectedOption={client}
                label={t('client')}
              />
            )}
          </Grid>
          <Grid item className="m-b-24">
            {teamMemberOptions && teamMemberOptions.length > 0 && (
              <SelectDropdown
                fullWidth
                options={teamMemberOptions}
                onChange={(value) => setTeamMember(value)}
                name="teamMember"
                selectedOption={teamMember}
                label={t('teamMember')}
              />
            )}
          </Grid>
          <Grid item className="m-b-24">
            <Input
              fullWidth
              label={t('location')}
              value={Location}
              name="Location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item className="m-b-24">
            <InputLabel shrink htmlFor="bootstrap-input">
              {t('remark')}
            </InputLabel>
            <TextareaAutosize
              aria-label="Remarks"
              minRows={4}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              name="Remarks"
            />
          </Grid>
        </Grid>
        <Stack direction="row" gap={2} css={footerStyle}>
          <Button
            onClick={() => {
              return props.closeModal();
            }}
            css={cancelButtomStyle}
          >
            {t('cancel')}
          </Button>
          <Button
            type="submit"
            onClick={() => updateEvent()}
            variant="contained"
            color="success"
            css={submitButtomStyle}
          >
            {t('save')}
          </Button>
        </Stack>
      </Box>
    </>
  );
};
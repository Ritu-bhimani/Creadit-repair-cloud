import { Cancel } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Button,
  CircularProgress,
  ClickAwayListener,
  css,
  InputLabel,
  Link,
  Popper,
  Stack,
  styled,
  TextareaAutosize,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { get } from 'lodash-es';
import map from 'lodash-es/map';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';
import Moment from 'moment';
import printJS from 'print-js';
import { FC, useEffect, useState } from 'react';
import {
  useGetTaskIncomplateQuery,
  useGetTaskComplateQuery,
  useGetTaskEventQuery,
  useGetFilterBETQuery
} from '../../../features/tasks/tasks.api';

import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  ErrorBoundary,
  Input,
  Modal,
  SelectDropdown
} from '../../../components';
import { ActionButtons } from '../../../components/ActionButtons';
import { CheckBox } from '../../../components/CheckBox';
import { CustomDatePicker } from '../../../components/DatePicker';
import { useDeleteTaskMutation } from '../../../features/current-schedule/currentSchedule.api';
import { NewTask } from '../../../features/personal-tasks/NewTask';
import {
  timeOptions,
  useGetClientTypesQuery,
  useGetRemaninderTypesQuery,
  useGetTeamMembersTypesQuery,
  useMarkTaskAsCompletedOrIncompleteMutation,
  useUpdateScheduleTaskMutation
} from '../../../features/personal-tasks/personalTasks.api';
import { StyleWrapper } from './styles';

//For Bulk Edit Task
import { CustomButton } from '../../../components/CustomButton';

const footerStyle = css`
  justify-content: end;
  margin-top: 0px;
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
`;

const tasksDeleteText = css`
  font-weight: 600 !important;
  font-size: 16px !important;
  color: #666;
`;
const testing1 = css`
  background: none !important;
  opacity: 0.15 !important;
`;

const newTask = css`
  .m-b-24 {
    margin-bottom: 24px !important;
  }
  .editeventform .eventdatepicker input {
    max-width: 80px !important;
    background-image: none;
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
    color: #666;
    width: 99% !important;
  }
  ,
  textarea:focus {
    border-radius: 4px;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
  }
  input {
    background-color: #f5f8fa !important;
    border: solid 1px #dedede;
    font-size: 14px;
    font-weight: 400;
    color: #666;
  }
  ,
  .editeventform label {
    color: #666;
  }
  .editeventform input {
    font-size: 14px !important;
    color: #666;
    font-family: 'Latofont';
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
  }
`;

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

const Menu = styled(Popper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  marginLeft: '-2.5vw !important',
  marginTop: '3px !important',
  boxShadow: '1px 2px 3px 0 rgb(221 218 215 / 50%)',
  borderRadius: 4,
  '& .MuiLink-root': {
    color: '#4a4a4a'
  }
}));

interface taskUpdateData {
  task_type?: any;
  subject?: any;
  due_date?: any;
  team_id?: any;
  notes?: any;
  client_first_name?: any;
  client_last_name?: any;
  getDeleteEvent?: any;
  first_name?: any;
  last_name?: any;
  reminder_type?: any;
  Subject?: any;
  EndTime?: any;
  Description?: any;
  iTeam_id?: any;
  iclient_id?: any;
}
type Option = {
  label: string;
  value: any;
};

type taskDataType = {
  StartDate: string;
  StartTime: string;
};

export const TaskEventPage: FC = () => {
  const { t } = useTranslation();
  const { data: current, refetch: currentRefetch } = useGetTaskEventQuery(null);
  const { currentData, refetch: complateRefetch } =
    useGetTaskComplateQuery(null);
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const { data, isFetching } = useGetRemaninderTypesQuery(null);
  const { data: clientsType, isFetching: clientFetching } =
    useGetClientTypesQuery({ type: 'dropdown' });
  const { data: teamMemberType, isFetching: teamFetching } =
    useGetTeamMembersTypesQuery({ type: 'active' });
  const [updatetask, {}] = useUpdateScheduleTaskMutation();
  const [markTaskAsCompletedOrIncomplete, {}] =
    useMarkTaskAsCompletedOrIncompleteMutation();

  //Get Incomplated Task API
  const { data: taskIncomplate, refetch: taskIncomplateRefetch } =
    useGetTaskIncomplateQuery({
      page: 1,
      limit: 1000
    });
  const taskIncomplateAPI = taskIncomplate?.tasks;

  const currenttask =
    current?.events?.todays_reminders.length > 0 &&
    current?.events?.todays_reminders;

  const complatedtask =
    currentData?.events?.completed_tasks.length > 0 &&
    currentData?.events?.completed_tasks;

  const [incomplateTask, setIncomplateTask] = useState([]);
  const [complateTask, setComplateTask] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(Boolean(anchorEl));
  const [subValue, setSubValue] = useState('1');
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<number | undefined>();
  const [openEditModel, setOpenEditModel] = useState(false);
  const [openPrintModel, setOpenPrintModel] = useState(false);
  const [filteredItem, setFilteredItem] = useState<taskUpdateData>({});
  const [checkTaskId, setcheckTaskId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<any | null>();
  const [dateVal, setDateVal] = useState<any | null>();

  const toastConfig = {
    icon: <Cancel />
  };

  const toastConfigRight = {
    icon: <CheckCircleIcon />
  };

  let date = new Date(dateVal);
  let createDate = Moment(date).format('L');
  let timed = new Date(dateVal);
  let createTime = Moment(timed).format('HH:mm:ss');

  const [defaultSelectedRow, setDefaultSelectedRow] = useState<any | undefined>(
    {}
  );
  const [defaultComplateRow, setDefaultComplateRow] = useState<any | undefined>(
    {}
  );

  const [teamMember, setTeamMember] = useState('');
  const [client, setClient] = useState('');
  const [dueTime, setDueTime] = useState<any | null>('');

  const [taskType, setTaskType] = useState('');

  const [updateId, setUpdateId] = useState('');
  const [taskData, setTaskData] = useState({
    other_type: '',
    notes: filteredItem?.notes ? filteredItem?.notes : '',
    first_name: filteredItem?.first_name ? filteredItem?.first_name : '',
    last_name: filteredItem?.last_name ? filteredItem?.last_name : '',
    client_first_name: filteredItem?.client_first_name
      ? filteredItem?.client_first_name
      : '',
    client_last_name: filteredItem?.client_last_name
      ? filteredItem?.client_last_name
      : '',
    Subject: filteredItem?.Subject ? filteredItem?.Subject : '',
    EndTime: filteredItem?.EndTime ? filteredItem?.EndTime : '',
    Description: filteredItem?.Description ? filteredItem?.Description : ''
  });

  //For Bulk Edit Task
  const [bulkEditTasks, setBulkEditTasks] = useState(false);
  const [filterBET, setFilterBET] = useState('Completed/Incompleted');
  const [statusBET, setStatusBET] = useState('Incompleted');
  const [taskTypeBET, setTaskTypeBET] = useState<any>('');
  const [startDateBET, setStartDateBET] = useState<any | null>();
  const [startDateValBET, setStartDateValBET] = useState<any | null>();
  const [endDateBET, setEndDateBET] = useState<any | null>();
  const [endDateValBET, setEndDateValBET] = useState<any | null>();
  const [clientBET, setClientBET] = useState<any>('');
  const [teamMemberBET, setTeamMemberBET] = useState<any>('');
  const [actionBET, setActionBET] = useState('Actions for tasks');
  const [bulkEditTaskIncomplete, setBulkEditTaskIncomplete] = useState<any>([]);
  const [bulkEditTaskComplete, setBulkEditTaskComplete] = useState<any>([]);
  const [taskTypeFilterData, setTaskTypeFilterData] = useState<any>([]);
  const [dueDateFilterData, setDueDateFilterData] = useState<any>([]);
  const [clientFilterData, setClientFilterData] = useState<any>([]);
  const [teamMemberFilterData, setTeamMemberFilterData] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState<any>('');
  const [taskTypeOpt, setTaskTypeOpt] = useState<any | null>([]);
  const [taskTypeOptionBET, setTaskTypeOptionBET] = useState<any | null>([]);

  const handleStartDateBET = (val: any | undefined) => {
    if (startDateBET) {
      const date = new Date(startDateBET);
      const formatDate = Moment(date).format('L');
      setStartDateValBET(formatDate);
    }
  };

  const handleEndDateBET = (val: any | undefined) => {
    if (endDateBET) {
      const date = new Date(endDateBET);
      const formatDate = Moment(date).format('L');
      setEndDateValBET(formatDate);
    }
  };

  //Get Task Type API
  const { data: taskTypeFilterAPI, refetch: taskTypeFilterRefetch } =
    useGetFilterBETQuery({
      param: `reminder_type=${taskTypeBET ? taskTypeBET : ''}`,
      page: 1,
      limit: 1000
    });
  useEffect(() => {
    setTaskTypeFilterData(taskTypeFilterAPI?.tasks);
  }, [taskTypeFilterAPI]);

  //Get Task Due Dates API
  let query = {
    param: `start_date=&end_date=`,
    page: 1,
    limit: 1000
  };
  if (startDateValBET && endDateValBET) {
    query = {
      param: `start_date=${startDateValBET}&end_date=${endDateValBET}`,
      page: 1,
      limit: 1000
    };
  }
  const { data: dueDateFilterAPI, refetch: dueDateFilterRefetch } =
    useGetFilterBETQuery(query);
  useEffect(() => {
    setDueDateFilterData(dueDateFilterAPI?.tasks);
  }, [dueDateFilterAPI]);

  //Get Client API
  const { data: clientFilterAPI, refetch: clientFilterRefetch } =
    useGetFilterBETQuery({
      param: `client_id=${clientBET ? clientBET : ''}`,
      page: 1,
      limit: 1000
    });
  useEffect(() => {
    setClientFilterData(clientFilterAPI?.tasks);
  }, []);
  const handleClientFilter = () => {
    setClientFilterData(clientFilterAPI?.tasks);
  };

  //Get Assigned Team member API
  const { data: teamMemberFilterAPI, refetch: teamMemberFilterRefetch } =
    useGetFilterBETQuery({
      param: `team_id=${teamMemberBET ? teamMemberBET : ''}`,
      page: 1,
      limit: 1000
    });
  useEffect(() => {
    setTeamMemberFilterData(teamMemberFilterAPI?.tasks);
  }, [teamMemberFilterAPI]);

  //-----------------------------------
  useEffect(() => {
    setTaskType(filteredItem?.reminder_type);
    setDueTime(timeOptions.find((i) => i.value < createTime && i.value)?.value);
    setTeamMember(
      teamMemberOptions.find((i) => i.value === filteredItem.iTeam_id)?.value
    );
    setClient(
      clientOptions.find((i) => i.value === filteredItem.iclient_id)?.value
    );
  }, [filteredItem]);

  useEffect(() => {
    if (teamMember && currenttask && currenttask.length > 0) {
      setIncomplateTask(
        currenttask?.filter(
          (item: any) => item.iTeam_id == teamMember && item.estatus != 'done'
        )
      );
    } else if (currenttask && currenttask.length > 0) {
      setIncomplateTask(
        currenttask.filter((item: any) => item.estatus != 'done')
      );
    }
  }, [currenttask, teamMember]);

  useEffect(() => {
    if (teamMember && complatedtask && complatedtask.length > 0) {
      setComplateTask(
        complatedtask?.filter(
          (item: any) => item.iTeam_id == teamMember && item.estatus === 'done'
        )
      );
    } else if (complatedtask && complatedtask.length > 0) {
      setComplateTask(
        complatedtask.filter((item: any) => item.estatus === 'done')
      );
    }
  }, [complatedtask, teamMember]);

  useEffect(() => {
    if (taskData?.EndTime !== '') {
      let b = new Date(taskData?.EndTime);
      setStartDate(b);
    }
  }, [taskData]);

  useEffect(() => {
    if (filteredItem) {
      setTaskData({ ...taskData, ...filteredItem });
    }
  }, [filteredItem, defaultComplateRow]);

  //Set Incomplated task For BET
  useEffect(() => {
    if (taskIncomplateAPI) {
      setBulkEditTaskIncomplete(taskIncomplateAPI);
    }
  }, [taskIncomplateAPI]);

  //Set Complated task For BET
  useEffect(() => {
    setBulkEditTaskComplete(complatedtask);
  }, [complatedtask]);

  useEffect(() => {
    if (data?.reminder_types) {
      setTaskTypeOpt(
        data?.reminder_types.map((event) => {
          return { label: event, value: event };
        })
      );
    }
  }, [data]);

  const taskTypeOptions: any =
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
          label: client.first_name + ' ' + client.last_name
        } as Option)
    ) || [];

  const teamMemberTypeClients: any = get(teamMemberType, 'team_details');
  const teamMemberOptions: Option[] =
    map(
      teamMemberTypeClients,
      (team) =>
        ({
          value: team.id,
          label: team.first_name + ' ' + team.last_name
        } as Option)
    ) || [];

  if (teamMember === '' && teamMemberOptions.length > 0) {
    setTeamMember(teamMemberOptions[0].value);
  }

  const handleChange = (e: any) => {
    if (e.target.name == 'end_date_reminder') {
      setTaskData({ ...taskData, [e.target.name]: e.target.value });
    } else {
      setTaskData({ ...taskData, [e.target.name]: e.target.value });
    }
  };

  const deleteTaskHandlerModel = (id: number) => {
    setDeleteTaskId(id);
    setOpenDeleteModel(true);
  };

  const handleSubChange = (
    event: React.SyntheticEvent,
    newSubValue: string
  ) => {
    setSubValue(newSubValue);
  };

  const handleOutsideClickClose = () => {
    setAnchorEl(null);
  };

  const selectedRow = (event: any, data: any) => {
    if (subValue === '2') {
      setDefaultComplateRow(data);
    } else {
      setDefaultSelectedRow(data);
    }

    setAnchorEl(event.target.value);
    setOpen(true);
  };

  const handleDate = (val: any | undefined) => {
    setDateVal(val);
  };

  const onTaskMarkCompleOrIncomplete = async (id: number, flag: boolean) => {
    setcheckTaskId(id);
    const result = await markTaskAsCompletedOrIncomplete({ id, flag });
    if ('error' in result) {
      toast.error(t('somethingWentWrong'), {
        ...toastConfig,
        toastId: 'somethingWentWrong'
      });
    } else {
      currentRefetch();
      toast.success(result.data?.message, {
        ...toastConfig,
        toastId: 'successMsg'
      });
    }
  };

  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'helpAndSupportPopup'
  });

  const currentColumns: GridColDef[] = [
    {
      field: 'Subject',
      headerName: 'Task/Event',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span className="eventCheck eventTask">
              <CheckBox
                key={params.row.Id}
                stricked={params.row.estatus === 'done'}
                checked={checkTaskId == params.row.Id ? true : false}
                onChange={() =>
                  onTaskMarkCompleOrIncomplete(
                    params.row.Id,
                    !(params.row.estatus === 'done')
                  )
                }
                id={params.row.Id}
              />
            </span>
            <span>{params.row.Subject}</span>
          </>
        );
      }
    },
    {
      field: 'lastName',
      headerName: 'Assigned To',
      flex: 1,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        return (
          <span key={params.row.id} className="checkboxContainer">
            {params.row.vclient_fname} {params.row.vclient_lname}
          </span>
        );
      }
    },
    {
      field: 'EndTime',
      headerName: 'Due Date',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        const date = new Date(params.row.EndTime);
        const createDate = date.toLocaleDateString('en-US');
        const msDiff = new Date().getTime() - new Date(createDate).getTime();
        var overdueDays = Math.floor(msDiff / (1000 * 60 * 60 * 24));
        const time = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric'
        });
        return (
          <>
            <div className="duedatetogglebtn">
              <span style={{color : 'red'}}>{overdueDays} days overdue</span>

              <Link
                {...bindTrigger(popupState)}
                component="button"
                variant="body2"
              >
                <ArrowDropDownIcon
                  onClick={(e) => selectedRow(e, params.row)}
                />
              </Link>
            </div>
            <Menu
              style={{
                width: '170px',
                zIndex: '99',
                border: 'solid 1px #dddbda'
              }}
              className="headerpopover"
              {...bindPopover(popupState)}
              // open
              placement="bottom"
            >
              <ClickAwayListener onClickAway={popupState.close}>
                <Stack>
                  <Link
                    style={{ textDecoration: 'none' }}
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
                      handleOpen2(defaultSelectedRow);
                    }}
                  >
                    Edit
                  </Link>

                  <Link
                    style={{ textDecoration: 'none' }}
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
                      deleteTaskHandlerModel(defaultSelectedRow.Id);
                    }}
                  >
                    Delete
                  </Link>
                </Stack>
              </ClickAwayListener>
            </Menu>
          </>
        );
      }
    }
  ];

  const completedColumns: GridColDef[] = [
    {
      field: 'Subject',
      headerName: 'Task/Event',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span className="eventCheck">
              {/* <AccessTimeIcon className="text-[#0075cc]" /> */}
            </span>
            <span>{params.row.Subject}</span>
          </>
        );
      }
    },
    {
      field: 'lastName',
      headerName: 'Assigned To',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <span key={params.row.id} className="checkboxContainer">
            {params.row.vclient_fname} {params.row.vclient_lname}
          </span>
        );
      }
    },
    {
      field: 'EndTime',
      headerName: 'Due Date',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        const date = new Date(params.row.EndTime);
        const createDate = date.toLocaleDateString('en-US');
        const msDiff = new Date().getTime() - new Date(createDate).getTime();
        var overdueDays = Math.floor(msDiff / (1000 * 60 * 60 * 24));
        const time = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric'
        });
        return (
          <>
            <div className="duedatetogglebtn">
              <span style={{color : 'red'}}>
                {createDate} {time}{' '}
              </span>
              <Link
                {...bindTrigger(popupState)}
                component="button"
                variant="body2"
              >
                <ArrowDropDownIcon
                  onClick={(e) => selectedRow(e, params.row)}
                />
              </Link>
            </div>
            <Menu
              style={{
                width: '170px',
                zIndex: '99',
                border: 'solid 1px #dddbda'
              }}
              className="headerpopover"
              {...bindPopover(popupState)}
              // open
              placement="bottom"
            >
              <ClickAwayListener onClickAway={popupState.close}>
                <Stack>
                  <Link
                    style={{ textDecoration: 'none' }}
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
                      handleOpen2(defaultComplateRow);
                    }}
                  >
                    Edit
                  </Link>

                  <Link
                    style={{ textDecoration: 'none' }}
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
                      deleteTaskHandlerModel(defaultComplateRow.Id);
                    }}
                  >
                    Delete
                  </Link>
                </Stack>
              </ClickAwayListener>
            </Menu>
          </>
        );
      }
    }
  ];

  const TodayDue: GridColDef[] = [
    {
      field: 'Subject',
      headerName: 'Task/Event',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span className="eventCheck">
              {/* <AccessTimeIcon className="text-[#0075cc]" /> */}
            </span>
            <span>{params.row.Subject}</span>
          </>
        );
      }
    },
    {
      field: 'lastName',
      headerName: 'Assigned To',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <span key={params.row.id} className="checkboxContainer">
            {params.row.vclient_fname} {params.row.vclient_lname}
          </span>
        );
      }
    },
    {
      field: 'EndTime',
      headerName: 'Due Date',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        const date = new Date(params.row.EndTime);
        const createDate = date.toLocaleDateString('en-US');
        const msDiff = new Date().getTime() - new Date(createDate).getTime();
        var overdueDays = Math.floor(msDiff / (1000 * 60 * 60 * 24));
        const time = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric'
        });
        return (
          <>
            <div className="duedatetogglebtn">
              <span >
                {createDate === new Date().toLocaleDateString('en-US') ? 'Today' : 'Today'}
              </span>
              <Link
                {...bindTrigger(popupState)}
                component="button"
                variant="body2"
              >
                <ArrowDropDownIcon
                  onClick={(e) => selectedRow(e, params.row)}
                />
              </Link>
            </div>
            <Menu
              style={{
                width: '170px',
                zIndex: '99',
                border: 'solid 1px #dddbda'
              }}
              className="headerpopover"
              {...bindPopover(popupState)}
              // open
              placement="bottom"
            >
              <ClickAwayListener onClickAway={popupState.close}>
                <Stack>
                  <Link
                    style={{ textDecoration: 'none' }}
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
                      handleOpen2(defaultComplateRow);
                    }}
                  >
                    Edit
                  </Link>

                  <Link
                    style={{ textDecoration: 'none' }}
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
                      deleteTaskHandlerModel(defaultComplateRow.Id);
                    }}
                  >
                    Delete
                  </Link>
                </Stack>
              </ClickAwayListener>
            </Menu>
          </>
        );
      }
    }
  ];

  const upComingDue : GridColDef[] = [
    {
      field: 'Subject',
      headerName: 'Task/Event',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span className="eventCheck">
              {/* <AccessTimeIcon className="text-[#0075cc]" /> */}
            </span>
            <span>{params.row.Subject}</span>
          </>
        );
      }
    },
    {
      field: 'lastName',
      headerName: 'Assigned To',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <span key={params.row.id} className="checkboxContainer">
            {params.row.vclient_fname} {params.row.vclient_lname}
          </span>
        );
      }
    },
    {
      field: 'EndTime',
      headerName: 'Due Date',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        const date = new Date(params.row.EndTime);
        const createDate = date.toLocaleDateString('en-US');
        const msDiff = new Date().getTime() - new Date(createDate).getTime();
        var overdueDays = Math.floor(msDiff / (1000 * 60 * 60 * 24));
        const time = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric'
        });
        return (
          <>
            <div className="duedatetogglebtn">
              <span >
                {createDate == date.toLocaleDateString() ? 'Tomorrow' : 'Tomorrow'}
              </span>
              <Link
                {...bindTrigger(popupState)}
                component="button"
                variant="body2"
              >
                <ArrowDropDownIcon
                  onClick={(e) => selectedRow(e, params.row)}
                />
              </Link>
            </div>
            <Menu
              style={{
                width: '170px',
                zIndex: '99',
                border: 'solid 1px #dddbda'
              }}
              className="headerpopover"
              {...bindPopover(popupState)}
              // open
              placement="bottom"
            >
              <ClickAwayListener onClickAway={popupState.close}>
                <Stack>
                  <Link
                    style={{ textDecoration: 'none' }}
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
                      handleOpen2(defaultComplateRow);
                    }}
                  >
                    Edit
                  </Link>

                  <Link
                    style={{ textDecoration: 'none' }}
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
                      deleteTaskHandlerModel(defaultComplateRow.Id);
                    }}
                  >
                    Delete
                  </Link>
                </Stack>
              </ClickAwayListener>
            </Menu>
          </>
        );
      }
    }
  ];

  const deleteTaskHandler = async () => {
    let id = deleteTaskId;
    const result = await deleteTask({ id });
    if ('error' in result) {
      toast.error(t('somethingWentWrong'), {
        ...toastConfig,
        toastId: 'somethingWentWrong'
      });
    } else {
      setOpenDeleteModel(false);
      toast.success(t('Task deleted successfully'), {
        ...toastConfig,
        toastId: 'successMsg'
      });
      if (subValue === '1') {
        currentRefetch();
      } else {
        complateRefetch();
      }
    }
  };

  const handleCancel = () => {
    setOpenDeleteModel(false);
  };

  //--modal 2 for edit--//

  const handleOpen2 = async (selectedData: any) => {
    let id = selectedData.Id;
    setTaskData(selectedData);
    setUpdateId(id);
    if (subValue === '1') {
      const itemData =
        incomplateTask &&
        incomplateTask
          ?.filter((item: any) => item.Id == id)
          .map((filteredItem: any) => setFilteredItem(filteredItem));
    } else {
      const itemData1 =
        complateTask &&
        complateTask
          ?.filter((item: any) => item.Id == id)
          .map((filteredItem: any) => setFilteredItem(filteredItem));
    }

    setOpenEditModel(true);
  };

  const clientId = clientOptions.find((i) => i.value === client)?.value;
  const teamId = teamMemberOptions.find((i) => i.value === teamMember)?.value;

  const handleTeamData = (value: any) => {
    setTeamMember(value);
  };

  const reloadPage = () => {
    if (subValue === '1') {
      currentRefetch();
    } else {
      complateRefetch();
    }
  };
  //Edit Task Modal Form
  const handleSubmit = async () => {
    const startDate = Moment(new Date()).format('DD/MM/YYYY');

    const payload = {
      reminder_type: taskType,
      other_type: taskData.other_type,
      subject: taskData.Subject,
      start_date: startDate,
      start_time: '00:00:00',
      end_date: createDate,
      end_time: createTime,
      client_id: clientId,
      team_id: teamId,
      notes: subValue === '1' ? taskData.notes : taskData.Description,
      id: updateId
    };
    const result = await updatetask(payload);

    if ('error' in result) {
      toast.error(t('somethingWentWrong'), {
        ...toastConfig,
        toastId: 'somethingWentWrong'
      });
    } else {
      toast.success(result?.data?.message, {
        ...toastConfig,
        toastId: 'successMsg'
      });
      if (subValue === '2') {
        complateRefetch();
      } else {
        currentRefetch();
      }
    }
    setOpenEditModel(false);
  };

  const handleRefresh = () => {
    setTeamMember('');
    if (subValue === '2') {
      complateRefetch();
    } else {
      currentRefetch();
      setIncomplateTask(currenttask.filter((i: any) => i.estatus != 'done'));
    }
  };

  const DeleteTask = () => {
    return (
      <>
        <Typography css={tasksDeleteText} gutterBottom>
          {t('areYouSureYouWantToDeleteThisTask')}
        </Typography>
        <Stack
          direction="row"
          gap={2}
          css={footerStyle}
          style={{ marginTop: '40px' }}
        >
          <Button css={cancelButtomStyle} onClick={() => handleCancel()}>
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

  //----------->Fore ALL Bulk Edit Task Func/Var<-----------

  //onClose BET Modal
  const closeBETModal = () => {
    setBulkEditTasks(false);
    setFilterBET('Completed/Incompleted');
    setStatusBET('Incompleted');
  };

  //Option BET Filter
  const filterOptionBET: Option[] =
    map(
      [
        'Completed/Incompleted',
        'Task Type',
        'Task due date',
        'Client',
        'Assigned to team member'
      ],
      (item) =>
        ({
          value: item,
          label: item
        } as Option)
    ) || [];

  //Onchange BET Filter
  const handleFilterBET = (value: any) => {
    setFilterBET(value);
  };

  //Option "Completed/Incompleted"
  const statusOptionBET: Option[] =
    map(
      ['--status--', 'Incompleted', 'Completed'],
      (item) =>
        ({
          value: item,
          label: item
        } as Option)
    ) || [];

  //Option "Task Type"
  useEffect(() => {
    if (data?.reminder_types) {
      setTaskTypeOptionBET(
        data?.reminder_types.map((event) => {
          return { label: event, value: event };
        })
      );
    }
  }, [data]);
  taskTypeOptionBET.unshift({ value: 0, label: 'Select' });

  //Option "Client"
  const clientOptionBET: Option[] =
    map(
      clientsTypeClients,
      (client) =>
        ({
          value: client.id,
          label: client.first_name + ' ' + client.last_name
        } as Option)
    ) || [];
  clientOptionBET.unshift({ value: 0, label: 'Select' });

  //Option "Team Member"
  const teamMemberOptionBET: Option[] =
    map(
      teamMemberTypeClients,
      (team) =>
        ({
          value: team.id,
          label: team.first_name + ' ' + team.last_name
        } as Option)
    ) || [];
  teamMemberOptionBET.length > 0 &&
    teamMemberOptionBET.unshift({ value: 0, label: 'Select' });

  //Onchange "Completed/Incompleted"
  const handleStatusBET = (value: any) => {
    setStatusBET(value);
  };

  //Onchange "Task Type"
  const handleTaskTypeBET = (value: any) => {
    setTaskTypeBET(value);
  };

  //Onchange "Client"
  const handleClientBET = (value: any) => {
    setClientBET(value);
  };

  //Onchange "Team Member"
  const handleTeamMemberBET = (value: any) => {
    setTeamMemberBET(value);
  };

  const actionBETOption: Option[] =
    map(
      [
        'Actions for tasks',
        'Delete',
        'Mark As Completed',
        'Mark As Incompleted'
      ],
      (item) =>
        ({
          value: item,
          label: item
        } as Option)
    ) || [];

  const handleActionBET = (value: any) => {
    setActionBET(value);
  };

  const bulkEditTaskIncompleteColumn: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.status === 'pending' && 'Incompleted'}</span>
          </>
        );
      }
    },
    {
      field: 'reminder_type',
      headerName: 'Task Type',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.reminder_type}</span>
          </>
        );
      }
    },
    {
      field: 'subject',
      headerName: 'Subject',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.subject}</span>
          </>
        );
      }
    },
    {
      field: 'start_time',
      headerName: 'Due Date',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{Moment(params.row.start_time).format('MM-DD-YYYY')}</span>
          </>
        );
      }
    },
    {
      field: 'client',
      headerName: 'Client',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.client.first_name}</span>
          </>
        );
      }
    },
    {
      field: 'team',
      headerName: 'Team Member',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>
              {[params.row.team.first_name, params.row.team.last_name].join(
                ' '
              )}
            </span>
          </>
        );
      }
    }
  ];

  const bulkEditTaskCompleteColumn: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.estatus === 'done' && 'Completed'}</span>
          </>
        );
      }
    },
    {
      field: 'reminder_type',
      headerName: 'Task Type',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.reminder_type}</span>
          </>
        );
      }
    },
    {
      field: 'subject',
      headerName: 'Subject',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.Subject}</span>
          </>
        );
      }
    },
    {
      field: 'start_time',
      headerName: 'Due Date',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{Moment(params.row.StartTime).format('MM-DD-YYYY')}</span>
          </>
        );
      }
    },
    {
      field: 'client',
      headerName: 'Client',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.vclient_fname}</span>
          </>
        );
      }
    },
    {
      field: 'team',
      headerName: 'Team Member',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.vFirst_Name + ' ' + params.row.vLast_Name}</span>
          </>
        );
      }
    }
  ];

  const taskTypeFilterDataColumn: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>
              {params.row.status === 'pending' ? 'Incompleted' : 'Completed'}
            </span>
          </>
        );
      }
    },
    {
      field: 'reminder_type',
      headerName: 'Task Type',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.reminder_type}</span>
          </>
        );
      }
    },
    {
      field: 'subject',
      headerName: 'Subject',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.subject}</span>
          </>
        );
      }
    },
    {
      field: 'start_time',
      headerName: 'Due Date',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{Moment(params.row.StartTime).format('MM-DD-YYYY')}</span>
          </>
        );
      }
    },
    {
      field: 'client',
      headerName: 'Client',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.client.first_name}</span>
          </>
        );
      }
    },
    {
      field: 'team',
      headerName: 'Team Member',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>
              {params.row.team.first_name + ' ' + params.row.team.last_name}
            </span>
          </>
        );
      }
    }
  ];

  const dueDateFilterDataColumn: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>
              {params.row.status === 'pending' ? 'Incompleted' : 'Completed'}
            </span>
          </>
        );
      }
    },
    {
      field: 'reminder_type',
      headerName: 'Task Type',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.reminder_type}</span>
          </>
        );
      }
    },
    {
      field: 'subject',
      headerName: 'Subject',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.subject}</span>
          </>
        );
      }
    },
    {
      field: 'start_time',
      headerName: 'Due Date',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{Moment(params.row.StartTime).format('MM-DD-YYYY')}</span>
          </>
        );
      }
    },
    {
      field: 'client',
      headerName: 'Client',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.client.first_name}</span>
          </>
        );
      }
    },
    {
      field: 'team',
      headerName: 'Team Member',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>
              {params.row.team.first_name + ' ' + params.row.team.last_name}
            </span>
          </>
        );
      }
    }
  ];

  const clientFilterDataColumn: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>
              {params.row.status === 'pending' ? 'Incompleted' : 'Completed'}
            </span>
          </>
        );
      }
    },
    {
      field: 'reminder_type',
      headerName: 'Task Type',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.reminder_type}</span>
          </>
        );
      }
    },
    {
      field: 'subject',
      headerName: 'Subject',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.subject}</span>
          </>
        );
      }
    },
    {
      field: 'start_time',
      headerName: 'Due Date',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{Moment(params.row.StartTime).format('MM-DD-YYYY')}</span>
          </>
        );
      }
    },
    {
      field: 'client',
      headerName: 'Client',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.client.first_name}</span>
          </>
        );
      }
    },
    {
      field: 'team',
      headerName: 'Team Member',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>
              {params.row.team.first_name + ' ' + params.row.team.last_name}
            </span>
          </>
        );
      }
    }
  ];

  const teamMemberFilterDataColumn: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>
              {params.row.status === 'pending' ? 'Incompleted' : 'Completed'}
            </span>
          </>
        );
      }
    },
    {
      field: 'reminder_type',
      headerName: 'Task Type',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.reminder_type}</span>
          </>
        );
      }
    },
    {
      field: 'subject',
      headerName: 'Subject',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.subject}</span>
          </>
        );
      }
    },
    {
      field: 'start_time',
      headerName: 'Due Date',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{Moment(params.row.StartTime).format('MM-DD-YYYY')}</span>
          </>
        );
      }
    },
    {
      field: 'client',
      headerName: 'Client',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>{params.row.client.first_name}</span>
          </>
        );
      }
    },
    {
      field: 'team',
      headerName: 'Team Member',
      headerClassName: 'tableCustomWidth',
      cellClassName: 'tableCustomWidth',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <span>
              {params.row.team.first_name + ' ' + params.row.team.last_name}
            </span>
          </>
        );
      }
    }
  ];

  const handleApplyAction = () => {
    if (actionBET === 'Delete' && selectedRows && selectedRows.length > 0) {
      Promise.all(
        selectedRows &&
          selectedRows?.map(async (id: any) => {
            await deleteTask({ id });
          })
      );
      taskIncomplateRefetch();
      complateRefetch();
      toast.success('Tasks deleted successfully', {
        ...toastConfigRight,
        toastId: 'successMsg'
      });
      setSelectedRows([]);
    } else if (
      actionBET === 'Mark As Completed' &&
      (statusBET === 'Incompleted' || statusBET === '--status--') &&
      selectedRows &&
      selectedRows.length > 0
    ) {
      Promise.all(
        selectedRows.map(async (id: any) => {
          await markTaskAsCompletedOrIncomplete({ id: id, flag: true });
        })
      );
      taskIncomplateRefetch();
      complateRefetch();
      toast.success('Tasks marked as completed successfully', {
        ...toastConfigRight,
        toastId: 'successMsg'
      });
      setSelectedRows([]);
    } else if (
      actionBET === 'Mark As Incompleted' &&
      statusBET === 'Completed' &&
      selectedRows &&
      selectedRows?.length > 0
    ) {
      Promise.all(
        selectedRows.map(async (id: any) => {
          await markTaskAsCompletedOrIncomplete({ id: id, flag: false });
        })
      );
      taskIncomplateRefetch();
      complateRefetch();
      toast.success('Tasks marked as incompleted successfully', {
        ...toastConfigRight,
        toastId: 'successMsg'
      });
      setSelectedRows([]);
    } else {
      toast.error('Please check tasks to apply action', {
        ...toastConfig,
        toastId: 'somethingWentWrong'
      });
    }
  };

  return (
    <StyleWrapper>
      <div>
        <Box sx={{ width: '100%' }}>
          <Grid className="taskEventHeding">
            <Grid className="taskEventLeft-content">
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ToggleButtonGroup
                    className="taskeventtabs"
                    value={subValue}
                    exclusive
                    onChange={handleSubChange}
                    aria-label="text alignment"
                  >
                    <ToggleButton
                      value="1"
                      aria-label="left aligned"
                      sx={{
                        borderTopLeftRadius: '4px !important',
                        borderBottomLeftRadius: '4px !important'
                      }}
                    >
                      Current
                    </ToggleButton>
                    <ToggleButton
                      value="2"
                      aria-label="right aligned"
                      sx={{
                        borderTopRightRadius: '4px !important',
                        borderBottomRightRadius: '4px !important'
                      }}
                    >
                      Completed
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <Typography
                    sx={{
                      marginBottom: '20px',
                      marginLeft: '24px',
                      color: '#0075cc',
                      cursor: 'pointer',
                      fontSize: '14px',
                      ':hover': {
                        color: '#244894',
                        textDecoration: 'underline'
                      }
                    }}
                    onClick={() => setBulkEditTasks(true)}
                  >
                    Bulk Edit Tasks
                  </Typography>
                </div>
                <div className="taskeventactionbtns">
                  <ActionButtons
                    refreshIcon={true}
                    handleRefresh={() => handleRefresh()}
                    importExportIcon={true}
                    printIcon={true}
                    handlePrint={() => setOpenPrintModel(true)}
                    selectDropdown={true}
                    options={teamMemberOptions}
                    selectedOption={teamMember}
                    handleDropDown={(value: any) => handleTeamData(value)}
                    button={true}
                    buttonLabel={'Add New Task'}
                    handleButton={() => setOpenAddTask(true)}
                  />

                  {/* <Box className="datatablegrid" sx={{ width: '100%' }}>
                  {subValue === '1' ? (
                    <DataTable
                      getRowId={(row: any) => row.Id}
                      loading={isLoading}
                      height={'100vh !important'}
                      hideFooter={true}
                      columnData={currentColumns}
                      tableData={incomplateTask ? incomplateTask : []}
                    />
                  ) : (
                    <DataTable
                      getRowId={(row: any) => row.Id}
                      loading={isLoading}
                      height={'100vh !important'}
                      hideFooter={true}
                      columnData={completedColumns}
                      tableData={complateTask ? complateTask : []}
                    />
                  )}
                </Box> */}
                </div>
                <Box sx={{ height: 1000, width: '100%' }}>
                  {subValue === '1' ? (
                    <>
                      <div className="overduebtn">Overdue</div>
                      <DataGrid
                        disableColumnMenu
                        getRowId={(row: any) => row.Id}
                        components={{
                          LoadingOverlay: () => (
                            <Box
                              sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                              <CircularProgress />
                            </Box>
                          ),
                          NoRowsOverlay: () => (
                            <>
                              <div
                                style={{
                                  marginTop: '20px',
                                  textAlign: 'center'
                                }}
                              >
                                "No Tasks Available"
                              </div>
                            </>
                          )
                        }}
                        loading={isLoading}
                        sx={{ height: '300px' }}
                        rows={
                          incomplateTask
                            ? incomplateTask.filter((taskData: any) =>
                                Moment().isAfter(taskData?.StartTime, 'day')
                              )
                            : []
                        }
                        columns={currentColumns}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        disableColumnSelector
                        disableColumnFilter
                        hideFooter={true}
                        hideFooterPagination={true}
                      />
                      <div className="duetodaybtn">Due Today</div>
                      <DataGrid
                        disableColumnMenu
                        headerHeight={0}
                        getRowId={(row: any) => row.Id}
                        components={{
                          LoadingOverlay: () => (
                            <Box
                              sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                              <CircularProgress />
                            </Box>
                          ),
                          NoRowsOverlay: () => (
                            <>
                              <div
                                style={{
                                  marginTop: '20px',
                                  textAlign: 'center'
                                }}
                              >
                                "No Tasks Available"
                              </div>
                            </>
                          )
                        }}
                        loading={isLoading}
                        sx={{ height: '300px' }}
                        rows={
                          incomplateTask
                            ? incomplateTask.filter((taskData: taskDataType) =>
                                Moment().isSame(taskData?.StartTime, 'day')
                              )
                            : []
                        }
                        columns={TodayDue}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        disableColumnSelector
                        disableColumnFilter
                        hideFooter={true}
                        hideFooterPagination={true}
                      />
                      <div className="upcomingbtn">Upcoming</div>
                      <DataGrid
                        disableColumnMenu
                        headerHeight={0}
                        getRowId={(row: any) => row.Id}
                        components={{
                          LoadingOverlay: () => (
                            <Box
                              sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                              <CircularProgress />
                            </Box>
                          ),
                          NoRowsOverlay: () => (
                            <>
                              <div
                                style={{
                                  marginTop: '20px',
                                  textAlign: 'center'
                                }}
                              >
                                "No Tasks Available"
                              </div>
                            </>
                          )
                        }}
                        loading={isLoading}
                        sx={{ height: '300px' }}
                        rows={
                          incomplateTask
                            ? incomplateTask.filter((taskData: taskDataType) =>
                                Moment().isBefore(taskData?.StartTime, 'day')
                              )
                            : []
                        }
                        columns={upComingDue}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        disableColumnSelector
                        disableColumnFilter
                        hideFooter={true}
                        hideFooterPagination={true}
                      />
                    </>
                  ) : (
                    <>
                      <div className="overduebtn">Overdue</div>
                      <DataGrid
                        disableColumnMenu
                        getRowId={(row: any) => row.Id}
                        components={{
                          LoadingOverlay: () => (
                            <Box
                              sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                              <CircularProgress />
                            </Box>
                          ),
                          NoRowsOverlay: () => (
                            <>
                              <div
                                style={{
                                  marginTop: '20px',
                                  textAlign: 'center'
                                }}
                              >
                                "No Tasks Available"
                              </div>
                            </>
                          )
                        }}
                        loading={false}
                        sx={{ height: '300px' }}
                        rows={
                          complateTask
                            ? complateTask.filter((taskData: taskDataType) =>
                                Moment().isAfter(taskData?.StartTime, 'day')
                              )
                            : []
                        }
                        columns={TodayDue}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        disableColumnSelector
                        disableColumnFilter
                        hideFooter={true}
                        hideFooterPagination={true}
                      />
                      <div className="duetodaybtn">Due Today</div>
                      <DataGrid
                          disableColumnMenu
                          headerHeight={0}
                        getRowId={(row: any) => row.Id}
                        components={{
                          LoadingOverlay: () => (
                            <Box
                              sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                              <CircularProgress />
                            </Box>
                          ),
                          NoRowsOverlay: () => (
                            <>
                              <div
                                style={{
                                  marginTop: '20px',
                                  textAlign: 'center'
                                }}
                              >
                                "No Tasks Available"
                              </div>
                            </>
                          )
                        }}
                        loading={false}
                        sx={{ height: '300px' }}
                        rows={
                          complateTask
                            ? complateTask.filter((taskData: taskDataType) =>
                                Moment().isSame(taskData?.StartTime, 'day')
                              )
                            : []
                        }
                        columns={completedColumns}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        disableColumnSelector
                        disableColumnFilter
                        hideFooter={true}
                        hideFooterPagination={true}
                      />
                      <div className="upcomingbtn">Upcoming</div>
                      <DataGrid
                          disableColumnMenu
                          headerHeight={0}
                        getRowId={(row: any) => row.Id}
                        components={{
                          LoadingOverlay: () => (
                            <Box
                              sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                              <CircularProgress />
                            </Box>
                          ),
                          NoRowsOverlay: () => (
                            <>
                              <div
                                style={{
                                  marginTop: '20px',
                                  textAlign: 'center'
                                }}
                              >
                                "No Tasks Available"
                              </div>
                            </>
                          )
                        }}
                        loading={false}
                        sx={{ height: '300px' }}
                        rows={
                          complateTask
                            ? complateTask.filter((taskData: taskDataType) =>
                                Moment().isBefore(taskData?.StartTime, 'day')
                              )
                            : []
                        }
                        columns={upComingDue}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        disableColumnSelector
                        disableColumnFilter
                        hideFooter={true}
                        hideFooterPagination={true}
                      />
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Modal
          sx={{
            '& .MuiDialog-container': {
              alignItems: 'flex-start'
            },
            marginTop: ' 0vh',
            '& .MuiDialog-paper': {
              maxWidth: '37vw'
            }
          }}
          width={'sm'}
          open={openAddTask}
          closeIconVisible
          title={'Add New Task'}
          onClose={() => setOpenAddTask(!openAddTask)}
        >
          <ErrorBoundary>
            <NewTask
              setOpenAddTask={() => setOpenAddTask(false)}
              reloadPage={() => reloadPage()}
            />
          </ErrorBoundary>
        </Modal>

        <Modal
          sx={{
            '& .MuiDialog-container': {
              alignItems: 'flex-start'
            },
            marginTop: ' 30vh',
            '& .MuiDialog-paper': {
              maxWidth: '30vw'
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
            marginTop: ' 0vh',
            '& .MuiDialog-paper': {
              maxWidth: '37vw'
            }
          }}
          width={'sm'}
          open={openEditModel}
          closeIconVisible
          title={t('Edit Task')}
          onClose={() => setOpenEditModel(!openEditModel)}
        >
          <ErrorBoundary>
            <>
              {isFetching || teamFetching || clientFetching ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box css={newTask}>
                  <Grid
                    container
                    direction={'column'}
                    className="editeventform"
                  >
                    <Grid item className="m-b-24">
                      <SelectDropdown
                        fullWidth={true}
                        options={taskTypeOpt}
                        onChange={(value) => setTaskType(value)}
                        name="taskType"
                        selectedOption={taskType}
                        label={t('taskType')}
                      />
                    </Grid>
                    {taskType === 'Other' && (
                      <Grid item className="m-b-24">
                        <Input
                          fullWidth
                          label={t('otherType')}
                          value={taskData.other_type}
                          name="other_type"
                          onChange={handleChange}
                          showRequired={true}
                        />
                      </Grid>
                    )}
                    <Grid item className="m-b-24">
                      <Input
                        fullWidth
                        label={t('subject')}
                        value={taskData.Subject}
                        name="Subject"
                        onChange={(e) => handleChange(e)}
                        showRequired={true}
                      />
                    </Grid>
                    <Grid
                      item
                      className="m-b-24 eventdatepicker"
                      sx={{ display: 'flex', alignItems: 'flex-end' }}
                    >
                      <Grid item xs={3}>
                        <CustomDatePicker
                          value={startDate}
                          setStartDate={setStartDate}
                          getSelectedDate={handleDate}
                          label={t('dueDate')}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <SelectDropdown
                          fullWidth
                          options={timeOptions}
                          onChange={(value) => setDueTime(value)}
                          name="time"
                          selectedOption={dueTime}
                        />
                      </Grid>
                    </Grid>
                    <Grid item className="m-b-24">
                      <SelectDropdown
                        fullWidth
                        options={clientOptions}
                        onChange={(value) => setClient(value)}
                        name="client"
                        selectedOption={client}
                        label={t('client')}
                      />
                    </Grid>
                    <Grid item className="m-b-24">
                      <SelectDropdown
                        fullWidth
                        options={teamMemberOptions}
                        onChange={(value) => setTeamMember(value)}
                        name="teamMember"
                        selectedOption={teamMember}
                        label={t('teamMember')}
                      />
                    </Grid>
                    <Grid item className="m-b-24">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        {t('notes')}
                      </InputLabel>
                      {subValue === '1' ? (
                        <TextareaAutosize
                          aria-label="Notes"
                          minRows={4}
                          value={taskData.notes}
                          onChange={handleChange}
                          name="notes"
                        />
                      ) : (
                        <TextareaAutosize
                          aria-label="Notes"
                          minRows={4}
                          name="Description"
                          value={taskData.Description}
                          onChange={handleChange}
                        />
                      )}
                    </Grid>
                  </Grid>
                  <Stack direction="row" gap={2} css={footerStyle}>
                    <Button
                      css={cancelButtomStyle}
                      onClick={() => {
                        setOpenEditModel(false);
                      }}
                    >
                      {t('cancel')}
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      css={submitButtomStyle}
                      disabled={isLoading}
                      onClick={() => handleSubmit()}
                    >
                      {t('submit')}
                    </Button>
                  </Stack>
                </Box>
              )}
            </>
          </ErrorBoundary>
        </Modal>

        <Modal
          sx={{
            '& .MuiDialog-container': {
              alignItems: 'flex-start'
            },
            marginTop: ' 30vh',
            '& .MuiDialog-paper': {
              maxWidth: '30vw'
            }
          }}
          width={'sm'}
          open={openPrintModel}
          closeIconVisible
          title={t('Print data')}
          onClose={() => setOpenPrintModel(false)}
        >
          <ErrorBoundary>
            <table id="printablediv" aria-label="simple table">
              <th>
                <tr>
                  <td>Task/Event</td>
                  <td align="right">Assigned To</td>
                  <td align="right">Due Date</td>
                </tr>
              </th>
              <tbody>
                {incomplateTask.map((row, i) => (
                  <tr key={i}>
                    <td scope="row"></td>
                    <td align="right"></td>
                    <td align="right"></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Stack direction="row" gap={2} css={footerStyle}>
              <Button
                variant="contained"
                color="success"
                onClick={() => printJS('printablediv', 'html')}
              >
                {t('print')}
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => setOpenPrintModel(false)}
              >
                {t('close')}
              </Button>
            </Stack>
          </ErrorBoundary>
        </Modal>

        <Modal
          sx={{
            '& .MuiDialog-container': {
              alignItems: 'flex-start'
            },
            '& .MuiDialog-paper': {
              maxWidth: '55vw'
            }
          }}
          width={'md'}
          open={bulkEditTasks}
          closeIconVisible
          title={t('Bulk Edit Task')}
          onClose={() => closeBETModal()}
        >
          <div className="bulk-edit">
            <div style={{ display: 'flex', marginBottom: '30px' }}>
              <SelectDropdown
                sx={{ marginRight: '40px' }}
                fullWidth={false}
                selectedOption={filterBET}
                options={filterOptionBET}
                onChange={(value) => handleFilterBET(value)}
                name="Filter"
                label={t('Filter')}
              />
              <span className="mr-6"></span>
              {filterBET === 'Completed/Incompleted' && (
                <SelectDropdown
                  fullWidth={false}
                  selectedOption={statusBET}
                  options={statusOptionBET}
                  onChange={(value) => handleStatusBET(value)}
                  name="Status"
                  label={t('Status')}
                />
              )}

              {filterBET === 'Task Type' && (
                <SelectDropdown
                  fullWidth={false}
                  selectedOption={taskTypeBET}
                  options={taskTypeOptionBET}
                  onChange={(value) => handleTaskTypeBET(value)}
                  name="Task Type"
                  label={t('Task Type')}
                />
              )}

              {filterBET === 'Task due date' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <CustomDatePicker
                    value={startDateBET}
                    setStartDate={setStartDateBET}
                    getSelectedDate={handleStartDateBET}
                    label={t('dueDate')}
                  />
                  <CustomDatePicker
                    value={endDateBET}
                    setStartDate={setEndDateBET}
                    getSelectedDate={handleEndDateBET}
                    label={''}
                  />
                </div>
              )}

              {filterBET === 'Client' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <SelectDropdown
                    fullWidth={false}
                    selectedOption={clientBET}
                    options={clientOptionBET}
                    onChange={(value) => handleClientBET(value)}
                    name="Client"
                    label={t('Client')}
                  />
                  <CustomButton
                    css={{ width: '145px' }}
                    variant="contained"
                    color="success"
                    size="medium"
                    label="Search"
                    onClick={() => handleClientFilter()}
                  />
                </div>
              )}

              {filterBET === 'Assigned to team member' && (
                <SelectDropdown
                  fullWidth={false}
                  selectedOption={teamMemberBET}
                  options={teamMemberOptionBET}
                  onChange={(value) => handleTeamMemberBET(value)}
                  name="Assigned Team member"
                  label={t('Assigned Team member')}
                />
              )}
            </div>
            <div>
              {/* For Incompleted Data Table  */}
              {filterBET === 'Completed/Incompleted' ? (
                bulkEditTaskIncomplete &&
                bulkEditTaskIncomplete.length > 0 &&
                (statusBET === 'Incompleted' || statusBET === '--status--') ? (
                  <DataGrid
                    disableColumnMenu
                    getRowId={(row: any) => row.id}
                    components={{
                      LoadingOverlay: () => (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <CircularProgress />
                        </Box>
                      ),
                      NoRowsOverlay: () => (
                        <>
                          <div
                            style={{ marginTop: '20px', textAlign: 'center' }}
                          >
                            "No Tasks Available"
                          </div>
                        </>
                      )
                    }}
                    loading={false}
                    sx={{ height: '50vh' }}
                    rows={bulkEditTaskIncomplete}
                    columns={bulkEditTaskIncompleteColumn}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    disableColumnSelector
                    disableColumnFilter
                    hideFooter={false}
                    hideFooterPagination={false}
                    checkboxSelection
                    onSelectionModelChange={(ids) => setSelectedRows(ids)}
                  />
                ) : (
                  'No Tasks Available'
                )
              ) : (
                ''
              )}

              {/* For Completed Data Table  */}
              {filterBET === 'Completed/Incompleted' ? (
                bulkEditTaskComplete &&
                bulkEditTaskComplete.length > 0 &&
                statusBET === 'Completed' ? (
                  <DataGrid
                    disableColumnMenu
                    getRowId={(row: any) => row.Id}
                    components={{
                      LoadingOverlay: () => (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <CircularProgress />
                        </Box>
                      ),
                      NoRowsOverlay: () => (
                        <>
                          <div
                            style={{ marginTop: '20px', textAlign: 'center' }}
                          >
                            "No Tasks Available"
                          </div>
                        </>
                      )
                    }}
                    loading={false}
                    sx={{ height: '50vh' }}
                    rows={bulkEditTaskComplete}
                    columns={bulkEditTaskCompleteColumn}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    disableColumnSelector
                    disableColumnFilter
                    hideFooter={false}
                    hideFooterPagination={false}
                    checkboxSelection
                    onSelectionModelChange={(ids) => setSelectedRows(ids)}
                  />
                ) : (
                  'No Tasks Available'
                )
              ) : (
                ''
              )}

              {/* For Task Type Data Table  */}
              {filterBET === 'Task Type' ? (
                taskTypeFilterData && taskTypeFilterData.length > 0 ? (
                  <DataGrid
                    disableColumnMenu
                    getRowId={(row: any) => row.id}
                    components={{
                      LoadingOverlay: () => (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <CircularProgress />
                        </Box>
                      ),
                      NoRowsOverlay: () => (
                        <>
                          <div
                            style={{ marginTop: '20px', textAlign: 'center' }}
                          >
                            "No Tasks Available"
                          </div>
                        </>
                      )
                    }}
                    loading={false}
                    sx={{ height: '50vh' }}
                    rows={taskTypeFilterData}
                    columns={taskTypeFilterDataColumn}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    disableColumnSelector
                    disableColumnFilter
                    hideFooter={false}
                    hideFooterPagination={false}
                    checkboxSelection
                    onSelectionModelChange={(ids) => setSelectedRows(ids)}
                  />
                ) : (
                  'No Tasks Available'
                )
              ) : (
                ''
              )}

              {/* For Due Date Data Table  */}
              {filterBET === 'Task due date' ? (
                dueDateFilterData && dueDateFilterData.length > 0 ? (
                  <DataGrid
                    disableColumnMenu
                    getRowId={(row: any) => row.id}
                    components={{
                      LoadingOverlay: () => (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <CircularProgress />
                        </Box>
                      ),
                      NoRowsOverlay: () => (
                        <>
                          <div
                            style={{ marginTop: '20px', textAlign: 'center' }}
                          >
                            "No Tasks Available"
                          </div>
                        </>
                      )
                    }}
                    loading={false}
                    sx={{ height: '50vh' }}
                    rows={dueDateFilterData}
                    columns={dueDateFilterDataColumn}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    disableColumnSelector
                    disableColumnFilter
                    hideFooter={false}
                    hideFooterPagination={false}
                    checkboxSelection
                    onSelectionModelChange={(ids) => setSelectedRows(ids)}
                  />
                ) : (
                  'No Tasks Available'
                )
              ) : (
                ''
              )}

              {/* For Client Data Table  */}
              {filterBET === 'Client' ? (
                clientFilterData && clientFilterData.length > 0 ? (
                  <DataGrid
                    disableColumnMenu
                    getRowId={(row: any) => row.id}
                    components={{
                      LoadingOverlay: () => (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <CircularProgress />
                        </Box>
                      ),
                      NoRowsOverlay: () => (
                        <>
                          <div
                            style={{ marginTop: '20px', textAlign: 'center' }}
                          >
                            "No Tasks Available"
                          </div>
                        </>
                      )
                    }}
                    loading={false}
                    sx={{ height: '50vh' }}
                    rows={clientFilterData}
                    columns={clientFilterDataColumn}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    disableColumnSelector
                    disableColumnFilter
                    hideFooter={false}
                    hideFooterPagination={false}
                    checkboxSelection
                    onSelectionModelChange={(ids) => setSelectedRows(ids)}
                  />
                ) : (
                  'No Tasks Available'
                )
              ) : (
                ''
              )}

              {/* For Team Member Data Table  */}
              {filterBET === 'Assigned to team member' ? (
                teamMemberFilterData && teamMemberFilterData.length > 0 ? (
                  <DataGrid
                    disableColumnMenu
                    getRowId={(row: any) => row.id}
                    components={{
                      LoadingOverlay: () => (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <CircularProgress />
                        </Box>
                      ),
                      NoRowsOverlay: () => (
                        <>
                          <div
                            style={{ marginTop: '20px', textAlign: 'center' }}
                          >
                            "No Tasks Available"
                          </div>
                        </>
                      )
                    }}
                    loading={false}
                    sx={{ height: '50vh' }}
                    rows={teamMemberFilterData}
                    columns={teamMemberFilterDataColumn}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    disableColumnSelector
                    disableColumnFilter
                    hideFooter={false}
                    hideFooterPagination={false}
                    checkboxSelection
                    onSelectionModelChange={(ids) => setSelectedRows(ids)}
                  />
                ) : (
                  'No Tasks Available'
                )
              ) : (
                ''
              )}
            </div>
            <div className="bottom-action flex justify-between items-center">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '30px'
                }}
              >
                <p
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginRight: '24px'
                  }}
                >
                  Choose an action for selected tasks:
                </p>
                <div style={{ marginRight: '24px' }}>
                  <SelectDropdown
                    fullWidth={false}
                    selectedOption={actionBET}
                    options={actionBETOption}
                    onChange={(value) => handleActionBET(value)}
                  />
                </div>
                <CustomButton
                  css={{ width: '145px' }}
                  variant="contained"
                  color="success"
                  size="medium"
                  label="Apply Action"
                  onClick={() => handleApplyAction()}
                />
                <div style={{ marginLeft: 'auto' }}>
                  <CustomButton
                    css={{ lineHeight: '14px' }}
                    variant="outlined"
                    color="success"
                    size="medium"
                    label="Cancel"
                    data-testid="Cancel"
                    onClick={() => closeBETModal()}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </StyleWrapper>
  );
};

import { Cancel } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  CircularProgress,
  css,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import { get, map } from 'lodash-es';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ErrorBoundary, Input, Modal } from '../../../components';
import { ActionButtons } from '../../../components/ActionButtons';
import { ScheduleCalendar } from '../../../components/ScheduleCalendar';
import {
  useAddNewCalendarTaskMutation,
  useImportCalenderMutation
} from '../../../features/calendar';
import { useDeleteTaskMutation } from '../../../features/current-schedule/currentSchedule.api';
import { useGetTeamMembersTypesQuery } from '../../../features/personal-tasks/personalTasks.api';
import {
  AddNewEvent,
  EditEvent,
  useGetAllEventsQuery
} from '../../../features/tasks';

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
  background: #00a650;
  height: 40px !important;
  text-transform: none !important;
  :hover {
    background: #008a43;
  }
`;
const cancelButtomStyle = css`
  text-transform: none !important;
  border: 2px solid #00a650;
  color: #00a650;
  min-width: 133px;
  font-weight: 600;
  :hover {
    text-decoration: none;
    background: #f5f5f5;
    border: 2px solid #00a650;
  }
`;
const tasksDeleteText = css`
  font-weight: 600 !important;
  font-size: 16px !important;
  color: #666;
`;
let eventGuid = 0;
function createEventId() {
  return String(eventGuid++);
}

type eventDetails = {
  title: string;
  start: string;
  startStr: string;
};

type allEventDetails = {
  id: number;
  title: string;
  start: string;
};

interface myObjInterface {
  [key: string]: string;
}

let todayStr = moment(new Date()).format('YYYY-MM-DD'); // YYYY-MM-DD of today
let INITIAL_EVENTS: any[] = [];

type Option = {
  label: string;
  value: any;
};

export const MonthView: FC = () => {
  const { t } = useTranslation();
  let date = new Date();
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const {
    data: getCalenderEvent,
    isSuccess,
    isFetching,
    refetch
  } = useGetAllEventsQuery({
    type: `list&start_date=${moment(firstDay).format(
      'YYYY-MM-DD'
    )}&end_date=${moment(lastDay).format('YYYY-MM-DD')}`
  });
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const { data: teamMemberType, isFetching: teamFetching } =
    useGetTeamMembersTypesQuery({ type: 'all' });
  const [importcalender, {}] = useImportCalenderMutation();
  const [addCreateEvent, {}] = useAddNewCalendarTaskMutation();

  const eventsData: any = getCalenderEvent;
  const allEventsData = eventsData?.events.length > 0 && eventsData?.events;

  const [teamMember, setTeamMember] = useState('');
  const [viewType, setViewType] = useState('dayGridMonth');
  const [filterData, setFilterData] = useState<any | undefined>([]);
  const [showAddeventDialog, setShowAddeventDialog] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDetailsDialog, setEventDetailsDialog] = useState(false);
  const [editDeleteDialog, setEditDeleteDialog] = useState(false);
  const [detailsDeleteDialog, setDetailsDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [addEventDialog, setAddEventDialog] = useState<boolean>(false);
  const [importDialog, setImportDialog] = useState(false);
  const [file, setFile] = useState<File | any>(null);
  const [currentId, setCurrentId] = useState('');
  const [calendarInfo, setCalendarInfo] = useState<myObjInterface>({});
  const [calendarApi, setCalendarApi] = useState<any>({});
  const [currentEvents, setCurrentEvents] = useState<allEventDetails[]>([]);
  const [currentDetails, setCurrentDetails] = useState<eventDetails>({
    title: '',
    start: '',
    startStr: ''
  });
  const toastConfig = {
    icon: <Cancel />
  };
  const toastConfigRight = {
    icon: <CheckCircleIcon />
  };

  useEffect(() => {
    if (window.document.querySelector('.fc-today-button')) {
      (
        window.document.querySelector('.fc-today-button') as any
      ).removeAttribute('title');
    }
  }, []);

  useEffect(() => {
    if (
      viewType === 'dayGridMonth' &&
      window.document.querySelector('.fc-dayGridMonth-button')
    ) {
      (window.document.querySelector('.fc-dayGridMonth-button') as any).click();
    }
  }, [viewType]);

  useEffect(() => {
    if (allEventsData?.length === 0) {
      useGetAllEventsQuery({
        type: `list&start_date=${moment(firstDay).format(
          'YYYY-MM-DD'
        )}&end_date=${moment(lastDay).format('YYYY-MM-DD')}`
      });
    } else if (isSuccess) {
      INITIAL_EVENTS = allEventsData;
      setFilterData(INITIAL_EVENTS);
      setCurrentEvents(INITIAL_EVENTS);
    }
  }, [allEventsData]);

  useEffect(() => {
    if (teamMember) {
      if (teamMember == 'all') {
        INITIAL_EVENTS && setFilterData(INITIAL_EVENTS);
      } else {
        const filterVal =
          INITIAL_EVENTS &&
          teamMember &&
          INITIAL_EVENTS?.filter((item: any) => item.iTeam_id == teamMember);
        setFilterData(filterVal);
      }
    }
  }, [teamMember]);

  const handleEventClick = (clickInfo: any) => {
    setCurrentDetails({
      title: clickInfo.event.title,
      start: clickInfo.event.start.toString(),
      startStr: clickInfo.event.startStr.toString()
    });
    setCurrentId(clickInfo.event.id);
    setEventDetailsDialog(true);
  };

  const handleDateSelect = (selectInfo: any) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    setCalendarApi(calendarApi);
    setCalendarInfo(selectInfo);
    setShowAddeventDialog(true);
  };

  const renderEventContent = (eventInfo: any) => {
    return (
      <>
        {/* <span className="fc-time">{eventInfo.timeText}</span> */}
        <span className="fc-title">{eventInfo.event.title}</span>
      </>
    );
  };

  const datesSetHandler = () => {
    // Fetch events for the currently displayed dates
    let events = [];

    allEventsData.length > 0 &&
      allEventsData?.forEach((item: any, index: any) => {
        if (index < 10) {
          events.push({
            id: (index + 1).toString(),
            title: item.description || 'hh',
            start: new Date(item.StartTime) //.toISOString().replace(/T.*$/, '')
          });
        }
      });
    events[0] = {
      id: 1,
      title: 'All-day event',
      start: todayStr
    };
    setCurrentEvents(events);
  };

  const deleteTaskHandler = async () => {
    let id = currentId;
    const result = await deleteTask({ id });
    if ('error' in result) {
      toast.error(t('somethingWentWrong'), {
        ...toastConfig,
        toastId: 'somethingWentWrong'
      });
    } else {
      setEditDeleteDialog(false);
      setDetailsDeleteDialog(false);
      toast.success(t('Event deleted successfully'), {
        ...toastConfigRight,
        toastId: 'successMsg'
      });
    }
  };

  const teamMemberTypeClients: any = get(
    teamMemberType,
    'team_details.team_list'
  );
  const teamMemberOptions: Option[] =
    map(
      teamMemberTypeClients,
      (team) =>
        ({
          value: team.id,
          label: team.first_name + ' ' + team.last_name
        } as Option)
    ) || [];
  teamMemberOptions.unshift({ value: 0, label: 'All Team Members' });

  if (teamMember === '' && teamMemberOptions.length > 0) {
    setTeamMember(teamMemberOptions[0].value);
  }

  const INITIAL_EVENTS1 = filterData
    ? filterData?.map(({ title, start, id, end, backgroundColor }: any) => {
        return {
          title: title,
          color: backgroundColor,
          start:
            moment(start).format('HH:mm') == '00:00'
              ? moment(start).format('YYYY-MM-DD')
              : start,
          id: id,
          end:
            moment(end).format('HH:mm') == '00:00'
              ? moment(end).format('YYYY-MM-DD')
              : end
        };
      })
    : [];

  const addEventChange = (e: any) => {
    setEventTitle(e.target.value);
  };

  const handleTeamData = (value: any) => {
    setTeamMember(value);
  };

  const handleRefresh = () => {
    setTeamMember('');
    refetch();
    setFilterData(INITIAL_EVENTS);
  };

  const handleUpload = (e: any) => {
    setFile(e.target.files[0]);
  };

  const removeFile = () => {
    setFile(null);
    toast.success(t('Attachment removed successfully'), {
      ...toastConfig,
      toastId: 'removeSuccessMsg'
    });
  };

  const handleSubmitEvent = async () => {
    if (eventTitle) {
      calendarApi.addEvent({
        id: createEventId(),
        title: eventTitle,
        start: calendarInfo?.startStr,
        end: calendarInfo?.endStr,
        allDay: calendarInfo?.allDay
      });
    }
    let obj = {
      subject: eventTitle,
      start_date_reminder: moment(calendarInfo?.startStr).format('DD-MM-yyyy'),
      start_date_time: moment(calendarInfo?.startStr).format('LTS'),
      end_date_reminder: moment(calendarInfo?.endStr).format('DD-MM-yyyy'),
      end_date_time: moment(calendarInfo?.endStr).format('LTS')
    };

    const result = await addCreateEvent(obj);
    if ('error' in result) {
      toast.error(t('somethingWentWrong'), {
        ...toastConfig,
        toastId: 'somethingWentWrong'
      });
    } else {
      toast.success(result.data?.message);
      setEventTitle('');
      setShowAddeventDialog(false);
      refetch();
    }
  };

  const handleImport = async () => {
    var bodyFormData: any = new FormData();
    bodyFormData.append('upload_ics', file);

    const result = await importcalender(bodyFormData);

    if ('error' in result) {
      toast.error(t('somethingWentWrong'));
    } else {
      toast.success(result.data?.message);
      setImportDialog(false);
      refetch();
    }
  };

  return (
    <>
      {isFetching ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <ActionButtons
            refreshIcon={true}
            handleRefresh={() => handleRefresh()}
            importExportIcon={true}
            handleImport={() => setImportDialog(true)}
            selectDropdown={true}
            options={teamMemberOptions}
            selectedOption={teamMember}
            handleDropDown={(value: any) => handleTeamData(value)}
            button={true}
            buttonLabel={'Add New Event'}
            handleButton={() => setAddEventDialog(true)}
          />

          <ScheduleCalendar
            viewType="dayGridMonth"
            datesSetHandler={datesSetHandler}
            INITIAL_EVENTS1={INITIAL_EVENTS1}
            handleDateSelect={handleDateSelect}
            renderEventContent={renderEventContent}
            handleEventClick={handleEventClick}
            maxEvent={2}
          />
        </>
      )}

      <Dialog
        id="eventDetails"
        open={eventDetailsDialog}
        onClose={() => setEventDetailsDialog(false)}
        disableScrollLock
        style={{ overflowY: 'scroll' }}
      >
        <DialogTitle sx={{ m: 0, p: 2, width: '480px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <div style={{ display: 'flex', lineHeight: '25px' }}>
              <span className="iconContainer" style={{ marginRight: '12px' }}>
                <DateRangeIcon />
              </span>
              <span className="titleContainer">Event Details</span>
            </div>
            <div className="leftIconContainer">
              <span className="c-pointer edtideleteicons">
                <EditIcon
                  onClick={() => {
                    setEditDialog(true);
                    setEventDetailsDialog(false);
                  }}
                  style={{ color: '#0075cc', cursor: 'pointer' }}
                />
              </span>
              <span
                className="c-pointer edtideleteicons"
                style={{
                  marginLeft: '12px',
                  color: '#0075cc',
                  cursor: 'pointer'
                }}
              >
                <DeleteIcon
                  onClick={() => {
                    setEventDetailsDialog(false);
                    setDetailsDeleteDialog(true);
                  }}
                />
              </span>
            </div>
          </div>
        </DialogTitle>
        <DialogContent
          sx={{ paddingLeft: '53px', width: '435px', color: '#4a4a4a' }}
        >
          <p className="sans-p m-b-8" style={{ marginTop: '0' }}>
            {currentDetails?.title}
          </p>
          <p className="sans-p m-b-8">
            {moment(currentDetails?.start).format('ddd,MMM D,yyyy')}
          </p>
          <p className="sans-p m-b-8">
            {moment(currentDetails?.start).format('h:mm A')}
          </p>
        </DialogContent>
      </Dialog>

      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 0vh',
          '& .MuiDialog-paper': {
            maxWidth: '27vw'
          }
        }}
        width={'sm'}
        open={showAddeventDialog}
        closeIconVisible
        title={t('Create New Event')}
        onClose={() => setShowAddeventDialog(false)}
      >
        <ErrorBoundary>
          <div className="inputCotainer">
            <Input
              placeholder="Add Title"
              type="text"
              name="AddTitle"
              value={eventTitle}
              onChange={(e) => addEventChange(e)}
              showRequired={true}
              label="Add Title"
            />
          </div>
          <div className="timeContainer m-b-20 m-t-10 ">
            {viewType !== 'dayGridMonth' && (
              <>
                <AccessTimeIcon />
                <Link
                  to=""
                  className="text-[#0075cc] hover:underline hover:text-[#244894]"
                >
                  {calendarInfo && (
                    <>
                      {moment(calendarInfo?.startStr)
                        .format('ddd,ll')
                        .replace(', ', ',')}
                    </>
                  )}
                </Link>
                <Link
                  to=""
                  className="text-[#0075cc] hover:underline hover:text-[#244894]"
                >
                  {calendarInfo && (
                    <>{`
            ${moment(calendarInfo?.startStr).format('LT')} - ${moment(
                      calendarInfo?.endStr
                    ).format('LT')}
          `}</>
                  )}
                </Link>
              </>
            )}
            {viewType === 'dayGridMonth' && (
              <>
                <AccessTimeIcon />
                <Link
                  to=""
                  className="text-[#0075cc] hover:underline hover:text-[#244894]"
                >
                  {calendarInfo && (
                    <>{`${moment(calendarInfo?.startStr)
                      .format('ddd,ll')
                      .replace(', ', ',')} - ${moment(calendarInfo?.endStr)
                      .format('ddd,ll')
                      .replace(', ', ',')}`}</>
                  )}
                </Link>
              </>
            )}
          </div>
          <div className="buttonContainer">
            <Button
              onClick={handleSubmitEvent}
              className="greenButton"
              variant="contained"
            >
              Save
            </Button>
          </div>
        </ErrorBoundary>
      </Modal>

      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 0vh',
          '& .MuiDialog-paper': {
            maxWidth: '27vw'
          }
        }}
        width={'sm'}
        open={addEventDialog}
        closeIconVisible
        title={t('Create New Event')}
        onClose={() => setAddEventDialog(false)}
      >
        <ErrorBoundary>
          <AddNewEvent closeModal={() => setAddEventDialog(false)} />
        </ErrorBoundary>
      </Modal>

      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 0vh',
          '& .MuiDialog-paper': {
            maxWidth: '27vw'
          }
        }}
        width={'sm'}
        open={editDialog}
        closeIconVisible
        title={t('Edit Event')}
        onClose={() => setEditDialog(false)}
      >
        <ErrorBoundary>
          <EditEvent
            INITIAL_EVENTS={INITIAL_EVENTS}
            currentId={currentId}
            closeModal={() => setEditDialog(false)}
            deletModal={() => {
              setEditDeleteDialog(true);
              setEditDialog(false);
            }}
          />
        </ErrorBoundary>
      </Modal>
      {/* edit delete modal */}
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
        open={editDeleteDialog}
        closeIconVisible
        title={t('warning')}
        onClose={() => setEditDeleteDialog(false)}
      >
        <ErrorBoundary>
          <Typography css={tasksDeleteText} gutterBottom>
            {t('areYouSureYouWantToDeleteThisEvent')}
          </Typography>
          <Stack direction="row" gap={2} css={footerStyle}>
            <Button
              variant="contained"
              color="success"
              size="medium"
              css={okButtomStyle}
              onClick={() => deleteTaskHandler()}
            >
              {t('ok')}
            </Button>
            <Button
              color="success"
              variant="outlined"
              size="medium"
              onClick={() => {
                setEditDeleteDialog(false);
                setEditDialog(true);
              }}
              css={cancelButtomStyle}
            >
              {t('cancel')}
            </Button>
          </Stack>
        </ErrorBoundary>
      </Modal>
      {/* details delete modal */}
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
        open={detailsDeleteDialog}
        closeIconVisible
        title={t('warning')}
        onClose={() => setDetailsDeleteDialog(false)}
      >
        <ErrorBoundary>
          <Typography css={tasksDeleteText} gutterBottom>
            {t('areYouSureYouWantToDeleteThisEvent')}
          </Typography>
          <Stack direction="row" gap={2} css={footerStyle}>
            <Button
              variant="contained"
              color="success"
              size="medium"
              css={okButtomStyle}
              onClick={() => deleteTaskHandler()}
            >
              {t('ok')}
            </Button>
            <Button
              color="success"
              variant="outlined"
              size="medium"
              onClick={() => {
                setDetailsDeleteDialog(false);
                setEventDetailsDialog(true);
              }}
              css={cancelButtomStyle}
            >
              {t('cancel')}
            </Button>
          </Stack>
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
        open={importDialog}
        closeIconVisible
        title={t('Import Calender')}
        onClose={() => setImportDialog(false)}
      >
        <ErrorBoundary>
          <Typography gutterBottom>
            {t(
              'Choose the file that contains your events which exported from Google. This Calendar can import event information in ical format.'
            )}
          </Typography>
          {!file ? (
            <Button variant="outlined" component="label" color="success">
              Choose File
              <input
                accept="/*"
                type="file"
                hidden
                onChange={(e) => handleUpload(e)}
              />
            </Button>
          ) : (
            <>
              <span>{file.name}</span>
              <DeleteIcon onClick={() => removeFile()} />
              <Stack direction="row" gap={2} css={footerStyle}>
                <Button onClick={() => setImportDialog(false)}>
                  {t('cancel')}
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  css={okButtomStyle}
                  onClick={() => handleImport()}
                >
                  {t('import')}
                </Button>
              </Stack>
            </>
          )}
        </ErrorBoundary>
      </Modal>
    </>
  );
};

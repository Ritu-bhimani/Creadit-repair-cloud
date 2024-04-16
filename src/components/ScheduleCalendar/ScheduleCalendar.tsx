import { FC, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { StyleWrapper } from './styles';

export type ScheduleCalendarProps = {
  viewType?: 'timeGridWeek' | 'dayGridMonth' | 'timeGridDay';
  datesSetHandler?: any;
  INITIAL_EVENTS1?: any;
  handleDateSelect?: any;
  renderEventContent?: any;
  handleEventClick?: any;
  handleToday?: any;
  maxEvent?: any;
};

export const ScheduleCalendar: FC<ScheduleCalendarProps> = ({
  viewType,
  datesSetHandler,
  INITIAL_EVENTS1,
  handleDateSelect,
  renderEventContent,
  handleEventClick,
  maxEvent
}: ScheduleCalendarProps) => {
  return (
    <>
      <StyleWrapper>
        <FullCalendar
          customButtons={{
            myCustomButton: {
              text: 'View Today'
            }
          }}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: 'prev,next title today',
            center: '',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          buttonText={{
            today: 'View Today'
          }}
          nowIndicator={true}
          scrollTime="00:00:00"
          initialView={viewType}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={maxEvent ? maxEvent : true}
          datesSet={datesSetHandler}
          select={handleDateSelect}
          events={INITIAL_EVENTS1}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          displayEventTime={true}
          allDayMaintainDuration={true}
          droppable={false}
          eventOverlap={false}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: true,
            meridiem: false
          }}
        />
      </StyleWrapper>
    </>
  );
};

ScheduleCalendar.defaultProps = {
  viewType: 'timeGridWeek'
};

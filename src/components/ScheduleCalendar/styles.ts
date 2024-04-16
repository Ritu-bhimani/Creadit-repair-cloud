import styled from '@emotion/styled';

export const StyleWrapper = styled.div`
  .fc .fc-button-primary {
    color: #0075cc !important;
    background: none !important;
    border: none !important;
  }
  .fc .fc-button-primary:hover {
    background: none;
    color: #005cb3 !important;
  }
  .fc .fc-button-primary:focus {
    box-shadow: none !important;
  }
  .fc-icon-chevron-left:before,
  .fc-icon-chevron-right:before {
    font-size: 30px;
    font-weight: 600;
  }
  .fc .fc-button .fc-icon.fc-icon-chevron-left,
  .fc .fc-button .fc-icon.fc-icon-chevron-right {
    vertical-align: initial;
  }
  .fc-direction-ltr .fc-toolbar > * > :not(:first-child) {
    margin-left: 1.5rem;
    display: inline-block;
  }
  .fc-header-toolbar .fc-button-group > .fc-button {
    padding-top: 0;
  }
  td.fc-day-today {
    background: #f2fcff !important;
  }
  .fc-toolbar-title {
    font-size: 24px;
    color: #4a4a4a;
    font-weight: 400;
  }
  .fc-h-event {
    background-color: #a4a4a4 !important;
    height: 30px;
    padding: 5px;
    background-color: #a4a4a4 !important;
    height: 30px;
    padding: 5px;
    border-style: solid;
    border-width: 1px;
    vertical-align: top;
    background: 0 0;
    border-color: transparent;
    border-bottom: 0;
    .fc-event .fc-time {
      font-weight: 400 !important;
      float: right;
    }
    .fc-title {
      max-width: 95px !important;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .fc-button-primary.fc-myCustomButton-button {
    border: solid 2px #666 !important;
    color: #666 !important;
    margin-left: 1.5rem;
    padding: 11px 12px !important;
    line-height: 14px;
    width: 20%;
    opacity: 0.65;
    font-weight: 600;
    :hover {
      background: #f5f5f5 !important;
      color: #666 !important;
    }
  }
  .fc-timegrid-event.fc-v-event {
    text-align: center;
  }
  .fc-header-toolbar {
    .fc-toolbar-chunk:first-child {
      width: 42%;
      display: flex;
      align-items: center;
    }
  }
  .fc-col-header {
    tr th {
      height: 3rem;
      color: #0075cc;
      vertical-align: middle;
      text-transform: uppercase;
      border-right: none;
    }
  }

  .fc-timegrid-slots {
    .fc-timegrid-slot {
      height: 3rem;
    }
    .fc-timegrid-slot-lane {
      border: 1px solid #d5d5d5;
      border-top-style: dashed;
      border-bottom: 0;
    }
    .fc-timegrid-slot-label {
      border-bottom: 0;
      text-align: left;
      width: 4rem;
    }

    .fc-timegrid-slot-minor:not(.fc-timegrid-slot-lane) {
      border-top: 0;
    }
  }
  .fc-timegrid-axis.fc-scrollgrid-shrink,
  th.fc-timegrid-axis {
    width: 4rem;
  }
  th.fc-timegrid-axis {
    border-right: 0;
  }
  th.fc-col-header-cell {
    border-left: 0;
  }
  .fc-timeGridDay-view.fc-view.fc-timegrid {
    color: #b0adab !important;
    font-weight: 400 !important;
    font-family: Latofont !important;
  }
  .fc .fc-timegrid-axis-cushion,
  .fc .fc-timegrid-slot-label-cushion {
    font-size: 13px !important;
  }
  .fc-button-group {
    height: 35px;
    .fc-dayGridMonth-button,
    .fc-timeGridWeek-button,
    .fc-timeGridDay-button {
      display: none !important;
    }
  }
  .fc-event-main {
    font-size: 13px;
    line-height: 15px;
    .fc-time {
      display: block;
    }
  }
  .fc-direction-ltr .fc-daygrid-event.fc-event-end,
  .fc-direction-rtl .fc-daygrid-event.fc-event-start {
    background-color: #336abc !important;
    color: #ffffff;
    height: 30px;
    line-height: 30px;
    padding-left: 13px !important;
    padding-right: 13px !important;
    font-size: 13px;
  }
  .fc.fc-media-screen.fc-direction-ltr.fc-theme-standard
    .fc-header-toolbar.fc-toolbar {
    margin-top: -48px;
  }
  .fc-prev-button.fc-button.fc-button-primary {
    padding-top: 5px;
    padding-left: 0;
  }
  .fc-next-button.fc-button.fc-button-primary {
    padding-top: 5px;
  }
  .fc-next-button.fc-button.fc-button-primary:focus-visible {
    border: none !important;
    outline: none;
  }
  .fc-next-button.fc-button.fc-button-primary:focus {
    box-shadow: none;
  }
  .fc-prev-button.fc-button.fc-button-primary:focus-visible {
    border: none;
    outline: none;
  }
  .fc-prev-button.fc-button.fc-button-primary:focus {
    box-shadow: none;
  }
  .fc-event-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .fc-direction-ltr .fc-timegrid-col-events {
    margin: 0;
  }
  .fc-timegrid-col-frame .fc-timegrid-col-events .fc-timegrid-event-harness,
  .fc-timegrid-event-harness > .fc-timegrid-event {
    text-align: left;
  }
  .fc-timegrid-event-harness > .fc-timegrid-event {
    padding: 3px 12px;
    position: relative;
  }
  .fc-timegrid-col-frame .fc-timegrid-col-events .fc-timegrid-event-harness {
    //position: initial;
    padding: 5px !important;
    max-height: 48px;
  }
  .fc-dayGridMonth-view .fc-col-header-cell-cushion {
    color: #4a4a4a;
    font-size: 13px;
  }
  .fc-col-header-cell-cushion {
    font-size: 13px;
  }
  .fc-timegrid-slot-label-cushion.fc-scrollgrid-shrink-cushion {
    color: #b0adab !important;
    text-transform: uppercase;
  }
  .fc-timeGridDay-view a.fc-col-header-cell-cushion {
    color: #4a4a4a !important;
  }
  .fc-direction-ltr .fc-daygrid-more-link {
    float: right;
    color: #0075cc;
    font-size: 13px;
    :hover {
      background: transparent;
    }
  }
  .fc-day.fc-day-past .fc-event-start.fc-event-end.fc-event-past {
    background: #a4a4a4 !important;
    border-color: #a4a4a4 !important;
  }
  .fc-event span.fc-title {
    width: 135px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .fc .fc-timegrid-slot-minor {
    border-bottom: solid 1px #ddd !important;
  }
  .fc-daygrid-day-number {
    font-size: 24px;
    color: #4a4a4a;
    font-family: 'Latofont';
    padding-right: 12px;
  }
  .fc-day-past.fc-day-other.fc-daygrid-day,
  .fc-day-future.fc-day-other.fc-daygrid-day {
    background: #f5f5f5;
  }
  .fc .fc-day-other .fc-daygrid-day-top {
    opacity: 1;
  }
  .fc .fc-popover-title {
    color: #4a4a4a;
  }
  .fc-theme-standard .fc-popover-header,
  .fc .fc-more-popover .fc-popover-body {
    border: 1px solid #d5d5d5;
  }
  .fc-event-today.fc-v-event,
  .fc-event-future.fc-v-event {
    background: #336abc !important;
    :focus {
      background: #336abc !important;
    }
  }
  .fc .fc-daygrid-event-harness-abs {
    width: 100%;
  }
  .fc-toolbar-chunk button.fc-today-button.fc-button.fc-button-primary {
    padding: 11px 12px !important;
    line-height: 14px;
    border: 2px solid #00a650 !important;
    color: #00a650 !important;
    min-width: 125px;
    font-weight: 600;
  }
  .fc-toolbar-chunk button.fc-today-button.fc-button.fc-button-primary:hover {
    background: #f5f5f5 !important;
  }
  .fc-toolbar-chunk
    button.fc-today-button.fc-button.fc-button-primary[disabled] {
    border: 2px solid #666 !important;
    color: #666 !important;
    background: #f5f5f5 !important;
  }
`;

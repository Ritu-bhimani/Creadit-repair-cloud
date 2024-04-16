import { css } from '@emotion/react';

export const DatePickerStyles = {
  root: css`
    .react-datepicker {
      padding: 11px 11px 19px 11px;
    }
    .react-datepicker__input-container {
      /* border: 1px solid #dedede; */
      /* padding: 9px 12px 9px 12px; */
      border-radius: 3px;
    }
    .react-datepicker__input-container input {
      outline: none;
      //background-image: url('/assets/images/Calendar.png');
      background-repeat: no-repeat;
      background-position: right;
      background-origin: content-box;
      cursor: pointer;
      border-radius: 4px;
      background-color: #fcfcfb;
      border: 1px solid #dedede;
      font-size: 16px;
      padding: 0px 12px;
      background-color: #f5f8fa;
      height: 42px;
      font-family: Latofont;
    }
    .react-datepicker__day--outside-month {
      visibility: hidden;
    }
    .react-datepicker__current-month {
      display: none;
    }
    .react-datepicker__header {
      background-color: #fff;
      border-bottom: none;
      padding-top: 0px;
    }
    .react-datepicker__header__dropdown.react-datepicker__header__dropdown--select {
      border-bottom: 1px solid #dedede;
      padding: 0px 0 12px 0;
    }

    .react-datepicker__month-dropdown-container--select
      .react-datepicker__month-select {
      border: 1px solid #dedede;
      padding: 9px 9px 9px 9px;
      border-radius: 3px;
      background-color: #f5f8fa;
    }
    .react-datepicker__year-dropdown-container .react-datepicker__year-select {
      border: 1px solid #dedede;
      padding: 9px 9px 9px 9px;
      border-radius: 3px;
      background-color: #f5f8fa;
    }

    .react-datepicker .react-datepicker__navigation--previous,
    .react-datepicker .react-datepicker__navigation--next {
      top: 15px;
    }
    .react-datepicker__navigation-icon--previous::before {
      right: 0;
    }
    .react-datepicker__navigation-icon--next::before {
      left: 0;
    }

    .react-datepicker__navigation-icon::before {
      border-color: #0075cc;
      border-width: 2px 2px 0 0;
    }

    .react-datepicker__day--selected {
      border-radius: 1rem;
      background-color: #0075cc;
      color: #fff !important;
    }
    .react-datepicker__day--today {
      background: #ecebea;
      font-weight: normal;
      color: #454545 !important;
      border-radius: 100%;
    }
    .react-datepicker__day:hover {
      border-radius: 1rem;
    }
    .react-datepicker-popper .react-datepicker {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
      border: 0;
    }
    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
      color: #454545;
    }
    .react-datepicker__month-select,
    .react-datepicker__year-select {
      color: #454545;
    }
  `
};

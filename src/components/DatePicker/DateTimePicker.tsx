import { InputLabel } from '@mui/material';
import { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerStyles } from './styles';
interface CustomDatePickerProps {
  select?: any;
  label: string;
  value?: any;
  getSelectedDate?: any;
  setStartDate?: any;
}
export const CustomDateTimePicker: FC<CustomDatePickerProps> = (
  props: CustomDatePickerProps
) => {
  props.getSelectedDate(props.value);

  return (
    <div css={DatePickerStyles.root}>
      <div className="input-container">
        <InputLabel
          id="search-select-label"
          shrink={false}
          sx={{ fontWeight: '400', fontSize: '12px', marginBottom: '5px' }}
        >
          {props.label}
        </InputLabel>
        <DatePicker
          selected={props.value}
          onChange={(date: any) => props.setStartDate(date)}
          showMonthDropdown
          showYearDropdown
          showTimeSelect
          dropdownMode="select"
          showPopperArrow={false}
          timeFormat="HH:mm"
          dateFormat="MM/dd/yyyy HH:mm"
        />
      </div>
    </div>
  );
};

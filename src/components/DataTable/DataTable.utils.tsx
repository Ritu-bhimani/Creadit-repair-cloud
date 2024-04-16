import moment from 'moment';
import { DataTableStyles } from './styles';

export const DataTableUtils = {
  renderDate: (params: any) => {
    let date =
      moment(params.row[params.field]).format('MM/DD/YYYY h:mm A') ===
      'Invalid date'
        ? '-'
        : moment(params.row[params.field]).format('MM/DD/YYYY h:mm A');
    return <span>{date}</span>;
  },
  renderTooltip: (params: any) => {
    return (
      <span css={DataTableStyles.tooltipContainer}>
        {params.row[params.field]}
      </span>
    );
  },
  renderCheckBox: (params: any) => {
    return (
      <span key={params.row.id} css={DataTableStyles.checkBoxContaner}>
        <input type="checkbox" />
        {params.row[params.field]}
      </span>
    );
  }
};

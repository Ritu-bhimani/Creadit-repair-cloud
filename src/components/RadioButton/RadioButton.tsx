import { styled } from '@mui/material/styles';
import MuiRadio from '@mui/material/Radio';
import { FormControlLabel, Typography } from '@mui/material';
import { FC } from 'react';

const Radio = styled(MuiRadio)(({}) => ({
  '&.MuiRadio-root:first-of-type svg:first-of-type': {
    color: '#bbb',
    fontSize: '1.5em'
  }
}));

export type RadioButtonProps = {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioButton: FC<RadioButtonProps> = ({
  label,
  checked,
  onChange
}: RadioButtonProps) => {
  return (
    <FormControlLabel
      control={<Radio checked={checked} onChange={onChange} />}
      label={<Typography variant="subtitle2">{label}</Typography>}
    />
  );
};

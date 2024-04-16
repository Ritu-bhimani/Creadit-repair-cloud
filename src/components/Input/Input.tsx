import {
  alpha,
  FormControl,
  InputBase,
  InputLabel,
  InputProps,
  styled
} from '@mui/material';
import { isEmpty } from 'lodash-es';
import { FC } from 'react';

const InputStyled = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F5F8FA' : '#2b2b2b',
    border: '1px solid #dedede',
    fontSize: 14,
    width: '100%',
    padding: '10px 12px',
    color: '#4a4a4a',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow'
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: 'Latofont',
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}));
const textRed = {
  color: '#e4251b !important'
};
interface Props extends InputProps {
  label: string;
  fullWidth?: boolean;
  showRequired?: boolean;
}

export const Input: FC<Props> = ({
  label,
  fullWidth,
  showRequired,
  ...rest
}: Props) => {
  return (
    <>
      <FormControl variant="standard" fullWidth>
        {!isEmpty(label) && (
          <InputLabel shrink htmlFor="bootstrap-input">
            {label}
            {showRequired ? (
              <span style={{ marginLeft: '0px' }} css={textRed}>
                *
              </span>
            ) : (
              ''
            )}
          </InputLabel>
        )}
        <InputStyled id="bootstrap-input" {...rest} />
      </FormControl>
    </>
  );
};

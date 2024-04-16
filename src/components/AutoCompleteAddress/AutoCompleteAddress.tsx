import {
  alpha,
  css,
  FormControl,
  InputBase,
  InputLabel,
  InputProps,
  styled
} from '@mui/material';
import { values } from 'lodash-es';
import { FC } from 'react';
import Autocomplete from 'react-google-autocomplete';

const AutocompleteStyled = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F5F8FA' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
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
const addessInput = css``;

const addressStyle = css`
  .pac-container {
    z-index: 99999 !important;
  }
  input {
    border-radius: 4px;
    position: relative;
    background-color: #f5f8fa;
    border: 1px solid #ced4da;
    /* width: 100%; */
    padding: 10px 12px;
    /* margin-top: 27px; */
    margin-top: 24px;
    font-size: 14px !important;
    color: #495057 !important;
    height: 1.4375em;
    :focus {
      border-radius: 4px;
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
    }
  }
`;

interface Props extends InputProps {
  label: string;
  fullWidth?: boolean;
  showRequired?: boolean;
  onPlaceSelected?: any;
  value?: any;
  Iserror?: boolean;
  onChange?: any;
  name?: string;
  country?: string;
}

export const AutoCompleteAddress: FC<Props> = ({
  label,
  fullWidth,
  showRequired,
  onPlaceSelected,
  value,
  Iserror,
  onChange,
  name,
  country,
  ...rest
}: Props) => {
  const errorStyle = css`
    border: solid 1px #e4251b !important;
    border-radius: 4px;
    color: #e4251b !important;
  `;
  return (
    <>
      <FormControl variant="standard" fullWidth css={addressStyle}>
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
        <Autocomplete
          css={Iserror ? errorStyle : ''}
          onPlaceSelected={onPlaceSelected}
          value={value}
          onChange={onChange}
          name={name}
          options={{
            types: ['geocode', 'establishment'],
            componentRestrictions: { country }
          }}
        />
      </FormControl>
    </>
  );
};

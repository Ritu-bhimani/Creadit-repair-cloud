import {
  Box,
  FormControl,
  InputBase,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectProps,
  styled,
  TextField
} from '@mui/material';
import { get } from 'lodash-es';
import { FC, useMemo, useRef, useState } from 'react';
const containsText = (text: any, searchText: any) => {
  if (text === 'Select' && searchText !== '') {
    return null;
  }
  return text?.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1;
};

type SelectDropdownProps = {
  options: any;
  selectedOption: any;
  showRequired?: boolean;
  onChange: (value: any) => void;
  customIcon?: any;
} & SelectProps;

const SelectInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#f5f8fa',
    border: 'solid 1px #dedede',
    fontSize: 14,
    fontweight: 400,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: 'LatoFont',
    color: '#666',
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)'
    }
  },
  'MuiOutlinedInput-input': {
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)'
    }
  },
  '& .MuiList-root .MuiMenu-list': {
    maxHeight: 200,
    overflowY: 'auto'
  }
}));

const textRed = {
  color: '#e4251b !important',
  marginLeft: '5px'
};
const subheader = {
  height: '56px !important',
  padding: '8px !important'
};

const subfocus = {
  boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)!important'
};
export const SelectDropdown: FC<SelectDropdownProps> = ({
  options,
  selectedOption,
  showRequired,
  customIcon,
  onChange,
  ...rest
}: SelectDropdownProps) => {
  const [searchText, setSearchText] = useState('');
  const displayedOptions = useMemo(
    () =>
      options.filter((option: any) => containsText(option.label, searchText)),
    [searchText, options]
  );

  return (
    <Box>
      <InputLabel
        id="search-select-label"
        shrink={false}
        sx={{ fontWeight: '400', fontSize: '12px', marginBottom: '5px' }}
      >
        {rest.label}
        {showRequired ? <span css={textRed}>*</span> : ''}
      </InputLabel>
      <FormControl fullWidth>
        <Select
          {...rest}
          MenuProps={{
            // autoFocus: false,
            PaperProps: {
              sx: {
                maxWidth: '120px',
                border: '1px solid  #aaa',
                borderTop: 'none',
                borderRadius: '4px',
                maxHeight: '35vh',
                overflowY: 'auto'
              }
            },
            disableScrollLock: true
          }}
          labelId="search-select-label"
          id="search-select"
          value={
            selectedOption
              ? selectedOption
              : options.length > 0 && options[0].value
          }
          onChange={(e) => onChange(e.target.value)}
          onClose={() => setSearchText('')}
          input={<SelectInput />}
          // This prevents rendering empty string in Select's value
          // if search text would exclude currently selected option.
          renderValue={(value) => {
            const item = options.find(({ value: v }: any) => v === value);
            return item && item?.label;
          }}
        >
          <ListSubheader css={subheader}>
            <TextField
              css={subfocus}
              autoFocus
              size="small"
              fullWidth
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== 'Escape') {
                  e.stopPropagation();
                  // Prevents autoselecting item while typing (default Select behaviour)
                }
              }}
              value={searchText}
            />
          </ListSubheader>
          {displayedOptions.map((option: any, i: number) => (
            <MenuItem
              autoFocus={false}
              className="selectdropdownbg"
              key={i}
              value={option.value}
              sx={{
                color: '#4a4a4a',
                fontSize: '14px',
                padding: '12px 16px'
              }}
            >
              {option.label}
            </MenuItem>
          ))}

          {displayedOptions.length == 0 ? (
            <MenuItem
              disabled
              sx={{
                whiteSpace: 'normal',
                fontSize: '14px',
                color: '#4a4a4a',
                opacity: '1 !important'
              }}
            >
              No results found
            </MenuItem>
          ) : null}
        </Select>
      </FormControl>
    </Box>
  );
};

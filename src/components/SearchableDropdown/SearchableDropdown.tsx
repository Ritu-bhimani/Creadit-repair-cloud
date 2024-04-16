import {
  Box,
  Button,
  ClickAwayListener,
  List,
  MenuItem,
  Popper,
  styled,
  TextField,
  TextFieldProps
} from '@mui/material';
import { useEffect, useState } from 'react';

import { ArrowDropDown } from '@mui/icons-material';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';

export type Option = {
  label: string;
  value: string;
};

const Menu = styled(Popper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow:
    'rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px',
  left: '13px !important',
  borderRadius: 4,
  '& .MuiLink-root': {
    color: '#4a4a4a'
  }
}));

export type SearchableDropdownProps = {
  value: any;
  options: Option[];
  name?: string;
  onChange: (val: string) => void;
} & TextFieldProps;

export const SearchableDropdown = ({
  value,
  options,
  name,
  onChange,
  ...rest
}: SearchableDropdownProps) => {
  const [q, setQ] = useState('');
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'SeachMenu'
  });
  const valueLabel = options.find((o) => o.value === value)?.label;

  useEffect(() => {
    setQ('');
  }, []);
  return (
    <Box>
      <Button
        variant="text"
        {...bindTrigger(popupState)}
        sx={{ display: 'flex', alignItems: 'center', textTransform: 'none' }}
        endIcon={<ArrowDropDown />}
        name={name}
      >
        {valueLabel}
      </Button>
      <Box>
        <Menu
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 10],
                enabled: true
              }
            }
          ]}
          popperOptions={{
            placement: 'bottom'
          }}
          {...bindPopover(popupState)}
          sx={{ maxHeight: '200px' }}
          // open
        >
          <ClickAwayListener onClickAway={popupState.close}>
            <Box>
              <TextField
                autoFocus
                className="busstatus"
                sx={{
                  m: 1,
                  ':focus': {
                    boxShadow: '0 0 0 .2rem rgb(0 123 255 / 25%)!important',
                    border: '1px solid #aaa !important'
                  }
                }}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                {...rest}
              />
              <List>
                {options
                  .filter(
                    (o) => !q || o.label.toLowerCase().includes(q.toLowerCase())
                  )
                  .map((o) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: '14px' }}
                        onClick={() => {
                          onChange(o.value);
                          popupState.close();
                        }}
                        key={o.value}
                      >
                        {o.label}
                      </MenuItem>
                    );
                  })}
                {options.filter(
                  (o) => q && !o.label.toLowerCase().includes(q.toLowerCase())
                ).length === options.length &&
                  q !== '' && (
                    <MenuItem
                      disabled
                      sx={{
                        fontSize: '14px',
                        paddingLeft: '10px',
                        color: '#4a4a4a',
                        opacity: '1 !important'
                      }}
                    >
                      No results found
                    </MenuItem>
                  )}
              </List>
            </Box>
          </ClickAwayListener>
        </Menu>
      </Box>
    </Box>
  );
};

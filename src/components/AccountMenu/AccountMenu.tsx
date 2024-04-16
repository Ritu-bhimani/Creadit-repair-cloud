import { ArrowDropDown } from '@mui/icons-material';
import { ClickAwayListener, Link, Popper, Stack, styled } from '@mui/material';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';
import { FC } from 'react';

export type AccountLink = {
  text: string;
  onClick: () => void;
};

export type AccountMenuProps = {
  userName: string;
  role: string;
  accountLinks: AccountLink[];
};

const Menu = styled(Popper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'rgb(0 0 0 / 14%) 0 8px 10px 0',
  marginLeft: '-1vw !important',
  borderRadius: 4,
  '& .MuiLink-root': {
    color: '#4a4a4a'
  }
}));

export const AccountMenu: FC<AccountMenuProps> = (props: AccountMenuProps) => {
  const { accountLinks, userName, role } = props;
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'accountMenuPopup'
  });

  return (
    <>
      <Link
        {...bindTrigger(popupState)}
        component="button"
        variant="body2"
        sx={{
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          fontWeight: '600',
          '@media only screen and (max-width:600px)': {
            fontWeight: 'normal'
          }
        }}
      >
        {userName} ({role}) <ArrowDropDown sx={{ color: 'white' }} />
      </Link>
      <Menu className="headerpopover" {...bindPopover(popupState)}>
        <ClickAwayListener onClickAway={popupState.close}>
          <Stack>
            {accountLinks.map((l, i) => (
              <Link
                css={{ color: '#4a4a4a' }}
                underline="hover"
                sx={(theme: any) => {
                  return {
                    p: 1.5,
                    color: theme.palette.text.secondary,
                    ...theme.typography.subtitle1,
                    fontSize: theme.typography.body2.fontSize,
                    fontFamily: 'Latofont',
                    cursor: 'pointer'
                  };
                }}
                key={i}
                onClick={l.onClick}
              >
                {l.text.trim()}
              </Link>
            ))}
          </Stack>
        </ClickAwayListener>
      </Menu>
    </>
  );
};

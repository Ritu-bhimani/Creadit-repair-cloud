import { ArrowDropDown } from '@mui/icons-material';
import { ClickAwayListener, Link, Popper, Stack, styled } from '@mui/material';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';
import { FC } from 'react';

export type HelpAndSupportLink = {
  text: string;
  href: string;
};

export type HelpAndSupportMenuProps = {
  links: HelpAndSupportLink[];
};

const Menu = styled(Popper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'rgb(0 0 0 / 14%) 0 8px 10px 0',
  marginLeft: '-2vw !important',
  borderRadius: 4,
  '@media only screen and (max-width:600px)': {
    marginLeft: '2vw !important'
  },
  '& .MuiLink-root': {
    color: '#4a4a4a'
  }
}));

export const HelpAndSupportMenu: FC<HelpAndSupportMenuProps> = (
  props: HelpAndSupportMenuProps
) => {
  const { links } = props;
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'helpAndSupportPopup'
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
        Help & Support{' '}
        <ArrowDropDown sx={{ color: 'white', fontWeight: '600' }} />
      </Link>
      <Menu
        className="headerpopover"
        {...bindPopover(popupState)}
        // open
        placement="bottom"
      >
        <ClickAwayListener onClickAway={popupState.close}>
          <Stack>
            {links.map((l) => (
              <Link
                underline="hover"
                sx={(theme) => {
                  return {
                    p: 1.5,
                    color: theme.palette.text.secondary,
                    ...theme.typography.subtitle1,
                    fontSize: theme.typography.body2.fontSize,
                    fontFamily: 'Latofont',
                    cursor: 'pointer'
                  };
                }}
                key={l.href}
                href={l.href}
                target="_blank"
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

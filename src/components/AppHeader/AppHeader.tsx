import { ThemeProvider } from '@emotion/react';
import {
  Box,
  Button,
  Divider,
  Stack,
  styled,
  SxProps,
  Tab,
  Tabs,
  Theme
} from '@mui/material';
import { FC, ReactNode } from 'react';
import { AccountMenu, AccountMenuProps } from '../AccountMenu';
import {
  HelpAndSupportMenu,
  HelpAndSupportMenuProps
} from '../HelpAndSupportMenu';
import { appHeaderTheme } from './styles';

export type MainTabLink = {
  text: string;
  href: string;
};

type AppHeaderProps = {
  mainTabLinks: MainTabLink[];
  helpAndSupportLinks: HelpAndSupportMenuProps['links'];
  accountMenuProps: AccountMenuProps;
  logo: ReactNode;
  activeTab?: string;
  onTabChange: (value: string) => void;
  menuItems?: ReactNode[];
};
const PINK = '#fc2e63';

const NewFeatures = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(PINK),
  backgroundColor: PINK,
  '&:hover': {
    backgroundColor: PINK
  },
  padding: '7px 8px 9px 8px',
  borderRadius: '6px',
  marginRight: '0.5vw',
  fontWeight: 'normal',
  '@media only screen and (max-width:600px)': {
    fontSize: '11px'
  },
  ':hover': {
    textDecoration: 'underline'
  }
}));

const Icons: SxProps<Theme> = {
  fill: '#8fadd1',
  ':hover': {
    fill: '#fff'
  }
};

export const AppHeader: FC<AppHeaderProps> = (props: AppHeaderProps) => {
  const {
    logo,
    mainTabLinks,
    accountMenuProps,
    helpAndSupportLinks,
    activeTab,
    menuItems,
    onTabChange
  } = props;

  return (
    <ThemeProvider theme={appHeaderTheme}>
      <Box
        sx={{
          background: 'linear-gradient(90deg, #244894 21.35%, #0081c9 100%)'
        }}
      >
        <Stack
          direction="row"
          sx={{
            p: 1.2,
            color: 'white',
            '@media only screen and (max-width:600px)': {
              flexDirection: 'column',
              alignItems: 'flex-start'
            }
          }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" sx={{ marginLeft: '1vw' }}>
            <NewFeatures disableRipple>
              <span>New Features</span>
            </NewFeatures>
            <>{menuItems}</>
          </Stack>
          <Stack
            sx={{
              display: 'flex',
              '@media only screen and (max-width:600px)': {
                order: '-1'
              }
            }}
          >
            {logo}
          </Stack>
          <Stack
            direction="row"
            gap={2}
            sx={{
              color: '#fff',
              '@media only screen and (max-width:600px)': {
                justifyContent: 'space-evenly',
                width: '100%'
              }
            }}
          >
            <Button
              sx={{
                position: 'relative',
                '@media only screen and (max-width:600px)': {
                  position: 'absolute',
                  top: '15px',
                  right: '20px',
                  height: '30px',
                  fontSize: '11px',
                  fontWeight: 'normal'
                }
              }}
              variant="contained"
              color="success"
              disableRipple
            >
              Upgrade Now
            </Button>
            <HelpAndSupportMenu links={helpAndSupportLinks} />
            <Divider
              orientation="vertical"
              flexItem
              sx={{ backgroundColor: 'white', height: '25px' }}
              variant="middle"
            />
            <Button
              color="inherit"
              variant="text"
              sx={{
                fontWeight: '600',
                '@media only screen and (max-width:600px)': {
                  fontWeight: 'normal'
                }
              }}
            >
              My Account
            </Button>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ backgroundColor: 'white' }}
              variant="middle"
            />
            <AccountMenu {...accountMenuProps} />
          </Stack>
        </Stack>
        <Tabs value={activeTab} sx={{ mt: 1 }}>
          {mainTabLinks.map((t, index) => (
            <Tab
              disableRipple
              label={t.text}
              value={t.href}
              key={index}
              onClick={() => onTabChange(t.href)}
            />
          ))}
        </Tabs>
      </Box>
    </ThemeProvider>
  );
};

AppHeader.defaultProps = {};

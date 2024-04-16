import styled from '@emotion/styled';
import {
  Badge,
  Box,
  createTheme,
  css,
  Divider,
  Grid,
  Tab,
  Tabs,
  ThemeProvider
} from '@mui/material';
import { FC, ReactNode, SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { PendingBatchPrintTab } from './PendingBatchPrintTab';
import { CustomButton } from '../../components';
import { capitalizeFirstLetter, routes } from '../../utils';
import { emailMenuStyles, viewALLStyle } from './styles';
import { CloudMailAlertsTab } from './CloudMailAlertsTab';

const emailTabTheme = createTheme({
  components: {
    MuiBadge: {
      styleOverrides: {
        colorError: {
          backgroundColor: '#fc2e63',
          fontFamily: 'Latofont'
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#0cf',
          height: 5
        }
      }
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: 14,
          fontFamily: 'Latofont',
          minWidth: 20,
          padding: '0',
          marginLeft: '24px',
          overflow: 'visible',
          color: '#666',
          '&:hover': {
            opacity: 1
          },
          '&.Mui-selected': {
            color: '#4a4a4a !important',
            fontWeight: 600
          }
        }
      }
    }
  }
});

const ErrorHeader = styled('div')(({ theme }) => ({
  color: '#0075cc',
  fontWeight: '700',
  fontSize: '14px',
  fontFamily: 'Latofont',
  marginTop: '1vh',
  marginBottom: '1vh',
  padding: '0.7vw',
  maxWidth: '300px',
  width: 'fit-content',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Latofont;
  font-size: 14px;
  a {
    color: #0075cc;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
    color: #244894;
  }
  font-weight: 400;
  text-decoration: none;
  padding: 12px;
  align-items: center;
`;
const sendAllmails = css`
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
  button {
    color: #fff;
    background: #00a650;
    padding: 5px 12px !important;
    font-size: 12px !important;
    line-height: 20px !important;
  }
`;
const markAllRead = css`
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
  button {
    padding: 5px 12px !important;
    font-size: 12px !important;
    line-height: 20px !important;
    color: #4a4a4a;
    :hover {
      background-color: #efefef;
    }
  }
`;

type TabPanelProps = {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
};

const NoDataMessage = styled('div')(({ theme }) => ({
  textAlign: 'center',
  color: '#999999'
}));

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
      <Divider />
      <Footer>
        {value === 0 ? (
          <Link to={routes.APP_HOME}>Go to Mail Errors</Link>
        ) : (
          <Link to={routes.APP_HOME}>Go to Batch Print</Link>
        )}
      </Footer>
    </div>
  );
};

type EmailTabsProps = {
  mailErrors: any;
  errorBadgeCount: number;
  pendingLetters: any;
  pendingBatchPrintBadgeCount: number;
};

export const EmailTabs: FC<EmailTabsProps> = ({
  mailErrors,
  errorBadgeCount,
  pendingLetters,
  pendingBatchPrintBadgeCount
}: EmailTabsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={emailTabTheme}>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label={
              <Badge badgeContent={errorBadgeCount} color="error">
                <span css={{ marginRight: '10px' }}>CloudMail Alerts</span>
              </Badge>
            }
            value={0}
          />
          <Tab
            label={
              <Badge badgeContent={pendingBatchPrintBadgeCount} color="error">
                <span css={{ marginRight: '10px' }}>Pending Batch Print</span>
              </Badge>
            }
            value={1}
          />
          {value === 0 && errorBadgeCount > 0 && (
            <Grid css={markAllRead} item container justifyContent="flex-end">
              <CustomButton
                variant="outlined"
                color="inherit"
                label="Mark All As Read"
                size="medium"
                onClick={() => {}}
              />
            </Grid>
          )}
          {value === 1 && pendingBatchPrintBadgeCount > 0 && (
            <Grid css={sendAllmails} item container justifyContent="flex-end">
              <CustomButton
                variant="contained"
                color="success"
                label="Send With CloudMail"
                size="medium"
                onClick={() => {}}
              />
            </Grid>
          )}
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>
          <CloudMailAlertsTab mailErrors={mailErrors} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PendingBatchPrintTab pendingLetters={pendingLetters} />
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
};

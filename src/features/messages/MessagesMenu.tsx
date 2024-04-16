import styled from '@emotion/styled';
import { Person, QuestionAnswer } from '@mui/icons-material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SxProps,
  Theme
} from '@mui/material';
import { get } from 'lodash-es';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';
import moment from 'moment';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowPopover, ErrorBoundary } from '../../components';
import { convertToPlainText, routes } from '../../utils';
import { useGetUnreadMessagesQuery } from './messages.api';

const Icons: SxProps<Theme> = {
  fill: '#8fadd1',
  ':hover': {
    fill: '#fff'
  }
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Latofont;
  font-size: 14px;
  color: #4a4a4a;
  font-weight: 400;
  padding: 12px;
  align-items: center;
`;

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

export const MessagesMenu: FC = () => {
  const { data, isLoading, isError } = useGetUnreadMessagesQuery(null);

  const badgeCount = get(data, 'count', 0);
  const messages = get(data, 'messages', []);

  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'messagesMenu'
  });
  return (
    <>
      <IconButton
        color="error"
        sx={{ fill: '#8fadd1' }}
        {...bindTrigger(popupState)}
      >
        <Badge
          className="headerbadge"
          badgeContent={badgeCount}
          color="secondary"
        >
          <QuestionAnswer color="action" fontSize="large" sx={Icons} />
        </Badge>
      </IconButton>
      <ErrorBoundary>
        <ArrowPopover
          placement="bottom"
          popoverBinder={bindPopover(popupState)}
          header={
            <Header>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                New Messages
                <AddBoxIcon
                  sx={{
                    color: '#0075cc',
                    cursor: 'pointer',
                    alignItems: 'center'
                  }}
                />
              </Grid>
            </Header>
          }
          footer={
            <Footer>
              <Link css={{ fontWeight: '600' }} to={routes.APP_HOME}>
                See all messages
              </Link>
            </Footer>
          }
        >
          <ClickAwayListener onClickAway={popupState.close}>
            <div>
              {messages.length > 0 ? (
                <>
                  <Box sx={{ maxHeight: '55vh', overflowY: 'auto' }}>
                    <List
                      dense
                      css={{
                        padding: '0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {messages.map((message: any, idx: number) => {
                        const messageBody = message.body
                          ? convertToPlainText(message.body)
                          : '';
                        return (
                          <>
                            <ListItem
                              sx={{
                                alignItems: 'baseline',
                                padding: '0.4vw 1vw ',
                                ':hover': {
                                  backgroundColor: '#e4e4e4',
                                  cursor: 'pointer'
                                }
                              }}
                            >
                              <ListItemText
                                sx={{}}
                                primaryTypographyProps={{
                                  sx: {
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '170px'
                                  }
                                }}
                                primary={
                                  <Link
                                    css={{
                                      color: '#0075cc',
                                      fontWeight: '600',
                                      fontFamily: 'Latofont',
                                      textDecoration: 'none',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      maxWidth: '170px',
                                      ':hover': {
                                        textDecoration: 'underline',
                                        color: '#005cb3'
                                      }
                                    }}
                                    to={''}
                                  >
                                    {message.subject}
                                  </Link>
                                }
                                secondary={
                                  <Box>
                                    <span
                                      css={{
                                        fontSize: '14px',
                                        color: '#4a4a4a',
                                        fontFamily: 'Latofont',
                                        marginBottom: '5px',
                                        display: 'block',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '170px'
                                      }}
                                    >
                                      {messageBody.length > 15
                                        ? messageBody.slice(0, 15) + '...'
                                        : messageBody}
                                    </span>
                                    <Grid
                                      container
                                      gap={1}
                                      sx={{
                                        marginTop: '1vh',
                                        fontSize: '12px'
                                      }}
                                    >
                                      <Avatar
                                        sx={{
                                          bgcolor: '#dedede',
                                          height: '1.2rem',
                                          width: '1.2rem'
                                        }}
                                      >
                                        <Person fontSize="small" />
                                      </Avatar>
                                      <span
                                        css={{
                                          color: '#4a4a4a !important',
                                          fontFamily: 'Latofont',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis'
                                        }}
                                      >
                                        {' '}
                                        {`${message.sender_first_name} ${message.sender_last_name}`}{' '}
                                        {message.sender_type
                                          ? ' (' + message.sender_type + ')'
                                          : ''}
                                      </span>
                                    </Grid>
                                  </Box>
                                }
                              />
                              <span
                                css={{
                                  fontSize: '12px',
                                  color: '#4a4a4a',
                                  display: 'block',
                                  maxWidth: '175px'
                                }}
                              >
                                {moment(message.sent_on).format('MM/DD/YYYY')}
                              </span>
                              {/* </Grid> */}
                            </ListItem>

                            {idx !== messages.length - 1 && <Divider />}
                          </>
                        );
                      })}
                    </List>
                  </Box>
                </>
              ) : (
                <div
                  css={{
                    padding: '12px',
                    textAlign: 'center',
                    color: '#999999'
                  }}
                >
                  You have no new messages
                </div>
              )}
            </div>
          </ClickAwayListener>
        </ArrowPopover>
      </ErrorBoundary>
    </>
  );
};

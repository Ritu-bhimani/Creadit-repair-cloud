import {
  Cancel,
  Clear,
  Person,
  RemoveRedEye,
  SupervisorAccount
} from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  ClickAwayListener,
  css,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  styled,
  SxProps,
  Theme,
  Typography
} from '@mui/material';
import { get } from 'lodash-es';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import FireImg from '../../assets/images/fire_img.png';
import { ArrowPopover, ErrorBoundary, Modal } from '../../components';
import { routes } from '../../utils';
import { useDeleteLeadMutation, useGetLeadsQuery } from './leads.api';
import { ViewLeads } from './ViewLeads';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Icons: SxProps<Theme> = {
  fill: '#8fadd1',
  ':hover': {
    fill: '#fff'
  }
};

const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  font-family: Latofont;
  font-size: 14px;
  color: #4a4a4a;
  font-weight: 400;
  padding: 12px;
  align-items: center;
`;

const viewleadtitle = styled('div')`
  font-size: 20px;
  font-family: Latofont;
  color: #4a4a4a;
`;
const Footer = styled('div')`
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

const LeadDeleteText = css`
  font-weight: 600 !important;
  font-size: 16px !important;
  color: #666;
  font-family: Latofont;
`;
const footerStyle = css`
  justify-content: end;
  margin-top: 40px;
`;
const Leadcancelbutton = css`
  text-transform: none !important;
  background: transparent !important;
  border: 2px solid #00a650 !important;
  background-color: #fff;
  padding: 11px 24px !important;
  font-weight: 600;
  margin-right: 24px;
  font-family: Latofont;
  color: #00a650;
  font-size: 14px !important;
  :hover {
    text-decoration: none;
    border: 2px solid #00a650 !important;
    color: #00a650 !important;
    background: #f5f5f5 !important;
  }
`;
const LeadOkButtomStyle = css`
  padding: 11px 12px;
  border-radius: 4px;
  font-size: 14px;
  min-width: 144px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  height: 40px !important;
  text-transform: none;
  background-color: #00a650 !important;
  :hover {
    color: #fff;
    background-color: #008a43 !important;
  }
`;
const ViewLeadButton = styled(Button)(({ theme }) => ({
  color: theme.palette.success.main,
  borderColor: theme.palette.success.main,
  height: '2.1rem',
  alignSelf: 'center',
  marginRight: '1rem',
  fontSize: '14px',
  fontWeight: 'normal',
  border: '2px solid #00a650',
  '@media only screen and (max-width:600px)': {
    marginRight: '0'
  },
  ':hover': {
    backgroundColor: '#f5f5f5',
    border: '2px solid #00a650'
  }
}));

export const NewLeadsMenu: FC = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useGetLeadsQuery(null);
  const [deleteLead] = useDeleteLeadMutation();
  const [openViewLeadsModel, setOpenViewLeadsModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [deleteLeadId, setDeleteLeadId] = useState<number | undefined>();
  const badgeCount = get(data, 'count', 0);
  const userLeads = get(data, 'user_leads', []);
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'newLeadsMenu'
  });
  const [clientId, setClientId] = useState(0);

  const handleViewModel = (id: number) => {
    setOpenViewLeadsModel(true);
    setClientId(id);
  };
  const handleDeleteLeadModel = (id: number) => {
    setDeleteLeadId(id);
    setOpenDeleteModel(true);
  };
  const toastConfig = {
    icon: <Cancel />
  };
  const handleDeleteLead = async () => {
    const result = await deleteLead({ id: deleteLeadId });
    if ('error' in result) {
      toast.error(get(result?.error, 'data.message'), {
        ...toastConfig,
        toastId: 'deleteLeadError'
      });
    } else {
      refetch();
      toast.success('Lead has been deleted.', {
        icon : <CheckCircleIcon />,
        toastId: 'deleteLeadSucess'
      });
      setOpenDeleteModel(false);
    }
  };
  const handleCancel = () => {
    setOpenDeleteModel(false);
  };
  const DeleteLead = () => {
    return (
      <>
        <Typography css={LeadDeleteText} gutterBottom>
          {t('deleteLeadText')}
        </Typography>
        <Stack direction="row" gap={2} css={footerStyle}>
          <Button
            variant="contained"
            color="success"
            css={LeadOkButtomStyle}
            onClick={() => handleDeleteLead()}
            disabled={isLoading}
          >
            {t('ok')}
          </Button>
          <Button
            variant="outlined"
            color="success"
            css={Leadcancelbutton}
            onClick={() => handleCancel()}
          >
            {t('cancel')}
          </Button>
        </Stack>
      </>
    );
  };
  return (
    <>
      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: '8vh',
          '@media only screen and (max-width:600px)': {
            marginTop: '2vh'
          },
          '& .MuiDialog-paper': {}
        }}
        width={'sm'}
        open={openViewLeadsModel}
        closeIconVisible
        title={
          <>
            <span
              css={{
                color: '#4a4a4a',
                fontSize: '20px',
                fontFamily: 'Latofont'
              }}
            >
              New Lead
            </span>{' '}
            <img
              src={FireImg}
              css={{ height: '24px', position: 'relative', top: '3px' }}
            ></img>{' '}
          </>
        }
        onClose={() => setOpenViewLeadsModel(!openViewLeadsModel)}
      >
        <ViewLeads id={clientId} />
      </Modal>
      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 30vh',
          '& .MuiDialog-paper': {
            maxWidth: '500px'
          }
        }}
        width={'sm'}
        open={openDeleteModel}
        closeIconVisible
        title={
          <span
            css={{
              color: '#4a4a4a',
              fontSize: '20px',
              fontFamily: 'Latofont'
            }}
          >
            {t('warning')}
          </span>
        }
        onClose={() => setOpenDeleteModel(!openDeleteModel)}
      >
        <ErrorBoundary>
          <DeleteLead />
        </ErrorBoundary>
      </Modal>
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
          <SupervisorAccount color="action" fontSize="large" sx={Icons} />
        </Badge>
      </IconButton>
      <ErrorBoundary>
        <ArrowPopover
          placement="bottom"
          popoverBinder={bindPopover(popupState)}
          header={
            <Header>
              <span>New Leads </span>
            </Header>
          }
          footer={
            <Footer>
              <Link css={{ fontWeight: '600' }} to={routes.APP_HOME}>
                See all leads
              </Link>
            </Footer>
          }
        >
          <ClickAwayListener onClickAway={popupState.close}>
            <div>
              {userLeads.length > 0 ? (
                <Box sx={{ maxHeight: '55vh', overflowY: 'auto' }}>
                  <List dense css={{ padding: '0' }}>
                    {userLeads.map((lead: any, x: number) => (
                      <>
                        <ListItem
                          key={x}
                          sx={{
                            padding: '0.4vw 1vw ',
                            ':hover': { backgroundColor: '#e4e4e4' }
                          }}
                        >
                          <ListItemAvatar
                            css={{
                              marginTop: '5px',
                              marginBottom: 'auto',
                              '@media only screen and (max-width:600px)': {
                                minWidth: 'auto'
                              }
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: '#dedede',
                                height: '4rem',
                                width: '4rem',
                                '@media only screen and (max-width:600px)': {
                                  width: '3rem',
                                  height: '3rem'
                                }
                              }}
                            >
                              <Person
                                fontSize="large"
                                css={{ width: '2em', height: '1.5em' }}
                              />
                            </Avatar>
                          </ListItemAvatar>
                          <Grid
                            css={{ alignItems: 'center' }}
                            container
                            direction={'row'}
                          >
                            <ListItemText
                              sx={{ marginLeft: '0.8rem' }}
                              primaryTypographyProps={{
                                sx: {
                                  color: 'primary.main',
                                  fontWeight: 600,
                                  fontSize: '14px',
                                  fontFamily: 'Latofont',
                                  maxWidth: '170px',
                                  width: 'fit-content',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  '@media only screen and (max-width:600px)': {
                                    maxWidth: '145px',
                                    fontSize: '12px'
                                  },
                                  ':hover': {
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    color: '#005cb3'
                                  }
                                }
                              }}
                              primary={
                                <span
                                  onClick={() =>
                                    handleViewModel(lead.iclient_id)
                                  }
                                >
                                  <span>{`${lead.vclient_fname}`} </span>{' '}
                                  <span> {`${lead.vclient_lname}`}</span>
                                </span>
                              }
                              secondary={
                                <Grid
                                  css={{ maxWidth: '175px' }}
                                  container
                                  alignItems="flex-start"
                                  gap={0.1}
                                  direction="column"
                                >
                                  {lead.vclient_phone && (
                                    <Grid
                                      item
                                      css={{
                                        fontFamily: 'Latofont',
                                        color: '#4a4a4a',
                                        marginTop: '5px',
                                        maxWidth: '170px !important'
                                      }}
                                    >
                                      {lead.vclient_phone}
                                    </Grid>
                                  )}
                                  <Grid
                                    item
                                    css={{
                                      fontFamily: 'Latofont',
                                      color: '#4a4a4a',
                                      marginTop: '5px',
                                      maxWidth: '170px !important',
                                      '@media only screen and (max-width:600px)':
                                        {
                                          maxWidth: '145px !important',
                                          fontSize: '12px'
                                        }
                                    }}
                                  >
                                    Referred by
                                    {lead.vFirst_Name ? (
                                      <Link
                                        to={'#'}
                                        css={{
                                          color: '#0075cc',
                                          textDecoration: 'none',
                                          ':hover': {
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                            color: '#005cb3'
                                          }
                                        }}
                                      >
                                        {' '}
                                        {lead.vFirst_Name} {lead.vLast_Name}
                                      </Link>
                                    ) : (
                                      <Grid item>
                                        {lead.vsource && (
                                          <Chip
                                            css={{
                                              backgroundColor: '#CCC',
                                              borderRadius: '5px',
                                              height: '24px',
                                              marginTop: '5px'
                                            }}
                                            label={
                                              <Footer
                                                css={{
                                                  fontSize: '12px',
                                                  padding: '0'
                                                }}
                                              >
                                                <Link to={'#'}>
                                                  Web lead form
                                                </Link>
                                              </Footer>
                                            }
                                          />
                                        )}
                                      </Grid>
                                    )}
                                  </Grid>
                                </Grid>
                              }
                            />
                            <ViewLeadButton
                              disableRipple
                              startIcon={<RemoveRedEye />}
                              color="success"
                              variant="outlined"
                              onClick={() => handleViewModel(lead.iclient_id)}
                            >
                              View Lead
                            </ViewLeadButton>
                            <IconButton
                              css={{
                                height: 'fit-content',
                                '@media only screen and (max-width:600px)': {
                                  marginRight: '0'
                                }
                              }}
                              edge="end"
                              aria-label="delete"
                              disableRipple
                              onClick={() =>
                                handleDeleteLeadModel(lead.iclient_id)
                              }
                            >
                              <Clear
                                sx={{
                                  color: '#666',
                                  ':hover': { color: '#005cb3' }
                                }}
                              />
                            </IconButton>
                          </Grid>
                        </ListItem>
                        {x !== userLeads.length - 1 && <Divider />}
                      </>
                    ))}
                  </List>
                </Box>
              ) : (
                <div
                  css={{
                    padding: '12px',
                    textAlign: 'center',
                    color: '#999999'
                  }}
                >
                  You have no new leads
                </div>
              )}
            </div>
          </ClickAwayListener>
        </ArrowPopover>
      </ErrorBoundary>
    </>
  );
};

import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Link,
  styled
} from '@mui/material';
import React, { FC, useState } from 'react';
import {
  Banner,
  CustomButton,
  ErrorBoundary,
  InfoMessage,
  Modal
} from '../../../../components';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import { AddNewTeamMember, MyTeamMembersList } from '../../../../features';
import AddIcon from '@mui/icons-material/Add';
import { routes } from '../../../../utils';

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
    color: '#244894'
  }
}));
export const MyTeamMembersPage: FC = () => {
  const { t } = useTranslation();
  const [showModel, setShowModel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openAddTeamMemberModel, setOpenAddTeamMemberModel] = useState(false);
  const myTeamMemberVideo =
    'https://player.vimeo.com/video/716141241?autoplay=0&amp;modestbranding=1&amp;showinfo=0';
  const VideoContent = (
    <>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      <ReactPlayer
        url={myTeamMemberVideo}
        width="100%"
        controls
        onReady={() => setIsLoading(false)}
      />
    </>
  );

  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={8}>
            <Banner
              modelTitle="Video Preview"
              videoContent={VideoContent}
              setShowModal={setShowModel}
              showModel={showModel}
              pageTitle={t('MyTeamMembers')}
            />
          </Grid>
          <Grid
            item
            xs={4}
            css={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end'
            }}
          >
            <CustomButton
              css={{
                fontSize: '14px !important',
                fontWeight: '400 !important'
              }}
              variant="contained"
              color="success"
              label={t('AddNewTeamMember')}
              startIcon={<AddIcon />}
              onClick={() => {
                setOpenAddTeamMemberModel(true);
              }}
            />
          </Grid>
        </Grid>

        <Box css={{ marginBottom: '24px' }}>
          <InfoMessage
            message={<>{t('MyCompanyTeamMemberPageInfoToAddNewTeamMember')}</>}
          />
        </Box>

        <Box>
          <ErrorBoundary>
            <MyTeamMembersList />
          </ErrorBoundary>
        </Box>

        <Box css={{ marginBottom: '24px' }}>
          <InfoMessage
            message={
              <>
                {t('TeamMemberPageInfoYourAccountHasOwnerPart1')}{' '}
                <LinkStyled href={routes.MY_COMPANY_AUTOMATED_NOTIFICATIONS}>
                  {t('AutomatedNotificationOptionsLink')}
                </LinkStyled>{' '}
                {t('TeamMemberPageInfoYourAccountHasOwnerPart1')}{' '}
                <LinkStyled
                  href="https://www.creditrepaircloud.com/security"
                  target="_blank"
                >
                  {t('TeamMenberPageInfoReadMore')}
                </LinkStyled>{' '}
                <p>{t('TeamMenberPageInfoAccountWarning')}</p>
              </>
            }
          />
        </Box>
      </Container>
      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 10vh',
          '& .MuiDialog-paper': {
            maxWidth: '50vw'
          }
        }}
        width={'sm'}
        open={openAddTeamMemberModel}
        closeIconVisible
        title={t('AddTeamMember')}
        onClose={() => setOpenAddTeamMemberModel(false)}
      >
        <ErrorBoundary>
          <AddNewTeamMember
            setOpenAddTeamMemberModel={() => setOpenAddTeamMemberModel(false)}
          />
        </ErrorBoundary>
      </Modal>
    </>
  );
};

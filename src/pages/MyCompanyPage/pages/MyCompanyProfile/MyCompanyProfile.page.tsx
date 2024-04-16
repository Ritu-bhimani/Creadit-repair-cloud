import { Box, CircularProgress, Container } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import { Banner } from '../../../../components';
import { MyCompanyProfile } from '../../../../features';

export const MyCompanyProfilePage: FC = () => {
  const { t } = useTranslation();
  const [showModel, setShowModel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const myCompanyProfileVideo =
    'https://player.vimeo.com/video/716141119?autoplay=0&amp;modestbranding=1&amp;showinfo=0';
  const VideoContent = (
    <>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      <ReactPlayer
        url={myCompanyProfileVideo}
        width="100%"
        controls
        onReady={() => setIsLoading(false)}
      />
    </>
  );
  return (
    <Container maxWidth="xl">
      <Banner
        modelTitle="Video Preview"
        videoContent={VideoContent}
        setShowModal={setShowModel}
        showModel={showModel}
        pageTitle={t('myCompanyProfile')}
      />
      <Box>
        <MyCompanyProfile />
      </Box>
    </Container>
  );
};

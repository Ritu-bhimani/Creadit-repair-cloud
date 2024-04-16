import { Box, CircularProgress, css, Grid, Link, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import { Banner } from '../../components';


const bannerTitle = css`
  font-weight: 400 !important;
  font-size: 26px !important;
  color: #4a4a4a;
`;
const bannerPara = css`
  font-size: 14px !important;
  font-weight: 100 !important;
  color: #4a4a4a;
  line-height: 1.7;
`;

interface HomeBannerProps {
  pageTitle: string;
}
export const HomeBanner: FC<HomeBannerProps> = (props: HomeBannerProps) => {
  const { pageTitle } = props;
  const { t } = useTranslation();
  const CrcSoftwareDemoUrl = "https://player.vimeo.com/video/560100304?badge=0&player_id=0?autoplay=0&amp;modestbranding=1&amp;showinfo=0";
  const CrcWelcomeUrl = "https://youtu.be/38CxxH_HRbA";
  const CrcVideoThumbnailUrl = "https://qa.creditrepaircloud.com/assets/images/banners/Home.png";
  const SampleClientUrl = "#";
  const UserGuideUrl = "https://www.creditrepaircloud.com/resources";
  const ClickHereUrl = "#";
  const [modelTitle, setModelTitle] = useState(t('creditRepairCloudSoftwareDemo'));
  const [videoUrl, setVideoUrl] = useState(CrcSoftwareDemoUrl);
  const [showModel, setShowModel] = useState(false)
  const [videoContent, SetVideoContent] = useState(<></>)
  const [isLoading, setIsLoading] = useState(true)

  const handleRedirection = (value: string) => {
    if (value === 'welcome') {
      setVideoUrl(CrcWelcomeUrl)
      setModelTitle(t('videoPreview'))
      setIsLoading(true)
    } else if (value === 'tour') {
      setVideoUrl("")
      setModelTitle(t('danielFromCreditRepairCloud'))
      setIsLoading(false)
    }
    setShowModel(true)


  }
  useEffect(() => {
    if (showModel === false) {
      setVideoUrl(CrcSoftwareDemoUrl)
      setModelTitle(t('creditRepairCloudSoftwareDemo'))
      setIsLoading(true)
    }
    const VideoContent = (
      <>{isLoading &&
        <Box sx={{position:'absolute', left:'47%', top:'47%'}}>
          <CircularProgress />
        </Box>
      }

        <ReactPlayer
          url={videoUrl}
          width="100%"
          controls
          onReady={() => setIsLoading(false)}
        />
      </>
    );
    SetVideoContent(VideoContent)
  }, [showModel, isLoading])
  const BannerChildren = () => {
    return (
      <Grid
        container
        className="bannerDesc"
        direction="column"
      >
        <div>
          <Typography variant="h5" gutterBottom css={bannerTitle}>
            {t('bannerWelcome')}
          </Typography>
          <Typography gutterBottom css={bannerPara}>
            {t('bannerText')}
            <Link onClick={() => handleRedirection('welcome')}>{t('bannerVideo')}</Link>
            {t('bannerThe')}
            <Link onClick={() => handleRedirection('tour')}>{t('bannerTour')}</Link>
            {t('bannerLearn')}
            <Link href={SampleClientUrl}>{t('bannerClient')}</Link>
            {t('bannerReadOur')}
            <Link
              href={UserGuideUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('bannerUserGuide')}
            </Link>
            {t('bannerChanges')}
            <Link href={ClickHereUrl}>{t('bannerClickHere')}</Link>
          </Typography>
        </div>
      </Grid>
    );
  };
  return (
    <Banner
      videoLength="15:45"
      modelTitle={modelTitle}
      overLayImage={CrcVideoThumbnailUrl}
      videoTitle={t('bannerWelcome')}
      videoContent={videoContent}
      setShowModal={setShowModel}
      showModel={showModel}
      pageTitle={pageTitle}
    >
      <BannerChildren />
    </Banner>

  );
};

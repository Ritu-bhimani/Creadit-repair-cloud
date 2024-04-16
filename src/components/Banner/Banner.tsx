import { PlayCircle } from '@mui/icons-material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../Modal';
import { BannerStyles } from './styles';

interface BannerProp {
  videoLength?: string;
  overLayImage?: string;
  children?: React.ReactNode;
  videoId?: string;
  videoTitle?: string | null;
  videoUrl?: string;
  videoContent?: React.ReactNode;
  modelTitle?: string | null;
  showModel?: any;
  setShowModal?: any;
  pageTitle?: string | null;
}
export const Banner: FC<BannerProp> = (props: BannerProp) => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);

  const bannerStatus = localStorage.getItem('banner');
  const disableBanner = () => {
    setShowBanner(false);
    localStorage.setItem('banner', 'Disabled');
  };
  useEffect(() => {
    if (props.children === undefined) {
      setShowBanner(false);
    }
  });
  const handleBanner = () => {
    if (props.children === undefined) {
      setShowModal(true);
    } else {
      setShowBanner(true);
    }
  };
  useEffect(() => {
    if (bannerStatus) {
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, [bannerStatus]);
  const {
    videoLength,
    overLayImage,
    children,
    videoTitle,
    videoContent,
    modelTitle,
    showModel,
    setShowModal,
    pageTitle
  } = props;

  return (
    <>
      <Modal
        closeIconVisible
        width="sm"
        open={showModel}
        title={modelTitle}
        closeOnEscape={true}
        onClose={() => {
          setShowModal(false);
        }}
      >
        {videoContent}
      </Modal>

      {showBanner && props.children !== undefined && (
        <Grid
          container
          style={{ margin: '20px 0px 20px 0px' }}
          css={BannerStyles.bannerContainer}
        >
          <Grid
            item
            xs={12}
            md={3}
            css={BannerStyles.videoContainer}
            onClick={() => setShowModal(true)}
          >
            <div css={BannerStyles.video}>
              <img src={overLayImage} css={BannerStyles.image}></img>
            </div>
            <div css={BannerStyles.playCircleIcon}>
              <PlayCircleIcon
                css={BannerStyles.textWhite}
                sx={{ fontSize: '54px' }}
              />
            </div>
            <div css={BannerStyles.videoDetails}>
              <span css={BannerStyles.vidioTitle} className="vidioTitle">
                {videoTitle}
              </span>
              <span>{videoLength}</span>
            </div>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid css={BannerStyles.bannerChildrenContainer}>
              {children}

              <div css={BannerStyles.dismissLink}>
                <a onClick={() => disableBanner()}>{t('bannerDismiss')}</a>
              </div>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Typography component={'div'} variant="h2" css={BannerStyles.heading}>
        {pageTitle}
        {!showBanner && (
          <a css={BannerStyles.quickVideo} onClick={() => handleBanner()}>
            <PlayCircle style={{ marginRight: '5px' }} />
            <span className="quick-video">Quick Video</span>
          </a>
        )}
      </Typography>
    </>
  );
};

export default Banner;

import { Box, Container, Grid, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CustomButton,
  ErrorBoundary,
  InfoMessage,
  Modal
} from '../../../../components';
import { DisputeOptions } from '../../../../features/dispute-options';
import { pageStyles } from '../../../styles';

export const DisputeOptionPage: FC = () => {
  const { t } = useTranslation();
  const [openReasonModel, setOpenReasonModel] = useState(false);
  const [openInstrucModel, setOpenInstrucModel] = useState(false);

  return (
    <>
      <Container maxWidth="xl">
        <Typography component={'div'} variant="h2" css={pageStyles.heading}>
          {'Manage Dispute Reasons and Instructions'}
        </Typography>
        <Grid container className="m-b-24">
          <Typography gutterBottom>{t('addremoveormodifyext')}</Typography>
        </Grid>
        <Grid item container sx={{ marginY: '1vw' }}>
          <CustomButton
            variant="outlined"
            color="success"
            label="Manage Reasons"
            size="medium"
            onClick={() => setOpenReasonModel(true)}
          />{' '}
          <CustomButton
            variant="outlined"
            color="success"
            label="Manage Instructions"
            size="medium"
            onClick={() => setOpenInstrucModel(true)}
          />
        </Grid>
        <Typography component={'div'} variant="h2" css={pageStyles.heading}>
          {'Manage Credit Bureaus'}
        </Typography>
        <InfoMessage
          message={
            <>
              Note: please upload only jpg, jpeg, gif, bmp or png file and
              dimensions of 100 X 20. If you are in the USA, we recommend that
              you do not make any changes to this page.
            </>
          }
        />
        <Box>
          <DisputeOptions />
        </Box>
      </Container>
      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 20vh',
          '& .MuiDialog-paper': {
            maxWidth: '35vw'
          }
        }}
        width={'sm'}
        open={openReasonModel}
        closeIconVisible
        title={t('Manage Reasons')}
        onClose={() => setOpenReasonModel(false)}
      >
        {' '}
        <ErrorBoundary>
          <>Manage Reasons</>
        </ErrorBoundary>
      </Modal>
      <Modal
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start'
          },
          marginTop: ' 20vh',
          '& .MuiDialog-paper': {
            maxWidth: '35vw'
          }
        }}
        width={'sm'}
        open={openInstrucModel}
        closeIconVisible
        title={t('Manage Instructions')}
        onClose={() => setOpenInstrucModel(false)}
      >
        {' '}
        <ErrorBoundary>
          <>Manage Instructions</>
        </ErrorBoundary>
      </Modal>
    </>
  );
};

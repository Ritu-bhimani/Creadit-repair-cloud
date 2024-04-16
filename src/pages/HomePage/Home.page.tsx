import { Container, Grid } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components';
import {
  BuisnessStatus,
  CurrentSchedule,
  PersonalTasks,
  QuickLinksSection,
  QuickStartSection
} from '../../features';
import { HomeBanner } from '../../features/';
import LoginHistory from '../../features/login-history/LoginHistory';
import { HomePageStyles } from './styles';

export const HomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="xl">
      <HomeBanner pageTitle={t('helloCreditHero')} />
      <Grid container css={HomePageStyles.mainContainer}>
        <Grid item xs={12} md={4.5} css={HomePageStyles.screenLeft}>
          <QuickStartSection />
          <HomePageStyles.PersonalTasks>
            <ErrorBoundary>
              <PersonalTasks />
            </ErrorBoundary>
          </HomePageStyles.PersonalTasks>
          <HomePageStyles.BuisnessStatus>
            <BuisnessStatus />
          </HomePageStyles.BuisnessStatus>
          {/***/}
        </Grid>
        <Grid item xs={12} md={7.5}>
          <HomePageStyles.QuickLinks>
            <QuickLinksSection />
          </HomePageStyles.QuickLinks>
          <HomePageStyles.TodaysScheduleSection>
            <CurrentSchedule />
          </HomePageStyles.TodaysScheduleSection>
        </Grid>
      </Grid>
      <ErrorBoundary>
        <LoginHistory
          getLoginhistoryData={[]}
          loginHistoryData={[]}
          changePassword={false}
          changePwdResponse={false}
        />
      </ErrorBoundary>
    </Container>
  );
};

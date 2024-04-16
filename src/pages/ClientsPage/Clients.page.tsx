import { Container } from '@mui/material';
import { FC, useState } from 'react';
import { HomeBanner } from '../../features';
import { useTranslation } from 'react-i18next';

export const ClientsPage: FC = () => {
  const [showBanner, setShowBanner] = useState(true);
  const { t } = useTranslation();

  return (
    <Container maxWidth="xl">
      <HomeBanner pageTitle={t('Clients')} />
    </Container>
  );
};

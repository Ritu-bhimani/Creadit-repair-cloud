import { css, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { FC } from 'react';
import { QuickStartLinks, QuickStartLinksProps } from '../../components';

const styles = {
  quickStartLinksContainer: css`
    gap: 2vh;
    padding-top: 20px !important;
    padding-right: 20px !important;
    padding-bottom: 20px !important;
    padding: 32px 40px 32px 12px;
    border-bottom: 1px solid #dedede;
    @media only screen and (max-width: 600px) {
      padding-right: 0 !important;
    }
  `,
  quickStartTitle: css`
    font-size: 18px !important;
    display: flex;
    align-items: baseline;
    marginbottom: 16px;
    color: #4a4a4a;
  `,
  quickStartHelpText: css`
    font-size: 12px !important;
    font-weight: 100;
    margin-left: 4px;
    fontsize: 12px;
    color: #4a4a4a;
  `
};

const quickStartLinks: QuickStartLinksProps[] = [
  {
    title: 'Add New Client',
    description: 'Sign up a new client and add to database',
    orderNumber: 1
  },
  {
    title: 'Select an Existing Client',
    description: 'Work with an existing client',
    orderNumber: 2
  },
  {
    title: 'Run Credit Dispute Wizard',
    description: 'Order reports, review reports, correct errors',
    orderNumber: 3
  }
];

export const QuickStartSection: FC = () => {
  return (
    <Grid
      container
      item
      css={styles.quickStartLinksContainer}
      direction="column"
    >
      <Grid container direction="row" alignItems="center">
        <Typography gutterBottom css={styles.quickStartTitle}>
          {t('DetailStart')}
        </Typography>
        <Typography gutterBottom css={styles.quickStartHelpText}>
          {t('DetailCommon')}
        </Typography>
      </Grid>
      {quickStartLinks.map((data: QuickStartLinksProps, key) => {
        return (
          <QuickStartLinks
            key={key}
            description={data.description}
            orderNumber={data.orderNumber}
            title={data.title}
          />
        );
      })}
    </Grid>
  );
};

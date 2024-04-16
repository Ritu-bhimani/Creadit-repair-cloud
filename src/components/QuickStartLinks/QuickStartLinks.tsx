import { Avatar, Grid, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { QuickStartLinkstyles } from './styles';

export type QuickStartLinksProps = {
  orderNumber: number;
  title: string;
  description: string;
};

export const QuickStartLinks: FC<QuickStartLinksProps> = (
  props: QuickStartLinksProps
) => {
  const { orderNumber: orderNumber, title, description } = props;
  return (
    <>
      <Paper variant="outlined" css={QuickStartLinkstyles.container}>
        <Grid
          sx={{ padding: '10px 15px', alignItems: 'center' }}
          container
          direction={'row'}
          gap={'1vw'}
        >
          <Avatar
            id="order-number"
            sx={{ bgcolor: '#0075cc', height: '35px', width: '35px' }}
          >
            {orderNumber}
          </Avatar>
          <Grid>
            <Typography
              variant="h4"
              id="title"
              gutterBottom
              css={QuickStartLinkstyles.title}
            >
              {title}
            </Typography>
            <Typography
              id="description"
              variant="h6"
              gutterBottom
              css={QuickStartLinkstyles.description}
            >
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
QuickStartLinks.defaultProps = {
  orderNumber: 0,
  title: 'title',
  description: 'description'
};

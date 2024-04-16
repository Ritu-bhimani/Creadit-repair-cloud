import { ErrorOutline } from '@mui/icons-material';
import { Button, Grid, Paper, styled, Typography } from '@mui/material';

const ActionButton = styled(Button)(({}) => ({
  '&.MuiButton-root': {
    color: '#00a650',
    border: '2px solid #00a650',
    padding: '0.5rem 1.5rem',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#f5f5f5'
    }
  }
}));

const LogoInfo = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  marginTop: theme.spacing(8),
  boxShadow: 'none',
  border: '1px solid #dedede',
  borderRadius: '8px',
  color: '#666666'
}));

export const LivePortalPreview = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h5">Live Portal Preview</Typography>
      </Grid>
      <Grid item sx={{ marginTop: 2 }}>
        <Typography variant="subtitle1">
          Want to see how your portal looks for your clients and affiliates?
          Click the buttons for a preview
        </Typography>
      </Grid>
      <Grid item container sx={{ marginTop: '1vw' }}>
        <ActionButton variant="outlined" sx={{ marginRight: '3vw' }}>
          View My Client Portal{' '}
        </ActionButton>
        <ActionButton variant="outlined">View My Affiliate Portal</ActionButton>
      </Grid>
      <Grid item>
        <LogoInfo>
          <Grid container>
            <Grid item xs={0.5} sx={{ alignSelf: 'center' }}>
              <ErrorOutline sx={{ fontSize: '2.5rem' }} />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="subtitle1" color={'#666666'}>
                Our private label portal contains only your logo and your
                company information, to look as it custom built just for you.
                The logo appears on the left side of your portal header. The
                default logo is displayed unless you change it.
              </Typography>
            </Grid>
          </Grid>
        </LogoInfo>
      </Grid>
    </Grid>
  );
};

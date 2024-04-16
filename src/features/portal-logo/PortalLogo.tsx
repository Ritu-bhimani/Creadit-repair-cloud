import { Grid, Typography } from '@mui/material';
import { EditableAvatar } from '../../components';

export const PortalLogo = () => {
  const handleFileChange = (file: File) => {
    console.log('file', file);
  };
  return (
    <Grid container direction="column" gap={2} marginBottom={5}>
      <Grid item>
        <Typography variant="h6">Client/Affiliate Portal Logo</Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Default logo</Typography>
      </Grid>
      <Grid item>
        <EditableAvatar
          onChange={handleFileChange}
          css={{ height: '15rem', width: '15rem' }}
        />
      </Grid>
    </Grid>
  );
};

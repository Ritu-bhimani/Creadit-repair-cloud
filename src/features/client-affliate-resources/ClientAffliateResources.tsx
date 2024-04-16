import { Grid, Typography } from '@mui/material';
import { RadioButton } from '../../components/RadioButton/RadioButton';

export const ClientAffliateResources = () => {
  return (
    <Grid container gap={3} mb={5}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          We've included useful resource items to display in your client portal.
          Add, delete or modify any resource items below.
        </Typography>
      </Grid>
      <Grid container item xs={12} direction={'column'}>
        <Grid item>
          <RadioButton
            label={'Show Resource Page (recommended)'}
            checked={false}
            onChange={() => {}}
          />
        </Grid>
        <Grid item>
          <RadioButton
            label={'Hide Resource Page'}
            checked={false}
            onChange={() => {}}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

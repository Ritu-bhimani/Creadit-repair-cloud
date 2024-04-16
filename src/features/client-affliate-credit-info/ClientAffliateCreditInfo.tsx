import { Grid, Typography } from '@mui/material';
import { RadioButton } from '../../components/RadioButton/RadioButton';

export const ClientAffliateCreditInfo = () => {
  return (
    <Grid container gap={3} mb={5}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          Turn on, off or modify the content of your Credit Info Page.
        </Typography>
      </Grid>
      <Grid container item xs={12} direction={'column'}>
        <Grid item>
          <RadioButton
            label={'Show Credit Info Page (recommended)'}
            checked={false}
            onChange={() => {}}
          />
        </Grid>
        <Grid item>
          <RadioButton
            label={'Hide Credit Info Page'}
            checked={false}
            onChange={() => {}}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

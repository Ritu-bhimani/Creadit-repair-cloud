import { Grid, Typography } from '@mui/material';
import { CheckBox } from '../../components';

export const ClientAffliateDetails = () => {
  return (
    <Grid container gap={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle2">
          We've included useful details to display in your client portal:
          Client's Saved Letters, Client's Signed Agreement and Client's Dispute
          Details.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CheckBox
          label="Show saved letters in client portal (Recommended)"
          checked={false}
          id={''}
          onChange={() => {}}
        />
        <CheckBox
          label="Show signed agreement in client portal (Recommended)"
          checked={false}
          id={''}
          onChange={() => {}}
        />
        <CheckBox
          label="Show dispute details in client portal (Recommended)"
          checked={false}
          id={''}
          onChange={() => {}}
        />
        <CheckBox
          label="Show client summary to affiliates (Recommended)"
          checked={false}
          id={''}
          onChange={() => {}}
        />
      </Grid>
    </Grid>
  );
};

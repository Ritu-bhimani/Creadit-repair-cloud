import { ErrorOutline } from '@mui/icons-material';
import {
  Container,
  css,
  Grid,
  Link,
  Paper,
  styled,
  Typography
} from '@mui/material';
import { InfoMessage } from '../../../../components';
import { MyCompanyCampaign } from '../../../../features';

const CanpainInfo = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  marginTop: theme.spacing(5),
  boxShadow: 'none',
  border: '1px solid #dedede',
  borderRadius: '8px',
  color: '#666666'
}));

const linkStyles = css`
  text-decoration: none;
`;

export const ActiveCampaign = () => {
  return (
    <Container maxWidth="xl">
      <Grid gap={2} container direction={'column'} mt={3}>
        <Grid item>
          <img src="/assets/images/aclogo.png" />
        </Grid>
        <Grid item>
          <InfoMessage
            message={
              <span css={{ fontSize: '15px' }}>
                <Link
                  sx={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                    ':hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  ActiveCampaign{' '}
                </Link>
                is a world leading email newsletter service. If you want to send
                a mass email or newsletter to many people at one time, we
                recommend ActiveCampaign. Please read the important information
                at the bottom of this page before sending any mass emails.
              </span>
            }
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" mt={2} color={'#666'}>
            Credit Repair Cloud will synchronize contacts daily to your
            ActiveCampaign account. Credit Repair Cloud will send updated
            contacts to ActiveCampaign every 24 hours at midnight PST. Sync is
            one-way. Credit Repair Cloud will not receive contacts back from
            ActiveCampaign.
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" mt={1} color={'#666'}>
            Before transferring any contacts from Credit Repair Cloud to{' '}
            <Link
              sx={{
                textDecoration: 'none',
                cursor: 'pointer',
                ':hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              ActiveCampaign
            </Link>
            , we suggest that you first go to ActiveCampaign and create 4 lists
            named: Leads, Prospects, Clients and Affiliates. Then come back to
            this page and select a list below.
          </Typography>
        </Grid>
        <Grid item>
          <CanpainInfo>
            <Grid container>
              <Grid item xs={0.5} sx={{ alignSelf: 'center' }}>
                <ErrorOutline sx={{ fontSize: '2.5rem' }} />
              </Grid>
              <Grid item xs={11} alignContent="center">
                <Typography variant="subtitle1" color={'#666666'}>
                  ActiveCampaign Sync is not activated. Add the URL and API Key
                  from your ActiveCampaign account.
                </Typography>
              </Grid>
            </Grid>
          </CanpainInfo>
        </Grid>
      </Grid>
      <Grid>
        <MyCompanyCampaign />
      </Grid>
      <Grid item mt={5}>
        <InfoMessage
          message={
            <span css={{ fontSize: '15px', color: '#4a4a4a' }}>
              Warning: No legitimate email newsletter service will provide
              service to a spammer. Do not buy email lists or give users a
              reason to report your emails as junk or spam.
              <Link css={linkStyles}> Spam laws</Link> have changed,
              <Link css={linkStyles}> fines are severe</Link> and the best
              practice is to only send emails to folks who have "opted-in" to
              receive your emails. If you plan to send mass emails to anyone who
              has not "opted-in," these tools are not appropriate for you. Never
              send mass emails from your own email account and domain or they
              will become blacklisted. For additional resources, do a Google
              search of Email Marketing Service.
            </span>
          }
          type="warning"
        />
      </Grid>
    </Container>
  );
};

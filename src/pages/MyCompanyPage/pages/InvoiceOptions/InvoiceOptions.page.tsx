import { Container, css, Grid, Link, Typography } from '@mui/material';
import { InfoMessage } from '../../../../components';
import { MyCompanyInvoice } from '../../../../features/my-company-invoice';

const linkStyles = css`
  text-decoration: none;
  cursor: pointer;
`;

const Info = (
  <Typography
    component={'div'}
    color="#244894"
    variant="subtitle1"
    fontFamily={'Latofont'}
  >
    Credit Repair Cloud has built in{' '}
    <Link css={linkStyles}>accounting and invoicing</Link>. For automated
    recurring credit card payments, we recommend{' '}
    <Link
      target="_blank"
      css={linkStyles}
      href="https://help.creditrepaircloud.com/hc/en-us/articles/360052935351-What-is-Billsby-"
    >
      Billsby.
    </Link>
    If you're using
    <Link
      target="_blank"
      href="https://help.creditrepaircloud.com/hc/en-us/articles/360052935351-What-is-Billsby-"
      css={linkStyles}
    >
      Billsby
    </Link>
    , you will never need this page.
  </Typography>
);

export const InvoiceOptionsPage = () => {
  return (
    <Container maxWidth="xl">
      <Typography component={'div'} variant="h2" mt={'1.2em'} mb={'1em'}>
        {'Invoice Options'}
      </Typography>
      <InfoMessage message={Info} />
      <Typography component={'div'} variant="subtitle2" mt={'1.5em'} mb={'1em'}>
        Add payment information to your invoices, such as; a link to a hosted
        payment page or ACH transfer page from your merchant account provider, a
        mailing address to send a check, etc. Details saved to the fields below
        are added by default to the bottom of new invoices.
      </Typography>
      <Grid container direction={'column'} gap={3}>
        <MyCompanyInvoice />
        <Grid
          item
          container
          direction={'row'}
          alignContent={'center'}
          sx={{
            border: '1px solid #dedede',
            borderRadius: '4px',
            pt: '1em',
            pb: '1em'
          }}
        >
          <Grid item xs={0.5} ml={2} mt={2}>
            <img
              src="/assets/images/credit-cards.png"
              css={{ width: '34px' }}
            />
          </Grid>
          <Grid item xs={10} mt={3}>
            <Typography color="#666">
              Want to accept credit cards and ACH transfers from clients?{' '}
              <Link
                css={linkStyles}
                href="https://www.creditrepaircloud.com/merchant"
                target="_blank"
              >
                Get a Merchant Account for credit repair business.
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

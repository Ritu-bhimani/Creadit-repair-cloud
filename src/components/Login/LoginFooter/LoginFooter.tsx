import { Container, Grid } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginFooterStyles } from './styles';

type LoginFooterProps = {
  trainingLink: string;
  secureLoginImgSrc?: string;
};

export const LoginFooter: FC<LoginFooterProps> = (props: LoginFooterProps) => {
  const { trainingLink, secureLoginImgSrc } = props;

  // Translation hook to retrive the translations
  const { t } = useTranslation();

  return (
    <Container css={LoginFooterStyles.root}>
      <Grid container direction={'column'}>
        {/* Getting Started Section */}
        <div css={LoginFooterStyles.justGettingStartedText}>
          <span>
            {t('LoginText1')}
            <br />
            {t('LoginText2')}
          </span>
        </div>
        {/* Training Link */}
        <div>
          <a css={LoginFooterStyles.button} href={trainingLink}>
            {t('LoginText3')}
          </a>
        </div>
        {/* Security Information */}
        <div css={LoginFooterStyles.forSecurityText}>
          *For Security, User IDs and passwords cannot be shared.
          <br /> All users must have their own User ID, All visits are logged.
        </div>
        <div css={LoginFooterStyles.bottomText}>
          <img src={secureLoginImgSrc} />
          <span>Secure Area</span>
          This website is protected by 256-bit SSL security.
          <br />© 2012-2023 Credit Repair Cloud. All rights reserved. Patent
          Pending.
        </div>
      </Grid>
    </Container>
  );
};

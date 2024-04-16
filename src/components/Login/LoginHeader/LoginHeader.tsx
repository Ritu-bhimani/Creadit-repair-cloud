import { Container, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { LoginHeaderStyles } from './styles';

type LoginHeaderProps = {
  imageSrc: string;
  loginType: string;
  altText?: string;
  imgLink?: string;
};

export const LoginHeader: FC<LoginHeaderProps> = (props: LoginHeaderProps) => {
  const { imageSrc, imgLink, loginType, altText } = props;
  return (
    <Container css={LoginHeaderStyles.root}>
      <Grid container direction="column">
        <a css={LoginHeaderStyles.brandImg} href={imgLink}>
          <img src={imageSrc} alt={altText} />
        </a>
        <Typography data-testid="title" css={LoginHeaderStyles.loginType}>
          {loginType}
        </Typography>
      </Grid>
    </Container>
  );
};

import { Grid } from '@mui/material';
import { FC, ReactNode } from 'react';
import { LoginFooter, LoginHeader } from '../../components';
import { LoginLayoutStyles } from './styles';

type LoginLayoutProps = {
  children: ReactNode;
};

export const LoginLayout: FC<LoginLayoutProps> = (props: LoginLayoutProps) => {
  const { children } = props;
  return (
    <div css={LoginLayoutStyles.Container}>
      <Grid container css={LoginLayoutStyles.loginContainer}>
        <Grid item xs={12} md={6} css={{ marginTop: '5vh', display:'flex', justifyContent:'center', flexDirection:'column' }}>
          <LoginHeader
            imgLink="https://www.creditrepaircloud.com/"
            imageSrc={'/assets/images/cloud_logo.png'}
            loginType="Team Member Login"
          ></LoginHeader>
          {children}
          <LoginFooter
            trainingLink={'https://www.creditrepaircloud.com/training-sessions'}
            secureLoginImgSrc={'/assets/images/login-lock-icon.jpg'}
          ></LoginFooter>
        </Grid>
        <Grid item xs={12} md={6} 
        
        sx={{
          display:'',
          '@media only screen and (max-width:900px)':{
            height:'100vh'
          }
        }}>
          <iframe
            css={LoginLayoutStyles.loginMessageFrame}
            src={'https://w.creditrepaircloud.com/login-message-234'}
          ></iframe>
        </Grid>
      </Grid>
    </div>
  );
};

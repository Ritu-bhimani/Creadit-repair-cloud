import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { FC } from 'react';

export type AppThemeProviderProps = {
  children: React.ReactNode;
};

export const AppTheme: FC<AppThemeProviderProps> = (
  props: AppThemeProviderProps
) => {
  const { children } = props;
  const theme = createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true
        }
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          disableRipple: true
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: '#4a4a4a',
            fontFamily: 'Latofont'
          }
        }
      },
      MuiGrid: {
        styleOverrides: {
          item: {
            paddingLeft: '0px !important',
            paddingTop: '0px !important'
          }
        }
      }
    },
    typography: {
      fontFamily: 'Latofont',
      h2: {
        fontSize: '32px',
        fontWeight: 400,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '38px',
        letterSpacing: 'normal'
      }
    }
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

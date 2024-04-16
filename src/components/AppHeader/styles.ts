import { createTheme } from '@mui/material';

export const appHeaderTheme = createTheme({
  palette: {
    primary: {
      main: '#0075cc'
    },
    secondary: {
      main: '#FC2E63'
    },
    success: {
      main: '#00A650'
    }
  },
  components: {
    MuiTabs: {
      defaultProps: {
        visibleScrollbar: true,
        textColor: 'inherit',

        TabIndicatorProps: {
          sx: {
            width: 0,
            height: 0,
            transform: 'scale(0)'
          }
        }
      },
      styleOverrides: {
        flexContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap'
        },
        root: {
          height: 'auto',
          minHeight: 0
        },
        indicator: {
          display: 'none'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'white',
          border: '1px solid #a9c5d9',
          borderBottom: 'none',
          textTransform: 'none',
          borderTopLeftRadius: 10,
          marginLeft: 3,
          marginRight: 3,
          fontFamily: 'Latofont',
          fontSize: '14px',
          fontWeight: 400,
          borderTopRightRadius: 10,
          padding: '9px 20px',
          height: 'auto',
          minHeight: 0,
          '&.Mui-selected': {
            color: '#4a4a4a',
            backgroundColor: 'white'
          }
        },

        wrapped: {
          color: 'pink'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        outlined: {},
        root: {
          fontFamily: 'Latofont',
          fontSize: '12px',
          lineHeight: '14px',
          fontWeight: 600,
          color: '#fff',
          textTransform: 'none',
          borderWidth: 3,
          ':hover': {
            borderWidth: 3
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: 'Latofont',
          fontSize: '12px'
        }
      }
    }
  },
  shadows: [
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none'
  ]
});

import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Latofont',
          minWidth: '70px',
          textTransform: 'inherit',
          boxShadow: 'none',
          fontWeight: '600',
          borderRadius: '4px',
          ':hover': {
            boxShadow: 'none'
          },
          '&.MuiButton-text': {
            padding: '0px !important',
            fontWeight: '400',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            }
          },
          '&.MuiButton-textPrimary': {
            color: '#0075cc !important',
            '&:hover': {
              color: '#244894 !important'
            }
          },
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#0075cc',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#244894'
            }
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: '#666666',
            color: '#ffffff'
          },
          '&.MuiButton-containedSuccess': {
            backgroundColor: '#00A650',
            color: '#ffffff',
            maxHeight:'40px',
            '&:hover': {
              backgroundColor: '#008A43'
            }
          },

          '&.MuiButton-containedError': {
            backgroundColor: '#E4251B',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#C61D15'
            }
          },
          '&.MuiButton-containedInfo': {
            backgroundColor: '#FC2E63',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#DE2C63'
            }
          },
          '&.MuiButton-containedWarning': {
            backgroundColor: '#fdcc3c',
            color: '#ffffff'
          },
          '&.MuiButton-outlinedPrimary': {
            border: '2px solid #0075cc',
            color: '#0075cc',
            backgroundColor: '#ffffff',
            '&:hover': {
              backgroundColor: '#F5F5F5'
            }
          },
          '&.MuiButton-outlinedSecondary': {
            border: '2px solid #666666',
            color: '#666666',
            backgroundColor: '#ffffff',
            '&:hover': {
              backgroundColor: '#F5F5F5'
            }
          },
          '&.MuiButton-outlinedSuccess': {
            border: '2px solid #00A650',
            color: '#00A650',
            backgroundColor: '#ffffff',
            '&:hover': {
              backgroundColor: '#F5F5F5'
            }
          },
          '&.MuiButton-outlinedError': {
            border: '2px solid #E4251B',
            color: '#E4251B',
            backgroundColor: '#ffffff',
            '&:hover': {
              backgroundColor: '#F5F5F5'
            }
          },
          '&.MuiButton-outlinedInfo': {
            border: '2px solid #FC2E63',
            color: '#FC2E63',
            backgroundColor: '#ffffff',
            '&:hover': {
              backgroundColor: '#F5F5F5'
            }
          },
          '&.MuiButton-outlinedWaning': {
            border: '2px solid #fdcc3c',
            color: '#fdcc3c',
            backgroundColor: '#ffffff',
            '&:hover': {
              backgroundColor: '#F5F5F5'
            }
          },
          '&.MuiButton-sizeSmall': {
            padding: '7px 12px'
          },
          '&.MuiButton-sizeMedium': {
            padding: '11px 12px'
          },
          '&.MuiButton-sizeLarge': {
            padding: '11px 24px'
          },
          '&.MuiButton-startIcon': {
            marginLeft: '0px',
            '&.MuiSvgIcon-root': {
              fontSize: '20px'
            }
          }
        }
      }
    }
  }
});

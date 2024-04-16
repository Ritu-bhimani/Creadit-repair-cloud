import { Box, Divider, Fade, Paper, styled, Popper } from '@mui/material';
import { bindPopover } from 'material-ui-popup-state/hooks';
import { FC, ReactNode, useState } from 'react';

export type ArrowPopoverProps = {
  placement?: 'top' | 'bottom' | 'left' | 'right';
  popoverBinder: ReturnType<typeof bindPopover>;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

const PopperStyled = styled(Popper, {
  shouldForwardProp: (prop) => prop !== 'arrow'
})(({ theme }) => ({
  minWidth: 'calc(100% - 65vw)',
  maxWidth: 'calc(100% - 60vw)',
  '@media only screen and (max-width:600px)': {
    width: '95vw',
    maxWidth: 'none'
  },
  '& .MuiPaper-root': {
    boxShadow: 'rgb(0 0 0 / 14%) 0 8px 10px 0',
    borderColor: '#e9ecef',
    borderRadius: '0.25rem'
  },
  zIndex: 1,
  '& > div': {
    position: 'relative'
  },
  '&[data-popper-placement*="bottom"]': {
    '& > div': {
      marginTop: '1vw',
      marginLeft: '1vw'
    },
    '& .MuiPopper-arrow': {
      top: 0,
      left: '-0.5vw !important',
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`
      }
    }
  },
  '&[data-popper-placement*="top"]': {
    '& > div': {
      marginBottom: 2,
      marginLeft: '1vw'
    },
    '& .MuiPopper-arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.background.paper} transparent transparent transparent`
      }
    }
  },
  '&[data-popper-placement*="right"]': {
    '& > div': {
      marginLeft: 2
    },
    '& .MuiPopper-arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.background.paper} transparent transparent`
      }
    }
  },
  '&[data-popper-placement*="left"]': {
    '& > div': {
      marginRight: '1vw'
    },
    '& .MuiPopper-arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.background.paper}`
      }
    }
  }
}));

const Arrow = styled('div')({
  fontSize: '1.3em',
  height: '3em',
  '&::before': {
    content: '""',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    borderStyle: 'solid'
  }
});

export const ArrowPopover: FC<ArrowPopoverProps> = ({
  popoverBinder,
  placement,
  header,
  footer,
  children
}: ArrowPopoverProps) => {
  const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null);
  return (
    <>
      <PopperStyled
        placement={placement}
        {...popoverBinder}
        transition
        modifiers={[
          {
            name: 'arrow',
            enabled: true,
            options: {
              element: arrowRef
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <div>
                <Arrow ref={setArrowRef} className="MuiPopper-arrow" />
                {header && (
                  <>
                    {header}
                    <Divider />
                  </>
                )}
                <Box>{children}</Box>
                {footer && (
                  <>
                    <Divider />
                    {footer}
                  </>
                )}
              </div>
            </Paper>
          </Fade>
        )}
      </PopperStyled>
    </>
  );
};

ArrowPopover.defaultProps = {
  placement: 'bottom'
};

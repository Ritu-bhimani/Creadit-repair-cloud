import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton } from '@mui/material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { PropsWithChildren, ReactNode } from 'react';

export type ModalProps = Pick<DialogProps, 'open' | 'onClose'> & {
  showDividers?: boolean;
  title: ReactNode;
  footer?: ReactNode;
  closeOnEscape?: boolean;
  width?: DialogProps['maxWidth'];
  sx?: DialogProps['sx'];
  onClose?: () => void;
  closeIconVisible?: boolean;
  open?: boolean;
};

export const Modal = ({
  open,
  onClose,
  title,
  closeIconVisible: isCloseButtonVisible = false,
  children,
  closeOnEscape = false,
  showDividers = false,
  width = 'md',
  footer,
  sx
}: PropsWithChildren<ModalProps>) => {
  const onDialogClose = (event: any, reason: any) => {
    if (reason !== 'backdropClick') {
      onClose?.();
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onDialogClose}
      scroll="paper"
      disableEscapeKeyDown={!closeOnEscape}
      fullWidth
      maxWidth={width}
      sx={sx}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{title}</Box>
          {onClose && isCloseButtonVisible && (
            <Box>
              <IconButton onClick={onClose}>
                <CloseIcon sx={{ fontSize: '0.8em', color: '#4a4a4a' }} />
              </IconButton>
            </Box>
          )}
        </Box>
      </DialogTitle>
      <DialogContent dividers={showDividers}>{children}</DialogContent>
      {footer && <DialogActions>{footer}</DialogActions>}
    </Dialog>
  );
};
Modal.defaultProps = {
  closeOnEscape: false
};

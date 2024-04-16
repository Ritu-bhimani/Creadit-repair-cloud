import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { OverridableStringUnion } from '@mui/types';
import * as React from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles';

export interface ButtonPropsColorOverrides {}

type Props = {
  onClick?: () => void;
  label?: string | null;
  variant?: 'text' | 'outlined' | 'contained';
  color?: OverridableStringUnion<
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning',
    ButtonPropsColorOverrides
  >;
  size?: 'small' | 'medium' | 'large';
  endIcon?: any;
  startIcon?: any;
  disabled?: any;
  css?: any;
};

export const CustomButton: React.FC<Props> = ({
  onClick,
  label,
  variant,
  color,
  size,
  startIcon,
  endIcon,
  disabled,
  css,
  ...rest
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Button
          {...rest}
          css={css}
          disableRipple
          data-testid="button"
          variant={variant}
          color={color}
          onClick={onClick}
          startIcon={startIcon}
          endIcon={endIcon}
          size={size}
          disabled={disabled}
        >
          {label}
        </Button>
      </Box>
    </ThemeProvider>
  );
};

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';

export const StyledToastContainer = styled(ToastContainer)(
  css`
    &.Toastify__toast-container.Toastify__toast-container--top-center {
      width: 40%;
      top: 5%;
      font-size: 16px;
    }

    .Toastify__toast {
      --toastify-toast-min-height: 50px;
    }

    .Toastify__toast-icon {
      margin-inline-end: 3%;
    }

    .Toastify__close-button {
      color: #fff;
      opacity: 1;
      align-self: center;
      &:hover {
        opacity: 0.7;
      }
    }

    .Toastify__toast-body {
      color: var(--toastify-text-color-success);
      padding: 10px;
    }

    .Toastify__close-button > svg {
      height: 19px;
      width: 18px;
    }

    .Toastify__toast--success {
      --toastify-text-color-success: #ffffff;
      --toastify-icon-color-success: #ffffff;
      background-color: #00a650;
      border-radius: 6px;
    }

    .Toastify__toast--error {
      color: #fff;
      background-color: #e4251b;
    }
    .Toastify__toast--error::before {
    }
  `
);

ToastContainer.defaultProps = {
  theme: 'colored',
  newestOnTop: false,
  rtl: false,
  hideProgressBar: true,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: true,
  limit: 1
};

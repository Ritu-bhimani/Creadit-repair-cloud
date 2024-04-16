import { css } from '@emotion/react';

export const LoginLayoutStyles = {
  Container: css`
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 13px;
  `,
  loginContainer: css`
    height: calc(95vh - 13.5px);
    @media only screen and (max-width:600px) {
      width:100%; flex-basis:100%;
    }
  `,
  loginMessageFrame: css`
    margin-top: -2vh;
    width: 100%;
    height: 109.11%;
    display: table;
    vertical-align: middle;
    border-width: 0;
    @media only screen and (max-width:600px) {
      height:1180px;
      margin-top:0;
    }
  `
};

import { css } from '@emotion/react';

export const LoginFooterStyles = {
  root: css`
    text-align: center;
  `,
  button: css`
    box-sizing: border-box;
    margin-top: 10px;
    display: inline-block;
    max-width: 338px;
    width: 90%;
    background: #fc115d;
    background: #fc115d;
    color: #fff;
    text-decoration: none;
    padding: 11px 0;
    font-size: 18px;
    :hover{
      text-decoration:underline;
      background-color:#e52d70;
    }
  `,
  bottomText: css`
    > span {
      border-right: 1px solid #5b5b5b;
      margin-right: 2px;
      padding-right: 5px;
    }
    > img {
      margin-right: 6px;
    }
    bottom: 20px;
    left: 0;
    right: 0;
    margin: 1vh auto;
    color: #5b5b5b;
    line-height: 20px;
    background: 0 0;
    text-align: center;
  `,
  justGettingStartedText: css`
    margin: 20px 0 0;
    font-size: 16px;
    line-height: 22px;
    color: #5b5b5b;
    letter-spacing: 0.7px;
    margin-bottom: 5px;
  `,
  forSecurityText: css`
    margin-top: 1vh;
    display: block;
    color: #5b5b5b;
  `
};

import { css } from '@emotion/react';

export const LoginFormStyles = {
  root: css`
    text-align: center;
  `,
  loginForm: css`
    max-width: 400px;
    width: 90%;
    margin: 2vh auto 0;
    border: 1px solid #dedede;
    padding: 10px 30px;
    box-sizing: border-box;
  `,
  field: css`
    background: #fff;
    border: 1px solid #ccc;
    color: #333;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
    margin: 3px 0;
    padding: 4px 10px;
    width: 100%;
    box-sizing: border-box;
    height: 43px;
    margin-bottom: 15px;
    border-radius: 0;
    :focus-visible{
      outline:none;
    }
    :focus{
      border-color:#00aeef;
    }
  `,
  loginBtn: css`
    :hover {
      background: #0083d6;
      border-color: #093973;
      cursor: pointer;
    }
    border: 1px solid #00aeef;
    color: #fff;
    font-weight: 400;
    width: 100%;
    font-size: 20px;
    line-height:40px;
    text-align: center;
    background: #00aeef;
    margin: 25px 0 0;
  `,
  greeting: css`
    color: #6b7a8d;
    display: block;
    font-size: 2em !important;
    font-family: Arial, Helvetica, sans-serif !important;
    margin-block-start: 0.67em !important;
    margin-block-end: 0.67em !important;
    margin-inline-start: 0px !important;
    margin-inline-end: 0px !important;
    font-weight: bold !important;
  `,
  forgotPassword: css`
    clear: both;
    display: block;
    padding: 10px 20px;
    margin-top: 10px;
    color: #478cd3;
    text-decoration: none;
    font-weight: 700;
    font-size:14px;
    :hover{
      text-decoration:underline;
    }
  `,
  errorMessage: css`
    color: red !important;
  `
};

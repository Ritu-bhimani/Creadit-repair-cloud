import { css } from '@emotion/react';

export const AppFooterStyles = {
  footer: css`
    margin-top: 40px;
    :before {
      margin: 0;
      padding: 0;
    }
    :after {
      margin: 0;
      padding: 0;
    }
  `,
  container: css`
    padding: 1rem;
    background-color: rgb(247 247 247 / 1);
  `,
  credits: css`
    font-size: 10px;
    font-family: Latofont;
    text-align: left;
    color: #666;
    line-height: 18px;
  `
};

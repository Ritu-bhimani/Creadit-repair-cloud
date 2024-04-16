import { css } from '@emotion/react';

export const QuickStartLinkstyles = {
  container: css`
    border-radius: 8px;
    border: solid 1px #ccc;
    cursor: pointer;
    :hover {
      background: #eaeff1;
      #title {
        color: #000000 !important;
      }
      #description {
        color: #000000 !important;
      }
      #order-number {
        background-color: #244894 !important;
      }
    }
  `,
  title: css`
    margin-bottom: 0px;
    line-height: 1.5;
    font-weight: 70;
    color: #4a4a4a;
    font-size: 16px;
  `,
  description: css`
    color: rgb(74, 74, 74);
    font-size: 13px;
    margin-bottom: 0px;
    font-weight: 400;
    color: #4a4a4a;
  `
};

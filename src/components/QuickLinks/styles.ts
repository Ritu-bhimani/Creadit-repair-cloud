import { css } from '@emotion/react';

export const QuickLinkStyles = {
  container: css`
    display: flex;
    align-items: center;
    color: #000000 !important;
    cursor: pointer;
    padding: 0 !important;
    margin-bottom: 1.5vh;
    :hover {
      svg {
        path {
          &:first-child {
            fill: #005cb3 !important;
          }

          &:last-child {
            fill: #005cb3 !important;
          }
        }
      }
      #link-name {
        color: #000000 !important;
      }
      #link-desc {
        text-decoration: underline !important;
        color: #000000 !important;
      }
    }
  `,
  LinkIcon: css`
    min-width: 0px;
    color: #0075cc;
    font-size: 40px !important;
  `,
  ListItems: css`
    display: flex;
    flex-direction: column;
    align-items: start;
  `,
  LinkName: css`
    font-size: 16px !important;
    font-weight: 600 !important;
    color: #4a4a4a;
    text-decoration: none !important;
  `,
  LinkDesc: css`
    font-size: 13px !important;
    font-weight: 400 !important;
    color: #4a4a4a;
    text-decoration: none !important;
  `
};

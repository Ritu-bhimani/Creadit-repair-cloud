import { css } from '@emotion/react';

export const ChartStyles = {
  customTooltip: css`
    display: flex;
    padding: 5px !important;
    font-size: 12px !important;
    font-weight: 600 !important;
    background-color: white;
    font-family: Latofont !important;
    letter-spacing: 0.5px !important;
  `,

  ChartCss: css`
    .recharts-wrapper {
      font-size: 10px !important;
      margin-left: -35px;
      width: 100%;
      @media only screen and (max-width: 600px) {
        width: auto !important;
      }
      svg {
        width: 100% !important;
      }
    }

    .recharts-legend-item-text {
      color: black !important;
    }

    .recharts-default-legend {
      font-size: 11px !important;
    }

    .recharts-cartesian-axis-tick-line {
      display: none;
    }
    .recharts-tooltip-wrapper {
      border: 1px solid black !important;
    }

    .recharts-tooltip-wrapper,
    .recharts-tooltip-wrapper-right,
    .recharts-tooltip-wrapper-bottom {
      border: 1px solid black !important;
    }

    svg.recharts-surface {
      cursor: pointer;
    }

    .recharts-surface * {
      font-family: Verdana !important;
      line-height: 14px !important;
    }
    p {
      margin: 0;
    }

    .recharts-legend-wrapper {
      display: flex;
      width: 165px !important;
      justify-content: space-around;
      margin-left: calc(50% - 82px);
    }
  `
};

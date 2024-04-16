import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const HomePageStyles = {
  mainContainer: css`
    margin-top: 0px;
    margin-left: 0px;
    width: 100%;
    border-bottom: 1px solid #dedede;
    border-top: 1px solid #dedede;
  `,
  screenLeft: css`
    border-right: 1px solid #dedede;
    @media only screen and (max-width: 600px) {
      border-right: none;
    }
  `,
  screenRight: css``,
  quickStartSection: css`
    border-right: 1px solid #dedede;
    border-top: 1px solid #dedede;
  `,
  QuickLinks: styled.div`
    // border-bottom: 1px solid #dedede;
  `,
  PersonalTasks: styled.div`
    padding-top: 20px !important;
    padding-right: 20px !important;
    padding-bottom: 5vh !important;
    @media only screen and (max-width: 600px) {
      padding-bottom: 20px !important;
    }
  `,
  buisnessStatusContainer: css`
    border-top: 1px solid #dedede;
  `,
  BuisnessStatus: styled.div`
    border-top: 1px solid #dedede;
    padding-top: 20px !important;
    padding-right: 20px !important;
    padding-bottom: 5vh !important;
    min-height: 30vh;
    a {
      color: #0075cc !important;
      cursor: pointer;
      text-decoration: none;
      background-color: transparent;
    }
    a:hover {
      text-decoration: underline;
      color: #244894 !important;
    }
  `,
  tasksTitle: css`
    font-weight: 400 !important;
    font-size: 18px !important;
    color: #4a4a4a;
    margin-bottom: 32px !important;
  `,
  taskscontainer: css`
    padding-top: 20px !important;
    padding-right: 20px !important;
    padding-bottom: 20px !important;
  `,

  TodaysScheduleSection: styled.div`
    border-top: 1px solid #dedede;
    width: calc(100% - 8vw);
    min-height: 40vh;
    @media only screen and (max-width: 600px) {
      width: 100%;
      min-height: 36vh;
    }
  `
};

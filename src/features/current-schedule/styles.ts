import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const currentScheduleStyles = {
  title: css`
    font-weight: 600 !important;
    font-size: 18px !important;
    margin-right: 6px !important;
    color: #4a4a4a;
    display: flex;
  `,
  CurrentDate: styled.div`
    font-size: 12px !important;
    font-weight: 400 !important;
    color: #4a4a4a;
    display: flex;
    align-items: flex-end;
    margin-bottom: 0.3vh;
  `,
  MainTitle: styled.span`
    margin-right: 6px !important;
  `,
  MainSchedule: styled.a`
    color: #0075cc;
    cursor: pointer;
    :hover {
      color: #244894 !important;
      text-decoration: underline;
    }
  `,
  NoEventsText: styled.span`
    color: #b0adab !important;
  `,
  Events: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    > p {
      color: #666;
      font-weight: 500;
      margin-left: 1.25rem;
      @media only screen and (max-width: 600px) {
        margin-left: 0;
      }
    }
  `,
  CurrentScheduleContainer: styled.div`
    margin-left: 2.5vw;
    margin-top: 4vh;
    display: flex;
    height: auto;
    flex-direction: column;
    @media only screen and (max-width: 600px) {
      margin-left: 0;
    }
  `,
  ContainerHeader: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-bottom: 1rem;
  `,
  ContainerBody: styled.div`
    height: 220px;
    overflow: auto;
  `
};

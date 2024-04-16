import { css } from '@emotion/react';

export const BannerStyles = {
  heading: css`
    margin-top: 40px;
    margin-bottom: 1.2em;
    line-height:25px;
  `,
  bannerContainer: css`
   &:hover {
      box-shadow: 0 0 4px 1px #78b3efd9 !important;
    }
  `,
  bannerChildrenContainer: css`
    position: relative;
    justify-content: space-between;
    background-color: #cbe5ff;
    padding: 23px 35px 35px 35px;
    height:100%;
    a {
      color: #0075cc !important;
      cursor: pointer;
      text-decoration: none;
      background-color: transparent;
    }
    a:hover {
      text-decoration: underline;
      color: #244894 !important;
    }`,
  videoContainer: css`
    cursor: pointer;
    width: 324px;
    height: 198px;
    position: relative;
    &:hover .vidioTitle{
    text-decoration: underline!important;
   }
    `,
  video: css`
   &:hover {
    filter: contrast(0.5)!important;
   }
  
  `,
  image: css`
    width:100%;
    height: 164px;
    vertical-align: middle;
    border-style: none;
  `,
  playCircleIcon: css`
    position: absolute;
    top: 36%;
    left: 43%;

  `,
  textWhite: css`
    color: #fff !important;

  `,
  videoDetails: css`
    padding-top: 9px;
    padding-bottom: 9px;
    padding-left: 16px;
    padding-right: 16px;
    --tw-bg-opacity: 1;
    background-color: rgb(102 102 102 / var(--tw-bg-opacity));
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: 0.75rem;
    line-height: 1rem;
    display: flex;
    color:  #fff !important;
  `,
  vidioTitle: css`
    color: #fff !important;
  `,
  quickVideo: css`
    color: #0075cc!important;
    cursor: pointer;
    text-decoration: none;
    background-color: transparent;
    margin-left: 12px;
    margin-top: 10px;
    .quick-video {
      font-size: 14px;
      vertical-align: top;
    }
    &:hover {
      color:#244894!important;
    }
    .quick-video {
    &:hover {
      text-decoration: underline;

    }`,
  dismissLink: css`
    position: absolute;
    bottom:20px;
    font-weight: 600 !important;
    `

};
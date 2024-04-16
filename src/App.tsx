import { css, Global } from '@emotion/react';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { AppRoutes } from './router';
import { setDefaultLanguage } from './utils';
import { AppTheme } from './theme';

const globalStyles = css`
  body {
    margin: 0;
    padding: 0 !important;
    @font-face {
      font-family: 'Latofont';
      font-weight: normal;
      font-style: normal;
      src: url('/assets/fonts/lato-regular-webfont.ttf') format('truetype');
    }
    font-family: Latofont !important;
    font-size: 14px !important;
  }
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #fff;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: #fff;
  }

  ::-webkit-scrollbar-thumb {
    width: 8px;
    height: 61px;
    border-radius: 5px;
    background-color: #ccc;
  }
  .busstatus input {
    padding: 5px !important;
    border: solid 1px #aaa !important;
    border-radius: 0 !important;
    :focus {
      box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%) !important;
    }
  }

  input:checked ~ .css-khktgd-Checkmark {
    box-shadow: none;
    :hover {
      box-shadow: 0 0 6px rgb(0 117 204 / 62%);
    }
  }
  .tasklist .css-khktgd-Checkmark:after {
    border-color: #0075cc !important;
  }
  .selectdropdownbg {
    font-family: Latofont !important;
    :hover {
      background-color: #d8d8d8 !important;
    }
  }
  .Mui-selected.selectdropdownbg {
    background-color: #d8d8d8 !important;
  }

  #menu {
    position: absolute;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
  }

  .labelnobottom label {
    margin-bottom: 0;
  }
  .Toastify svg {
    fill: #fff;
  }
  .customchips > div {
    border-radius: 5px !important;
    background: #ccc;
    color: #0075cc;
    height: 24px;
  }
  .headerpopover {
    margin-top: -10px !important;
    overflow: hidden;
  }
  .headerpopover a:hover {
    background: #e4e4e4;
    color: #222121;
  }
  .labelnobottom input:checked ~ :after {
    border-color: #0075cc !important;
  }
  .busstatus input {
    padding: 5px !important;
    border: solid 1px #aaa !important;
    border-radius: 0 !important;
  }

  .labelnobottom label {
    margin-bottom: 0;
  }
  .Toastify svg {
    fill: #fff;
  }
  .labelnobottom:hover {
    background: #f5f8fa;
  }
  .customchips > div {
    border-radius: 5px !important;
    background: #ccc;
    color: #0075cc;
    height: 24px;
  }
  .headerpopover {
    margin-top: -10px !important;
    overflow: hidden;
  }
  .headerpopover a:hover {
    background: #e4e4e4;
    color: #222121;
  }
  .headerbadge .MuiBadge-badge {
    width: 31px;
    height: 16px;
    font-size: 11px;
    font-family: 'Latofont';
    top: 5px;
  }
  .MuiTooltip-tooltip {
    background: #0075cc !important;
    color: #fff;
    padding: 12px !important;
    border-radius: 4px !important;
    font-size: 15px !important;
    line-height: 22px !important;
    max-width: 250px !important;
  }
  .MuiTooltip-arrow {
    color: #0075cc !important;
  }
  .ml-3 {
    margin-left: 3px;
  }
  .mr-3 {
    margin-right: 3px;
  }
  .schedulerightlinks .MuiInputBase-input {
    padding: 8px 26px 8px 12px !important;
    margin-top: -5px;
  }
  .edtideleteicons svg:hover {
    color: #005cb3 !important;
  }
  .pac-container {
    z-index: 99999 !important;
  }
  .MuiBackdrop-root .MuiModal-backdrop {
    position: relative !important;
  }
  .MuiPopover-root {
    position: absolute !important;
  }
  .MuiPaper-root {
    position: relative !important;
  }
`;
function App() {
  const content = useRoutes(AppRoutes);
  // set default language on load
  useEffect(() => {
    setDefaultLanguage();
  }, []);
  return (
    <AppTheme>
      <Global styles={globalStyles} />
      {content}
    </AppTheme>
  );
}

export default App;

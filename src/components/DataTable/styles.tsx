import { css } from '@emotion/react';

export const DataTableStyles = {
  root: css`
    padding: '0px';
    .MuiDataGrid-root {
      border-radius: 0px;
      border: none !important;
      .MuiDataGrid-columnSeparator {
        display: none;
      }
      .MuiDataGrid-virtualScrollerContent {
        height: auto !important;
      }
      .MuiDataGrid-columnHeader:focus,
      .MuiDataGrid-cell:focus {
        outline: none !important;
      }
      .MuiDataGrid-columnHeaderTitle {
        font-size: 13px;
        font-weight: 400;
        font-stretch: normal;
        color: #666;
      }
      .MuiDataGrid-virtualScroller {
        margin-top: 45px !important;
      }
      .MuiDataGrid-virtualScroller::-webkit-scrollbar {
        width: 6px;
        background-color: #fff;
      }
      .MuiDataGrid-virtualScroller::-webkit-scrollbar-track {
        background-color: #fff;
      }
      .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb {
        width: 8px;
        height: 61px px;
        border-radius: 5px;
        background-color: #ccc;
      }
      .MuiDataGrid-columnHeaders {
        background-color: #f5f8fa;
        color: #666;
        border-radius: 0px;
        max-height: 45px !important;
        min-height: 45px !important;
        width: 100% !important;
        .MuiDataGrid-columnHeader {
          height: 45px !important;
        }
      }
      .MuiDataGrid-row,
      .MuiDataGrid-cell {
        max-height: 45px !important;
        min-height: 45px !important;
        color: #4a4a4a;
        width: 100% !important;
      }
      .MuiDataGrid-row:hover,
      .MuiDataGrid-row.Mui-hovered {
        background-color: #f5f8fa !important;
        color: #666;
      }
      .tableCustomWidth {
        width: 16% !important;
        min-width: 16% !important;
      }

      .tableCustomWidth .MuiDataGrid-columnSeparator--sideRight {
        display: none !important;
      }
      .MuiDataGrid-virtualScrollerRenderZone,
      .MuiDataGrid-columnHeadersInner,
      .MuiDataGrid-columnHeadersInner > div {
        width: 100%;
      }
      .columnTitle {
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
      }
      .checkboxContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        input[type='checkbox'] {
          position: relative;
          cursor: pointer;
          width: 16px;
          height: 16px;
          margin-right: 6px;
          &::before {
            content: '';
            display: block;
            position: absolute;
            width: 16px;
            height: 16px;
            top: 0;
            left: 0;
            background-color: #fff;
            border: 1px solid #dddbda;
            border-radius: 2px;
          }
          &:hover:before {
            box-shadow: 0 0 6px rgb(0 117 204 / 62%);
          }
          &:checked:after {
            content: '';
            display: block;
            width: 0.3125rem;
            height: 10px;
            border: solid #0075cc;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            position: absolute;
            top: 2px;
            left: 6px;
          }
        }
      }
    }
  `,
  dataTable: css`
    height: 220px !important;
  `,
  checkBoxContaner: css`
    display: flex;
    justify-content: center;
    align-items: center;
    input[type='checkbox'] {
      position: relative;
      cursor: pointer;
      width: 16px;
      height: 16px;
      margin-right: 6px;
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 16px;
        height: 16px;
        top: 0;
        left: 0;
        background-color: #fff;
        border: 1px solid #dddbda;
        border-radius: 2px;
      }
      &:hover:before {
        box-shadow: 0 0 6px rgb(0 117 204 / 62%);
      }
      &:checked:after {
        content: '';
        display: block;
        width: 0.3125rem;
        height: 10px;
        border: solid #0075cc;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        position: absolute;
        top: 2px;
        left: 6px;
      }
    }
  `,
  tooltipContainer: css`
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
  `
};

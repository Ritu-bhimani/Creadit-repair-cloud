import styled from '@emotion/styled';

export const StyleWrapper = styled.div`
  .schedulerightlinks {
    float: right;
  }
  .taskeventtabs button {
    font-size: 14px;
    color: #0075cc;
    text-transform: none;
    min-width: 135px;
    padding: 8px;
    height: 40px;
  }
  .taskeventtabs {
    margin-bottom: 20px;
    border: #0077cc 1px solid;
  }
  .taskeventtabs button.Mui-selected {
    background: #0075cc;
    color: #fff;
  }
  .taskeventtabs button:hover {
    background: #244894;
    color: #fff;
  }
  .eventCheck.eventTask label span {
    top: 2px;
  }
  .eventCheck.eventTask label {
    padding-left: 22px;
  }
  .duedatetogglebtn {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .duedatetogglebtn button {
    border: 1px solid #dedede;
    border-radius: 2px;
    background: #fff;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .duedatetogglebtn button:hover {
    border: 1px solid #b0adab;
    background-color: #f5f5f5;
  }
  .datatablegrid .MuiDataGrid-cell:focus-within {
    outline: none;
  }
  .duedatetogglebtn svg {
    width: 22px;
    height: 22px;
    margin-left: -2px;
    margin-top: -2px;
    color: #b0adab;
  }
  .overduebtn {
    color: #fff;
    border-radius: 20px;
    padding: 4px 16px;
    background-color: #e4251b;
    //font-weight:600;
    font-size: 16px;
    width: fit-content;
    margin-bottom: 20px;
  }
  .duetodaybtn {
    background-color: #00a650 !important;
    //font-weight:600;
    font-size: 14px;
    width: fit-content;
    margin-bottom: 20px;
    color: #fff;
    border-radius: 20px;
    padding: 4px 16px;
    margin-top: 30px;
  }
  .upcomingbtn {
    background-color: #ff9634 !important;
    //font-weight:600;
    font-size: 14px;
    width: fit-content;
    margin-bottom: 20px;
    color: #fff;
    border-radius: 20px;
    padding: 4px 16px;
    margin-top: 30px;
  }
  .MuiDataGrid-columnSeparator--sideRight {
    display: none !important;
  }
  .MuiDataGrid-cell:focus {
    outline: none;
  }
  .taskeventactionbtns .schedulerightlinks {
    margin-top: -62px;
  }
`;

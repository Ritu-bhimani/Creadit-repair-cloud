import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const emailMenuStyles = {
  list: {
    //maxHeight: '25vh',
    padding: '0.7vw',
    margin: '0 15px',
    color: '#4a4a4a',
    '&:nth-of-type(odd)': {
      backgroundColor: '#f7f7f7'
    }
  }
};
export const viewALLStyle = css`
  cursor: pointer;
  text-align: center !important;
  color: #0075cc !important;
  font-weight: 400 !important;
  font-family: Latofont;
  font-size: 14px;
  padding-bottom: 5px;
  padding-top: 10px;
`;

export const ErrorHeader = styled('div')(({ theme }) => ({
  color: '#0075cc',
  fontWeight: '700',
  fontSize: '14px',
  fontFamily: 'Latofont',
  //marginTop: '1vh',
  //marginBottom: '1vh',
  padding: '0.7vw',
  maxWidth: '300px',
  width: 'fit-content',
  marginLeft: '15px',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

export const NoDataMessage = styled('div')(({ theme }) => ({
  textAlign: 'center',
  color: '#999999',
  paddingTop: '15px',
  paddingBottom: '10px'
}));

export const viewDetailsStyle = css`
  color: #0056b3;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

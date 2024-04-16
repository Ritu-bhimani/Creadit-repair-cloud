import { FC, useState } from 'react';
import {
    Button,
    css,
    InputLabel,
    Stack,
    TextareaAutosize,
  } from '@mui/material';

const Style = css`
  .colorplatte-container {
    width: 153px;
    height: 153px;
    overflow: hidden;
    display: none;
    position: absolute;
    top: 280px;
    z-index: 1060;
    left: 728px;
  }
  .k-item {
    border: solid #f5f8fa;
    height: 30px;
    min-width: 30px;
    width: 14px;
    box-sizing: border-box;
    overflow: hidden;
    -ms-high-contrast-adjust: none;
    cursor: pointer;
  }
`;

interface paramColorPlatte {
    colorPlatte: (arg: string) => void
}

export 
const SelectColorPlatte: FC<paramColorPlatte> = ({colorPlatte}) => {

  return (
    <>
    <div css={Style} className='colorplatte-container'>
      <table>
        <tbody>
          <tr role="row">
            <td
              onClick={() => colorPlatte('#786e6e')}
              style={{ backgroundColor: '#786e6e' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#b0484e')}
              style={{ backgroundColor: '#b0484e' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#bd4a7b')}
              style={{ backgroundColor: '#bd4a7b' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#8f499a')}
              style={{ backgroundColor: '#8f499a' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#6c5aa8')}
              style={{ backgroundColor: '#6c5aa8' }}
              className="k-item"
            ></td>
          </tr>
          <tr role="row">
            <td
              onClick={() => colorPlatte('#51599e')}
              style={{ backgroundColor: '#51599e' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#6182c8')}
              style={{ backgroundColor: '#6182c8' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#4891a8')}
              style={{ backgroundColor: '#4891a8' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#569287')}
              style={{ backgroundColor: '#569287' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#6c9a5c')}
              style={{ backgroundColor: '#6c9a5c' }}
              className="k-item"
            ></td>
          </tr>
          <tr role="row">
            <td
              onClick={() => colorPlatte('#879953')}
              style={{ backgroundColor: '#879953' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#a69646')}
              style={{ backgroundColor: '#a69646' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#c9a629')}
              style={{ backgroundColor: '#c9a629' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#cb863d')}
              style={{ backgroundColor: '#cb863d' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#bd785b')}
              style={{ backgroundColor: '#bd785b' }}
              className="k-item"
            ></td>
          </tr>
          <tr role="row">
            <td
              onClick={() => colorPlatte('#957170')}
              style={{ backgroundColor: '#957170' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#7b657d')}
              style={{ backgroundColor: '#7b657d' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#50637b')}
              style={{ backgroundColor: '#50637b' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#7383a5')}
              style={{ backgroundColor: '#7383a5' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#59817b')}
              style={{ backgroundColor: '#59817b' }}
              className="k-item"
            ></td>
          </tr>
          <tr role="row">
            <td
              onClick={() => colorPlatte('#757561')}
              style={{ backgroundColor: '#757561' }}
              className="k-item"
            ></td>
            <td
              onClick={() => colorPlatte('#8f7b5f')}
              style={{ backgroundColor: '#8f7b5f' }}
              className="k-item"
            ></td>
            <td
              colSpan={3}
              align="center"
              onClick={() => colorPlatte('')}
              className="k-item"
            >
              <input type="button" className="none-btn" value="none" />
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </>
  );
};

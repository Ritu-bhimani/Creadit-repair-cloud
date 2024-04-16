import styled from '@emotion/styled';
import { Edit } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { FC, useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import { CustomizedTooltip } from '../Toottip';
import React from 'react';
export type EditableAvatarProps = {
  src?: string;
  onChange: (file: File) => void;
  css?: any;
  OnClick?: any;
  editIcon?: boolean;
  messageIcon?: boolean;
  deleteIcon?: boolean;
  messageText?: string;
  handleDelete?: any;
};

type ContainerProps = {
  src?: string;
};

type RibbonProps = {
  visible: boolean;
};

const Container = styled.div<ContainerProps>`
  position: relative;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  margin: 0 auto;
  background-size: cover!important;
  // &:hover {
  //   opacity: 0.8;
  // }
`;

const Ribbon = styled.div<RibbonProps>`
  font-family: 'Latofont';
  color: #fff;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background-color: rgba(0, 0, 0, 0.44);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  transition: opacity 0.2s ease-in-out;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  justify-content: space-evenly;

`;

const StyledInput = styled.input`
  display: none;
`;

export const EditableAvatar: FC<EditableAvatarProps> = ({
  src,
  onChange,
  css,
  OnClick,
  editIcon,
  messageIcon,
  deleteIcon,
  messageText,
  handleDelete
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onChange(files[0]);
    }
  };

  return (
    <Container
      src={src}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      css={css}
      onClick={() => OnClick}
    >
      <StyledInput
        accept="image/*"
        id="contained-button-file"
        type="file"
        onChange={handleFileChange}
        ref={inputRef}
      />
      <Ribbon visible={isHovered}>
        {editIcon && <IconButton disableRipple onClick={handleButtonClick}>
          <Edit sx={{ fontSize: '0.6em', color: '#fff' }} />
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: 'Latofont',
              color: '#fff',
              marginLeft: '0.2em'
            }}
          >
            Edit
          </Typography>
        </IconButton>
        }
        {messageIcon &&
          <CustomizedTooltip
            title={
              messageText && <React.Fragment>
                <span color="inherit">
                  Login details sent on:
                </span>
                <br />
                <b>
                  {messageText}
                </b>
              </React.Fragment>
            }
            placement={'bottom'}
            arrow={true}
          >
            <EmailIcon sx={{
              fontSize: '24px', color: '#fff', "&:hover": {
                color: '#0075cc',
                cursor: 'pointer',
                opacity: '1'
              },
            }} />
          </CustomizedTooltip>
        }
        {deleteIcon &&
          <DeleteIcon sx={{
            fontSize: '24px', color: '#fff', "&:hover": {
              color: '#0075cc',
              cursor: 'pointer'
            },
          }}
            onClick={handleDelete}
          />

        }
      </Ribbon>
    </Container>
  );
};

EditableAvatar.defaultProps = {};

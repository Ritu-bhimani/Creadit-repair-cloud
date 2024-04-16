import styled from '@emotion/styled';
import { FC } from 'react';

type LabelProps = {
  stricked?: boolean;
  ml?: string;
};

type CheckBoxProps = {
  label?: any;
  checked: boolean;
  id: string | number;
  onChange: (id: any) => void;
  stricked?: boolean;
  CheckBox?: boolean;
  sx?: any;
  ml?: string;
};
const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;
const Label = styled.label<LabelProps>`
  margin-left: ${(props) => (props.ml ? props.ml : 0)};
  font-weight: 400 !important;
  display: block;
  position: relative;
  padding-left: 25px;
  margin-bottom: 20px;
  color: ${(props) => (props.stricked ? '#b0adab' : '#4a4a4a')};
  cursor: pointer;
  line-height: 14px;
  -webkit-user-select: none;
  user-select: none;
  text-decoration: ${(props) => (props.stricked ? 'line-through' : 'none')};
`;
const Checkmark = styled.span`
  color: #4a4a4a;
  cursor: pointer;
  position: absolute;
  top: -2px;
  left: 0;
  height: 14px !important;
  width: 14px !important;
  border-radius: 2px;
  border: solid 1px #dedede;
  background-color: #fff;
  border-color: #c4c4c4 !important;
  input:checked ~ & {
    border-radius: 2px;
    border: solid 1px #dddbda;
    background-color: #fff;
    box-shadow: none;
    :hover {
      box-shadow: 0 0 6px rgb(0 117 204 / 62%);
    }
  }
  input:checked ~ &:after {
    display: block;
  }
  &:after {
    left: 4px;
    bottom: 3px;
    width: 5px;
    height: 8px;
    border: solid #0075cc;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    content: '';
    position: absolute;
    display: none;
  }
`;

export const CheckBox: FC<CheckBoxProps> = (props: CheckBoxProps) => {
  const { label, checked, onChange, id, stricked, ml } = props;
  return (
    <Label stricked={stricked && checked} ml={ml}>
      <>
        {label && <span>{label}</span>}
        <Input
          type={'checkbox'}
          checked={checked}
          onChange={() => onChange(id)}
        />
        <Checkmark className="checkmarkbox" />
      </>
    </Label>
  );
};

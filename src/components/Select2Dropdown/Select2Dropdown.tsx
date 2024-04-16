import { css, Interpolation, Theme } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  SelectProps,
  styled
} from '@mui/material';
import { use } from 'i18next';
import { FC, useEffect, useRef, useState } from 'react';
import Select from 'react-select';

type Select2DropDownProps = {
  options: any;
  selectedOption: any;
  showRequired?: boolean;
  onChange: (value: any) => void;
  EndIcon?: any;
  Iserror?: boolean;
  groupOptions?: boolean;
  menuPlacement?: any;
} & SelectProps;
type DropdownProps = {
  children: any;
  isOpen: any;
  target: any;
  onClose: any;
};

const selectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    border: '1px solid #aaa',
    borderColor: '#aaa',
    boxShadow: 'none',
    borderRadius: 'none',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    borderBottom: 'none',
    borderTop: state.menuPlacement === 'top' ? '1px solid #aaa' : 'none',
    '&:focus': {
      borderColor: '#aaa'
    },
    '&:hover': {
      borderColor: '#aaa'
    }
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 9999
  }),

  valueContainer: (provided: any, state: any) => ({
    ...provided,
    border: '1px solid #aaa',
    margin: '8px',
    boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)',
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)'
    },
    padding: '6px !important'
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    border: '1px solid #aaa',
    borderTop: state.menuPlacement === 'top' ? '1px solid #aaa' : 'none',
    borderBottom: state.menuPlacement === 'top' ? 'none' : '1px solid #aaa',
    borderRadius: '0',
    boxShadow: 'none',
    marginTop: '0px',
    marginBottom: '0px',
    borderBottomLeftRadius: state.menuPlacement === 'top' ? '0' : '4px',
    borderBottomRightRadius: state.menuPlacement === 'top' ? '0' : '4px',
    borderTopLeftRadius: state.menuPlacement === 'top' ? '4px' : '0',
    borderTopRightRadius: state.menuPlacement === 'top' ? '4px' : '0'
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? '#2b2826' : '#4a4a4a',
    padding: '12px 16px',
    background: state.isFocused
      ? '#d8d8d8'
      : state.isSelected
      ? '#d8d8d8'
      : undefined,
    '&:active': {
      background: '#d8d8d8'
    }
  }),
  groupHeading: (base: any) => ({
    ...base,
    fontWeight: '700',
    color: '#4a4a4a',
    textTransform: 'none',
    fontSize: '14px'
  })
};

const StyledButton = styled(Button)(({ theme }) => ({
  '&.MuiButtonBase-root': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#f5f8fa',
    border: 'solid 1px #dedede',
    fontSize: 14,
    fontWeight: 400,
    padding: '8px  10px 8px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: 'LatoFont',
    color: '#666',
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)'
    }
  }
}));

const noResult = css`
  font-size: 14px;
  color: #4a4a4a !important;
  opacity: 1 !important;
  text-align: left;
  display: flex;
  justify-content: start;
`;

export const Select2Dropdown: FC<Select2DropDownProps> = (
  props: Select2DropDownProps
) => {
  const [menuPlacement, setMenuPlacement] = useState<any>('bottom');
  const [menuPosition, setMenuPosition] = useState<any>('absolute');

  const menuObserver = useRef<any>({});
  const selectRef = useRef<any>();
  const {
    options,
    selectedOption,
    showRequired,
    EndIcon,
    onChange,
    Iserror,
    groupOptions,
    ...rest
  } = props;
  const Dropdown: FC<DropdownProps> = ({
    children,
    isOpen,
    target,
    onClose
  }: {
    children: any;
    isOpen: any;
    target: any;
    onClose: any;
  }) => (
    <div css={{ position: 'relative' }}>
      {target}
      {isOpen ? <Menu>{children}</Menu> : null}
      {isOpen ? <Blanket onClick={onClose} /> : null}
    </div>
  );
  const Menu = (
    props: EmotionJSX.IntrinsicAttributes & {
      css?: Interpolation<Theme>;
    } & React.ClassAttributes<HTMLDivElement> &
      React.HTMLAttributes<HTMLDivElement> & { css?: Interpolation<Theme> }
  ) => {
    const shadow = 'hsla(218, 50%, 10%, 0.1)';
    return (
      <div
        css={{
          backgroundColor: 'white',
          position: 'absolute',
          width: '100%',
          zIndex: 2,
          color: '#4a4a4a',
          fontSize: '14px',
          bottom: menuPlacement === 'top' ? '45px' : '',
          '&:focus': {
            backgroundColor: '#d8d8d8',
            borderRadius: 4,
            boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)',
            color: '#2b2826 !important'
          }
        }}
        {...props}
      />
    );
  };
  const Blanket = (
    props: EmotionJSX.IntrinsicAttributes & {
      css?: Interpolation<Theme>;
    } & React.ClassAttributes<HTMLDivElement> &
      React.HTMLAttributes<HTMLDivElement> & { css?: Interpolation<Theme> }
  ) => (
    <div
      css={{
        bottom: 0,
        left: 0,
        top: 0,
        right: 0,
        position: 'fixed',
        zIndex: 1
      }}
      {...props}
    />
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState(
    options.find(({ value: v }: any) => v === selectedOption)
  );
  useEffect(() => {
    if (options && groupOptions) {
      for (const groupOption of options) {
        let option = groupOption.options.find(
          (opt: any) => opt.value === selectedOption
        );
        if (option) {
          return setValue(
            groupOption.options.find((opt: any) => opt.value === selectedOption)
          );
        }
      }
    } else if (options && !groupOptions) {
      setValue(options.find(({ value: v }: any) => v === selectedOption));
    }
    if (options && value === undefined && groupOptions) {
      setValue(options[0].options[0]);
    }
  }, [selectedOption]);

  const toggleClose = () => {
    setIsOpen(false);
  };
  const toggleOpen = () => {
    setIsOpen(true);
    const observeOnscreen: any = (entries = []) => {
      const { boundingClientRect, intersectionRect }: any = entries[0];
      const isOffscreen = intersectionRect?.height < boundingClientRect?.height;
      if (intersectionRect.height > 0 || boundingClientRect?.height > 0) {
        if (isOffscreen) {
          setMenuPlacement('top');
        } else {
          setMenuPlacement('bottom');
        }
      }
    };
    setTimeout(() => {
      const menuList: any = selectRef.current.menuListRef;
      menuObserver.current = new IntersectionObserver(observeOnscreen);
      menuObserver.current.observe(menuList);
    }, 1);
  };
  const onSelectChange = (value: any) => {
    toggleClose();
    setValue(value);
    onChange(value.value);
  };

  const textRed = {
    color: '#e4251b !important',
    marginLeft: '0px'
  };
  const DropdownIcon = isOpen ? <ArrowDropUp /> : <ArrowDropDown />;
  const boxShadow = css`
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%) !important;
    border-radius: 4px;
  `;
  const errorStyle = css`
    border: solid 1px #e4251b !important;
    border-radius: 4px;
    color: #e4251b !important;
  `;
  const buttonBoxShow = isOpen ? boxShadow : null;

  return (
    <Box>
      <InputLabel
        id="search-select-label"
        shrink={false}
        sx={{ fontWeight: 400, fontSize: '12px', marginBottom: '5px' }}
      >
        {rest.label}
        {showRequired ? <span css={textRed}>*</span> : ''}
      </InputLabel>

      <FormControl fullWidth>
        <Dropdown
          isOpen={isOpen}
          onClose={toggleClose}
          target={
            <StyledButton
              onClick={toggleOpen}
              endIcon={EndIcon ? EndIcon : DropdownIcon}
              fullWidth={true}
              css={Iserror ? errorStyle : buttonBoxShow}
            >
              <span>
                {value
                  ? `${value.label}`
                  : `${options[0]?.label ? options[0]?.label : 'Select'}`}
              </span>
            </StyledButton>
          }
        >
          <Select
            ref={selectRef}
            menuPortalTarget={document.body}
            noOptionsMessage={() => (
              <span css={noResult}>No results found</span>
            )}
            autoFocus={true}
            backspaceRemovesValue={false}
            components={{ DropdownIndicator, IndicatorSeparator: null }}
            placeholder=""
            styles={selectStyles}
            controlShouldRenderValue={false}
            hideSelectedOptions={false}
            isClearable={false}
            menuIsOpen
            onChange={onSelectChange}
            options={options}
            tabSelectsValue
            value={value}
            maxMenuHeight={250}
            menuPosition="absolute"
            menuPlacement={menuPlacement}
            menuShouldScrollIntoView={true}
          />
        </Dropdown>
      </FormControl>
    </Box>
  );
};
const DropdownIndicator = () => <></>;

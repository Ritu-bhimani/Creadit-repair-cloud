import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PrintIcon from '@mui/icons-material/Print';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import {
  ClickAwayListener,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Popper,
  Stack,
  TextField,
  styled
} from '@mui/material';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../CustomButton';
import { SelectDropdown } from '../SelectDropdown';

const Menu = styled(Popper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'rgb(0 0 0 / 14%) 0 8px 10px 0',
  marginLeft: '-2vw !important',
  borderRadius: 4,
  '& .MuiLink-root': {
    color: '#4a4a4a'
  }
}));

interface ActionButtonsProp {
  refreshIcon?: boolean;
  handleRefresh?: any;
  importExportIcon?: boolean;
  handleImport?: any;
  handleExport?: any;
  printIcon?: boolean;
  handlePrint?: any;
  searchField?: boolean;
  handleSearchField?: any;
  selectDropdown?: boolean;
  options?: any;
  selectedOption?: string | number;
  handleDropDown?: any;
  button?: boolean;
  buttonLabel?: string;
  handleButton?: any;
}
export const ActionButtons = (props: ActionButtonsProp) => {
  const {
    refreshIcon,
    handleRefresh,
    importExportIcon,
    handleImport,
    handleExport,
    selectDropdown,
    options,
    selectedOption,
    handleDropDown,
    printIcon,
    handlePrint,
    searchField,
    handleSearchField,
    button,
    buttonLabel,
    handleButton
  } = props;
  const [openMenu, SetOpenMenu] = useState(false);
  const { t } = useTranslation();

  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'helpAndSupportPopup'
  });

  return (
    <Grid
      className="schedulerightlinks"
      sx={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      <Stack direction="row" spacing={2}>
        {refreshIcon && (
          <IconButton disableRipple>
            <RefreshIcon
              sx={{
                color: '#0075cc',
                fontSize: '32px',
                ':hover': { color: '#005cb3 !important' }
              }}
              onClick={() => handleRefresh()}
            />
          </IconButton>
        )}
        {importExportIcon && (
          <>
            <Link
              {...bindTrigger(popupState)}
              component="button"
              variant="body2"
            >
              <ImportExportIcon
                sx={{
                  color: '#0075cc',
                  fontSize: '32px',
                  ':hover': { color: '#005cb3 !important' }
                }}
                onClick={() => SetOpenMenu(true)}
              />
            </Link>
            <Menu
              style={{
                width: '170px',
                zIndex: '99',
                border: 'solid 1px #dddbda'
              }}
              className="headerpopover"
              {...bindPopover(popupState)}
              // open
              placement="bottom-end"
            >
              <ClickAwayListener onClickAway={popupState.close}>
                <Stack>
                  <Link
                    style={{ textDecoration: 'none' }}
                    sx={(theme) => {
                      return {
                        p: 1.5,
                        color: theme.palette.text.secondary,
                        ...theme.typography.subtitle1,
                        fontSize: theme.typography.body2.fontSize,
                        fontFamily: 'Latofont',
                        cursor: 'pointer'
                      };
                    }}
                    onClick={() => handleImport()}
                  >
                    {t('Import')}
                  </Link>

                  <Link
                    style={{ textDecoration: 'none' }}
                    sx={(theme) => {
                      return {
                        p: 1.5,
                        color: theme.palette.text.secondary,
                        ...theme.typography.subtitle1,
                        fontSize: theme.typography.body2.fontSize,
                        fontFamily: 'Latofont',
                        cursor: 'pointer'
                      };
                    }}
                    onClick={() => handleExport}
                  >
                    {t('Export')}
                  </Link>
                </Stack>
              </ClickAwayListener>
            </Menu>
          </>
        )}
        {printIcon && (
          <IconButton disableRipple>
            <PrintIcon
              sx={{
                color: '#0075cc',
                fontSize: '32px',
                ':hover': { color: '#005cb3 !important' }
              }}
              onClick={() => handlePrint()}
            />
          </IconButton>
        )}
        {searchField && (
          <TextField
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchTwoToneIcon
                    sx={{ color: '#0075cc', fontSize: '32px' }}
                  />
                </InputAdornment>
              )
            }}
            placeholder="Search..."
            onChange={(value) => handleSearchField(value)}
          />
        )}

        {selectDropdown && (
          <SelectDropdown
            style={{ width: '230px' }}
            selectedOption={selectedOption}
            options={options}
            onChange={(value) => handleDropDown(value)}
          />
        )}
        {button && (
          <CustomButton
            variant="contained"
            color="success"
            label={buttonLabel}
            startIcon={<AddIcon />}
            onClick={handleButton}
          />
        )}
      </Stack>
    </Grid>
  );
};

import { Add, ArrowDropDown, Cancel, Settings } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  Grid,
  InputLabel,
  MenuItem,
  Popper,
  TextareaAutosize,
  css,
  styled
} from '@mui/material';
import {
  GridCellParams,
  GridColumns,
  GridRowId,
  GridRowModes,
  GridRowModesModel
} from '@mui/x-data-grid';
import { cloneDeep, findIndex, get, isEmpty, toString } from 'lodash-es';
import { bindPopover } from 'material-ui-popup-state';
import { bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  CheckBox,
  CustomButton,
  DataTable,
  Input,
  Modal
} from '../../components';
import {
  useAddInvoiceMutation,
  useInvoiceQuery,
  usePreviewInvoiceQuery,
  useSetAsdefaultMutation,
  useUpdateInvoiceMutation
} from './MyCompanyInvoice.api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const toastConfig = {
  icon: <Cancel />
};

const testAreaStyles = css`
  border-radius: 4px;
  position: relative;
  background-color: #f5f8fa;
  border: solid 1px #dedede;
  font-size: 14px;
  font-weight: 400;
  transition: theme.transitions.create([ 'border-color', 'box-shadow']);
  font-family: LatoFont;
  color: #4a4a4a;
  width: 95% !important;
  padding: 10px 10px;
`;

type AddOptionProps = {
  onClose: () => void;
  refetch: () => void;
};

const AddOption = ({ onClose, refetch }: AddOptionProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addInvoice, { isLoading: isBusy }] = useAddInvoiceMutation();
  const onAdd = async () => {
    await addInvoice({ title, description }).then((res) => {
      if ('error' in res) {
        const { error } = res;
        const message = get(error, 'data.message', 'Something went wrong');
        const errorMsg =
          get(message, 'title[0]', '').trim() ||
          get(message, 'description[0]', '').trim();
        toast.error(errorMsg, {
          ...toastConfig,
          toastId: 'option error'
        });
      }
    });
  };
  return (
    <Grid container gap={3}>
      <Grid item xs={12} mt={2}>
        <Input
          fullWidth
          label={'Add Title'}
          value={title}
          name="subject"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          showRequired={true}
        />
      </Grid>
      <Grid item xs={12}>
        <InputLabel shrink htmlFor="bootstrap-input">
          {'Description'}
        </InputLabel>
        <TextareaAutosize
          css={testAreaStyles}
          aria-label="Notes"
          minRows={4}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Grid>
      <Grid container item justifyContent={'flex-end'} gap={2}>
        <Grid item mt={1}>
          <CustomButton variant="text" label="Cancel" onClick={onClose} />
        </Grid>
        <Grid item>
          <CustomButton
            variant="contained"
            color="success"
            label="Add"
            onClick={onAdd}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export const MyCompanyInvoice = () => {
  const { data, isFetching, refetch } = useInvoiceQuery(null);
  const [isAddOptionOpen, setIsAddOptionOpen] = useState(false);
  const [setAsdefault, { isLoading }] = useSetAsdefaultMutation();
  const [optionListBkp, setOptionListBkp] = useState<any>([]);
  const [updateInvoice] = useUpdateInvoiceMutation();
  const { data: previewInvoiceData } = usePreviewInvoiceQuery(null);

  const [optionsList, setOptionsList] = useState<any>([]);
  useEffect(() => {
    if (data) {
      setOptionsList(data.options_list);
      setOptionListBkp(data.options_list);
    }
  }, [data]);

  useEffect(() => {}, [optionsList]);

  const onSetAsDefault = async (id: string, flag: boolean) => {
    await setAsdefault({ id, flag }).then((res) => {
      refetch();
    });
  };

  type InvoiceOption = {
    id: number | GridRowId;
    title: string;
    description: string;
  };

  const [invoiceDataForUpdate, setInvoiceDataForUpdate] =
    useState<InvoiceOption>({} as any);

  const Menu = styled(Popper)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    width: 150,
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
    border: '1px solid #dddbda',
    borderRadius: 4,
    '& .MuiMenuItem-root': {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 14
    }
  }));

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const renderCell = (params: GridCellParams) => {
    const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;
    if (isInEditMode) {
      return (
        <Input
          value={params.value}
          label=""
          onChange={(e) => {
            handleRowEdit(params, e.target.value);
          }}
        />
      );
    }
    return <>{params.value}</>;
  };

  const handleRowEdit = ({ field, id, row }: GridCellParams, value: any) => {
    const index = findIndex(optionsList, { id });
    if (index !== -1) {
      const updatedOptionsList = cloneDeep(optionsList);
      updatedOptionsList[index][field] = value;
      setOptionsList(updatedOptionsList);
    }
    const invoiceData: InvoiceOption = {
      id: id,
      title: field === 'title' ? value : row.title,
      description: field === 'description' ? value : row.description
    };
    setInvoiceDataForUpdate(invoiceData);
  };

  const handleEditClick = (id: GridRowId, popupState: any) => () => {
    popupState.close();
    setRowModesModel({ [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = async () => {
    if (isEmpty(invoiceDataForUpdate)) {
      return;
    } else {
      const result = await updateInvoice(invoiceDataForUpdate);
      if ('error' in result) {
        toast.error('Something went wrong', {
          ...toastConfig,
          toastId: 'invoice error'
        });
      } else {
        toast.success(get(result.data, 'message', 'updated Sucessfully'), {
          icon: <CheckCircleIcon />,
          toastId: 'invoice error'
        });
        refetch();
      }
    }
    setRowModesModel({});
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setOptionsList(optionListBkp);
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  const InvoiceOptionColums: GridColumns<any> = [
    {
      field: 'title',
      headerName: 'Title',
      sortable: false,
      width: 350,
      renderCell: renderCell
    },
    {
      field: 'description',
      headerName: 'Description',
      sortable: false,
      width: 350,
      renderCell: renderCell
    },
    {
      field: 'default',
      headerName: 'Set As Default',
      sortable: false,
      renderCell: (params: GridCellParams) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return <></>;
        }
        return (
          <CheckBox
            ml={'2vw'}
            checked={params.value === '1'}
            id={params.id}
            onChange={() => {
              onSetAsDefault(toString(params.id), params.value !== '1');
            }}
          />
        );
      },
      width: 200
    },
    {
      field: 'actions',
      type: 'actions',
      width: 200,
      renderHeader: () => <Settings sx={{ color: '#b0adab', ml: '1.5vw' }} />,
      renderCell: ({ id }: GridCellParams) => {
        const popupState = usePopupState({
          variant: 'popover',
          popupId: 'accountMenuPopup'
        });
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <>
              <Grid container direction={'row'}>
                <CustomButton
                  variant="text"
                  label={'Cancel'}
                  css={{ marginTop: '1vh' }}
                  onClick={handleCancelClick(id)}
                />
                <CustomButton
                  variant="outlined"
                  label={'Save'}
                  color="success"
                  onClick={handleSaveClick}
                  css={{ height: '4vh', marginTop: '1vh', marginLeft: '1vw' }}
                />
              </Grid>
            </>
          ];
        }
        return [
          <>
            <Button
              sx={{
                '&:hover': { backgroundColor: 'transparent' },
                ml: '2vw'
              }}
              disableRipple
              disableFocusRipple
              {...bindTrigger(popupState)}
              startIcon={
                <ArrowDropDown
                  sx={{
                    border: '1px solid #dedede',
                    borderRadius: '2px',
                    color: '#b0adab'
                  }}
                />
              }
              variant="text"
              color="secondary"
              size="small"
            />
            <Menu {...bindPopover(popupState)} placement="bottom">
              <ClickAwayListener onClickAway={popupState.close}>
                <div>
                  <MenuItem onClick={handleEditClick(id, popupState)}>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => {}}>Delete</MenuItem>
                </div>
              </ClickAwayListener>
            </Menu>
          </>
        ];
      }
    }
  ];

  return (
    <>
      {isFetching || isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '35vh',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Modal
            open={isAddOptionOpen}
            title={'Add Option'}
            closeIconVisible={true}
            onClose={() => {
              setIsAddOptionOpen(false);
            }}
            width="xs"
          >
            <AddOption
              onClose={() => {
                setIsAddOptionOpen(false);
              }}
              refetch={refetch}
            />
          </Modal>
          <Grid item xs={12} md={6} alignSelf="flex-end">
            <CustomButton
              startIcon={<Add />}
              variant="contained"
              color="success"
              label="Add Option"
              size="medium"
              onClick={() => {
                setIsAddOptionOpen(true);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} mt={5}>
            <DataTable
              rowModesModel={rowModesModel}
              editMode="row"
              columnData={InvoiceOptionColums}
              tableData={optionsList}
              hideFooter={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomButton
              variant="outlined"
              color="success"
              label="Preview Invoice"
              size="small"
            />
          </Grid>
        </>
      )}
    </>
  );
};

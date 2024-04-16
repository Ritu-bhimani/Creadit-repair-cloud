import { Box, CircularProgress } from '@mui/material';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { FC } from 'react';
import { DataTableStyles } from './styles';
interface DataTableProps extends Partial<DataGridProps> {
  tableData?: any;
  columnData: GridColDef[];
  hideFooter?: boolean;
  height?: string;
  checkboxSelection?: boolean;
  loading?: boolean;
  noDataMessage?: string;
  getRowId?: (row: any) => string;
}

export const DataTable: FC<DataTableProps> = (props: DataTableProps) => {
  const {
    columnData,
    tableData,
    hideFooter,
    height,
    checkboxSelection,
    loading,
    noDataMessage,
    getRowId
  } = props;

  return (
    <Box css={DataTableStyles.root}>
      <DataGrid
        disableColumnMenu
        getRowId={getRowId}
        components={{
          LoadingOverlay: () => (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ),
          NoRowsOverlay: () => <>{noDataMessage}</>
        }}
        loading={loading}
        css={DataTableStyles.dataTable}
        sx={{ height: height ? height : 'auto' }}
        rows={tableData}
        columns={columnData}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        disableColumnSelector
        disableColumnFilter
        hideFooter={hideFooter}
        hideFooterPagination={hideFooter}
        checkboxSelection={checkboxSelection}
      />
    </Box>
  );
};

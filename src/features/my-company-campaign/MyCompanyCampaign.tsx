import { Add, Cancel, Delete, Edit } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  InputLabel,
  Link,
  Typography
} from '@mui/material';
import { GridColumns } from '@mui/x-data-grid';
import { get } from 'lodash-es';
import { FC, useState } from 'react';
import { CustomButton, DataTable, Input } from '../../components';
import {
  useDisableCampaignMutation,
  useGetAPIKeyQuery,
  useSubmitAPIKeyMutation
} from './MyCompanyCampaign.api';
import { toast } from 'react-toastify';

type APIKeyDataType = {
  domain: string;
  api_key: string;
  is_enable: boolean;
};

const APIKeyForm: FC<APIKeyDataType> = (apiKeyData: APIKeyDataType) => {
  const [submitAPIKey, { isLoading, isError }] = useSubmitAPIKeyMutation();
  const [isEdit, setIsEdit] = useState(apiKeyData.is_enable ? false : true);
  type FormType = {
    domain: string;
    api_key: string;
  };
  const [formData, setFormData] = useState<FormType>({
    domain: '',
    api_key: ''
  });
  const handleSubmit = () => {
    submitAPIKey(formData);
  };
  return (
    <>
      <Grid container mt={5}>
        {isEdit ? (
          <Grid item xs={5}>
            <Input
              label={' Site URL:'}
              css={{ width: '80%' }}
              value={formData.domain}
              onChange={(e) =>
                setFormData({ ...formData, domain: e.target.value })
              }
            />
          </Grid>
        ) : (
          <Grid mr={3}>
            <InputLabel sx={{ fontSize: '12px' }}>Site URL:</InputLabel>
            <Typography component="div" variant="subtitle2">
              <span css={{ marginRight: '3vw' }}>{apiKeyData.domain}</span>
              <IconButton onClick={() => setIsEdit(true)} disableRipple>
                <Edit color="primary" />
              </IconButton>
            </Typography>
          </Grid>
        )}

        {isEdit ? (
          <Grid item xs={4}>
            <Input
              label={'API key:'}
              css={{ width: '90%' }}
              value={formData.api_key}
              onChange={(e) =>
                setFormData({ ...formData, api_key: e.target.value })
              }
            />
          </Grid>
        ) : (
          <Grid>
            <InputLabel sx={{ fontSize: '12px' }}>API key:</InputLabel>
            <Typography component="div" variant="subtitle2">
              <span css={{ marginRight: '3vw' }}>{apiKeyData.api_key}</span>
              <IconButton onClick={() => setIsEdit(true)} disableRipple>
                <Edit color="primary" />
              </IconButton>
            </Typography>
          </Grid>
        )}

        {isEdit ? (
          <Grid item xs={3} alignSelf="center" mt={3} container gap={3}>
            <Grid>
              <CustomButton
                variant="contained"
                label="Save"
                color="success"
                onClick={handleSubmit}
              />
            </Grid>
            {apiKeyData.is_enable && (
              <Grid item alignSelf="center">
                <Link
                  sx={{ textDecoration: 'none', cursor: 'pointer' }}
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </Link>
              </Grid>
            )}
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
};

const columns: GridColumns<any> = [
  {
    field: 'type',
    headerName: 'Type',
    width: 500,
    sortable: false
  },
  {
    field: 'list-name',
    headerName: 'List Name',
    width: 450,
    sortable: false
  },
  {
    field: 'id',
    headerName: '',
    width: 130,
    sortable: false,
    renderCell: (params) => {
      return (
        <Grid ml={'5vw'}>
          <IconButton disableRipple disableFocusRipple>
            <Delete color="primary" />
          </IconButton>
        </Grid>
      );
    }
  }
];

export const MyCompanyCampaign = () => {
  const { isFetching, data, refetch } = useGetAPIKeyQuery(null);
  const [disableCampaign, { isLoading }] = useDisableCampaignMutation();
  const APIData = get(data, 'active-campaign', {
    key: '',
    domain: '',
    is_enable: false,
    list: []
  });
  const onDisableCampaign = async () => {
    const result = await disableCampaign(null);
    if ('error' in result) {
      const errorMsg: any = get(result.error, 'data.message');
      toast.error(errorMsg, {
        icon: <Cancel />,
        toastId: 'errorMsg'
      });
    } else {
      refetch();
    }
  };
  return isFetching ? (
    <Box display="flex" justifyContent={'space-around'} mt="5vh" mb="5vh">
      <CircularProgress />
    </Box>
  ) : (
    <Grid container gap={5} direction="column">
      <Grid item>
        <APIKeyForm
          api_key={APIData.key}
          domain={APIData?.domain}
          is_enable={APIData.is_enable}
        />
      </Grid>
      {APIData.is_enable && (
        <Grid item>
          <Grid container justifyContent="space-between" mb={3}>
            <Grid item xs={3}>
              <Typography variant="h5">Mailing Lists</Typography>
            </Grid>
            <Grid
              container
              item
              width={'30vw'}
              gap={2}
              justifyContent="flex-end"
            >
              <Grid item>
                <CustomButton
                  size="small"
                  variant="outlined"
                  label="Disable Active Campaign"
                  color="success"
                  onClick={onDisableCampaign}
                />
              </Grid>
              <Grid item>
                <CustomButton
                  startIcon={<Add />}
                  variant="contained"
                  label="Add List"
                  color="success"
                  onClick={() => refetch()}
                />
              </Grid>
            </Grid>
          </Grid>
          <DataTable
            columnData={columns}
            tableData={APIData.list}
            hideFooter={true}
          />
        </Grid>
      )}
    </Grid>
  );
};

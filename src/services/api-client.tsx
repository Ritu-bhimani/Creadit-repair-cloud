import { Cancel } from '@mui/icons-material';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks';

export const API_HOST =
  'qa-api.creditrepaircloud.com' || process.env.REACT_APP_API_HOSTNAME;

export const API_BASE_URL = `https://${API_HOST}/api/`;

export const api = axios.create({
  baseURL: API_BASE_URL
});

interface ErrorResponse {
  data: {
    Message: string;
  };
}

const manageAPIError = (error: AxiosError) => {
  if (error.code === AxiosError.ERR_BAD_REQUEST) {
    if (error.response) {
      const message: any = (error.response as ErrorResponse)?.data.Message;
      toast.error(message, {
        icon: <Cancel />
      });
    } else {
      toast.error(error.message, {
        icon: <Cancel />
      });
    }
  } else {
    // this will trigger the `handleError` function in the promise chain
    return Promise.reject(error);
  }
};

api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const { getToken } = useAuth();
  const token = getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

api.interceptors.response.use((response) => response, manageAPIError);

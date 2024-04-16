import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAuth } from '../../hooks';
import { api, ENDPOINTS } from '../../services';
import { AppThunk, RootState } from '../../store';

// Auth Models

export interface AuthError {
  message: string;
}
export interface AuthState {
  currentUser: UserDetails;
  isLoading: boolean;
  error: AuthError;
  isAuthorized: boolean;
}

export interface UserDetails {
  id: string;
  fname: string;
  lname: string;
  acc_status: string;
  usertype: string;
  token: string;
}
const initialState: AuthState = {
  currentUser: {
    id: '',
    fname: '',
    lname: '',
    acc_status: ''
  } as UserDetails,
  isLoading: false,
  error: { message: 'An Error occurred' },
  isAuthorized: false
};

// Auth Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setAuthSuccess: (state, { payload }: PayloadAction<UserDetails>) => {
      const { setToken } = useAuth();
      state.isAuthorized = true;
      setToken(payload.token);
      state.currentUser = payload;
    },
    setAuthFailed: (state, { payload }: PayloadAction<AuthError>) => {
      state.error = payload;
    }
  }
});

export const authSelector = (state: RootState) => state.auth;

const { setLoading, setAuthSuccess } = authSlice.actions;

//Actions

export const login =
  (authData: { email: string; password: string }): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    api
      .post(ENDPOINTS.LOGIN, {
        username: authData.email,
        password: authData.password
      })
      .then((userDetails) => {
        dispatch(setLoading(false));
        dispatch(setAuthSuccess(userDetails.data.user_details));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

export const changePassword =
  (payload: {
    old_password: string;
    new_password: string;
    confirm_password: string;
  }): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    api
      .post(ENDPOINTS.CHANGE_PASSWORD, {
        old_password: payload.old_password,
        new_password: payload.new_password,
        confirm_password: payload.confirm_password
      })
      .then((res) => {
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

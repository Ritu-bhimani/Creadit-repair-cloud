export type AuthHook = {
  getToken: () => string | undefined;
  setToken: (value: any) => void;
  removeToken: () => void;
  isAuthenticated: () => boolean;
  getUserDetails: () => UserDetails;
};

export interface UserDetails {
  reg_id: string;
  usertype: string;
  cmpny_name: string;
  fname: string;
  lname: string;
  admin_email: string;
  acc_status: string;
  recurly_payment_Status: string;
  company_country: string;
  currency_symbol: string;
  company_timezone: string;
}

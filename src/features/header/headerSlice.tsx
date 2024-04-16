import { createSlice } from '@reduxjs/toolkit';
import { MainTabLink } from '../../components';
import { routes } from '../../utils';

enum TABS {
  HOME = 'Home',
  CLIENTS = 'Clients',
  SCHEDULE = 'Schedule',
  MY_COMPANY = 'My Company',
  INVOICES = 'Invoices',
  LIBRARY = 'Library',
  AFFILIATES = 'Affiliates',
  CREDITORS_FURNISHERS = 'Creditors / Furnishers',
  EVERYTHING = 'Everything',
  DASHBOARD = 'Dashboard'
}

const mainTabLinks: MainTabLink[] = [
  {
    text: TABS.HOME,
    href: routes.APP_HOME
  },
  {
    text: TABS.CLIENTS,
    href: routes.CLIENTS
  },
  {
    text: TABS.SCHEDULE,
    href: routes.SCHEDULE
  },
  {
    text: TABS.MY_COMPANY,
    href: routes.MY_COMPANY
  },
  {
    text: TABS.INVOICES,
    href: routes.INVOICES
  },
  {
    text: TABS.LIBRARY,
    href: '/'
  },
  {
    text: TABS.AFFILIATES,
    href: '/'
  },
  {
    text: TABS.CREDITORS_FURNISHERS,
    href: '/'
  },
  {
    text: TABS.EVERYTHING,
    href: '/'
  },
  {
    text: TABS.DASHBOARD,
    href: '/'
  }
];

export interface HeaderState {
  mainTabLinks: MainTabLink[];
  helpAndSupportLinks: any[];
  AccountMenu: any[];
}

const initialState: HeaderState = {
  mainTabLinks: mainTabLinks,
  helpAndSupportLinks: [],
  AccountMenu: []
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {}
});

export default headerSlice;

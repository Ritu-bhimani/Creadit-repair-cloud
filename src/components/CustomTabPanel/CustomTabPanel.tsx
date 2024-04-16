import { styled, Tab, Tabs } from '@mui/material';
import { FC, ReactNode } from 'react';

export const CustomTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiTabs-flexContainer': {
    borderBottom: '1px solid #e8e8e8'
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#0cf',
    height: 5
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    minWidth: 'auto',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(3),
    padding: '0',
    color: '#666',
    borderBottom: 'solid #fff 5px',
    '&:hover': {
      color: '#000',
      opacity: 1,
      borderBottom: 'solid #0cf 5px'
    }
  },
  '& .Mui-selected': {
    color: '#666 !important',
    fontWeight: '600 !important',
    borderBottom: 'solid #0cf 5px'
  }
}));

export type TabLink = {
  label: ReactNode;
  href: string;
};

type CustomTabPanelProps = {
  tabLinks: TabLink[];
  onTabChange: (value: string) => void;
  activeTab?: any;
};

export const CustomTabPanel: FC<CustomTabPanelProps> = ({
  tabLinks,
  onTabChange,
  activeTab
}: CustomTabPanelProps) => {
  return (
    <CustomTabs value={activeTab} sx={{ mt: 1 }}>
      {tabLinks.map((t, index) => (
        <Tab
          label={t.label}
          value={t.href}
          key={index}
          onClick={() => onTabChange(t.href)}
        />
      ))}
    </CustomTabs>
  );
};

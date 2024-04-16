import { styled, Tab, Tabs } from '@mui/material';
import { FC, ReactNode } from 'react';

const VerticalTabs = styled(Tabs)(({ theme }) => ({
  height: '100%',
  '& .MuiTab-root': {
    '&:hover': {
      background: '#fff',
      opacity: 1
    }
  },
  '& .Mui-selected': {
    background: '#fff',
    color: '#4a4a4a !important',
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const VerticalTab = styled(Tab)({
  alignItems: 'flex-start',
  minWidth: '120px',
  fontWeight: 'normal',
  color: '#4a4a4a',
  '&.Mui-selected': {
    fontWeight: '700'
  }
});
export type VerticalTabLink = {
  label: ReactNode;
  href: string;
};

type VerticalNavigationProps = {
  tabLinks: VerticalTabLink[];
  onTabChange: (value: string) => void;
  activeTab?: any;
};

export const VerticalNavigation: FC<VerticalNavigationProps> = ({
  tabLinks,
  onTabChange,
  activeTab
}) => {
  return (
    <>
      <VerticalTabs value={activeTab} orientation="vertical">
        {tabLinks.map((tabLink) => {
          return (
            <VerticalTab
              key={tabLink.href}
              label={tabLink.label}
              value={tabLink.href}
              onClick={() => onTabChange(tabLink.href)}
            />
          );
        })}
      </VerticalTabs>
    </>
  );
};

import { Container, Typography } from '@mui/material';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { CustomTabPanel, ErrorBoundary, TabLink } from '../../components/';
import { routes } from '../../utils';
import { pageStyles } from '../styles';


type SchedulePagePages = {
  children?: ReactNode;
};
const tabLinks: TabLink[] = [
  {
    label: 'Day View',
    href: routes.DAY
  },
  {
    label: 'Week View',
    href: routes.SCHEDULE
  },
  {
    label: 'Month View',
    href: routes.MONTH
  },
  {
    label: 'Task & Events View',
    href: routes.TASKS_AND_EVENTS
  }
];

export const SchedulePage: FC<SchedulePagePages> = ({
  children
}: SchedulePagePages) => {

  const [activeTab, setActiveTab] = useState<string>(tabLinks[1].href);
  const navigate = useNavigate();

  useEffect(() => {
    function refresh() {
      tabLinks.forEach((el) => {
        let path = window.location.pathname;
        let result = path.substring(path.lastIndexOf('/') + 1);
        if (result === el.href) {
          setActiveTab(el.href);
        }
      });
    }

    refresh();
  });


  const onActiveTabChange = (value: string) => {
    setActiveTab(value);
    navigate(value);
  };

  return (
    <Container maxWidth="xl">
      <Typography component={'div'} variant="h2" css={pageStyles.heading}>
        {'My Schedule'}
      </Typography>
      <CustomTabPanel
        tabLinks={tabLinks}
        onTabChange={onActiveTabChange}
        activeTab={activeTab}
      />
      <ErrorBoundary>{children || <Outlet />}</ErrorBoundary>
    </Container>
  );
};

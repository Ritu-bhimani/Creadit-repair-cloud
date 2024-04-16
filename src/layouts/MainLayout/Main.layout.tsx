import { Box } from '@mui/material';
import { FC, ReactNode, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppFooter } from '../../components';
import { Header } from '../../features/header/Header';
import { useAuth } from '../../hooks';
import { routes } from '../../utils';

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = (props: MainLayoutProps) => {
  const { children } = props;
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(routes.UNAUTHENTICATED);
    }
  }, [isAuthenticated()]);
  return (
    <>
      <Header />
      <Box>{children || <Outlet />}</Box>
      <AppFooter />
    </>
  );
};

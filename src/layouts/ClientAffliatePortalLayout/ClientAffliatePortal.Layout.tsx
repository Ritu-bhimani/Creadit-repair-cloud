import { FC, ReactNode } from 'react';
import { LivePortalPreview } from '../../features';

type ClientAffliatePortalLayoutProps = {
  children: ReactNode;
};

export const ClientAffliatePortalLayout: FC<
  ClientAffliatePortalLayoutProps
> = ({ children }: ClientAffliatePortalLayoutProps) => {
  return (
    <>
      {children}
      <LivePortalPreview />
    </>
  );
};

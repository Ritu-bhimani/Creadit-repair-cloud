import { Container, Typography } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import {
  CustomTabPanel,
  ErrorBoundary,
  InfoMessage,
  TabLink
} from '../../../../components';
import { ClientAffliatePortalLayout } from '../../../../layouts';
import { routes } from '../../../../utils';
import { pageStyles } from '../../../styles';

type ClientAffliatePortalProps = {
  children?: ReactNode;
};

const tabLinks: TabLink[] = [
  {
    label: 'My Logo',
    href: ''
  },
  {
    label: 'Details',
    href: routes.MY_COMPANY_CAF_DETAILS
  },
  {
    label: 'Resources',
    href: routes.MY_COMPANY_CAF_RESOURCES
  },
  {
    label: 'Credit Info',
    href: routes.MY_COMPANY_CAF_CLIENT_INFO
  },
  {
    label: "Client's Choice",
    href: routes.MY_COMPANY_CAF_CLIENTS_CHOICE
  },
  {
    label: 'Portal Theme',
    href: routes.MY_COMPANY_CAF_PORTAL_THEME
  },
  {
    label: 'Client Onboarding & Tasks',
    href: routes.MY_COMPANY_CAF_COAT
  }
];

export const ClientAffliatePortalPage: FC<ClientAffliatePortalProps> = ({
  children
}: ClientAffliatePortalProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabLinks[0].href);
  const navigate = useNavigate();
  const onActiveTabChange = (value: string) => {
    setActiveTab(value);
    navigate(value);
  };

  return (
    <Container maxWidth="xl">
      <Typography component={'div'} variant="h2" css={pageStyles.heading}>
        {'Client/Affiliate Portal Options'}
      </Typography>
      <InfoMessage
        message={
          <>
            The client portal is the most important tool a credit specialist can
            have. Your client portal is private label, with your logo and your
            company information, to look as it custom built just for you. To
            modify the "Resources" and "Credit Info" pages that your clients see
            in your portal, click the tabs below. If you activate "Client's
            Choice" (optional), the client must choose which items to dispute.
          </>
        }
      />
      <CustomTabPanel
        tabLinks={tabLinks}
        onTabChange={onActiveTabChange}
        activeTab={activeTab}
      />
      <ClientAffliatePortalLayout>
        <ErrorBoundary>{children || <Outlet />}</ErrorBoundary>
      </ClientAffliatePortalLayout>
    </Container>
  );
};

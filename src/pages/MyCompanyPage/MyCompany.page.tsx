import styled from '@emotion/styled';
import {
  AttachMoney,
  Group,
  Groups,
  Mail,
  Notifications
} from '@mui/icons-material';
import { Box, Divider, Grid } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import {
  ErrorBoundary,
  VerticalNavigation,
  VerticalTabLink
} from '../../components';
import { routes } from '../../utils';

type LabelProps = {
  icon: ReactNode;
  label: string;
};

const Label = ({ icon, label }: LabelProps) => {
  return (
    <Grid container sx={{ marginLeft: '1vw' }}>
      <Grid item>{icon}</Grid>
      <Grid
        sx={{
          textTransform: 'capitalize',
          marginLeft: '0.5vw'
        }}
        item
      >
        {label}
      </Grid>
    </Grid>
  );
};

const tabLinks: VerticalTabLink[] = [
  {
    label: (
      <Label
        icon={
          <img
            css={{ marginTop: '0.1em' }}
            src="/assets/images/My-Company.svg"
          />
        }
        label="My Company Profile"
      />
    ),
    href: routes.MY_COMPANY
  },
  {
    label: (
      <Label
        icon={<Groups fontSize="small" />}
        label="My Team Members (Users)"
      />
    ),
    href: routes.MY_COMPANY_TEAM
  },
  {
    label: (
      <Label
        icon={<img css={{ marginTop: '0.1em' }} src="/assets/images/rap.svg" />}
        label="Roles & Permissions"
      />
    ),
    href: routes.MY_COMPANY_ROLES
  },
  {
    label: (
      <Label
        icon={<img css={{ marginTop: '0.1em' }} src="/assets/images/cms.svg" />}
        label="Credit Monitoring Services"
      />
    ),
    href: routes.MY_COMPANY_CMS
  },
  {
    label: <Label icon={<Mail fontSize="small" />} label="CloudMail" />,
    href: routes.MY_COMPANY_CLOUD_MAIL
  },
  {
    label: (
      <Label
        icon={<img css={{ marginTop: '0.1em' }} src="/assets/images/cap.svg" />}
        label="Client / Affiliate Portal"
      />
    ),
    href: routes.MY_COMPANY_CLIENT_AFFLIATE
  },
  {
    label: (
      <Label
        icon={<img css={{ marginTop: '0.1em' }} src="/assets/images/wt.svg" />}
        label="Website Tools"
      />
    ),
    href: routes.MY_COMPANY_WEBSITE_TOOLS
  },
  {
    label: (
      <Label
        icon={
          <img css={{ marginTop: '0.1em' }} src="/assets/images/saudit.svg" />
        }
        label="Credit Audit"
      />
    ),
    href: routes.MY_COMPANY_CREDIT_AUDIT
  },
  {
    label: (
      <Label
        icon={<img css={{ marginTop: '0.1em' }} src="/assets/images/ca.svg" />}
        label="Client Agreement"
      />
    ),
    href: routes.MY_COMPANY_CLIENT_AGREEMENT
  },
  {
    label: (
      <Label
        icon={<img css={{ marginTop: '0.1em' }} src="/assets/images/dsr.svg" />}
        label="Digital Signature Records"
      />
    ),
    href: routes.MY_COMPANY_DIGITAL_SIGNATURE
  },
  {
    label: (
      <Label
        icon={<img css={{ marginTop: '0.1em' }} src="/assets/images/dsr.svg" />}
        label="Dispute Options"
      />
    ),
    href: routes.MY_COMPANY_DISPUTE
  },
  {
    label: (
      <Label
        icon={<Notifications fontSize="small" />}
        label="Automated Notifications"
      />
    ),
    href: routes.MY_COMPANY_AUTOMATED_NOTIFICATIONS
  },
  {
    label: (
      <Label icon={<Group fontSize="small" />} label="Client Status Types" />
    ),
    href: routes.MY_COMPANY_CLIENT_STATUS
  },
  {
    label: (
      <Label
        icon={
          <img
            css={{ marginTop: '0.1em' }}
            src="/assets/images/invoiceops.svg"
          />
        }
        label="Invoice Options"
      />
    ),
    href: routes.MY_COMPANY_INVOICE_OPTIONS
  },
  {
    label: (
      <Label
        icon={
          <img
            css={{ marginTop: '0.1em' }}
            src="/assets/images/affliate-pay.svg"
          />
        }
        label="Affiliate Payments"
      />
    ),
    href: routes.MY_COMPANY_AFFLIATE_PAYMENTS
  },
  {
    label: (
      <Label
        icon={
          <img css={{ marginTop: '0.1em' }} src="/assets/images/activec.svg" />
        }
        label="Active Campaign"
      />
    ),
    href: routes.MY_COMPANY_ACTIVE_CAMPAIGNS
  },
  {
    label: (
      <Label
        icon={<AttachMoney fontSize="small" sx={{ marginLeft: '-0.5rem' }} />}
        label="Recurring Payments"
      />
    ),
    href: routes.MY_COMPANY_RECURRING_PAYMENTS
  },
  {
    label: (
      <Label
        icon={
          <img css={{ marginTop: '0.1em' }} src="/assets/images/api-auto.svg" />
        }
        label="API & Automations"
      />
    ),
    href: routes.MY_COMPANY_API_AUTOMATION
  }
];

const TabsContainer = styled(Grid)(({ theme }) => ({
  borderRight: 'solid 1px #dedede',
  background: '#f7f7f7',
  maxWidth: '20vw',
  minHeight: '100vh'
}));

const Header = styled(Box)(({ theme }) => ({
  color: '#b0adab',
  fontWeight: '700',
  fontSize: '1.2em',
  paddingLeft: '2vw',
  lineHeight: '5vh',
  marginBottom: '2vh',
  marginTop: '6vh'
}));

type MyCompanyPageProps = {
  children?: React.ReactNode;
};

export const MyCompanyPage: FC<MyCompanyPageProps> = ({
  children
}: MyCompanyPageProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabLinks[0].href);
  const navigate = useNavigate();
  const onActiveTabChange = (value: string) => {
    setActiveTab(value);
    navigate(value);
  };
  return (
    <Grid
      container
      sx={{
        marginTop: '0',
        marginBottom: '-2.9em',
        borderBottom: 'solid 1px #dedede'
      }}
    >
      <TabsContainer item xs={2.5}>
        <Header>Company Settings</Header>
        <Divider />
        <Box sx={{ marginTop: '1vh' }}>
          <VerticalNavigation
            activeTab={activeTab}
            tabLinks={tabLinks}
            onTabChange={(value) => onActiveTabChange(value)}
          />
        </Box>
      </TabsContainer>
      <Grid item xs={9.5}>
        <ErrorBoundary>{children || <Outlet />}</ErrorBoundary>
      </Grid>
    </Grid>
  );
};

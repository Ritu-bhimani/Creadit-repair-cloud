import {
  Contacts,
  CreditCard,
  Description,
  Domain,
  DonutSmall,
  FolderOpen,
  LiveHelp,
  OndemandVideo,
  School,
  Web
} from '@mui/icons-material';
import { css, Grid } from '@mui/material';
import {
  Certificate,
  CreditReport,
  QuickLinkProps,
  QuickLinks
} from '../../components';

const internalLinksSection = css`
  margin-top: 2vh !important;
  margin-left: 2vw !important;
`;
const externalLinksSection = css`
  margin-left: 1vw !important;
  margin-top: 2vh !important;
  @media only screen and (max-width: 600px) {
    margin-top: 0 !important;
  }
`;

const ExternalNavigationLinks: QuickLinkProps[] = [
  {
    LinkName: 'Take the Credit Hero Challenge',
    LinkDescription: 'Credit repair training and certificate',
    Icon: <School sx={{ fontSize: 40 }} />,
    href: 'https://creditherochallenge.com/live'
  },
  {
    LinkName: 'Get a Business Website',
    LinkDescription: 'Get a professional site in minutes',
    Icon: <Web sx={{ fontSize: 40 }} />,
    href: 'http://www.mycreditrepairsite.com/'
  },
  {
    LinkName: 'Get CRC Certified',
    LinkDescription: 'Get FREE step-by-step training.',
    Icon: <Certificate />,
    href: 'https://training.creditrepaircloud.com/courses/Software-Certification-Course'
  },
  {
    LinkName: 'Free Videos & Resources',
    LinkDescription: 'Credit Repair Cloud user guides',
    Icon: <OndemandVideo sx={{ fontSize: 40 }} />,
    href: 'https://www.creditrepaircloud.com/resources'
  },
  {
    LinkName: 'Free Live Software Classes',
    LinkDescription: 'Daily for all Credit Heroes!',
    Icon: <LiveHelp sx={{ fontSize: 40 }} />,
    href: 'https://www.creditrepaircloud.com/training-sessions'
  },
  {
    LinkName: 'Bonus Materials',
    LinkDescription: 'Legal docs and marketing materials',
    Icon: <FolderOpen sx={{ fontSize: 40 }} />,
    href: '#',
    isActive: false
  }
];

const InternalNavigationLinks: QuickLinkProps[] = [
  {
    LinkName: 'My Company',
    LinkDescription: 'Configure users, permissions, billing',
    Icon: <Domain sx={{ fontSize: 40 }} />,
    href: '',
    isExternal: false
  },
  {
    LinkName: 'Get a Merchant Account',
    LinkDescription: 'Accept credit card payments from clients',
    Icon: <CreditCard sx={{ fontSize: 40 }} />,
    href: 'https://www.creditrepaircloud.com/merchant',
    isExternal: true
  },
  {
    LinkName: 'Credit Reports & Scores',
    LinkDescription: 'Earn money from recommended providers',
    Icon: <CreditReport />,
    href: '',
    isExternal: false
  },
  {
    LinkName: 'Contacts',
    LinkDescription: 'Manage contacts and addresses',
    Icon: <Contacts sx={{ fontSize: 40 }} />,
    href: '',
    isExternal: false
  },
  {
    LinkName: 'Client & Affiliate Portal',
    LinkDescription: 'Client and Affiliates log in here',
    Icon: <DonutSmall sx={{ fontSize: 40 }} />,
    href: '',
    isExternal: false
  },
  {
    LinkName: 'Library of Dispute Letters',
    LinkDescription: 'Also add your own custom letters',
    Icon: <Description sx={{ fontSize: 40 }} />,
    href: '',
    isExternal: false
  }
];
export const QuickLinksSection = () => {
  return (
    <Grid container direction="row">
      <Grid item xs={12} md={5} css={internalLinksSection}>
        {InternalNavigationLinks.map((data: QuickLinkProps, key) =>
          data.isExternal ? (
            <QuickLinks
              isExternal
              key={key}
              LinkDescription={data.LinkDescription}
              LinkName={data.LinkName}
              Icon={data.Icon}
              href={data.href}
            />
          ) : (
            <QuickLinks
              key={key}
              LinkDescription={data.LinkDescription}
              LinkName={data.LinkName}
              Icon={data.Icon}
              href={data.href}
            />
          )
        )}
      </Grid>
      <Grid item xs={12} md={5} css={externalLinksSection}>
        {ExternalNavigationLinks.map((data: QuickLinkProps, key) => {
          return (
            <QuickLinks
              isExternal
              key={key}
              LinkDescription={data.LinkDescription}
              LinkName={data.LinkName}
              Icon={data.Icon}
              href={data.href}
              isActive={data.isActive}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};
